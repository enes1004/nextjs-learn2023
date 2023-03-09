export function useContentGroupAuth(content_content_group_id,user){
  // if not id, can be seen by everyone;
  if(!content_content_group_id){return true;}
  return user?.can_see_content_group_ids.indexOf(parseInt(content_content_group_id))>-1
}

export function useContentAuthorAuth(content_user_id,user){
  return user?.id==content_user_id;
}
