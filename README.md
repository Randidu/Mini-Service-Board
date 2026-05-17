# 🛠️ ServiceBoard — Service Request Management

A modern, full-stack service request board application for managing and tracking maintenance jobs, repairs, and tasks. Built with a clean MVC architecture and a stunning dark-mode UI.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Express](https://img.shields.io/badge/Express-4-green?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8-brightgreen?style=flat-square&logo=mongodb)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-blue?style=flat-square&logo=tailwindcss)

---

## ✨ Features

- **📋 Job Request Management** — Create, view, update status, and delete service requests
- **🔍 Search & Filter** — Search by keyword, filter by category and status
- **🎨 Premium Dark UI** — Glassmorphism design with gradient accents and micro-animations
- **📱 Fully Responsive** — Works seamlessly on mobile, tablet, and desktop
- **🔔 Toast Notifications** — Real-time feedback for all actions
- **⚡ Loading States** — Skeleton loaders and spinners for smooth UX
- **🛡️ Input Validation** — Both client-side and server-side validation
- **🌱 Seed Script** — Pre-populate the database with sample data

---

## 🏗️ Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | Next.js 15 (App Router)     |
| Styling    | TailwindCSS 4               |
| HTTP Client| Axios                       |
| Backend    | Node.js + Express 4         |
| Database   | MongoDB + Mongoose 8        |
| Toasts     | react-hot-toast             |

---

## 📁 Project Structure

```
service-request-board/
├── backend/
│   ├── server.js              # Express entry point
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   └── JobRequest.js      # Mongoose schema
│   ├── routes/
│   │   └── jobRoutes.js       # API route definitions
│   ├── controllers/
│   │   └── jobController.js   # Request handlers
│   ├── middleware/
│   │   └── errorMiddleware.js # Error handling
│   ├── seed.js                # Database seeder
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── layout.js          # Root layout + Navbar + Toaster
│   │   ├── page.js            # Home page (list all jobs)
│   │   ├── globals.css        # Global styles & animations
│   │   └── jobs/
│   │       ├── new/page.jsx   # Create new job form
│   │       └── [id]/page.jsx  # Job detail + status update + delete
│   ├── components/
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── JobCard.jsx        # Job card component
│   │   ├── JobForm.jsx        # Job creation form
│   │   └── StatusDropdown.jsx # Status update dropdown
│   ├── services/
│   │   └── api.js             # Axios API service
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** v18+ installed
- **MongoDB** running locally or a MongoDB Atlas connection string
- **npm** package manager

### 1. Clone the Repository

```bash
git clone <repo-url>
cd service-request-board
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (or edit the existing one):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/service-request-board
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file (or edit the existing one):

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Seed the Database (Optional)

```bash
cd backend
npm run seed
```

This will populate the database with 8 sample job requests.

---

## 🏃 Running the Application

### Start the Backend

```bash
cd backend
npm run dev
```

The API server will start at **http://localhost:5000**

### Start the Frontend

```bash
cd frontend
npm run dev
```

The app will be available at **http://localhost:3000**

---

## 📡 API Endpoints

| Method   | Endpoint           | Description                        |
|----------|--------------------|------------------------------------|
| `GET`    | `/api/jobs`        | Get all jobs (supports filters)    |
| `GET`    | `/api/jobs/:id`    | Get a single job by ID             |
| `POST`   | `/api/jobs`        | Create a new job request           |
| `PATCH`  | `/api/jobs/:id`    | Update job status only             |
| `DELETE` | `/api/jobs/:id`    | Delete a job request               |

### Query Parameters for `GET /api/jobs`

| Parameter  | Example                     | Description                |
|------------|-----------------------------|----------------------------|
| `category` | `?category=Plumbing`        | Filter by category         |
| `status`   | `?status=Open`              | Filter by status           |
| `search`   | `?search=faucet`            | Search title & description |

---

## 🌍 Environment Variables

### Backend (`.env`)

| Variable    | Description                     | Default                                          |
|-------------|---------------------------------|--------------------------------------------------|
| `PORT`      | Server port                     | `5000`                                           |
| `MONGO_URI` | MongoDB connection string       | `mongodb://localhost:27017/service-request-board` |

### Frontend (`.env.local`)

| Variable              | Description        | Default                        |
|-----------------------|--------------------|--------------------------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL    | `http://localhost:5000/api`    |

---

## 🚢 Deployment

### Backend Deployment (e.g., Render, Railway)

1. Push your backend code to a Git repository
2. Set environment variables (`PORT`, `MONGO_URI`) in the platform
3. Set the build command to `npm install`
4. Set the start command to `npm start`

### Frontend Deployment (e.g., Vercel)

1. Push your frontend code to a Git repository
2. Connect to Vercel and import the project
3. Set `NEXT_PUBLIC_API_URL` to your deployed backend URL
4. Deploy — Vercel handles the rest

> **Note:** Update `NEXT_PUBLIC_API_URL` to point to your production backend URL.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
