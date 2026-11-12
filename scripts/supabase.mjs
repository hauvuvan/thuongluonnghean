export function createSupabase({url,secretKey,publishableKey,fetchRequest=fetch}){
 const origin=new URL(url);
 if(origin.protocol!=='https:' || origin.username || origin.password || origin.pathname!=='/' || origin.search || origin.hash){
  throw new Error('Invalid Supabase URL');
 }

 function send(path,{key=secretKey,method='GET',body,headers={}}={}){
  const authorization=key.startsWith('eyJ')?key:null;
  return fetchRequest(new URL(path,origin),{
   method,
   headers:{apikey:key,...(authorization?{authorization:'Bearer '+authorization}:{}),...(body?{'content-type':'application/json'}:{}),...headers},
   body:body?JSON.stringify(body):undefined,
   signal:AbortSignal.timeout(8000),
   redirect:'error'
  });
 }

 async function data(path,options){
  const response=await send(path,options);
  if(!response.ok){
   const failure=await response.json().catch(()=>({}));
   if(failure.code==='23505')throw new Error('UNIQUE');
   throw new Error('Supabase data request failed');
  }
  const result=await response.text();
  return result?JSON.parse(result):null;
 }

 const warranties={
  lookup(code,phone){
   return data('/rest/v1/rpc/lookup_warranties',{method:'POST',body:{lookup_code:code,lookup_phone:phone}});
  },
  list(){
   return data('/rest/v1/warranties?select=*&order=updated_at.desc,id.asc&limit=1000');
  },
  insert(record){
   return data('/rest/v1/warranties',{method:'POST',body:record,headers:{prefer:'return=minimal'}});
  },
  async update(id,record){
   // PostgREST's quoted single-value list also handles IDs imported from SQLite.
   const params=new URLSearchParams({id:'in.('+JSON.stringify(id)+')',select:'id'});
   const rows=await data('/rest/v1/warranties?'+params,{
    method:'PATCH',body:record,headers:{prefer:'return=representation'}
   });
   return rows.length>0;
  }
 };

 return {
  warranties,
  login(email,password){
   return send('/auth/v1/token?grant_type=password',{key:publishableKey,method:'POST',body:{email,password}});
  },
  async createSession(tokenHash,adminId,expiresAt){
   const sessions='/rest/v1/warranty_admin_sessions';
   await data(sessions+'?'+new URLSearchParams({expires_at:'lte.'+new Date().toISOString()}),{method:'DELETE'});
   await data(sessions,{method:'POST',body:{token_hash:tokenHash,admin_id:adminId,expires_at:expiresAt}});
  },
  async hasSession(tokenHash,adminId){
   const params=new URLSearchParams({
    select:'token_hash',token_hash:'eq.'+tokenHash,admin_id:'eq.'+adminId,
    expires_at:'gt.'+new Date().toISOString(),limit:'1'
   });
   return (await data('/rest/v1/warranty_admin_sessions?'+params)).length===1;
  },
  revokeSession(tokenHash){
   return data('/rest/v1/warranty_admin_sessions?token_hash=eq.'+tokenHash,{method:'DELETE'});
  }
 };
}
