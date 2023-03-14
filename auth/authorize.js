import {axios_with_token} from '../lib/axios'

export function useContentGroupAuth(content_content_group_id,user){
  // if not id, can be seen by everyone;
  if(!content_content_group_id){return true;}
  return user?.can_see_content_group_ids.indexOf(parseInt(content_content_group_id))>-1
}

export function useContentAuthorAuth(content_user_id,user){
  return user?.id==content_user_id;
}

export async function authByApi(content_id,session){
  const axios=axios_with_token(session?.data?.token)
  const res= await axios(process.env.NEXT_PUBLIC_LARAVEL_API+"/api/post/auth/"+content_id,{}).then(res=>res.data);
  const data=res;
  console.log(data);
  return data;
}
