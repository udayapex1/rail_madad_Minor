# Rail Madad - Server

A robust backend API for the Rail Madad application, providing authentication, user management, and PNR (Passenger Name Record) status checking functionality.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
- [Security Features](#security-features)

---

## Overview

Rail Madad is a full-stack application designed to help users check railway PNR (Passenger Name Record) status and manage user accounts. The backend server is built with Express.js and MongoDB, providing secure authentication, user management, and API endpoints for retrieving railway information.

**Current Version**: 1.0.0  
**Service**: PNR Status API  
**Port**: 8000 (configurable via environment variables)

---

## Tech Stack

### Backend Framework
- **Express.js** (v5.2.1) - Fast, minimal web framework for Node.js
- **Node.js** - JavaScript runtime

### Database
- **MongoDB** (via Mongoose v9.2.4) - NoSQL database for data persistence
- **Mongoose** - ODM (Object Data Modeling) library for MongoDB

### Authentication & Security
- **JWT (JSON Web Tokens)** - For stateless authentication
- **bcryptjs** (v3.0.3) - Password hashing and encryption
- **Cookie Parser** (v1.4.7) - Parse and handle cookies
- **CORS** (v2.8.6) - Cross-Origin Resource Sharing

### File Upload & Storage
- **Multer** (v2.1.1) - Middleware for handling file uploads
- **Multer Storage Cloudinary** (v4.0.0) - Store uploads in Cloudinary
- **Cloudinary** (v1.41.3) - Cloud-based image/file storage

### Utilities & Development
- **dotenv** (v17.3.1) - Load environment variables from .env file
- **validator** (v13.15.26) - String validation and sanitization
- **nodemon** (v3.1.14) - Auto-restart server during development

---

## Project Structure

```
server/
├── src/
│   ├── config/              # Configuration files
│   │   ├── aiConfig.js      # AI service configuration
│   │   ├── cloudinary.js    # Cloudinary setup
│   │   └── db.js            # MongoDB connection
│   ├── controllers/         # Business logic
│   │   └── auth.controllers.js    # Authentication controllers
│   ├── middleware/          # Express middleware
│   │   └── authUser.middleware.js # JWT verification middleware
│   ├── models/              # Mongoose schemas
│   │   ├── User.model.js    # User schema
│   │   └── Department.model.js # Department schema
│   ├── routes/              # API routes
│   │   └── auth.routes.js   # Authentication routes
│   ├── jwt/                 # JWT token handling
│   │   └── authToken.js     # Token creation and management
│   └── utils/               # Utility functions
│       └── responseHandler.js # API response formatting
├── server.js                # Main application file
├── package.json             # Dependencies and scripts
├── .env                      # Environment variables (not in git)
└── test.txt                 # Test file

```

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account (either local or MongoDB Atlas)
- Cloudinary account (for file uploads)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd rail_Madad/server
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env` file in the server directory:
```bash
cp .env.example .env  # If example exists, or manually create it
```

See [Environment Variables](#environment-variables) section for required variables.

### Step 4: Verify MongoDB Connection
Ensure your MongoDB instance is running and the connection string is correct in `.env`.

---

## Environment Variables

Create a `.env` file in the server root with the following variables:

```dotenv
# Server Configuration
PORT=8000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>

# JWT Configuration
JWT_SECRET_KEY=<your-secret-key-min-256-chars>

# Cloudinary Configuration (Optional)
CLOUDINARY_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

### Environment Variable Descriptions

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `8000` |
| `NODE_ENV` | Environment type (development/production) | `development` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/dbname` |
| `JWT_SECRET_KEY` | Secret key for JWT signing (min 256 chars) | `fe7322bebeb02adf884...` |
| `CLOUDINARY_NAME` | Cloudinary account name | `your-cloudinary-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your-secret-key` |

---

## Running the Server

### Development Mode (with auto-reload)
```bash
npm start
```
This uses **nodemon** to automatically restart the server when files change.

### Manual Mode
```bash
node server.js
```

### Expected Output
```
MongoDB Connected: ac-t4qfc2x-shard-00-01.mvaj3ur.mongodb.net
Example app listening on port 8000
```

---

## API Documentation

### Base URL
```
http://localhost:8000/api
```

### Health Check Endpoint
**GET** `/health`

Check server and database status.

**Response** (200 OK):
```json
{
  "status": "OK",
  "service": "pnr-status-api",
  "uptime": 123.456,
  "timestamp": "2024-03-07T10:30:45.123Z",
  "database": "connected"
}
```

---

## Authentication Routes

Base URL: `/api/auth`

### 1. User Registration
**Endpoint**: `POST /api/auth/register`

Register a new user account.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "phoneNumber": "+919876543210"
}
```

**Validation Rules**:
- `firstName`: Required, string
- `lastName`: Required, string
- `email`: Required, valid email format, unique
- `password`: Required, minimum 8 characters
- `phoneNumber`: Required, valid international format (+country-code-number)

**Success Response** (201 Created):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "65e4a2f3c1b2d3e4f5g6h7i8",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phoneNumber": "+919876543210",
    "createdAt": "2024-03-07T10:30:45.123Z",
    "updatedAt": "2024-03-07T10:30:45.123Z"
  }
}
```

**Error Response** (409 Conflict):
```json
{
  "success": false,
  "message": "User already exists, Try login with entered email"
}
```

**Error Response** (400 Bad Request):
```json
{
  "message": "Missing required fields",
  "missingFields": ["firstName", "email"]
}
```

---

### 2. User Login
**Endpoint**: `POST /api/auth/login`

Authenticate user and receive JWT token.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```

