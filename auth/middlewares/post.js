import { NextResponse } from "next/server";
import { postToAuthApi,idExtract, writeCache, readCache } from "../base";

export async function postMiddleware({url,token,req}){
    // const cache=await readCache({url,res,req});
    const cache=await readCache({url,token});
    if(cache){
        var fb=cache;
    }else{
        console.log(url);
        const auth_uri="/api"+url+"/auth";
        const params={
            auth_uri,
            token
        };
        var fb=await postToAuthApi(params);
    }

    if(!fb){
       return NextResponse.redirect(new URL("/blocked"+url, req.url))
    }
    else if(!cache){
        // writeCache({url,fb,res,req});
        writeCache({url,fb,token});
    }
}