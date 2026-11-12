import {createHash,randomBytes} from 'node:crypto';
import worker from '../worker/index.js';
import {createSupabase} from '../scripts/supabase.mjs';

const cookieName='__Host-five_t_admin';
const json=(body,status=200,headers={})=>Response.json(body,{
 status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers}
});
const cookie=(value,age)=>cookieName+'='+value+'; Max-Age='+age+'; Path=/; Secure; HttpOnly; SameSite=Strict';
const tokenPattern=/^[a-f0-9]{64}$/;
const sessionAge=8*60*60;
const digest=value=>createHash('sha256').update(value).digest('hex');
const unauthorized=()=>json({error:'Vui lòng đăng nhập để quản trị.'},401);
const unavailable=()=>json({error:'Tạm thời chưa kết nối được hệ thống. Bạn thử lại sau nhé.'},503);

async function readSmallBody(request){
 const limit=16384;
 if(Number(request.headers.get('content-length'))>limit)return null;
 const reader=request.body.getReader();
 const body=new Uint8Array(limit);
 let size=0;
 while(true){
  const {done,value}=await reader.read();
  if(done)return body.subarray(0,size);
  if(size+value.length>limit){
   await reader.cancel();
   return null;
  }
  body.set(value,size);
  size+=value.length;
 }
}

export function createVercelHandler(env=process.env,fetchRequest=fetch){
 return async function handle(incoming){
  const url=new URL(incoming.url);
  if(/^\/api\/site\/?$/.test(url.pathname)){
   const routes=url.searchParams.getAll('__route');
   if(routes.length!==1 || /[\\?#]/.test(routes[0]) || routes[0].startsWith('/')){
    return new Response('Không tìm thấy trang',{status:404});
   }
   url.pathname=routes[0]==='__home'?'/':'/'+routes[0];
   url.searchParams.delete('__route');
  }
  const path=url.pathname;
  if(!path.startsWith('/api/'))return worker.fetch(new Request(url,{method:incoming.method}),{});
  if(!['GET','HEAD'].includes(incoming.method)&&incoming.headers.get('origin')!==url.origin){
   return json({error:'Yêu cầu không hợp lệ.'},403);
  }
  const {SUPABASE_URL,SUPABASE_SECRET_KEY,SUPABASE_PUBLISHABLE_KEY}=env;
  if(!SUPABASE_URL||!SUPABASE_SECRET_KEY||!SUPABASE_PUBLISHABLE_KEY)return unavailable();

  const headers=new Headers(incoming.headers);
  for(const key of [...headers.keys()]){
   if(key.startsWith('oai-authenticated-'))headers.delete(key);
  }
  const token=headers.get('cookie')?.split(/;\s*/).find(part=>part.startsWith(cookieName+'='))?.slice(cookieName.length+1);
  try{
   let body;
   if(incoming.body){
    body=await readSmallBody(incoming);
    if(body===null)return json({error:'Dữ liệu quá lớn.'},413);
   }
   const request=new Request(url,{method:incoming.method,headers,body});
   const supabase=createSupabase({
    url:SUPABASE_URL,secretKey:SUPABASE_SECRET_KEY,publishableKey:SUPABASE_PUBLISHABLE_KEY,fetchRequest
   });
   if(path==='/api/auth/status'&&request.method==='GET')return json({mode:'supabase'});
   if(path==='/api/auth/login'&&request.method==='POST'){
    const login=await request.json().catch(()=>null);
    const email=typeof login?.username==='string'?login.username.trim():'';
    const password=login?.password;
    if(!email||email.length>254||typeof password!=='string'||!password||password.length>200){
     return json({error:'Nhập email và mật khẩu quản trị.'},400);
    }
    if(!await supabase.isPrivateAuth())return unavailable();
    const response=await supabase.login(email,password);
    if(response.status===429)return json({error:'Bạn đã thử quá nhiều lần. Vui lòng thử lại sau.'},429);
    if([400,401,403,422].includes(response.status))return json({error:'Email hoặc mật khẩu không đúng.'},401);
    if(!response.ok)return unavailable();
    const session=await response.json();
    const adminId=session.user?.id;
    if(!adminId||!session.user.email||!session.user.email_confirmed_at||session.user.is_anonymous)return unauthorized();
    const newToken=randomBytes(32).toString('hex');
    const expiresAt=new Date(Date.now()+sessionAge*1000).toISOString();
    await supabase.createSession(digest(newToken),adminId,expiresAt);
    return json({ok:true},200,{'Set-Cookie':cookie(newToken,sessionAge)});
   }
   if(path==='/api/auth/logout'&&request.method==='POST'){
    if(token&&tokenPattern.test(token))await supabase.revokeSession(digest(token));
    return json({ok:true},200,{'Set-Cookie':cookie('',0)});
   }
   if(path==='/api/lookup'&&request.method==='POST'){
    return worker.fetch(request,{warranties:supabase.warranties});
   }
   if(!token||!tokenPattern.test(token))return unauthorized();
   const adminId=await supabase.getSession(digest(token));
   if(!adminId)return unauthorized();
   headers.set('oai-authenticated-user-id',adminId);
   return worker.fetch(new Request(url,{method:incoming.method,headers,body}),{
    warranties:supabase.warranties,ADMIN_USER_ID:adminId
   });
  }catch{
   return unavailable();
  }
 };
}

export default {fetch:createVercelHandler()};
