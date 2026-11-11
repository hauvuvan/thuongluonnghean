import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makeDB} from './local-db.mjs';
import {createApp} from './app.mjs';
const dir=mkdtempSync(join(tmpdir(),'zirconia-test-')),file=join(dir,'warranty.sqlite');
let DB=makeDB(file),handle=createApp(DB),cookie='';
async function call(path,method='GET',body,headers={}){const response=await handle(new Request('http://localhost:4173'+path,{method,headers:{Origin:'http://localhost:4173','Content-Type':'application/json',Cookie:cookie,...headers},body:body?JSON.stringify(body):undefined}));const type=response.headers.get('Content-Type')||'';return {response,status:response.status,body:type.includes('json')?await response.json():await response.text()}}
try{
 assert.equal((await call('/api/auth/status')).body.needsSetup,true);
 assert.equal((await call('/api/cards','GET',null,{'oai-authenticated-user-id':'local-admin'})).status,401);
 const account={username:'owner-test',password:'correct-horse-test-90347'};
 assert.equal((await call('/api/auth/setup','POST',{...account,password:'short'})).status,400);
 const setup=await call('/api/auth/setup','POST',account);assert.equal(setup.status,200);
 assert.match(setup.response.headers.get('Set-Cookie'),/HttpOnly; SameSite=Strict/);
 cookie=setup.response.headers.get('Set-Cookie').split(';')[0];
 assert.equal((await call('/api/me')).status,200);
 assert.equal((await call('/api/auth/setup','POST',account)).status,409);
 const card={code:'PERSIST001',customer:'Khách thử nghiệm',phone:'0901234567',product:'Zirconia',clinic:'Nha khoa thử nghiệm',quantity:2,positions:'11, 21',start:'2026-01-01',end:'2036-01-01',status:'active',notes:'Không công khai'};
 assert.equal((await call('/api/cards','POST',card)).status,201);
 assert.equal((await call('/api/auth/logout','POST',{})).status,200);
 assert.equal((await call('/api/me')).status,401);
 assert.equal((await call('/api/lookup','POST',{query:card.code})).body.records.length,1);
 const badOrigin=await call('/api/auth/login','POST',account,{Origin:'https://evil.example'});assert.equal(badOrigin.status,403);
 assert.equal((await call('/api/auth/login','POST',{...account,password:'wrong'})).status,401);
 DB.sqlite.close();DB=makeDB(file);handle=createApp(DB);cookie='';
 assert.equal((await call('/api/auth/status')).body.needsSetup,false);
 const login=await call('/api/auth/login','POST',account);assert.equal(login.status,200);cookie=login.response.headers.get('Set-Cookie').split(';')[0];
 assert.equal((await call('/api/cards')).body.records[0].code,card.code);
 assert.equal((await call('/missing')).status,404);
 const originalCookie=cookie;cookie='zirconia_session='+'a'.repeat(64);assert.equal((await call('/api/cards')).status,401);cookie=originalCookie;
 for(let i=0;i<10;i++)assert.equal((await call('/api/auth/login','POST',{...account,password:'wrong'})).status,401);
 assert.equal((await call('/api/auth/login','POST',account)).status,429);
 const page=await call('/tra-cuu-the-bao-hanh/');assert.match(page.body,/Kiểm tra thông tin bảo hành/);
 const inline=page.body.match(/<script>([\s\S]*?)<\/script>/)[1];new Function(inline);
 console.log('Passed: admin setup, login/logout, spoofed identity rejection, password checks, secure session flags, cross-origin checks, restart persistence, public lookup, invalid sessions, login throttling, HTML and client JavaScript syntax.');
}finally{DB.sqlite.close();rmSync(dir,{recursive:true,force:true})}
