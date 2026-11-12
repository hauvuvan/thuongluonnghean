import {readdirSync,readFileSync} from 'node:fs';

const directory=new URL('./product-images/',import.meta.url);
export const productImages=new Map(
 readdirSync(directory).filter(filename=>filename.endsWith('.webp')).map(filename=>[
  '/product-images/'+filename,
  readFileSync(new URL(filename,directory)).toString('base64')
 ])
);
