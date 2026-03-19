# PowerFit Gym — Backend API

REST API for the PowerFit Gym promotional website. Built with Node.js, Express, Prisma ORM, PostgreSQL (Neon), and Resend for transactional email.

---

## Tech Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Runtime      | Node.js (ESM)                     |
| Framework    | Express.js                        |
| ORM          | Prisma                            |
| Database     | PostgreSQL (Neon serverless)      |
| Email        | Resend                            |
| Validation   | express-validator                 |
| Security     | Helmet, CORS                      |
| Logging      | Morgan                            |

---

## Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma       # DB models (Contact, Service, Trainer, Membership)
│   ├── seed.js             # Seed script for initial data
│   └── migrations/         # Prisma migration history
├── src/
│   ├── config/
│   │   ├── db.js           # Prisma client instance
│   │   └── env.js          # Environment variable config
│   ├── middlewares/
│   │   ├── error.middleware.js    # Global error handler
│   │   └── validate.middleware.js # express-validator error handler
│   ├── modules/
│   │   ├── contact/        # Contact form (submit, list, delete)
│   │   ├── membership/     # Membership plans
│   │   ├── service/        # Gym services
│   │   └── trainer/        # Trainers
│   ├── utils/
│   │   ├── response.js         # Standardized API response helpers
│   │   └── sendContactMail.js  # Resend email utility
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
├── .env                    # Environment variables (not committed)
└── package.json
```

---

## API Endpoints

### Health
| Method | Endpoint       | Description        |
|--------|----------------|--------------------|
| GET    | /api/health    | Server health check |

### Contact
| Method | Endpoint      | Description         |
|--------|---------------|---------------------|
| POST   | /api/contacts | Submit contact form |

**POST /api/contacts — Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "I'd like to know more about your membership plans."
}
```

**Validation rules:**
- `name` — required, non-empty string
- `email` — required, valid email format
- `message` — required, non-empty string

**On successful submission:**
1. Contact is saved to the database.
2. A notification email is sent to the gym owner via Resend.
3. A confirmation email is sent to the user.

---

## Email Service — Resend

Contact form submissions trigger two automated emails via [Resend](https://resend.com):

- **Owner notification** — sent to the gym's email with the submitter's name, email, and message.
- **User confirmation** — sent to the submitter confirming their message was received, with a 24–48 hour response time note.

---

## Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# PostgreSQL connection string (Neon or any PostgreSQL provider)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# App
NODE_ENV=development
PORT=5000

# CORS — frontend origin
CORS_ORIGIN=http://localhost:3000

# Resend
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev   # use your verified domain in production
GYM_NAME="PowerFit Gym"
```

> For local development, `RESEND_FROM_EMAIL` can stay as `onboarding@resend.dev`. For production, use a verified domain in your Resend dashboard.

---

## Setup & Installation

### Prerequisites
- Node.js v18+
- PostgreSQL database (or a [Neon](https://neon.tech) serverless instance)
- A [Resend](https://resend.com) account and API key

### Steps

```bash
# 1. Clone the repository
git clone <repo-url>
cd backend

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Copy the example above into a .env file and fill in your values

# 4. Run database migrations
npm run db:migrate

# 5. Generate Prisma client
npm run db:generate

# 6. (Optional) Seed the database with sample data
npm run db:seed

# 7. Start the development server
npm run dev
```

The API will be available at `http://localhost:5000`.

---

## Scripts

| Script            | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start server with nodemon (watch mode) |
| `npm start`       | Start server (production)            |
| `npm run db:migrate` | Run Prisma migrations             |
| `npm run db:generate` | Regenerate Prisma client         |
| `npm run db:studio`  | Open Prisma Studio (DB GUI)       |
| `npm run db:seed`    | Seed the database                 |

---

## Live API

Base URL: `https://gym-frontendproject.vercel.app`
