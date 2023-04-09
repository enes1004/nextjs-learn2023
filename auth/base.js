
/**
 * Assert is base url matched, if matched, return id
 * @param {Object<url,urlRegex>}
 * @return {bool|integer<id>}
 */
export function idExtract({url,urlRegex}){
    const match=url.match(urlRegex);
    if (match){
        return match[1];
    }
    return false;
}
/**
 * @param {Object<auth_uri,access_token,extra_post?>}
 * @return {bool}
 */
export async function postToAuthApi({auth_uri,token,auth_post={}}){
    console.log("called for",auth_uri);
    const access_token=token?.account?.access_token;
    if(!access_token) return false;
    if(!auth_post?.headers){auth_post.headers={};}
    auth_post.headers.Authorization="Bearer "+access_token;
    auth_post.headers.Accept="application/json";
    const data=await fetch(
        process.env.NEXT_PUBLIC_LARAVEL_API+auth_uri,
        auth_post
      ).then((response)=>{return response.json()});
      return !!data.fb
}

export async function writeCache({url,fb,token}){
    // var session=await getServerSession(res,req);
    if(!token.cached_auth){token.cached_auth={};}
    if(fb===null){
        unset(token.cached_auth[url]);
    }else{
        token.cached_auth[url]=typeof fb === "object"?fb:{fb};
    }
}

export async function readCache({url,token}){
    // var session=await getServerSession(res,req);
    // return session?.cached_auth?.[url];
    return token?.cached_auth?.[url];
}