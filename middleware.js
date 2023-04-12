// export { default } from 'next-auth/middleware';

import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from "next/server"
import { middlewareMap } from './auth/enabled';

export default withAuth(
  // secret,
  async function middleware(req,res ) {
    const url=req.nextUrl.pathname;
    const token=req.nextauth.token;
    const auth_action=await middlewareMap.map(async(action)=>await action({token,url,res,req})).find(i=>i) || false;
    // if action exists, return it
    if(auth_action) return auth_action;
    return NextResponse.next()
  },
{
  callbacks: {
    async authorized({ token,req,res }){
      if(token) return true;
    },
  },
})

export const config = {
  matcher: [
    '/post/:path*',
  ]
};
