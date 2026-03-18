# Gym Backend API

REST API for the Gym promotional website built with Node.js, Express, Prisma, and PostgreSQL.

## Tech Stack

- Node.js + Express
- Prisma ORM
- PostgreSQL
- express-validator, helmet, cors, morgan

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```
   Copy .env and update DATABASE_URL with your PostgreSQL credentials
   ```

3. **Run database migrations**
   ```bash
   npm run db:migrate
   ```

4. **Generate Prisma client**
   ```bash
   npm run db:generate
   ```

5. **Seed initial data**
   ```bash
   npm run db:seed
   ```

6. **Start development server**
   ```bash
   npm run dev
