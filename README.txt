LearnSpace React + MockAPI

Project structure:
- FrontEnd/                 React + Vite frontend
- mock-api/                 JSON Server MockAPI
- Original_FrontEnd_Backup/ Original HTML/CSS/JS reference

Run MockAPI first:
1. Open a terminal in mock-api
2. npm install
3. npm start

MockAPI:
http://localhost:3000

Endpoints:
http://localhost:3000/students
http://localhost:3000/admins
http://localhost:3000/courses

Then run React in a second terminal:
1. Open a terminal in FrontEnd
2. npm install
3. npm run dev

The React app uses MockAPI for:
- Student registration and login
- Admin registration and login
- Student/admin password reset

Login/session information is kept in localStorage.

Important:
Keep the MockAPI terminal running while using the React application.
