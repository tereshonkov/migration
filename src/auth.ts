import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { prisma } from "./lib/prisma";
import * as bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },

            async authorize(credentials) {
                try {
                    const email = credentials?.email as string;
                    const password = credentials?.password as string;
                    
                    if (!email || !password) {
                        throw new Error("Нужен email и пароль");
                    }

                    const user = await prisma.user.findUnique({
                        where: { email },
                    });

                    if (!user || !user.password) {
                        throw new Error("Пользователь не найден");
                    }

                    const isCorrectPassword = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isCorrectPassword) {
                        throw new Error("Неверный пароль");
                    }

                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    throw error; // NextAuth обработает ошибку и покажет её пользователю
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            console.log('Redirect callback:', { url, baseUrl });

            // After sign in, redirect to dashboard
            if (url.startsWith(baseUrl)) {
                return `${baseUrl}/admin`;
            }
            // After sign out, redirect to home
            else if (url.startsWith('/')) {
                return `${baseUrl}${url}`;
            }
            return baseUrl;
        },
    },
});