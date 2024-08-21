import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      GithubProvider({
        clientId: process.env.GIT_CLIENT_ID as string,
        clientSecret: process.env.GIT_CLIENT_SECRET as string,
      }),
    ],
  
    callbacks: {
      async session({ session, user, token }) {
        console.log("Session",{session,user,token})
        return session
      },
      async signIn({ user, account, profile, email, credentials }) {
        const isAllowedToSignIn = true;
        if (isAllowedToSignIn) {
        
          return true;
        } else {
          // Return false to display a default error message
          return false;
          // Or you can return a URL to redirect to:
          // return '/unauthorized'
        }
      },
    },
  };