// export { default } from 'next-auth/middleware';

import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from "next/server"


export default withAuth(
  // secret,
  async function middleware(req ) {
    const access_token=req.nextauth?.token?.account?.access_token;
    if (req.url.includes("/posts/") && access_token){
      const content_id=req.url.match(/posts\/([0-9]+)/)[1];
      console.log(process.env.NEXT_PUBLIC_LARAVEL_API+"/api/post/auth/"+content_id);
      const data=await fetch(
        process.env.NEXT_PUBLIC_LARAVEL_API+"/api/post/auth/"+content_id,
        // 'https://api.github.com/repos/enes1004/nextjs-learn2023/issues',
        {
        method:"GET",
        headers: {
          Authorization: "Bearer "+access_token,      
          // 'Accept': 'application/json'
        },
      }
      ).then((response)=>{return response.json()});
      if(!data.fb){
        return NextResponse.rewrite(new URL('/blocked', req.url))
      }
      // const data=await authByApi(content_id,access_token);
      return NextResponse.next();
    }
    return NextResponse.next()
  },
{
  callbacks: {
    async authorized({ token,req }){
      if(token) return true;
    },
  },
})

export const config = {
  matcher: '/posts/:path*',
};
