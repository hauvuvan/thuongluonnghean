import assert from 'node:assert/strict';
import {runInNewContext} from 'node:vm';
import worker from '../worker/index.js';

const html=await (await worker.fetch(new Request('https://ui.test/admin'),{})).text();
const source=[...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(match=>match[1]).join('\n');
function browser(fetchImpl){
 const nodes=new Map(),timers=new Map();let timerId=0;
 function make(id){
  let content='';const classes=new Set(['hidden']);
  const node={id,value:id==='statusfilter'?'all':'',disabled:false,textContent:'',
   classList:{add:c=>classes.add(c),remove:c=>classes.delete(c),contains:c=>classes.has(c),toggle(c,on){if(on)classes.add(c);else classes.delete(c);}},
   querySelectorAll:()=>[],querySelector:()=>null};
  Object.defineProperty(node,'innerHTML',{get:()=>content,set:value=>{
   for(const [,child] of content.matchAll(/id="([^"]+)"/g))nodes.delete(child);
   content=value;
   for(const [,child] of value.matchAll(/id="([^"]+)"/g))nodes.set(child,make(child));
  }});
  return node;
 }
 for(const [,id] of html.matchAll(/id="([^"]+)"/g))nodes.set(id,make(id));
 const context={document:{getElementById:id=>nodes.get(id)||null,querySelectorAll:()=>[]},location:{pathname:'/test'},
  sessionStorage:{getItem:()=>null},fetch:fetchImpl,AbortController,AbortSignal,Response,URL,Intl,Date,console,
  setTimeout(fn,delay){const id=++timerId;timers.set(id,{fn,delay});return id;},clearTimeout:id=>timers.delete(id)};
 runInNewContext(source,context);
 return {nodes,context,timers,run:code=>runInNewContext(code,context)};
}
const response=(body,status=200)=>Response.json(body,{status});
const tick=()=>new Promise(resolve=>setImmediate(resolve));

// An authenticated administrator needs one session validation for the data request.
{
 const calls=[];
 const b=browser(async path=>{calls.push(path);return response(path==='/api/auth/status'?{mode:'supabase'}:{records:[]});});
 await b.run('loadAdmin()');
 assert.equal(b.nodes.get('adminbody').classList.contains('hidden'),false);
 assert.equal(b.nodes.get('adminstate').innerHTML,'');
 assert.deepEqual(calls,['/api/auth/status','/api/cards']);
}
// Missing/expired cookies must show the password form rather than a permanent loader.
{
 const b=browser(async path=>response(path==='/api/auth/status'?{mode:'supabase'}:{error:'Vui lòng đăng nhập.'},path==='/api/auth/status'?200:401));
 await b.run('loadAdmin()');
 assert.ok(b.nodes.get('loginform'));
 assert.equal(b.nodes.get('adminbody').classList.contains('hidden'),true);
}
// Login errors stay usable; a successful login can replace the form during loading.
{
 let signedIn=false;
 const b=browser(async path=>{
  if(path==='/api/auth/status')return response({mode:'supabase'});
  if(path==='/api/auth/login'){signedIn=true;return response({ok:true});}
  return signedIn?response({records:[]}):response({error:'Đăng nhập.'},401);
 });
 await b.run('loadAdmin()');
 b.nodes.get('username').value='admin@example.test';b.nodes.get('password').value='test-password';
 await b.nodes.get('loginform').onsubmit({preventDefault(){}});
 assert.equal(b.nodes.get('adminbody').classList.contains('hidden'),false);
 assert.equal(b.nodes.get('loginform'),undefined);
}
// Incorrect passwords preserve the form and allow another attempt.
{
 const b=browser(async path=>response(path==='/api/auth/status'?{mode:'supabase'}:{error:'Email hoặc mật khẩu không đúng.'},path==='/api/auth/status'?200:401));
 await b.run('loadAdmin()');
 b.nodes.get('username').value='admin@example.test';b.nodes.get('password').value='incorrect';
 await b.nodes.get('loginform').onsubmit({preventDefault(){}});
 assert.match(b.nodes.get('loginerror').innerHTML,/Email hoặc mật khẩu không đúng/);
 assert.equal(b.nodes.get('loginbtn').disabled,false);
}
// A connection failure ends the loader, provides recovery, and a retry succeeds.
{
 let failed=true;
 const b=browser(async path=>{if(failed)throw new TypeError('Failed to fetch');return response(path==='/api/auth/status'?{mode:'supabase'}:{records:[]});});
 await b.run('loadAdmin()');
 assert.doesNotMatch(b.nodes.get('adminstate').innerHTML,/Đang tải dữ liệu quản trị/);
 assert.match(b.nodes.get('adminstate').innerHTML,/<button/);
 failed=false;
 await b.nodes.get('retryadmin').onclick();
 assert.equal(b.nodes.get('adminbody').classList.contains('hidden'),false);
}
// A hung request must be aborted and settled by the browser deadline.
{
 let signal;
 const b=browser((_path,options)=>new Promise((_resolve,reject)=>{
  signal=options.signal;
  signal?.addEventListener('abort',()=>reject(signal.reason));
 }));
 let settled=false;
 const pending=b.run('api("/api/cards")').then(()=>{throw Error('Expected timeout');},()=>{settled=true;});
 await tick();
 assert.ok(signal,'fetch receives an abort signal');
 for(const {fn} of [...b.timers.values()])fn();
 await tick();
 assert.equal(settled,true,'timeout settles the request');
 await pending;
 assert.equal(settled,true);
}
// A stalled response body is also covered by the same deadline.
{
 const b=browser(async (_path,options)=>({ok:true,json:()=>new Promise((_resolve,reject)=>options.signal.addEventListener('abort',()=>reject(options.signal.reason)))}));
 const pending=b.run('api("/api/cards")');
 await tick();
 for(const {fn} of [...b.timers.values()])fn();
 await assert.rejects(pending,/Kết nối quá lâu/);
 assert.equal(b.timers.size,0);
}
// Repeated refreshes do not duplicate concurrent requests; cached auth mode saves a round trip.
{
 const calls=[];let release;
 const b=browser(async path=>{calls.push(path);if(path==='/api/auth/status')await new Promise(resolve=>{release=resolve;});return response(path==='/api/auth/status'?{mode:'supabase'}:{records:[{id:'1',code:'TEST',customer:null,phone:null,clinic:null,product:'Titan',start:'2026-01-01',end:'2036-01-01',status:'active'}]});});
 const first=b.run('loadAdmin()');
 await b.run('loadAdmin()');
 assert.equal(calls.length,1);
 release();await first;
 await b.run('loadAdmin()');
 assert.deepEqual(calls,['/api/auth/status','/api/cards','/api/cards']);
 assert.equal(b.nodes.get('total').textContent,1);
}
// Invalid JSON and malformed data must produce a usable retry state.
for(const invalid of [()=>new Response('<html>upstream failure</html>'),()=>response({unexpected:[]})]){
 const b=browser(async path=>path==='/api/auth/status'?response({mode:'supabase'}):invalid());
 await b.run('loadAdmin()');
 assert.ok(b.nodes.get('retryadmin'));
 assert.equal(b.nodes.get('adminbody').classList.contains('hidden'),true);
 assert.doesNotMatch(b.nodes.get('adminstate').innerHTML,/Đang tải dữ liệu quản trị/);
}
console.log('Passed admin UI: authenticated load, expired session, login DOM replacement, failure recovery, and request timeout.');
