import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../datalayer/schema/User'
import bcrypt from 'bcryptjs'
import { connectDB } from "../../../datalayer/connectDB";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "mobje-jobs",
     
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: { label: "Password", type: "password" },
      // },

      async authorize(credentials, req) {

        const {email, password} = credentials

        await connectDB()
       const user = await User.findOne({email})
       if(!user) {
        return null
       }

       const isMatch = await bcrypt.compare(password, user.password)
       if(isMatch) {
        const doc = user._doc
        delete doc.password

        return doc
       }
       else {
        return null
       }

        
      },
    }),
  ],
      // secret:process.env.JWT_SECRET,
    //   pages: {
    //     signIn:'/login'
    //   },
      callbacks: {
        async jwt({token, user, account}) {

      
          if(user) {
            token.id = user._id

          }
          return token;
        
        },
    
        async session({session, token}) {
          // session.user.accessToken = token.accessToken;
          console.log('$$$$$$$$$$$$$$$');
          session.user.id = token.id
          return session;
          
        },
       
      },
      

  
};
export default NextAuth(authOptions);
