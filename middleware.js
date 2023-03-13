export { default } from 'next-auth/middleware';
// import { withAuth } from 'next-auth/middleware';
// export default withAuth({
//   callbacks: {
//     authorized: ({ token }) => {console.log(token);return !!token},
//   },
// })

export const config = { secret:process.env.NEXTAUTH_SECRET }
