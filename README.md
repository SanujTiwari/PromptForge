# PromptForge

> AI Prompt Marketplace — Discover, buy, sell, and share high-quality AI prompts.

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

## Modules

- [x] Module 1: Project Setup
- [ ] Module 2: Database
- [ ] Module 3: Authentication
- [ ] Module 4+: See development roadmap

## License

MIT
