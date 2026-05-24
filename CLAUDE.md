# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Earthworm is a self-hosted English learning app where users learn by constructing sentences from conjunctions. Originally built for Chinese speakers, this fork is being adapted for Vietnamese learners. The app shows a native-language translation and the user types the English equivalent.

**Stack**: NestJS backend, Nuxt 3 (Vue) frontend, PostgreSQL + Redis, Drizzle ORM, pnpm monorepo.

## Commands

### Setup (first time)

```bash
cp apps/api/.env.example apps/api/.env
cp apps/client/.env.example apps/client/.env
unzip logto_db_init_data.zip -d .volumes/
pnpm install
pnpm docker:start        # starts Postgres, Redis, Logto via docker-compose
pnpm db:init             # initialize database schema (requires schema:build first)
pnpm db:upload           # seed course data (first time only)
```

### Development

```bash
pnpm dev:serve           # backend (NestJS watch mode) on :3001
pnpm dev:client          # frontend (Nuxt dev) on :3000
pnpm docs:dev            # VitePress docs site
```

### Testing

```bash
# All tests
pnpm test

# Backend only (from apps/api/)
pnpm test:unit           # Jest unit tests (needs .env.test + docker testdb/testRedis running)
pnpm test:e2e            # Jest e2e tests

# Frontend only (from apps/client/)
pnpm test:unit:run       # Vitest single run
pnpm test:unit:watch     # Vitest watch mode
pnpm test:e2e:run        # Cypress e2e

# Single backend test file
cd apps/api && npx jest --config jest.config.ts -- src/path/to/test.spec.ts
```

### Build

```bash
pnpm build:server        # NestJS production build
pnpm build:client        # Nuxt static generate
pnpm schema:build        # build @earthworm/schema package (required before API work)
```

### Docker

```bash
pnpm docker:start / docker:stop / docker:delete / docker:down
```

## Architecture

### Monorepo Structure (pnpm workspaces)

- **`apps/api`** — NestJS backend. Modules: `course`, `course-pack`, `course-history`, `user`, `user-course-progress`, `user-learning-activity`, `mastered-element`, `membership`, `rank`, `logto` (auth), `cron-job`.
- **`apps/client`** — Nuxt 3 frontend. Pages in `pages/`, composables in `composables/`, Pinia stores in `store/`. Uses DaisyUI + Tailwind CSS for styling.
- **`packages/schema`** — Drizzle ORM table definitions shared across all packages. Built via `tsup` to `dist/`. Must be rebuilt (`pnpm schema:build`) when schema changes.
- **`packages/db`** — Database connection setup and migration utilities.
- **`packages/xingrong-courses`** — Course JSON data and seeding scripts. `data/courses/01.json`..`20.json` contain the learning content.
- **`packages/game-data-sdk`** — SDK for game-related data operations.

### Key Data Flow

```
Course Pack → Courses → Statements
```

Each **course pack** contains multiple **courses** (ordered). Each course contains ordered **statements** with three fields: `chinese`, `english`, `soundmark`. The game shows `chinese` and the user types `english`.

### Authentication

Uses [Logto](https://logto.io/) as an external auth provider (runs in Docker). Frontend uses `@logto/vue`. Backend validates JWTs from Logto.

### Frontend Guidelines

1. **Do not destructure Pinia stores** — use `store.propertyName` directly to preserve reactivity.
2. **Avoid UI logic in composables** — no `toast.info()`, no router calls. Keep composables pure for testability.

## Localization to Vietnamese — Key Areas to Change

### 1. Statement schema (`packages/schema/src/schema/statement.ts`)

The `chinese` column stores the native-language translation. For Vietnamese support, this column will hold Vietnamese text. Consider renaming or adding a `vietnamese` column alongside `chinese` for backwards compatibility during migration.

### 2. Course data JSON (`packages/xingrong-courses/data/courses/*.json`)

Each entry has `"chinese": "..."`. All ~20 course files need Vietnamese translations replacing or supplementing the Chinese ones.

### 3. Seed script (`packages/xingrong-courses/src/seed.ts`)

`convertToChineseNumber()` generates course titles like "第一课". This needs a Vietnamese equivalent (e.g., "Bài 1"). The course pack title and description are also hardcoded in Chinese.

### 4. PDF parser (`packages/xingrong-courses/src/parsePDF/parser.ts`)

Has `isChinese()`, `parseChinese()` functions and `STARTSIGN = "中文 英文 K.K.音标"`. This is for importing course content from PDFs and will need adaptation for Vietnamese source materials.

### 5. Frontend UI text

Some components have hardcoded Chinese text (e.g., `apps/client/components/Landing/PayCard.vue` with pricing labels). The project has no i18n framework — consider adding `@nuxtjs/i18n` or a lightweight alternative.

## Dependencies

- Node.js >= 20.12.2
- pnpm >= 8 (use `corepack enable`)
- Docker (for Postgres 14, Redis 5, Logto)
- Port 3000 (frontend), 3001 (API), 5433 (Postgres), 6379 (Redis), 3010/3011 (Logto)
