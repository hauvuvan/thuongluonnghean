import {randomBytes,scrypt as scryptCallback,timingSafeEqual,createHash} from 'node:crypto';
import {promisify} from 'node:util';
import worker from '../worker/index.js';
const scrypt=promisify(scryptCallback);
const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store',...headers}});
const digest=value=>createHash('sha256').update(value).digest('hex');
export function createApp(DB,{secureCookies=false}={}){
 const db=DB.sqlite;
 db.exec('CREATE TABLE IF NOT EXISTS local_credentials (id INTEGER PRIMARY KEY CHECK (id=1), username TEXT NOT NULL, salt TEXT NOT NULL, hash TEXT NOT NULL); CREATE TABLE IF NOT EXISTS local_sessions (token_hash TEXT PRIMARY KEY, expires INTEGER NOT NULL);');
 const attempts=new Map();
 const sessionCookie=(token,maxAge)=>'zirconia_session='+token+'; Path=/; HttpOnly; SameSite=Strict; Max-Age='+maxAge+(secureCookies?'; Secure':'');
 return async function handle(request,{clientIp='local'}={}){
  const url=new URL(request.url),path=url.pathname;
  if(!['GET','HEAD'].includes(request.method)&&request.headers.get('origin')!==url.origin)return json({error:'Yêu cầu không hợp lệ.'},403);
  if(Number(request.headers.get('content-length')||0)>16384)return json({error:'Dữ liệu quá lớn.'},413);
  const credentials=()=>db.prepare('SELECT * FROM local_credentials WHERE id=1').get();
  const cookie=request.headers.get('cookie')||'';
  const token=cookie.match(/(?:^|;\s*)zirconia_session=([a-f0-9]{64})(?:;|$)/)?.[1];
  const authenticated=token&&Boolean(db.prepare('SELECT token_hash FROM local_sessions WHERE token_hash=? AND expires>?').get(digest(token),Date.now()));
  if(path==='/api/auth/status'&&request.method==='GET')return json({mode:'password',needsSetup:!credentials(),authenticated:Boolean(authenticated)});
  if(['/api/auth/setup','/api/auth/login'].includes(path)&&request.method==='POST'){
   const now=Date.now();for(const [key,value] of attempts)if(value.reset<now)attempts.delete(key);
   const rate=attempts.get(clientIp)||{count:0,reset:now+900000};
   if(rate.count>=10)return json({error:'Bạn đã thử quá nhiều lần. Vui lòng thử lại sau 15 phút.'},429);
   attempts.set(clientIp,{...rate,count:rate.count+1});
   let body;try{body=await request.json()}catch{return json({error:'Thông tin đăng nhập không hợp lệ.'},400)}
   const username=String(body.username||'').trim(),password=String(body.password||'');
   if(username.length<3||username.length>80||password.length>200)return json({error:'Tên đăng nhập phải từ 3–80 ký tự.'},400);
   const stored=credentials();
   if(path==='/api/auth/setup'){
    if(stored)return json({error:'Quản trị viên đã được thiết lập. Vui lòng đăng nhập.'},409);
    if(password.length<12)return json({error:'Mật khẩu phải có ít nhất 12 ký tự.'},400);
    const salt=randomBytes(16).toString('hex'),hash=Buffer.from(await scrypt(password,salt,64)).toString('hex');
    try{db.prepare('INSERT INTO local_credentials (id,username,salt,hash) VALUES (1,?,?,?)').run(username,salt,hash)}catch{return json({error:'Quản trị viên đã được thiết lập. Vui lòng đăng nhập.'},409)}
   }else{
    const candidate=Buffer.from(await scrypt(password,stored?.salt||'invalid-account-salt',64));
    const expected=stored?Buffer.from(stored.hash,'hex'):Buffer.alloc(64);
    if(!timingSafeEqual(candidate,expected)||username!==stored?.username)return json({error:'Tên đăng nhập hoặc mật khẩu chưa đúng.'},401);
   }
   attempts.delete(clientIp);
   db.prepare('DELETE FROM local_sessions WHERE expires <= ?').run(now);
   const value=randomBytes(32).toString('hex');db.prepare('INSERT INTO local_sessions (token_hash,expires) VALUES (?,?)').run(digest(value),now+8*3600000);
   return json({ok:true},200,{'Set-Cookie':sessionCookie(value,8*3600)});
  }
  if(path==='/api/auth/logout'&&request.method==='POST'){
   if(token)db.prepare('DELETE FROM local_sessions WHERE token_hash=?').run(digest(token));
   return json({ok:true},200,{'Set-Cookie':sessionCookie('',0)});
  }
  const headers=new Headers(request.headers);
  for(const key of [...headers.keys()])if(key.startsWith('oai-authenticated-'))headers.delete(key);
  if(authenticated)headers.set('oai-authenticated-user-id','local-admin');
  return worker.fetch(new Request(request,{headers}),{DB,ADMIN_USER_ID:'local-admin'});
 };
}
