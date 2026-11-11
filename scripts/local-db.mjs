import { DatabaseSync } from 'node:sqlite';
import {readFileSync} from 'node:fs';
export function makeDB(file=':memory:') {
 const db=new DatabaseSync(file);
 db.exec('PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000;');
 if(!db.prepare("SELECT name FROM sqlite_master WHERE name='warranties'").get())db.exec(readFileSync(new URL('../drizzle/0000_warranties.sql',import.meta.url),'utf8'));
 return {sqlite:db,prepare(sql){let values=[];return {bind(...args){values=args;return this},async first(){return db.prepare(sql).get(...values)||null},async all(){return {results:db.prepare(sql).all(...values)}},async run(){const r=db.prepare(sql).run(...values);return {meta:{changes:Number(r.changes)}}}}}};
}
