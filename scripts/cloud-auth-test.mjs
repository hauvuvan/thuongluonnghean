import assert from 'node:assert/strict';
import {createVercelHandler} from '../api/site.mjs';
import {createHash} from 'node:crypto';
const digest=v=>createHash('sha256').update(v).digest('hex');
const users=new Map([
 ['a@example.test',{id:'11111111-1111-4111-8111-111111111111',email:'a@example.test',email_confirmed_at:'2026-01-01T00:00:00Z',is_anonymous:false}],
 ['b@example.test',{id:'22222222-2222-4222-8222-222222222222',email:'b@example.test',email_confirmed_at:'2026-01-01T00:00:00Z',is_anonymous:false}],
 ['pending@example.test',{id:'33333333-3333-4333-8333-333333333333',email:'pending@example.test',is_anonymous:false}],
 ['anon@example.test',{id:'44444444-4444-4444-8444-444444444444',email:'anon@example.test',email_confirmed_at:'2026-01-01',is_anonymous:true}]
]);
const sessions=new Map();
let signup=false, anonymous=false, settingsFailure=false;
const calls=[];
async function fetchMock(input,options={}){
 const u=new URL(input),method=options.method||'GET';
 calls.push({path:u.pathname,method,headers:options.headers});
 if(u.pathname==='/auth/v1/settings')return Response.json(settingsFailure?{error:'bad'}:{disable_signup:!signup,external:{anonymous_users:anonymous}},{status:settingsFailure?500:200});
 if(u.pathname==='/auth/v1/token'){
  const {email,password}=JSON.parse(options.body);
  if(password==='rate')return Response.json({}, {status:429});
  if(password!=='correct'||!users.has(email))return Response.json({}, {status:400});
  return Response.json({user:users.get(email),access_token:'unused'});
 }
 if(u.pathname.startsWith('/auth/v1/admin/users/')){
  const id=decodeURIComponent(u.pathname.split('/').at(-1));
  const user=[...users.values()].find(v=>v.id===id);
  return Response.json(user||{error:'missing'},{status:user?200:404});
 }
 if(u.pathname==='/rest/v1/warranty_admin_sessions'){
  if(method==='POST'){const row=JSON.parse(options.body);sessions.set(row.token_hash,row);return new Response(null,{status:201});}
  if(method==='DELETE'){
   const hash=u.searchParams.get('token_hash');
   if(hash)sessions.delete(hash.slice(3));else for(const [key,row] of sessions)if(new Date(row.expires_at)<=new Date())sessions.delete(key);
   return new Response(null,{status:204});
  }
  const row=sessions.get(u.searchParams.get('token_hash')?.slice(3));
  return Response.json(row&&new Date(row.expires_at)>new Date()?[{admin_id:row.admin_id}]:[]);
 }
 if(u.pathname==='/rest/v1/warranties')return Response.json([]);
 if(u.pathname==='/rest/v1/rpc/lookup_warranties')return Response.json([]);
 throw Error('Unexpected request '+method+' '+u);
}
const env={SUPABASE_URL:'https://example.supabase.co',SUPABASE_SECRET_KEY:'sb_secret_mock',SUPABASE_PUBLISHABLE_KEY:'sb_publishable_mock'};
const handle=createVercelHandler(env,fetchMock);
async function request(path,{method='GET',body,cookie,headers={}}={}){
 return handle(new Request('https://example.test'+path,{method,headers:{origin:'https://example.test','content-type':'application/json',...(cookie?{cookie}:{}),...headers},body:body===undefined?undefined:JSON.stringify(body)}));
}
async function login(username,password='correct'){
 const response=await request('/api/auth/login',{method:'POST',body:{username,password}});
 const cookie=response.headers.get('set-cookie')?.split(';')[0];
 return {response,cookie};
}
assert.equal((await request('/api/auth/status')).status,200);
assert.equal((await request('/api/me',{headers:{'oai-authenticated-user-id':users.get('a@example.test').id}})).status,401);
const first=await login('a@example.test'),second=await login('b@example.test');
assert.equal(first.response.status,200);assert.equal(second.response.status,200);
assert.notEqual(first.cookie,second.cookie);
assert.match(first.response.headers.get('set-cookie'),/Secure; HttpOnly; SameSite=Strict/);
assert.equal(sessions.size,2);
const firstToken=first.cookie.split('=')[1],secondToken=second.cookie.split('=')[1];
assert.equal(sessions.get(digest(firstToken)).admin_id,users.get('a@example.test').id);
assert.equal(sessions.get(digest(secondToken)).admin_id,users.get('b@example.test').id);
for(const cookie of [first.cookie,second.cookie]){
 assert.equal((await request('/api/me',{cookie})).status,200);
 assert.equal((await request('/api/cards',{cookie})).status,200);
}
assert.equal((await login('pending@example.test')).response.status,401);
assert.equal((await login('anon@example.test')).response.status,401);
assert.equal((await login('a@example.test','wrong')).response.status,401);
assert.equal((await login('a@example.test','rate')).response.status,429);
signup=true;assert.equal((await login('a@example.test')).response.status,503);signup=false;
anonymous=true;assert.equal((await login('a@example.test')).response.status,503);anonymous=false;
settingsFailure=true;assert.equal((await login('a@example.test')).response.status,503);settingsFailure=false;
// Expired sessions are denied; another user's session remains active.
sessions.get(digest(firstToken)).expires_at='2020-01-01T00:00:00Z';
assert.equal((await request('/api/me',{cookie:first.cookie})).status,401);
assert.equal((await request('/api/me',{cookie:second.cookie})).status,200);
assert.equal((await request('/api/auth/logout',{method:'POST',cookie:second.cookie,body:{}})).status,200);
assert.equal((await request('/api/me',{cookie:second.cookie})).status,401);
// Existing per-user sessions remain compatible and are checked against current Auth state.
const oldToken='a'.repeat(64),a=users.get('a@example.test');
sessions.set(digest(oldToken),{admin_id:a.id,expires_at:'2099-01-01T00:00:00Z'});
const oldCookie='__Host-five_t_admin='+oldToken;
assert.equal((await request('/api/me',{cookie:oldCookie})).status,200);
a.banned_until='2099-01-01T00:00:00Z';assert.equal((await request('/api/me',{cookie:oldCookie})).status,401);delete a.banned_until;
users.delete('a@example.test');assert.equal((await request('/api/me',{cookie:oldCookie})).status,401);
assert.equal((await request('/api/me',{cookie:'__Host-five_t_admin='+'b'.repeat(64)})).status,401);
assert.equal((await request('/api/lookup',{method:'POST',body:{query:'MISSING'}})).status,200);
assert.equal((await request('/api/auth/login',{method:'POST',body:{username:'b@example.test',password:'correct'},headers:{origin:'https://evil.test'}})).status,403);
console.log('Passed independent multi-admin QA: two confirmed users, no fixed UUID env, isolated sessions, existing session compatibility, expiration/revocation, banned/deleted users, unconfirmed/anonymous denial, signup settings checks, spoof denial and public lookup.');
