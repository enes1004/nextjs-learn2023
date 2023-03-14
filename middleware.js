// export { default } from 'next-auth/middleware';

import { withAuth } from 'next-auth/middleware';
export default withAuth({
  // secret,
  callbacks: {
    authorized: ({ req,token }) => {if(token)return true; },
  },
})

export const config = {
  matcher: '/posts/:path*',
};
