import type { NextAuthConfig } from "next-auth";

export default {
    providers: [], // Здесь пусто, чтобы не тащить сюда prisma и bcrypt
    pages: {
        signIn: '/login',
    },
} satisfies NextAuthConfig;