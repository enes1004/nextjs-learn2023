import { withAuth } from 'next-auth/middleware';
export default withAuth({
  secret:process.env.NEXTAUTH_URL
});
