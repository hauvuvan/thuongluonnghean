import {readFileSync,writeFileSync} from 'node:fs';
import {siteImages} from '../worker/site-images.js';
const root=new URL('../',import.meta.url);
const pages=readFileSync(new URL('worker/pages.js',root),'utf8').replace(/^export /gm,'');
const worker=readFileSync(new URL('worker/index.js',root),'utf8').replace("import {renderPage} from './pages.js';",'')
 .replace("import {siteImages} from './site-images.js';",`const siteImages=new Map(${JSON.stringify([...siteImages])});`);
writeFileSync(new URL('dist/server/index.js',root),pages+'\n'+worker);

// Keep the standalone lookup preview in sync with the canonical Worker template.
const html=worker.split('const HTML=String.raw`')[1];
if(!html)throw new Error('Missing lookup HTML template');
writeFileSync(new URL('preview/index.html',root),html.slice(0,html.lastIndexOf('`;')).replace('/brand/five-t.png','data:image/png;base64,'+siteImages.get('/brand/five-t.png')));
