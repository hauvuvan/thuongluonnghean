import {mkdirSync,readdirSync,copyFileSync,rmSync,mkdtempSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
const root=fileURLToPath(new URL('..',import.meta.url)),out=join(root,'outputs');mkdirSync(out,{recursive:true});
const stage=mkdtempSync(join(tmpdir(),'zirconia-package-')),target=join(stage,'zirconia-warranty');
function copy(from,to){mkdirSync(to,{recursive:true});for(const entry of readdirSync(from,{withFileTypes:true})){if(['.git','data','outputs','dist','node_modules','preview'].includes(entry.name)||entry.name.startsWith('.env')||entry.name.startsWith('.dev.vars')||entry.name.includes('.sqlite'))continue;const a=join(from,entry.name),b=join(to,entry.name);if(entry.isDirectory())copy(a,b);else if(entry.isFile())copyFileSync(a,b)}}
try{copy(root,target);const archive=join(out,'Zirconia_Warranty_Source.zip');rmSync(archive,{force:true});execFileSync('/usr/bin/zip',['-qr',archive,'zirconia-warranty'],{cwd:stage});console.log(archive)}finally{rmSync(stage,{recursive:true,force:true})}
