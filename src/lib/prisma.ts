import "dotenv/config";
import { Pool } from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

// 1. Создаем пул соединений (он должен быть один)
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// 2. Описываем глобальную переменную для TS
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// 3. Инициализируем клиент с адаптером
export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

// 4. Сохраняем инстанс в глобальный объект (чтобы не дублировать подключения в dev режиме)
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;