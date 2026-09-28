# TaskFlow – Task Management System

TaskFlow is a simple, student-friendly task management project built using React and browser LocalStorage. It helps users manage daily tasks, track deadlines, and organize work in a clean dashboard.

## Project Purpose
This project is designed for a college/school assignment or mini project. It demonstrates frontend task management features such as login, task creation, task editing, task deletion, task completion tracking, and dashboard statistics.

## Technologies Used
- HTML
- CSS
- JavaScript
- React.js
- LocalStorage

## Main Features
- Demo login page with user authentication
- Dashboard with task statistics
- Add, edit, delete, and complete tasks
- Search and filter tasks
- Sort tasks by due date
- Completed tasks section
- Profile page with frontend password change form
- Responsive layout for desktop and mobile
- Data saved in browser LocalStorage

## Demo Credentials
- Username: admin
- Password: 1234

## How to Run the Project
1. Open the project folder in a terminal.
2. Install dependencies:
   npm install
3. Start the development server:
   npm run dev
4. Open the local URL shown in the terminal in the browser.

## Folder Structure
```text
TaskFlow/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── App.jsx
│   ├── data.js
│   ├── main.jsx
│   ├── styles.css
│   ├── components/
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatsCard.jsx
│   │   ├── TaskCard.jsx
│   │   └── TaskForm.jsx
│   └── pages/
│       ├── Completed.jsx
│       ├── Dashboard.jsx
│       ├── Login.jsx
│       ├── Profile.jsx
│       └── Tasks.jsx
└── public/
```

## Notes
This project uses a simple front-end demo authentication system and browser LocalStorage instead of a backend. It is intentionally easy to understand and demonstrate during viva or classroom presentations.
