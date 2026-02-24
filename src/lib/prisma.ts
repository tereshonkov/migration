import { PrismaClient } from "@/generated/prisma/client";

const PRISMA_KEY = Symbol.for('__prisma__');

type GlobalWithPrisma = typeof globalThis & {
  [PRISMA_KEY]?: PrismaClient;
};

const globalWithPrisma = globalThis as GlobalWithPrisma;

function getPrismaClient(): PrismaClient {
  const cached = globalWithPrisma[PRISMA_KEY];
  if (cached) {
    return cached;
  }
  
  // Используем as any, чтобы обойти проблему с типами в Prisma 7.4.1
  // Конструктор требует либо adapter, либо accelerateUrl, но при использовании
  // прямого подключения через DATABASE_URL они не нужны.
  const client = new PrismaClient({} as any);
  globalWithPrisma[PRISMA_KEY] = client;
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[prisma] PrismaClient created (singleton)');
  }
  
  return client;
}

export const prisma = getPrismaClient();
export default prisma;