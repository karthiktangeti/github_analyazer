# GitHub Profile Analyzer

A full-stack GitHub analytics dashboard built with the MERN stack and the GitHub REST API.

## Features
- Search any GitHub profile
- View profile details and repository statistics
- Analyze programming languages with a chart
- Sort repositories by stars, forks, recency, or name
- Recent search history
- Responsive dark/light UI

## Tech Stack
- Frontend: React, Vite, Axios, Recharts, Lucide React
- Backend: Node.js, Express, Axios, MongoDB Atlas (optional)

## Getting Started

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create a backend .env file with:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

## API Endpoints
- GET /api/github/:username
- GET /api/history
- DELETE /api/history/:id
