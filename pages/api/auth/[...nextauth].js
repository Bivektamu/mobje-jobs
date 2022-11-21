import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "mobje-jobs",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          const payload = {
            email: credentials.email,
            password: credentials.password,
          };
          const headers = {
            "Content-Type": "application/json",
          }

          const res = await axios.post("/api/user/login", payload, headers);

          if(res) {
            console.log(res)
          }


        } catch (error) {
            console.log(error)
        }
      },
      secret:process.env.JWT_SECRET,
      pages: {
        signIn:'/login'
      },
      callbacks: {
        async jwt({ token, user, account }) {
          if (account && user) {
            return {
              ...token,
              accessToken: user.data.token,
              refreshToken: user.data.refreshToken,
            };
          }
    
          return token;
        },
    
        async session({ session, token }) {
          session.user.accessToken = token.accessToken;
          return session;
        },
      },
      

    }),
  ],
};
export default NextAuth(authOptions);
