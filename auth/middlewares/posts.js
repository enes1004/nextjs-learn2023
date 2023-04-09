import { NextResponse } from "next/server";
import { postToAuthApi,idExtract, writeCache, readCache } from "../base";

export async function postsMiddleware({url,token,req}){
    // const cache=await readCache({url,res,req});
    const cache=await readCache({url,token});
    if(cache){
        var fb=cache;
    }else{
        const auth_uri_base="/api/post/auth/";
        const urlRegex = /\/posts\/([0-9]+)/;
        const content_id = idExtract({
            url,
            urlRegex
        });
        const auth_uri = auth_uri_base + content_id;
        if(!content_id)return false;
        const params={
            auth_uri,
            token
        };

        var fb=await postToAuthApi(params);
    }   

    if(!fb){
       return NextResponse.rewrite(new URL('/blocked', req.url))
    }
    else if(!cache){
        // writeCache({url,fb,res,req});
        writeCache({url,fb,token});
    }
}