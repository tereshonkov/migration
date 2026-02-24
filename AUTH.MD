# NextAuth аутентификация в Next.js проекте

Пошаговое руководство по настройке аутентификации с использованием NextAuth, Prisma и базы данных PostgreSQL.

## 📁 Структура проекта

```
migration/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/route.ts  # API роут NextAuth
│   │   └── login/                           # Страница входа
│   ├── lib/
│   │   ├── auth.ts                          # Конфигурация NextAuth
│   │   └── prisma.ts                        # Синглтон PrismaClient
│   ├── types/
│   │   └── next-auth.d.ts                   # Расширение типов NextAuth
│   └── generated/prisma/                    # Сгенерированный Prisma Client
├── prisma/
│   └── schema.prisma                        # Схема базы данных
└── .env                                     # Переменные окружения
```

## 📦 Шаг 1: Установка зависимостей

```bash
# Основные зависимости NextAuth
npm install next-auth@beta @auth/prisma-adapter bcryptjs
npm install -D @types/bcryptjs

# Prisma (если не установлен)
npm install -D prisma
npm install @prisma/client
```

## 🔧 Шаг 2: Настройка базы данных

### 1. Генерация Prisma Client
```bash
npx prisma generate
```

### 2. Миграция базы данных (если нужно)
```bash
npx prisma db push
# или
npx prisma migrate dev --name init
```

### 3. Убедитесь, что модель User существует в `prisma/schema.prisma`:
```prisma
model User {
  id         String    @id @default(cuid())
  name       String
  email      String    @unique
  password   String
  role       Role      @default(USER)
  accounts   Account[]
  sessions   Session[]
  created_at DateTime  @default(now())
  updated_at DateTime  @updatedAt

  @@map("user")
}

enum Role {
  USER
  ADMIN
}
```

## 🔐 Шаг 3: Настройка переменных окружения

В файле `.env` добавьте:

```env
# БД PostgreSQL (уже должно быть)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Обязательно для NextAuth
NEXTAUTH_SECRET="ваш-секретный-ключ-минимум-32-символа"
NEXTAUTH_URL="http://localhost:3000"

# Генерация секрета:
# openssl rand -base64 32
```

**Важно:** `NEXTAUTH_SECRET` обязателен для production. В development NextAuth покажет предупреждение, если его нет.

## 🛠️ Шаг 4: Создание файлов конфигурации

### 1. **Синглтон PrismaClient** (`src/lib/prisma.ts`)

Создайте файл для глобального экземпляра PrismaClient (чтобы избежать множественных подключений):

```typescript
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
  
  // Используем as any для обхода проблем с типами в Prisma 7.4.1
  const client = new PrismaClient({} as any);
  globalWithPrisma[PRISMA_KEY] = client;
  
  if (process.env.NODE_ENV === 'development') {
    console.log('[prisma] PrismaClient created (singleton)');
  }
  
  return client;
}

export const prisma = getPrismaClient();
export default prisma;
```

### 2. **Конфигурация NextAuth** (`src/lib/auth.ts`)

```typescript
/// <reference path="../types/next-auth.d.ts" />

import { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import * as bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma) as any,
    session: { strategy: "jwt" },
    pages: {
        signIn: "/login", // Укажите путь к вашей странице входа
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
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
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role; // Роль теперь типизирована
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
    },
};
```

### 3. **Расширение типов NextAuth** (`src/types/next-auth.d.ts`)

```typescript
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string; // Используйте конкретный тип, если есть (например, Role из Prisma)
  }
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}
```

### 4. **API роут NextAuth** (`src/app/api/auth/[...nextauth]/route.ts`)

```typescript
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

## 🖥️ Шаг 5: Создание страницы входа

Создайте страницу входа по пути, указанному в `signIn` (например, `/login`):

### `src/app/login/page.tsx`

```tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard"); // Перенаправление после успешного входа
      }
    } catch (err) {
      setError("Произошла ошибка при входе");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h1>Вход в систему</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
```

## 🔍 Шаг 6: Использование сессии в компонентах

### Клиентские компоненты:

```tsx
"use client";

import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Загрузка...</div>;
  if (!session) return <div>Не авторизован</div>;

  return (
    <div>
      <p>Email: {session.user?.email}</p>
      <p>Роль: {session.user?.role}</p>
      <p>ID: {session.user?.id}</p>
    </div>
  );
}
```

### Серверные компоненты:

```tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }
  
  if (session.user?.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return <div>Добро пожаловать, администратор!</div>;
}
```

## 🧪 Шаг 7: Тестирование аутентификации

### 1. Запустите dev-сервер:
```bash
npm run dev
```

### 2. Проверьте доступность эндпоинтов:
- `http://localhost:3000/api/auth/signin` — страница входа NextAuth
- `http://localhost:3000/api/auth/session` — текущая сессия (JSON)
- `http://localhost:3000/api/auth/signout` — выход

