# Waterlily - Full Stack TypeScript Application

Welcome to Waterlily, a full-stack TypeScript application with a React frontend and Express backend. This README provides instructions on how to set up and run the project.

## Video Tutorial

[video link demo](https://drive.google.com/file/d/1vsQhpKIBck89AB4_h53wNkSof2jbKC4N/view?usp=sharing)

## Project Overview

### File explanation:
[document file](https://docs.google.com/document/d/1JIcYPhea5BCvIOZ_l0vcjnICJj36AcKYIjHv5BbMYWE/edit?usp=sharing)

Waterlily is a multi-step form application with user authentication (signup/login). It uses:

- **Frontend**: React, TypeScript, Vite, React Router
- **Backend**: Express.js, TypeScript, JWT authentication, Drizzle ORM

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

## Installation

### Clone the Repository

```bash
git clone <your-repository-url>
cd waterlily
```

### Backend Setup

1. Navigate to the backend directory:

```bash
cd back-end
```

2. Install dependencies:

```bash
npm install
```

3. Install additional required packages for Drizzle ORM:

```bash
npm install bcrypt
npm install -D @types/bcrypt drizzle-kit
```

4. Set up your environment variables:

```bash
cp .env.example .env
```

Edit the `.env` file with your database credentials:

```
jwt_secret="YOUR_SECRET_KEY"
port=3000
expires_in="7d"
databasePassword="YOUR_DB_PASSWORD"
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_NAME=waterlily
```

5. Create the database schema with Drizzle:

```bash
mkdir -p src/db
```

Create the schema file:

```bash
touch src/db/schema.ts
touch src/db/index.ts
touch src/db/migrate.ts
touch drizzle.config.ts
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd ../my-react-app
```

2. Install dependencies:

```bash
npm install
```

## Setting Up Drizzle ORM

1. Create the schema file:

```typescript
// src/db/schema.ts
import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),
  userId: serial('user_id').references(() => users.id),
  name: text('name'),
  email: varchar('email', { length: 255 }),
  age: serial('age'),
  createdAt: timestamp('created_at').defaultNow()
});
```

2. Create the database connection file:

```typescript
// src/db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'postgres',
  password: process.env.databasePassword,
  database: process.env.DB_NAME || 'waterlily'
});

export const db = drizzle(pool);
```

3. Create the Drizzle config file:

```typescript
// drizzle.config.ts
import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.databasePassword,
    database: process.env.DB_NAME || 'waterlily',
  },
} satisfies Config;
```

4. Create the migration file:

```typescript
// src/db/migrate.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.databasePassword,
    database: process.env.DB_NAME || 'waterlily'
  });

  const db = drizzle(pool);

  console.log('Running migrations...');
  
  await migrate(db, { migrationsFolder: 'drizzle' });
  
  console.log('Migrations completed!');
  
  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed');
  console.error(err);
  process.exit(1);
});
```

5. Add scripts to package.json:

```json
"scripts": {
  "generate": "drizzle-kit generate:pg",
  "migrate": "ts-node --esm src/db/migrate.ts"
}
```

## Running the Application

### Generate and Run Migrations

```bash
cd back-end
npm run generate
npm run migrate
```

### Start the Backend

```bash
cd back-end
npm run dev
```

The backend will run on http://localhost:3000.

### Start the Frontend

```bash
cd my-react-app
npm run dev
```

The frontend will run on http://localhost:5173.

## Project Structure

### Backend Structure
```
back-end/
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── drizzle.config.ts     # Drizzle ORM configuration
├── src/
│   ├── index.ts          # Entry point
│   ├── db/
│   │   ├── index.ts      # Database connection
│   │   ├── schema.ts     # Database schema
│   │   └── migrate.ts    # Database migrations
│   └── Routes/
│       ├── AuthRoutes.ts # Authentication routes
│       └── FormRoutes.ts # Form submission routes
```

### Frontend Structure
```
my-react-app/
├── public/               # Static assets
├── src/
│   ├── assets/           # Images and other assets
│   ├── hooks/            # Custom React hooks
│   │   ├── AuthContext.tsx # Authentication context
│   │   └── FormContext.tsx # Form state management
│   ├── Pages/            # React components for pages
│   │   ├── Form.tsx      # Multi-step form
│   │   ├── Login.tsx     # Login page
│   │   └── SignUp.tsx    # SignUp page
│   ├── types/            # TypeScript type definitions
│   │   ├── AuthTypes.ts  # Auth-related types
│   │   └── FormTypes.ts  # Form-related types
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## API Endpoints

### Authentication
- `POST /api/signup` - Register a new user
- `POST /api/login` - Login a user
- `GET /api/me` - Get current user info

### Forms
- `POST /api/submit-form` - Submit form data

## Features

1. User authentication (signup, login, logout)
2. JWT-based authentication
3. Multi-step form with state management
4. Database integration with Drizzle ORM
5. TypeScript for type safety

## Development

For development, you can use the following npm scripts:

### Backend
```bash
npm run dev       # Start the development server
npm run generate  # Generate Drizzle migrations
npm run migrate   # Run Drizzle migrations
```

### Frontend
```bash
npm run dev       # Start the development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## Troubleshooting

If you encounter any issues, please check:

1. That your database is running and accessible
2. That your environment variables are correctly set
3. That all dependencies are installed
4. That ports 3000 (backend) and 5173 (frontend) are available
