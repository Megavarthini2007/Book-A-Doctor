# Book A Doctor — Professional Healthcare SaaS Platform

**Book A Doctor** is an enterprise-grade healthcare appointment discovery, booking, management, clinical consultation, and administrative SaaS platform.

---

## Current Development Phase

> **Phase**: FRONTEND PRODUCTION BUILD COMPLETE
> 
> The React.js frontend (`client/`) is fully functional, complete with mock data, role-based workflows (Patient, Doctor, Administrator), interactive booking wizard, consultation manager, and clean service abstractions.
> 
> The Node.js/Express backend (`server/`) directory structure is pre-architected and ready for future MERN API integration (MongoDB Atlas, Mongoose, Express, JWT, bcrypt).

---

## Project Structure

```text
Book-A-Doctor/
│
├── client/                         # Complete React.js Frontend (Vite + Bootstrap 5)
│   ├── public/
│   ├── src/
│   │   ├── assets/                 # Custom Design System, Icons, Images
│   │   ├── components/             # Reusable UI Component Library
│   │   ├── pages/                  # Public, Auth, Patient, Doctor, & Admin Pages
│   │   ├── services/               # Service Layer Ready for Axios API Integration
│   │   ├── context/                # Auth & Session Context
│   │   ├── hooks/                  # Custom React Hooks
│   │   ├── utils/                  # Validators, Formatters, Helpers
│   │   └── data/                   # Realistic Healthcare Mock Data
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Express Backend (Pre-configured for future MERN integration)
│   ├── config/                     # Database & Cloudinary Placeholders
│   ├── controllers/                # REST API Controllers (Stubs)
│   ├── models/                     # Mongoose Schema Definitions (Stubs)
│   ├── routes/                     # Express Router Definitions (Stubs)
│   ├── middleware/                 # Auth & Role Security Middlewares
│   └── package.json
│
├── docs/                           # Architectural Documentation
├── postman/                        # API Collection Specs
├── .gitignore
├── LICENSE
└── README.md
```

---

## Technology Stack

### Frontend (`client/`)
- **Core**: React.js 18, JavaScript ES6+
- **Build Tool**: Vite
- **Styling**: Bootstrap 5 + Custom Healthcare CSS Design System
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios (Service layer configured)
- **UI Components & Icons**: React Icons, React Toastify

### Future Backend (`server/`)
- **Runtime**: Node.js & Express.js
- **Database**: MongoDB Atlas via Mongoose ORM
- **Security**: JWT Authentication, bcrypt password hashing

---

## Quick Start (Frontend)

To launch the application locally:

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will launch at `http://localhost:5173`.

---

## Architecture & Service Layer Strategy

All UI components interact exclusively with the Service Layer (`client/src/services/`). Components do not directly import static datasets.

```text
[ React Component ] ───► [ Service Layer ] ───► [ Mock Healthcare Data ]
                                 │
                     (Future MERN Connection)
                                 ▼
                         [ Axios REST Client ]
                                 │
                         [ Express.js API ] ───► [ MongoDB Atlas ]
```

When connecting your Express backend in the future, simply update the service implementation methods to call `api.get()` / `api.post()`. React pages and components require zero modification!

---

## Primary Roles & Features

1. **Public Visitor**: Healthcare landing page, doctor discovery, specialization filters, doctor profiles, FAQ, legal pages.
2. **Patient**: Personal dashboard, 4-step appointment booking wizard, time slot selection, medical document uploads, appointment cancellation & rescheduling, notifications.
3. **Doctor**: Clinical dashboard, request approval/rejection, weekly availability manager, consultation view with dynamic medicine prescription builder.
4. **Administrator**: System metrics overview, doctor verification & approval center, patient/doctor management tables, master appointment audit.
