# Rail Madad API — Postman Testing Guide

This document provides a comprehensive guide for testing all available features of the Rail Madad Server using Postman.

## Base URL
Ensure your local server is running:
```text
http://localhost:8000
```

---

## 1. System Health Check
**Endpoint:** `GET /health`
- **Description**: Checks the server status, database connection, and system memory.
- **Auth Required**: No
- **Expected Response (200 OK)**:
```json
{
  "status": "Operational 🚀",
  "database": {
    "connection": "Connected 🟢"
  }
}
```

---

## 2. Authentication Flow
Base Path: `/api/auth`

### 2.1 Register User
**Endpoint:** `POST /api/auth/register`
- **Description**: Creates a new user account.
- **Body (`application/json`)**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "Password123!",
  "phoneNumber": "9876543210"
}
```
- **Expected Response (201 Created)**: Returns the newly created user object.

### 2.2 Login User
**Endpoint:** `POST /api/auth/login`
- **Description**: Authenticates a user and returns a JWT token.
- **Body (`application/json`)**:
```json
{
  "email": "johndoe@example.com",
  "password": "Password123!"
}
```
- **Expected Response (200 OK)**: Returns the user object (without password) and the `token`.
> **IMPORTANT**: Copy the `token` from the response. You will need it for protected routes.

### 2.3 Get User Profile (Protected)
**Endpoint:** `GET /api/auth/profile`
- **Description**: Fetches the currently logged-in user's profile.
- **Auth Required**: Yes. 
  - Go to the **Authorization** tab in Postman.
  - Select **Bearer Token**.
  - Paste your `token` here (or if cookie is set, Postman handles it automatically).

### 2.4 Logout User
**Endpoint:** `POST /api/auth/logout`
- **Description**: Clears the authentication cookie.
- **Auth Required**: No (but typically sent with cookies).

---

## 3. Department Management
Base Path: `/api/departments`

### 3.1 Get All Departments
**Endpoint:** `GET /api/departments`
- **Description**: Retrieves a list of all active departments.
- **Auth Required**: No.

### 3.2 Get Department by ID
**Endpoint:** `GET /api/departments/:id`
- **Description**: Retrieves a specific department's details using its MongoDB `_id`. Replace `:id` with an actual Department ID.

---

## 4. Complaint Management
Base Path: `/api/complaints`

### 4.1 Submit a Complaint (Protected)
**Endpoint:** `POST /api/complaints/submit`
- **Description**: Submits a new complaint. Triggers AI categorization and auto-routing.
- **Auth Required**: Yes (Bearer Token).
- **Body (`multipart/form-data`)**:
  - In Postman, go to **Body**, select **form-data**.
  - `rawText` (Text): e.g., "The coach is extremely dirty and garbage is everywhere."
  - `files` (File): Select up to 5 images, videos, or audio files. Ensure you change the key type from "Text" to "File" on the left dropdown.
- **Expected Response (201 Created)**: 
```json
{
  "success": true,
  "message": "Complaint registered successfully",
  "data": {
    "complaintId": "COMP123456",
    "category": "Cleanliness",
    "urgency": "Low"
  }
}
```

### 4.2 Get My Complaints (Protected)
**Endpoint:** `GET /api/complaints/my-complaints`
- **Description**: Fetches all complaints submitted by the authenticated user.
- **Auth Required**: Yes (Bearer Token).
- **Query Parameters (Optional)**:
  - `?status=Pending` (Filters by status)
  - `?category=Cleanliness` (Filters by category)

### 4.3 Get Single Complaint
**Endpoint:** `GET /api/complaints/:complaintId`
- **Description**: Fetches the details of a specific complaint using its `complaintId` (e.g., `COMP123456`).
- **Auth Required**: No (Currently public, though could be protected).
- **URL Example**: `http://localhost:8000/api/complaints/COMP123456`

---

## 5. Employee & Admin Features
Base Path: `/api/complaints`

### 5.1 Get Department Complaints (Protected)
**Endpoint:** `GET /api/complaints/department-complaints`
- **Description**: Fetches all complaints assigned to the logged-in department employee's department. Admins can view complaints from all departments.
- **Auth Required**: Yes (Bearer Token of a user with role `department_employee` or `admin`).
- **Query Parameters (Optional)**:
  - `?status=Pending` (Filters by status)
  - `?urgency=High` (Filters by urgency)

### 5.2 Update Complaint Status (Protected)
**Endpoint:** `PATCH /api/complaints/:complaintId/status`
- **Description**: Updates the status of a specific complaint. Appends a new entry to the complaint's timeline. Department employees can only update complaints assigned to their department.
- **Auth Required**: Yes (Bearer Token of a user with role `department_employee` or `admin`).
- **Body (`application/json`)**:
```json
{
  "status": "In Progress",
  "note": "We have dispatched a team to clean the area."
}
```
- **Expected Response (200 OK)**: Returns the updated complaint object.

---

## Pro Tips for Postman 💡
1. **Use Environments**: Create a "Rail Madad Local" environment in Postman. Set a variable `{{baseUrl}}` to `http://localhost:8000`.
2. **Auto Token Setup**: In your Login request, go to the **Tests** tab and add:
   ```javascript
   let resData = pm.response.json();
   pm.environment.set("token", resData.data.token);
   ```
   Then use `{{token}}` in the Authorization tab for protected routes.
3. **File Uploads**: When testing the submit endpoint, ensure your files are actually selected; Postman sometimes drops files when switching tabs.
