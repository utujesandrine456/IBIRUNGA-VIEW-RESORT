# Ibirunga CMS Backend

NestJS API for managing homepage content and bookings.

## Setup

```bash
cd ibirunga-backend
npm install
npm run db:migrate
npm run db:seed
npm run start:dev
```

API runs at **http://localhost:3001/api**

## Default admin login

- Email: `admin@ibirunga.com`
- Password: `admin123`

## Frontend admin portal

**http://localhost:3000/admin**

```bash
cd ibirunga
npm run dev
```

Set `NEXT_PUBLIC_API_URL=http://localhost:3001/api` in `.env.local`.
