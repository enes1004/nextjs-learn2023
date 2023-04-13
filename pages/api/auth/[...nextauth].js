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
         return profile;
       },
       idToken:false,
       checks:["state"],
       clientId: process.env.NEXT_PUBLIC_CLIENT_ID ?? '',
       clientSecret: process.env.LARAVEL_PASSPORT_OAUTH_SECRET ?? '',
    }
];

var callbacks = {
  async jwt({ token, user, account, profile, isNewUser,trigger,session }) {
     if (account) {
       token.account = {
         ...account,
       };
       token.token=account.access_token  // <-- add token to JWT (Next's) object
     }
     if(profile){
       token.profile ={...profile};
     }
     if(trigger==="update"){
      if(!token.userSet){token.userSet={};}
      token.userSet={...token.userSet,...session};
     }
     return token;
   },
   async session({ session, token }) {
     const {user,...other}=session;
     return { ...other,userSet:{...token.userSet},user:{...user,...token.profile},token:token.token};
   },
   async redirect({ url, baseUrl }) {
     // Allows relative callback URLs
     if (url.startsWith("/post")) return `${baseUrl}${url}`
     // Allows callback URLs on the same origin
     else if (new URL(url).origin === baseUrl) return url
     return baseUrl
   }
}

callbacks.signIn = async function signIn({ user, account, profile, email, credentials }) {

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
// authOptions.secret=process.env.NEXTAUTH_SECRET;

export default NextAuth(authOptions)
