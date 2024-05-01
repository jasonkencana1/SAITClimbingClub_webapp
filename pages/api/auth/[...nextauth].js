import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
 
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const prisma = new PrismaClient();
        try {
          const user = await prisma.user.findUnique({
            where: { username: credentials.username },
          });
   
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin
            };
          } else {
            throw new Error('Invalid credentials');
          }
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // `sub` is a standard JWT claim representing the user ID
      session.user.isAdmin = token.isAdmin;
 
      return session;
    },
  },  
});