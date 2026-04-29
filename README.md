# T-Mebel — фронтенд (Next.js)

Публічний сайт меблевої студії та клієнтська адмін-панель. Дані й авторизація — через окремий HTTP API (див. нижче).

## Стек

| Шар | Технології |
|-----|------------|
| Framework | **Next.js 15** (App Router), **React 19**, **TypeScript** |
| UI | **MUI 7**, Emotion, CSS Modules (частина віджетів) |
| Дані | **TanStack Query v5**, **Axios** |
| i18n | **next-intl** (локалі `uk`, `ru`, `en`) |
| Форми / UX | react-hook-form, react-hot-toast |
| Медіа / графіки | embla-carousel, recharts |
| Аналітика | **Google tag** (GA4 + Google Ads), кастомні конверсії на ключові події; **Vercel Analytics**, Speed Insights |
| Якість | ESLint (eslint-config-next), **Vitest**, Testing Library, **Husky** (pre-commit) |

У `package.json` також є `mongodb`, `bcrypt` / `bcryptjs` — за потреби для скриптів або майбутнього серверного коду; основний застосунок — клієнт до зовнішнього API.

## Структура `src/`

Орієнтація на **Feature-Sliced Design** (логічний поділ, не офіційний FSD-тулінг):

- **`app/`** — маршрути Next (`[locale]/…` для локалізованих сторінок, окремо `signin`, дублікати без префікса локалі для типового `uk` за правилами `localePrefix: 'as-needed'`).
- **`entities/`** — доменні сутності (product, reviews, admin API hooks, services).
- **`features/`** — сценарії (наприклад `auth`: вхід, refresh, вихід).
- **`widgets/`** — великі блоки UI (шапка, адмін-оболонка, форми, галереї).
- **`shared/`** — багаторазовий UI, `api/base` (axios), React Query provider.
- **`views/`** — композиція сторінок з віджетів.
- **`i18n/`**, **`messages/`** — маршрутизація локалей і JSON-повідомлення (джерело типів для `uk.json` у `next.config.ts`).
- **`context/`** — React context (наприклад таби адмінки).
- **`middleware.ts`** — i18n + legacy-редиректи (`/product/:id` → `/service/:id`, `/blog` → головна).
- **`test/`** — спільний setup і обгортки для тестів.

Аліас імпортів: `@/*` → `src/*` (див. `tsconfig.json`).

## Особливості

- **Адмінка / аналітика:** у розділі «Аналітика» — дашборд з даними про відвідування, кліки по дзвінках, маршрути сторінок тощо (з бекенду). На публічному сайті підключено **Google tag** (`gtag.js`: GA4 і Google Ads). Для важливих для бізнесу дій налаштовані **кастомні конверсії**: події до Google та реєстрація на бекенді (контактні форми, попапи тощо).
- **Локалізація:** `defaultLocale: 'uk'`, префікс у URL лише коли не типова локаль; `localeDetection: false`.
- **SEO:** `metadata` і JSON-LD у кореневому `layout`, `sitemap.ts`.
- **API:** базовий URL задається в `src/shared/api/base.ts` (зараз прод-інстанс на Render). Для іншого середовища змініть `baseURL` або винесіть у `NEXT_PUBLIC_*` під час рефакторингу.
- **Auth:** JWT у `localStorage`, refresh через `withCredentials` на `/auth/refresh`; захист сторінок адмінки — на клієнті, реальна безпека — на бекенді.
- **Збірка:** у `next.config.ts` увімкнено експериментальний `optimizeCss`, ESLint під час build вимкнено (`ignoreDuringBuilds`); зображення з `storage.googleapis.com`.
- **Pre-commit:** `lint` → `npm audit fix` → `npm audit` → `vitest run` (скрипт `precommit` + Husky).

## Скрипти

```bash
npm run dev          # next dev --turbopack
npm run build
npm run start
npm run lint
npm test             # vitest run
npm run test:watch
npm run test:coverage
```

## Вимоги

- Node.js, сумісний із Next 15 (рекомендовано актуальний LTS)
- npm (або сумісний клієнт)

## Локальний запуск

```bash
npm install
npm run dev
```

Відкрийте [http://localhost:3000](http://localhost:3000). Для повного функціоналу (форми, адмінка) має бути доступний бекенд з тим самим контрактом, що й у вказаного `baseURL`.
