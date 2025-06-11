# Hiking & Adventure Blog

A personal blog platform for sharing hiking and travel experiences, featuring user authentication and an admin dashboard for post management.

## Features

- 📝 Create, edit, and display blog posts about hiking and travel
- 🔒 User authentication (JWT-based)
- 🛠️ Admin dashboard for managing posts and users
- 🌄 Responsive UI built with React, TailwindCSS, and Radix UI
- 📦 RESTful API with Express.js, PostgreSQL, and Supabase for storage
- 🖼️ Image uploads via Multer
- 🏕️ Markdown support

## Project Structure

```
my-blog-post-project/
│
├── client/   # Frontend (React + Vite + TailwindCSS)
│   └── ...
├── server/   # Backend (Express.js + PostgreSQL)
│   └── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/Phanupong-M/my-blog-post-project.git
cd my-blog-post-project
```

#### 2. Install dependencies

##### For client

```bash
cd client
npm install
```

##### For server

```bash
cd ../server
npm install
```

#### 3. Environment Variables

- Copy `.env.example` in both `client` and `server` (if available) and fill in required values.
- Backend requires: DB_URL, SUPABASE credentials, JWT secret, etc.

#### 4. Run the applications

Start backend server:

```bash
cd server
npm run dev
```

Start frontend app:

```bash
cd ../client
npm run dev
```

Visit the frontend at `http://localhost:5173` (default Vite port).

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Radix UI, React Router, JWT decode, React Markdown
- **Backend:** Node.js, Express.js, PostgreSQL, Supabase, Multer, dotenv, JWT
- **Other:** Admin dashboard, Markdown support, secure authentication

## Author

- [Phanupong-M](https://github.com/Phanupong-M)

---

> This project is for personal learning and sharing hiking/travel stories. Contributions are welcome!
