export const defaultUsers = [
  {
    username: 'admin',
    password: '1234',
  },
];

export const defaultProfile = {
  name: 'Admin User',
  email: 'admin@taskflow.com',
  role: 'Student / Administrator',
  password: '1234',
};

export const defaultTasks = [
  {
    id: '1',
    title: 'Complete DBMS Assignment',
    description: 'Finish the database assignment and submit the report before the deadline.',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-10-08',
    category: 'Academic',
    createdAt: '2026-09-20T09:00:00.000Z',
  },
  {
    id: '2',
    title: 'Prepare Presentation',
    description: 'Create slides for the seminar presentation and rehearse the flow.',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '2026-10-12',
    category: 'Presentation',
    createdAt: '2026-09-22T12:00:00.000Z',
  },
  {
    id: '3',
    title: 'Submit HTML Project',
    description: 'Final review and submission of the HTML and CSS mini project.',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-09-30',
    category: 'Project',
    createdAt: '2026-09-19T15:45:00.000Z',
  },
  {
    id: '4',
    title: 'Study JavaScript',
    description: 'Practice array methods, DOM manipulation, and async JavaScript exercises.',
    priority: 'Low',
    status: 'Pending',
    dueDate: '2026-10-02',
    category: 'Study',
    createdAt: '2026-09-25T16:20:00.000Z',
  },
];
