# NutriTrack — Deployment Guide

## Prerequisites

- Node.js 18+
- npm / yarn
- A [Supabase](https://supabase.com) account (free tier works)
- A [Railway](https://railway.app) account
- A [Vercel](https://vercel.com) account (optional, for frontend)
- A [GitHub](https://github.com) account

---

## 1. Set Up Supabase Database

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Copy your **Database URL** from:
   `Project Settings → Database → Connection string → URI`
3. In the **SQL Editor**, paste and run `backend/schema.sql`
4. Optionally run `backend/seed.sql` for sample data

---

## 2. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_REF.supabase.co:5432/postgres
JWT_SECRET=a-random-secure-string-at-least-32-chars
PORT=5000
```

---

## 3. Run Backend Locally

```bash
cd backend
npm install
npm run dev
```

The API should be running at `http://localhost:5000`.

---

## 4. Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

The app opens at `http://localhost:5173`. The Vite dev server proxies API requests to `localhost:5000`.

---

## 5. Deploy Backend to Railway

1. Push your project to a **GitHub repository**
2. Go to [railway.app](https://railway.app) → **New Project → Deploy from GitHub Repo**
3. Select your repo and configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add environment variables in the Railway dashboard:
   - `DATABASE_URL` — your Supabase connection string
   - `JWT_SECRET` — your secret key
   - `PORT` — `5000` (or let Railway assign)
5. Click **Deploy** — Railway will provide a public URL (e.g. `https://nutritrack-api.up.railway.app`)

---

## 6. Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project → Import Git Repository**
2. Select your repo and configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add environment variable:
   - `VITE_API_URL` = your Railway backend URL (e.g. `https://nutritrack-api.up.railway.app`)
4. Click **Deploy**

> **Note:** In production, update `vite.config.js` to remove the `server.proxy` block — it's only for local development. The `VITE_API_URL` env var handles production routing.

---

## 7. Verify Deployment

1. Open your Vercel URL
2. Register a new account
3. Complete your profile
4. Add foods and log meals
5. Check the dashboard for calorie tracking
