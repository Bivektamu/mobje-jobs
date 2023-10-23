import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../datalayer/schema/User';
import bcrypt from 'bcryptjs';
import { connectDB } from '../../../datalayer/connectDB';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'mobje-jobs',

      async authorize(credentials) {
        try {
          const connected = await connectDB();
          if (!connected) {
            throw new Error('Failed to connect to the database');
          }

          const { email, password } = credentials;
          const user = await User.findOne({ email });

          if (!user) {
            throw new Error('User not found');
          }

          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            // Remove the password from the user object
            const { password, ...userData } = user.toObject();
            return userData;
          } else {
            throw new Error('Password is incorrect');
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
