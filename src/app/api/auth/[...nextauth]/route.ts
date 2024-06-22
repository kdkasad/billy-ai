import prisma from "@/lib/prisma";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    adapter: PrismaAdapter(prisma)
})

export { handler as GET, handler as POST };
