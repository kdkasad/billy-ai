import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'database'
    },
    callbacks: {
        async session({ session, user }) {
            if (!user) {
                throw new Error('No user');
            }
            if (session.user) {
                session.user.id = user.id;
            }
            return session;
        }
    }
};
