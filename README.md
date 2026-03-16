<div align="center">

<img src="https://img.shields.io/badge/Rail%20Madad-Indian%20Railways-blue?style=for-the-badge&logo=train&logoColor=white" alt="Rail Madad" />

# 🚆 Rail Madad

**AI-powered grievance redressal for Indian Railways**

File complaints · Track PNR status · Chat with AI support

[![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)

</div>

---

## What is Rail Madad?

Rail Madad is a mobile-first web app that makes it dead simple for passengers to raise and track complaints on Indian Railways. Built on a full MERN stack with AI analysis and live chat support baked in.

---

## Features

- 🎫 &nbsp;**PNR Status** — real-time passenger name record lookup
- 📋 &nbsp;**File Complaints** — submit and track grievances end-to-end
- 🤖 &nbsp;**AI Analysis** — intelligent complaint categorization and suggestions
- 💬 &nbsp;**Chat Support** — AI-powered live chat assistant
- 🔐 &nbsp;**Auth** — JWT-based login with HTTP-only cookies
- ☁️ &nbsp;**File Uploads** — Cloudinary-backed image/document attachments

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS 3, React Router 6 |
| Backend | Node.js, Express.js v5 |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Storage | Cloudinary, Multer |

---

## Getting Started

```bash
git clone https://github.com/your-username/rail-madad.git
cd rail-madad
```

### Frontend

```bash
cd client
npm install
npm run dev
```

> Runs at `http://localhost:5173`

### Backend

```bash
cd server
npm install
cp .env.example .env   # fill in your values
npm start
```

> Runs at `http://localhost:8000`

---

## Environment Variables

Create `server/.env`:

```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>
JWT_SECRET_KEY=<your-256-char-secret>

# Optional — for file uploads
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## API Reference

Base URL: `http://localhost:8000/api`

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Create a new account |
| `POST` | `/auth/login` | Login and receive JWT |
| `GET` | `/health` | Server + DB status |

<details>
<summary><b>POST</b> /auth/register</summary>

```json
// Request
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "phoneNumber": "+919876543210"
}

// Response 201
{
  "success": true,
  "message": "User registered successfully",
  "data": { "_id": "...", "firstName": "John", ... }
}
```
</details>

<details>
<summary><b>POST</b> /auth/login</summary>

```json
// Request
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}

// Response 200
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```
</details>

---

## Project Structure

```
rail-madad/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # BottomNav, Header
│       ├── pages/           # All route pages
│       └── App.jsx          # Route definitions
│
└── server/                  # Express backend
    └── src/
        ├── config/          # DB, Cloudinary, AI config
        ├── controllers/     # Auth logic
        ├── middleware/       # JWT auth middleware
        ├── models/          # Mongoose schemas
        ├── routes/          # API routes
        └── utils/           # Response handlers
```

---

## Routes

| Path | Page |
|------|------|
| `/` | Welcome Screen |
| `/login` | Login |
| `/register` | Create Account |
| `/home` | Dashboard |
| `/file-complaint` | File Complaint |
| `/complaints` | My Complaints |
| `/ai-analysis` | AI Analysis |
| `/chat` | Chat Support |
| `/feedback` | Feedback & Rating |

---
https://rail-madad-minor.onrender.com/health
