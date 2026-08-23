# PromptForge

> A considered marketplace for AI prompts that are designed to be used again.

## Tech Stack

| Layer      | Technology                                                     |
| ---------- | -------------------------------------------------------------- |
| Frontend   | React, TypeScript, Vite, Tailwind CSS, React Router, Zustand   |
| Backend    | Node.js, Express.js, TypeScript, Prisma ORM, Zod               |
| Database   | PostgreSQL (Neon-compatible)                                    |
| Auth       | JWT, bcrypt, role-based authorization                           |

## Project Structure

```
promptforge/
├── client/          # React + Vite frontend
├── server/          # Express.js backend
├── prisma/          # Prisma schema & migrations
├── .env.example     # Environment variable template
└── README.md
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- PostgreSQL database (or Neon)

### Installation

```bash
# Install all dependencies
npm run install:all

# Set up environment variables
cp .env.example .env
# Edit .env with your values

# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push
```

### Development

```bash
# Start backend (port 5000)
npm run dev:server

# Start frontend (port 5173)
npm run dev:client
```

### Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
{
  "success": true,
  "message": "PromptForge API is running"
}
```

## Current product slice

- Editorial marketplace home, responsive catalog, collection index, prompt detail with protected preview, and keyboard search (`Ctrl/Cmd + K`).
- Creator workspace and intentionally designed empty wishlist/cart states.
- Prisma data model for accounts, seller profiles, prompts, versions, tags, carts/orders, payments, reviews, notifications, reports, payouts, and packs.
- `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, and protected `GET /api/auth/me` routes with Zod validation and signed, expiring access tokens.

## Seeded development accounts

Run `npm run db:seed` from `server/` after applying the schema. All seeded accounts use `PromptForgeDemo!2026`.

| Role | Email |
| --- | --- |
| Admin | `admin@promptforge.local` |
| Seller | `mina@promptforge.local` |
| Seller | `owen@promptforge.local` |
| User | `rae@promptforge.local` |

## License

MIT
