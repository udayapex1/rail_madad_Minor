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

## 🚀 Product Overview

Rail Madad is a mobile-first grievance platform designed for Indian Railways passengers. It lets users submit complaints, attach evidence, track status, and receive intelligent categorization via AI. The application also includes secure authentication and a lightweight chat-based support interface.

---

## ✨ Key Features

- ✅ **Complaint Filing** with attachments (images/docs) via Cloudinary
- ✅ **Complaint Tracking** (My Complaints + detail view)
- ✅ **AI Analysis** - auto-categorizes complaints and suggests next steps
- ✅ **User Authentication** - JWT stored in secure HTTP-only cookies
- ✅ **Real-time Health Check** - server + database status endpoint
- ✅ **Responsive UI** built with React/Tailwind

---

## 🧱 Tech Stack

| Layer | Tech |
|------|------|
| Frontend | React 18, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express.js, MongoDB, Mongoose |
| Auth | JWT (HTTP-only cookies), bcryptjs |
| Storage | Cloudinary (via multer) |
| AI | OpenRouter / OpenAI (configurable) |

---

## 🧰 Setup (Local Development)

### 1) Clone repository

```bash
git clone https://github.com/your-username/rail-madad.git
cd rail-madad
```

### 2) Start backend

```bash
cd server
npm install
cp .env.example .env
# update .env values (Mongo URI, JWT secret, Cloudinary keys)
npm start
```

> Backend runs at `http://localhost:8000`

### 3) Start frontend

```bash
cd ../client
npm install
npm run dev
```

> Frontend runs at `http://localhost:5173`

---

## 🔧 Environment Variables

Create `.env` inside `server/`:

```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<db>
JWT_SECRET_KEY=<your-secret>

# (Optional) File upload via Cloudinary
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# (Optional) AI analysis (OpenRouter/OpenAI)
OPENROUTER_API_KEY=
```

---

## 📡 API Documentation (Backend)

Base URL: `http://localhost:8000/api`

### ✅ Health Check

`GET /health`

- Returns server uptime, DB status, and system info.

---

### 🧑‍💻 Auth (Routes: `/api/auth`)

#### POST `/auth/register`

Create a new user.

Request body (JSON):

```json
{
  "firstName": "Sita",
  "lastName": "Sharma",
  "email": "sita@example.com",
  "password": "StrongPassword123!",
  "phoneNumber": "+919876543210"
}
```

Success response (201):

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": { "_id": "...", "firstName": "Sita", "email": "sita@example.com" }
}
```

---

#### POST `/auth/login`

Login and set a JWT cookie.

Request body (JSON):

```json
{
  "email": "sita@example.com",
  "password": "StrongPassword123!"
}
```

Success response (200):

```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": { "_id": "...", "email": "sita@example.com", "firstName": "Sita" },
    "token": "<jwt-token>"
  }
}
```

> The JWT token is also stored in an HTTP-only `token` cookie for subsequent authenticated requests.

---

#### POST `/auth/logout`

Logs out the user by clearing the cookie.

Success response (200):

```json
{
  "success": true,
  "message": "User logged out successfully",
  "data": null
}
```

---

#### GET `/auth/profile`

Returns current authenticated user profile.

> Requires a valid `token` cookie (sent automatically by the browser after login).

Success response (200):

```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": { "user": { "_id": "...", "email": "sita@example.com", "firstName": "Sita" } }
}
```

---

### 🏢 Departments (Routes: `/api/departments`)

#### GET `/departments`

List all departments.

Success response (200):

```json
{
  "success": true,
  "message": "Departments fetched successfully",
  "data": [ { "_id": "...", "name": "Food" }, ... ]
}
```

---

#### GET `/departments/:id`

Get department detail by ID.

Success response (200):

```json
{
  "success": true,
  "message": "Department fetched successfully",
  "data": { "_id": "...", "name": "Food" }
}
```

---

### 📂 Complaints (Routes: `/api/complaints`)

> The complaint endpoints require authentication (use the `token` cookie after login).

#### POST `/complaints/submit`

Submit a new complaint (supports file uploads).

Form data fields:
- `title` (string)
- `description` (string)
- `departmentId` (string)
- `files` (up to 5 files)

Success response (201):

```json
{
  "success": true,
  "message": "Complaint submitted successfully",
  "data": { "_id": "...", "status": "pending", ... }
}
```

---

#### GET `/complaints/my-complaints`

Fetch complaints submitted by the logged-in user.

Success response (200):

```json
{
  "success": true,
  "message": "Complaints retrieved successfully",
  "data": [ { "_id": "...", "title": "Train delayed", ... }, ... ]
}
```

---

#### GET `/complaints/:complaintId`

Get a single complaint by its ID.

Success response (200):

```json
{
  "success": true,
  "message": "Complaint fetched successfully",
  "data": { "_id": "...", "title": "Train delayed", ... }
}
```

---

## 📝 Project Structure

```
rail-madad/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/      # Shared UI components
│       ├── pages/           # Route pages
│       └── App.jsx          # Route definitions
│
└── server/                  # Express backend
    ├── server.js           # Entrypoint
    ├── package.json
    └── src/
        ├── config/          # DB, cloudinary, AI config
        ├── controllers/     # Business logic (auth, complaints)
        ├── middleware/      # Auth, upload, error handling
        ├── models/          # Mongoose schemas
        ├── routes/          # Express routers
        └── utils/           # Helpers (response handler, mail)
```

---

## 🛡️ Security Notes

- Passwords are hashed with **bcryptjs** (10 salt rounds)
- JWT is stored in an **HTTP-only cookie** (prevents access from JS)
- CORS is restricted to allowed origins defined in `server.js`
- File uploads are handled via **multer** and **Cloudinary** (secure storage)

---

=======

## ✅ Tips & Troubleshooting

- If you see CORS errors, make sure the front-end origin is listed in `server/server.js` `allowedOrigins`.
- For local testing, use a tool like Postman or Insomnia and enable `Send cookies` for auth-protected endpoints.
- If MongoDB connection fails, verify `MONGODB_URI` and that the database allows access from your IP.

---

## 🧩 Contribution

Pull requests are welcome! If you want to add features (feedback system, admin dashboard, email notifications), open an issue or submit a PR.

---

## 📄 License

MIT © Rail Madad Team


---

## License

ISC © Rail Madad Team