**Success Response** (200 OK):
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "_id": "65e4a2f3c1b2d3e4f5g6h7i8",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phoneNumber": "+919876543210",
      "createdAt": "2024-03-07T10:30:45.123Z",
      "updatedAt": "2024-03-07T10:30:45.123Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response** (404 Not Found):
```json
{
  "success": false,
  "message": "User not found with this email, Please register first"
}
```

**Error Response** (401 Unauthorized):
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Error Response** (400 Bad Request):
```json
{
  "message": "Missing required fields",
  "missingFields": ["email", "password"]
}
```

---

## Authentication

### JWT Token Flow

1. **Registration**: User creates account → Password hashed with bcryptjs
2. **Login**: 
   - User provides credentials
   - Password verified against stored hash
   - JWT token generated with 24-hour expiration
   - Token stored in HTTP-only cookie
   - Token returned in response body
3. **Protected Requests**: 
   - Token sent via cookie or Authorization header
   - `isAuthenticated` middleware verifies token
   - User data attached to request object

### Using Authentication

#### Token in Authorization Header
```bash
curl -X GET http://localhost:8000/api/protected-route \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

#### Token in Cookies (Automatic)
After login, the token is automatically stored as an HTTP-only cookie.

### Protected Routes Middleware
```javascript
import { isAuthenticated } from "../middleware/authUser.middleware.js";

// Protect routes like this:
router.get("/profile", isAuthenticated, (req, res) => {
  // req.user contains authenticated user data
  res.json(req.user);
});
```

---

## Database Schema

### User Model

**File**: `src/models/User.model.js`

```javascript
{
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/^\+?[1-9]\d{9,14}$/, "Please enter a valid phone number"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Department Model

**File**: `src/models/Department.model.js`

(Schema to be configured based on project requirements)

---

## Error Handling

### Global Error Response Format

**Success Response**:
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes

| Code | Meaning | Scenario |
|------|---------|----------|
| 200 | OK | Successful GET/POST request |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid input/missing fields |
| 401 | Unauthorized | Missing or invalid token |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Resource already exists (duplicate email) |
| 500 | Server Error | Unexpected server error |

### Response Handler Utility

**File**: `src/utils/responseHandler.js`

```javascript
// Success response
successResponse(res, data, message, statusCode)

// Error response
errorResponse(res, message, statusCode)
```

---

## Security Features

### 1. Password Security
- **Hashing**: Passwords hashed with bcryptjs (salt rounds: 10)
- **Comparison**: Secure bcrypt.compare() for verification
- **Validation**: Minimum 8 characters enforced

### 2. JWT Security
- **Token Expiration**: 24-hour expiration time
- **HTTP-Only Cookies**: XSS attack prevention
- **Secure Cookies**: HTTPS-only in production
- **SameSite Policy**: 
  - `strict` in production
  - `lax` in development

### 3. Authentication Middleware
- **Multiple Token Sources**: Cookie or Authorization header
- **Token Verification**: JWT signature validation
- **User Lookup**: Verify user still exists in database

### 4. CORS Configuration
**Allowed Origins**:
- http://localhost:5173 (Frontend dev)
- http://localhost:5174 (Frontend dev)
- http://localhost:3000 (Frontend dev)
- http://localhost:8000 (Same origin)

**Allowed Methods**: GET, POST, PUT, DELETE, PATCH, OPTIONS

### 5. Input Validation
- **Email Validation**: RFC-compliant email format
- **Phone Number Validation**: International format (+country-code-number)
- **Required Fields**: Strict validation for mandatory fields

---

## CORS Policy

The server implements strict CORS to allow requests only from authorized frontend applications.

**Configuration File**: `server.js`

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:8000",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
}));
```

**To add a new frontend origin**:
1. Add the URL to `allowedOrigins` array
2. Restart the server

---

## Database Connection

### Connection Status Monitoring

The server monitors database connection status with event listeners:

```javascript
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