### 3. Создайте тестового пользователя:
```bash
# Через Prisma Studio
npx prisma studio

# Или скриптом
npx ts-node -e "
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'USER'
    }
  });
  console.log('User created');
}

main();
"
```

### 4. Проверьте вход:
- Перейдите на `http://localhost:3000/login`
- Введите email и пароль тестового пользователя
- Должно произойти перенаправление

## 🚨 Распространённые проблемы и решения

### 1. **Ошибка: "PrismaClient is not connected"**
**Решение:** Убедитесь, что `DATABASE_URL` в `.env` корректен и база данных доступна.

### 2. **Ошибка: "NEXTAUTH_SECRET is missing"**
**Решение:** Добавьте в `.env` переменную `NEXTAUTH_SECRET` (минимум 32 символа).

### 3. **Ошибка типов: "Cannot find module '@/generated/prisma/client'"**
**Решение:**
```bash
# Перегенерируйте Prisma Client
rm -rf src/generated
npx prisma generate

# И перезапустите TypeScript сервер в IDE
```

### 4. **Пароль не проверяется (bcrypt.compare возвращает false)**
**Решение:** Убедитесь, что пароли хешируются одинаковым способом. Используйте `bcryptjs` версии 2.4.3+.

### 5. **Сессия не сохраняется между запросами**
**Решение:** Убедитесь, что `NEXTAUTH_URL` указан правильно и совпадает с доменом приложения.

### 6. **Ошибка: "adapter is not a function"**
**Решение:** Убедитесь, что установлен `@auth/prisma-adapter` и импортирован правильно.

### 7. **Ошибка типов адаптера в NextAuth v5**
**Симптом:** TypeScript ошибка `Type 'AdapterUser' is not assignable to type 'Awaitable<AdapterUser>'` или `Property 'role' is missing`.
**Решение:** В файле `src/lib/auth.ts` добавьте `as any` к адаптеру и импортируйте `NextAuthConfig`:
```typescript
import { NextAuthConfig } from "next-auth";
// ...
export const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(prisma) as any,
    // остальная конфигурация
};
```

### 8. **Ошибка: "Cannot find module '@/lib/auth'" или '@/generated/prisma/client'**
**Решение:**
1. Убедитесь, что в `tsconfig.json` есть настройки:
```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```
2. Перезапустите TypeScript сервер (в VSCode: `Cmd+Shift+P` → "TypeScript: Restart TS Server")
3. Если не помогает, временно используйте относительные пути, затем верните алиасы после перезапуска.

## 📚 Полезные ссылки

- [NextAuth Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [@auth/prisma-adapter](https://authjs.dev/reference/adapter/prisma)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)

## 🔄 Дополнительные настройки

### Добавление Google OAuth:
```typescript
import GoogleProvider from "next-auth/providers/google";

providers: [
  CredentialsProvider({ ... }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
]
```

### Кастомизация JWT токена:
```typescript
callbacks: {
  async jwt({ token, user, account }) {
    // Добавление дополнительных полей в токен
    if (account?.provider === "google") {
      token.provider = "google";
    }
    return token;
  },
}
```

### Защита маршрутов через middleware:
Создайте `src/middleware.ts`:
```typescript
export { auth as middleware } from "@/lib/auth";
```

## ✅ Чеклист завершения

- [ ] Установлены все зависимости
- [ ] Настроены переменные окружения
- [ ] Созданы все конфигурационные файлы
- [ ] Существует модель User в Prisma
- [ ] Создана страница входа
- [ ] Запущен dev-сервер
- [ ] Протестирован вход/выход
- [ ] Проверена работа сессии в компонентах

---

**Примечание:** Это руководство основано на NextAuth v5 (beta). Для стабильной версии v4 могут быть небольшие отличия в API.

**Автоматически сгенерировано OpenClaw** | Последнее обновление: 2026-02-24