# User Auth Management API

A comprehensive **Node.js + Express + MongoDB REST API** for robust user management and authentication.
This project demonstrates CRUD operations, secure JWT token-based authentication, request validation middleware, advanced database querying, and standard JSend API responses.

## Features

- **JWT Authentication:** Secure user registration and login utilizing JSON Web Tokens.
- **Protected Routes:** Middleware to restrict access to user management endpoints.
- **JSend Standard Responses:** All API responses adhere to a consistent `{ "status": "...", "data": ... }` structure.
- **Advanced Querying:** Support for filtering users by role (`?role=admin`).
- **Data Sorting:** Dedicated endpoint to fetch users sorted by age.
- **Pagination:** Query parameter support for paginating user data (`?page=1&limit=10`).
- **Data Aggregation:** Endpoint to summarize user statistics and count.
- **Validation:** Request validation middleware.
- **Security:** Password hashing via bcrypt.

## Tech Stack

- Node.js
- Express.js
- MongoDB / Mongoose
- jsonwebtoken (JWT)
- bcryptjs
- dotenv

## Installation

Clone the repository

```bash
git clone https://github.com/symon9/user-management-api.git
cd user-management-api
```

Install dependencies

```bash
npm install
```

Create a `.env` file in the root directory

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_string_123
```

Run the server (uses nodemon)

```bash
npm start
```

Server will run on:

```bash
http://localhost:5000
```

## API Endpoints

### Authentication
*These endpoints are public.*

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user & receive JWT          |

### Users
*All endpoints below are protected and require a valid JWT token sent in the `Authorization` header as `Bearer <token>`.*

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | `/api/users`     | Get all users   |
| GET    | `/api/users/sorted/by-age`     | Get all users sorted youngest to oldest   |
| GET    | `/api/users/stats/count`     | Get aggregate statistics of user roles   |
| GET    | `/api/users/:id` | Get single user by ID |
| POST   | `/api/users`     | Add a new user manually    |
| PUT    | `/api/users/:id` | Update an existing user     |
| DELETE | `/api/users/:id` | Delete a user     |

#### Query Parameters
The `GET /api/users` endpoint supports several query parameters:
*   **Filtering:** `?role=admin` (Returns only users matching the specified role)
*   **Pagination:** `?page=2&limit=5` (Returns 5 users from the 2nd page of results)

## Author

Simon Emmanuel