mongoose.connection.on("reconnected", () => {
  console.log("MongoDB Reconnected");
});
```

### Connection Troubleshooting

**Error**: "MongoDB connection error"
- Verify MongoDB URI in `.env`
- Check internet connection
- Ensure MongoDB cluster is running
- Verify IP whitelist in MongoDB Atlas (add your IP)

**Error**: "Cannot connect to database"
- Check if credentials are correct
- Verify database name exists
- Ensure user has access to the database

---

## Project Structure Explanation

### `/src/config`
Configuration files for external services:
- **db.js**: MongoDB connection setup
- **cloudinary.js**: Cloudinary SDK initialization
- **aiConfig.js**: AI service configuration

### `/src/controllers`
Business logic for handling API requests:
- **auth.controllers.js**: Registration and login logic

### `/src/middleware`
Express middleware for request processing:
- **authUser.middleware.js**: JWT verification and authentication

### `/src/models`
Mongoose schemas and models:
- **User.model.js**: User account schema
- **Department.model.js**: Department schema

### `/src/routes`
API endpoint definitions:
- **auth.routes.js**: Authentication routes

### `/src/jwt`
JWT token management:
- **authToken.js**: Token creation and cookie handling

### `/src/utils`
Helper/utility functions:
- **responseHandler.js**: Standardized API response formatting

---

## Development Guidelines

### Adding New Routes

1. Create controller in `/src/controllers/`
2. Define route in `/src/routes/`
3. Import route in `server.js`
4. Mount route: `app.use("/api/endpoint", routes)`

### Adding Authentication to Routes

```javascript
import { isAuthenticated } from "../middleware/authUser.middleware.js";

router.get("/protected", isAuthenticated, controllerFunction);
```

### Response Format Consistency

Always use utility functions for responses:

```javascript
import { successResponse, errorResponse } from "../utils/responseHandler.js";

// Success
return successResponse(res, data, "Success message", 200);

// Error
return errorResponse(res, "Error message", 400);
```

---

## Deployment Checklist

- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Use strong, random `JWT_SECRET_KEY`
- [ ] Update `allowedOrigins` with production frontend URL
- [ ] Enable secure cookies (`secure: true`)
- [ ] Verify MongoDB Atlas IP whitelist
- [ ] Set up proper error logging
- [ ] Configure Cloudinary credentials
- [ ] Test all API endpoints
- [ ] Set up HTTPS/SSL certificate
- [ ] Configure environment variables on hosting platform
- [ ] Set up database backups

---

## Troubleshooting

### Server won't start
```bash
# Check if port is in use
lsof -i :8000

# Change PORT in .env
PORT=8001
```

### MongoDB Connection Timeout
- Verify MONGODB_URI in `.env`
- Check IP whitelist in MongoDB Atlas
- Ensure network connectivity

### JWT Token Errors
- Verify JWT_SECRET_KEY is set
- Check token expiration (24 hours)
- Clear cookies and login again

### CORS Errors
- Verify frontend origin is in `allowedOrigins`
- Check credentials: true is set
- Restart server after changes

---

## License

ISC

---

## Support

For issues or questions, please contact the development team or create an issue in the repository.

---

**Last Updated**: March 7, 2026  
**Maintained By**: Rail Madad Team
