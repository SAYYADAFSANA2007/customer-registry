# Customer Registry

A MERN stack web application to record and manage customer interactions, issues, and feedback.

## Live Demo

Frontend: https://customer-registry-frontend.netlify.app
Backend: https://customer-registry-backend.onrender.com
> Note: Backend is hosted on Render free tier. First load may take 30-50 seconds to wake up.

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Customer | testuser@gmail.com | test123 |
| Agent | agent@registry.com | agent123 |
| Admin | admin@registry.com | admin123 |

## Tech Stack

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: JWT

## Features

- Role-based login (Customer, Agent, Admin)
- Customer: raise complaints, view status, chat with agent, profile management, feedback
- Admin: analytics dashboard, assign complaints to agents, manage users
- Agent: resolve complaints, escalate, chat with customers

## Setup

1. Clone the repo
2. Add `.env` in server folder with PORT, MONGO_URI, JWT_SECRET
3. Run `npm install` in server folder
4. Run `npm install` in client folder
5. Start server: `node src/app.js`
6. Start client: `npm start`