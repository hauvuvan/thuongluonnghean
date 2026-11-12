import {readFileSync,writeFileSync} from 'node:fs';
import {productImages} from '../worker/product-images.js';
const root=new URL('../',import.meta.url);
const pages=readFileSync(new URL('worker/pages.js',root),'utf8').replace(/^export /gm,'');
const worker=readFileSync(new URL('worker/index.js',root),'utf8').replace("import {renderPage} from './pages.js';",'')
 .replace("import {productImages} from './product-images.js';",`const productImages=new Map(${JSON.stringify([...productImages])});`);
writeFileSync(new URL('dist/server/index.js',root),pages+'\n'+worker);

// Keep the standalone lookup preview in sync with the canonical Worker template.
const html=worker.split('const HTML=String.raw`')[1];
if(!html)throw new Error('Missing lookup HTML template');
writeFileSync(new URL('preview/index.html',root),html.slice(0,html.lastIndexOf('`;')));
