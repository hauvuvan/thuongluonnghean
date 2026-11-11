import assert from 'node:assert/strict';
import {Script} from 'node:vm';
import worker from '../worker/index.js';
import {publicRoutes} from '../worker/pages.js';
const origin='https://pages.test';
const visit=path=>worker.fetch(new Request(origin+path),{});
const queue=[...publicRoutes,'/tra-cuu-the-bao-hanh/','/admin'];
const seen=new Set();
while(queue.length){
 const path=queue.shift();if(seen.has(path))continue;seen.add(path);
 const response=await visit(path);assert.equal(response.status,200,path);
 assert.match(response.headers.get('content-type'),/text\/html/);
 const html=await response.text();assert.match(html,/<h1[ >]/,path);
 for(const [,script] of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g))new Script(script,{filename:path});
 if(path!=='/')assert.equal((await visit(path.replace(/\/$/,''))).status,200,'without trailing slash: '+path);
 for(const [,href] of html.matchAll(/href="([^"]+)"/g)){
  if(!href.startsWith('/')||href.startsWith('//')||/^\/sign(in|out)-with-chatgpt/.test(href))continue;
  const url=new URL(href,origin);queue.push(url.pathname+url.search);
 }
}
for(const path of ['/missing-page/','/shop/page/999/','/rang-su-missing/','/product-category/missing/','/product-category/rang-su-katana/unexpected/'])assert.equal((await visit(path)).status,404,path);
console.log('Passed public page routes, trailing slashes, internal link crawl, HTML and inline JavaScript syntax, and missing-page responses; visited '+seen.size+' URLs.');
