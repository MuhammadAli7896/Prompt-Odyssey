import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import User from '@models/user';
import { connectToDB } from '@utils/database';
import crypto from "crypto";

export const generateRandomPassword = () => {
  const password = crypto.randomInt(Number.parseInt(process.env.MIN_LIMIT), Number.parseInt(process.env.MAX_LIMIT)).toString();
  return password;
}

async function login(credentials) {
  try {
    await connectToDB();
    const user = await User.findOne({ email: credentials.email });
    if (user && (await user.matchPassword(credentials.password))) {
      return user;
    } else {
      throw new Error("User does not exist");
    }
  } catch (error) {
    console.log("error: " + error);
  }
}

const handler = NextAuth({
  pages: {
    signIn: "/signin",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          console.log("Error", error);
        }
      }
    })
  ],
  callbacks: {
    async session({ session }) {
      await connectToDB();
      const sessionUser = await User.findOne({ email: session.user.email });
      if (sessionUser) {
        session.user.id = sessionUser._id.toString();
      }
      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try { 
        if (!profile) {
          delete user.password;
          return user;
        }

        await connectToDB();

        const userExists = await User.findOne({ email: profile.email });
        
        if (!userExists) {
          const userCreated = await User.create({
            email: profile.email,
            username: profile.name,
            image: profile.picture || profile.image,
            password: generateRandomPassword()
          });
        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
