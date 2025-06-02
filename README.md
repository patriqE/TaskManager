### Task Manager Application - with React frontend and Express backend.

## Technical Stack
# Frontend
- Framework: React 18
- Language: TypeScript
- State Management: React Query
- Build Tool: Vite
- Styling: CSS Modules
# Backend
- Runtime: Node.js
- Framework: Express
- Language: TypeScript
- API: RESTful endpoints

## Setup Instructions
# Backend Setup
1. Navigate to backend folder:
   ```bash
    cd backend - navigates to the backend
    npm install - installs dependencies
    npm run dev - starts the development server 
# Frontend Setup
    cd frontend - navigates to the frontend
    npm install - installs dependencies
    npm run dev - starts the development server

## Technical Choices:
  TypeScript: For type safety across both frontend and backend
  React Query: For efficient data fetching and caching
  Express: For lightweight backend with middleware support
  Vite: For faster frontend builds compared to Create React App

## API Endpoints:
Method	Endpoint	  Description
GET		  /tasks	   Fetch all tasks
POST	    /tasks		 Create new task
DELETE	/tasks/:id	Delete task by ID
PATCH	  /tasks/:id	Update task status
