<div align="center">

<img src="https://img.shields.io/badge/Rail%20Madad-Indian%20Railways-blue?style=for-the-badge&logo=train&logoColor=white" alt="Rail Madad" />

# 🚆 Rail Madad

**AI-powered complaint management for Indian Railways**

File complaints · Track status · AI analysis · Secure auth

[![React](https://img.shields.io/badge/React_18-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)

</div>

---

## 🚀 What is Rail Madad?

Rail Madad is a Mobile-first grievance platform designed for Indian Railways passengers. It lets users submit complaints, attach evidence, track status, and receive intelligent categorization via AI. The application also includes secure authentication and a chat-based support interface.

---

## ✨ Features

- 🎫 **PNR Status** — real-time passenger name record lookup
- 📋 **File Complaints** — submit and track grievances end-to-end with attachments (images/docs) via Cloudinary
- 🤖 **AI Analysis** — intelligent complaint categorization and next-step suggestions
- 💬 **Chat Support** — AI-powered live chat assistant
- 🔐 **Auth** — JWT-based login with secure HTTP-only cookies
- ☁️ **File Uploads** — Cloudinary-backed image/document attachments (up to 5 per complaint)
- ✅ **Health Check** — real-time server + database status endpoint

---

## 🧱 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, Tailwind CSS 3, React Router 6 |
| Backend | Node.js, Express.js v5 |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Storage | Cloudinary, Multer |
| AI | OpenRouter / OpenAI (configurable) |

---

## 🧰 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/rail-madad.git
cd rail-madad
```

### 2. Start the backend

```bash
cd server
npm install
cp .env.example .env   # fill in your values
npm start
```

> Runs at `http://localhost:8000`

### 3. Start the frontend

```bash
cd client
npm install
npm run dev
```

> Runs at `http://localhost:5173`

---

## 🔧 Environment Variables

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

# Optional — for AI analysis
OPENROUTER_API_KEY=
```

---

## 📡 API Reference

Base URL: `http://localhost:8000/api`

### Auth (`/api/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Create a new account |
| `POST` | `/auth/login` | Login and receive JWT cookie |
| `POST` | `/auth/logout` | Clear auth cookie |
| `GET` | `/auth/profile` | Get current user profile (auth required) |
| `GET` | `/health` | Server + DB status |

<details>
<summary><b>POST</b> /auth/register</summary>

```json
// Request
{
  "firstName": "Sita",
  "lastName": "Sharma",
  "email": "sita@example.com",
  "password": "StrongPassword123!",
  "phoneNumber": "+919876543210"
}

// Response 201
{
  "success": true,
  "message": "User registered successfully",
  "data": { "_id": "...", "firstName": "Sita", "email": "sita@example.com" }
}
```
</details>

<details>
<summary><b>POST</b> /auth/login</summary>

```json
// Request
{
  "email": "sita@example.com",
  "password": "StrongPassword123!"
}

// Response 200
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": { "_id": "...", "email": "sita@example.com", "firstName": "Sita" },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

> The JWT is also stored in an HTTP-only `token` cookie for subsequent authenticated requests.
</details>

---

### Departments (`/api/departments`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/departments` | List all departments |
| `GET` | `/departments/:id` | Get department by ID |

---

### Complaints (`/api/complaints`)

> All complaint endpoints require authentication (JWT cookie from login).

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/complaints/submit` | Submit a new complaint (multipart/form-data) |
| `GET` | `/complaints/my-complaints` | Fetch complaints for the logged-in user |
| `GET` | `/complaints/:complaintId` | Get a single complaint by ID |

<details>
<summary><b>POST</b> /complaints/submit — Form Fields</summary>

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | Complaint title |
| `description` | string | Detailed description |
| `departmentId` | string | Target department ID |
| `files` | file[] | Up to 5 attachments |

```json
// Response 201
{
  "success": true,
  "message": "Complaint submitted successfully",
  "data": { "_id": "...", "status": "pending", ... }
}
```
</details>

---

## 🗺️ Frontend Routes

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

## 📁 Project Structure

```
rail-madad/
├── client/                  # React frontend
│   └── src/
│       ├── components/      # Shared UI components (BottomNav, Header)
│       ├── pages/           # All route pages
│       └── App.jsx          # Route definitions
│
└── server/                  # Express backend
    └── src/
        ├── config/          # DB, Cloudinary, AI config
        ├── controllers/     # Business logic (auth, complaints)
        ├── middleware/      # JWT auth, upload, error handling
        ├── models/          # Mongoose schemas
        ├── routes/          # Express routers
        └── utils/           # Response handlers, mailer
```

---

## 🛡️ Security Notes

- Passwords hashed with **bcryptjs** (10 salt rounds)
- JWT stored in **HTTP-only cookies** (inaccessible to client-side JS)
- CORS restricted to allowed origins defined in `server.js`
- File uploads handled securely via **multer** + **Cloudinary**

---

## 🧩 Tips & Troubleshooting

- **CORS errors** — ensure the frontend origin is in `allowedOrigins` inside `server/server.js`
- **Auth-protected endpoints** — use Postman/Insomnia with "Send cookies" enabled
- **MongoDB failures** — verify `MONGODB_URI` and that your IP is whitelisted in Atlas

---

## 🤝 Contributing

Pull requests are welcome! If you'd like to add features (admin dashboard, email notifications, analytics), open an issue or submit a PR.

---

## 📄 License

MIT © Rail Madad Team
