# 🥗 NutriTrack

A modern nutrition tracking dashboard where users log food and track daily calorie consumption. Built with **React + Vite** frontend, **Express.js** backend, and **PostgreSQL** (Supabase).

---

## Features

- 🔐 **Auth** — Register, login, JWT-based authentication
- 👤 **Profile** — Store age, height, weight, gender, activity level
- 🔥 **Calorie Target** — Auto-calculated via Mifflin-St Jeor (BMR → TDEE)
- 🍽️ **Food Database** — Full CRUD for food items (name, calories, macros)
- 📝 **Food Logging** — Log meals per day with quantity
- 📊 **Dashboard** — Daily target, consumed, remaining calories + progress bar
- 📈 **Weekly Chart** — 7-day calorie chart (Chart.js)

---

## Tech Stack

| Layer     | Technology                                                |
|-----------|-----------------------------------------------------------|
| Frontend  | React, Vite, TailwindCSS, Axios, Chart.js                |
| Backend   | Node.js, Express.js, JWT, bcrypt                          |
| Database  | PostgreSQL (Supabase)                                     |
| Deploy    | Railway (backend), Vercel (frontend)                      |

---

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── middleware/authMiddleware.js
│   │   ├── routes/
│   │   ├── services/calorieService.js
│   │   ├── utils/validators.js
│   │   └── server.js
│   ├── schema.sql
│   ├── seed.sql
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── components/
│   │   ├── context/AuthContext.jsx
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
├── DEPLOYMENT.md
└── README.md
```

---

## Quick Start

### 1. Database Setup

Create a [Supabase](https://supabase.com) project and run `backend/schema.sql` in the SQL Editor.

### 2. Backend

```bash
cd backend
cp .env.example .env   # fill in DATABASE_URL, JWT_SECRET
npm install
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**

---

## API Endpoints

| Method | Route                     | Auth | Description              |
|--------|---------------------------|------|--------------------------|
| POST   | `/auth/register`          | ✗    | Register a new user      |
| POST   | `/auth/login`             | ✗    | Login and get JWT        |
| GET    | `/user/profile`           | ✓    | Get user profile         |
| PUT    | `/user/profile`           | ✓    | Update user profile      |
| GET    | `/foods`                  | ✓    | List all foods           |
| POST   | `/foods`                  | ✓    | Create a food            |
| PUT    | `/foods/:id`              | ✓    | Update a food            |
| DELETE | `/foods/:id`              | ✓    | Delete a food            |
| GET    | `/foodlogs?date=`         | ✓    | Get food logs by date    |
| POST   | `/foodlogs`               | ✓    | Create a food log        |
| DELETE | `/foodlogs/:id`           | ✓    | Delete a food log        |
| GET    | `/dashboard/summary`      | ✓    | Daily calorie summary    |
| GET    | `/dashboard/weekly-progress` | ✓ | 7-day calorie history    |

---

## Example API Responses

**Dashboard Summary** (`GET /dashboard/summary`):
```json
{
  "targetCalories": 2200,
  "consumedCalories": 1500,
  "remainingCalories": 700
}
```

**Weekly Progress** (`GET /dashboard/weekly-progress`):
```json
[
  { "date": "2026-03-06", "calories": 1800 },
  { "date": "2026-03-07", "calories": 2100 },
  { "date": "2026-03-08", "calories": 1650 }
]
```

---

## Environment Variables

### Backend (`backend/.env`)
```
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=           # empty for local dev (uses Vite proxy), set to backend URL for production
```

---

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full instructions covering Supabase, Railway, and Vercel.

---

## License

MIT
