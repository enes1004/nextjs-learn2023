import NextAuth from "next-auth"
// import jwt from "jsonwebtoken"



const providers = [
  {
       id: 'laravel',
       name: 'Laravel Passport',
       type: 'oauth',
       version: '2.0',
       issuer: process.env.NEXT_PUBLIC_LARAVEL_API,
       token:
       {
         url: process.env.NEXT_PUBLIC_LARAVEL_API + '/oauth/token',
         grant_type: 'authorization_code',
         // async request(context) {
           // console.log(await context);
           // const tokens = await makeTokenRequest(context)
           // return { tokens }
         // },
       },

       authorization:{
        url:process.env.NEXT_PUBLIC_LARAVEL_API + "/oauth/authorize",
        params: {
          grant_type: 'authorization_code',
          scope: '*',
        },
      },
      userinfo:process.env.NEXT_PUBLIC_LARAVEL_API + "/api/user",
       profile: (profile,tokens) => {
         console.log(profile);
         return profile;
       },
       idToken:false,
       checks:["state"],
       clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
       clientSecret: process.env.LARAVEL_PASSPORT_OAUTH_SECRET ?? '',
    }
];

const callbacks = {
  async jwt({ token, user, account, profile, isNewUser }) {
     if (account) {
       token.account = {
         ...account,
         access_token: user.access_token  // <-- add token to JWT (Next's) object
       };
     }
     if(profile){
       token.profile ={...profile};
     }
     return token;
   },
   async session({ session, token }) {
     const {user,...other}=session;
     return { ...other,user:{...user,...token.profile}};
   },
}

callbacks.signIn = async function signIn({ user, account, profile, email, credentials }) {
    console.log({ user, account, profile, email, credentials });

    if (account.provider === 'laravel') {
        return !!user;
    }

    return false;
}
//
// callbacks.jwt = async function jwt({token, user}) {
//     if (user) {
//         token = { accessToken: user.accessToken }
//     }
//
//     return token
// }
//
// callbacks.session = async function session({session, token,user}) {
//     session.accessToken = token.accessToken
//     return session
// }
// callbacks.redirect = async function redirect({ url, baseUrl,query }){
//   console.log(query);
// }
export const authOptions = {
    providers,
    callbacks
}
authOptions.secret=process.env.NEXTAUTH_SECRET;

export default NextAuth(authOptions)
