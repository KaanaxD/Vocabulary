# Vocabulary - Agent Guide

Single-package backend (Express 5 + TypeScript + PostgreSQL) at `backend/`. Frontend at `frontend/` is empty.

## Commands (run from `backend/`)

| Action | Command |
|---|---|
| Dev server (auto-restart) | `npm run dev` |
| Build | `npx tsc` |
| Start production | `npm start` |
| Test | `npm test` (`vitest run`) |

No linter, formatter, or typecheck scripts exist.

## Architecture

Layered (unidirectional): `routes -> controllers -> services -> repository -> PostgreSQL`

Each layer is a **factory function** exported as `export default function name() { return { ... } }`. No DI container -- dependencies instantiated inline.

**Only auth is implemented** (`POST /api/auth/register`, `POST /api/auth/login`). The `vocab` table exists in the schema but has zero code.

Global ambient types in `backend/global.d.ts` (`User`, `ResBody`, `Err`). Module pattern: ends with `export = {}`.

## Quirks & Gotchas

- **bcrypt.compare() result silently discarded** in `auth.service.ts` -- any password passes login.
- **Error handler middleware not wired** -- uncaught errors crash the server instead of returning JSON.
- **express-rate-limit installed but unused.**
- **Zod schemas inside controllers** (not separate middleware).
- Tests: `vitest run` from `backend/`. Uses `supertest` with mocked `pg`/`bcrypt`/`jsonwebtoken`.
- **Error messages in Indonesian** ("username minimal 3 karakter", etc.).
- **JWT tokens never expire** (no `expiresIn`).
- **No auth middleware** -- no protected routes.
- DB: PostgreSQL via `pg` Pool with `DB_URL` env var. Schema in `migration/INIT.sql`.
- `.env` at `backend/` is gitignored. Template: `PORT=3000`, `DB_URL=...`, `JWT_SECRET=...`.
- TypeScript strict mode with `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes`.
