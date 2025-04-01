import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiSlice } from "@/app/redux/slices/apiSlice";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('Missing Google OAuth credentials');
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          // Use the existing login API endpoint
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();
          
          if (response.ok && data.signature) {
            // Return the user object with token
            return {
              id: data._id || "user-id",
              email: credentials.email,
              token: data.signature,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Add auth token to the token right after signin
      if (account && user) {
        if (account.provider === "google") {
          try {
            // Call your backend to create/authenticate the Google user
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/google-auth`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: token.email,
                name: token.name,
                googleId: token.sub,
                picture: token.picture,
              }),
            });
            
            const data = await response.json();
            
            if (response.ok && data.signature) {
              token.jwt = data.signature;
              token.userId = data._id || user.id;
            }
          } catch (error) {
            console.error("Error during Google authentication:", error);
          }
        } else {
          token.jwt = user.token;
          token.userId = user.id;
        }
      }
      return token;
    },
    
    async session({ session, token }) {
      // Add token to session so it's available on the client
      session.jwt = token.jwt;
      session.userId = token.userId;
      return session;
    },
  },
  pages: {
    signIn: '/auth', // Custom signin page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };