import http from 'node:http';
import {mkdirSync,chmodSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
import {makeDB} from './local-db.mjs';
import {createApp} from './app.mjs';
const root=fileURLToPath(new URL('..',import.meta.url));
const directory=resolve(process.env.WARRANTY_DATA_DIR||resolve(root,'data'));
mkdirSync(directory,{recursive:true,mode:0o700});
const filename=resolve(directory,'warranties.sqlite');
const DB=makeDB(filename);chmodSync(filename,0o600);
const port=Number(process.env.PORT||4173),host=process.env.HOST||'127.0.0.1';
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('PORT không hợp lệ.');
const origin=process.env.PUBLIC_ORIGIN||'http://'+(host==='0.0.0.0'?'localhost':host)+':'+port;
const handle=createApp(DB,{secureCookies:origin.startsWith('https://')});
const server=http.createServer(async(req,res)=>{
 try{
  const chunks=[];let size=0;for await(const c of req){size+=c.length;if(size>16384){res.writeHead(413);res.end('Dữ liệu quá lớn.');return}chunks.push(c)}
  const incoming=new URL(req.url,origin);if(incoming.origin!==new URL(origin).origin){res.writeHead(400);res.end();return}
  const request=new Request(incoming,{method:req.method,headers:new Headers(req.headers),body:!['GET','HEAD'].includes(req.method)?Buffer.concat(chunks):undefined});
  const response=await handle(request,{clientIp:req.socket.remoteAddress});res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));
 }catch(e){console.error(e.message);res.writeHead(500,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Máy chủ gặp lỗi. Vui lòng thử lại.'}))}
});
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?'Cổng '+port+' đang được sử dụng. Mở '+origin+' hoặc chọn PORT khác.':'Không thể mở máy chủ: '+e.message);process.exitCode=1;DB.sqlite.close()});
server.listen(port,host,()=>console.log('Web: '+origin+'\nQuản trị: '+origin+'/admin\nDữ liệu được lưu tại: '+filename+'\nDừng bằng Control+C.'));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>{DB.sqlite.close();process.exit(0)}));
