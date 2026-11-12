import {DatabaseSync} from 'node:sqlite';
import {closeSync,openSync,realpathSync,writeFileSync} from 'node:fs';
import {basename,dirname,join,resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const [source,destination,...rest]=process.argv.slice(2);
const root=fileURLToPath(new URL('../',import.meta.url));
if(!source||!destination||rest.length){
 console.error('Cách dùng: node scripts/export-sqlite-to-supabase.mjs <tệp SQLite> <tệp SQL mới ngoài thư mục dự án>');
 process.exit(1);
}

const destinationPath=join(realpathSync(dirname(resolve(destination))),basename(destination));
if(destinationPath.startsWith(realpathSync(root)+sep)){
 console.error('Hãy chọn tệp đích ngoài thư mục dự án.');
 process.exit(1);
}

const columns=['id','code','customer','phone','product','clinic','quantity','positions','start','end','status','notes','updated_at'];
const quotedColumns=columns.map(column=>'"'+column+'"').join(',');
const literal=value=>{
 if(typeof value==='number'&&Number.isSafeInteger(value))return String(value);
 if(typeof value!=='string'||value.includes('\0'))throw new Error('Giá trị không được PostgreSQL hỗ trợ.');
 return "convert_from(decode('"+Buffer.from(value,'utf8').toString('hex')+"','hex'),'UTF8')";
};

const database=new DatabaseSync(resolve(source),{readOnly:true});
let count=0;
try{
 const statements=['begin;'];
 for(const row of database.prepare('SELECT '+quotedColumns+' FROM warranties ORDER BY id').iterate()){
  const values=columns.map(column=>literal(row[column]));
  // PostgreSQL's date and timestamptz columns need explicit casts from text.
  values[8]+='::date';
  values[9]+='::date';
  values[12]+='::timestamptz';
  statements.push('insert into public.warranties ('+quotedColumns+') values ('+values.join(',')+');');
  count++;
 }
 statements.push('commit;');
 const output=openSync(destinationPath,'wx',0o600);
 try{writeFileSync(output,statements.join('\n')+'\n');}finally{closeSync(output);}
}finally{database.close();}

console.log('Đã xuất '+count+' thẻ. Tệp SQL chứa dữ liệu riêng tư.');
