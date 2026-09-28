import { useEffect, useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Completed from './pages/Completed';
import Profile from './pages/Profile';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { defaultTasks, defaultUsers, defaultProfile } from './data';

function getStoredValue(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return fallback;
    }
    return JSON.parse(item);
  } catch (error) {
    return fallback;
  }
}

function App() {
  const [users, setUsers] = useState(() => getStoredValue('taskflow_users', defaultUsers));
  const [profile, setProfile] = useState(() => getStoredValue('taskflow_profile', defaultProfile));
  const [tasks, setTasks] = useState(() => {
    const storedTasks = getStoredValue('taskflow_tasks', null);
    if (storedTasks) {
      return storedTasks;
    }

    localStorage.setItem('taskflow_tasks', JSON.stringify(defaultTasks));
    return defaultTasks;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('taskflow_session') === 'true');
  const [activePage, setActivePage] = useState('dashboard');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('taskflow_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('taskflow_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('taskflow_session', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleLogin = (username, password, rememberMe) => {
    const matchedUser = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!matchedUser) {
      return { success: false, message: 'Invalid username or password.' };
    }

    setIsLoggedIn(true);
    localStorage.setItem('taskflow_remember_me', JSON.stringify(Boolean(rememberMe)));
    setActivePage('dashboard');
    return { success: true, message: 'Login successful.' };
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActivePage('dashboard');
    localStorage.setItem('taskflow_session', 'false');
    showToast('Logged out successfully.', 'success');
  };

  const addTask = (newTask) => {
    const task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setTasks((previousTasks) => [task, ...previousTasks]);
    showToast('Task added successfully.');
  };

  const updateTask = (id, updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, ...updatedTask }
          : task,
      ),
    );
    showToast('Task updated successfully.');
  };

  const deleteTask = (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
    showToast('Task deleted successfully.');
  };

  const completeTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, status: 'Completed' } : task,
      ),
    );
    showToast('Task marked as completed.');
  };

  const restoreTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id ? { ...task, status: 'Pending' } : task,
      ),
    );
    showToast('Task restored to pending.');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      <div className="app-shell">
        <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout} />

        <div className="main-panel">
          <Navbar
            activePage={activePage}
            setActivePage={setActivePage}
            onLogout={handleLogout}
            profile={profile}
          />

          <main className="page-content">
            {activePage === 'dashboard' && <Dashboard tasks={tasks} />}
            {activePage === 'tasks' && (
              <Tasks
                tasks={tasks}
                onAddTask={addTask}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onCompleteTask={completeTask}
              />
            )}
            {activePage === 'completed' && (
              <Completed tasks={tasks} onRestoreTask={restoreTask} onDeleteTask={deleteTask} />
            )}
            {activePage === 'profile' && (
              <Profile
                profile={profile}
                setProfile={setProfile}
                onLogout={handleLogout}
                showToast={showToast}
              />
            )}
          </main>
        </div>
      </div>

      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}

export default App;
