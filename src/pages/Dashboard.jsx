import { useMemo } from 'react';
import StatsCard from '../components/StatsCard';

function Dashboard({ tasks }) {
  const stats = useMemo(() => {
    const total = tasks.length;
    const pending = tasks.filter((task) => task.status === 'Pending').length;
    const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
    const completed = tasks.filter((task) => task.status === 'Completed').length;
    const highPriority = tasks.filter((task) => task.priority === 'High').length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return { total, pending, inProgress, completed, highPriority, completionRate };
  }, [tasks]);

  const recentTasks = useMemo(
    () => [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4),
    [tasks],
  );

  const upcomingDeadlines = useMemo(
    () =>
      [...tasks]
        .filter((task) => task.status !== 'Completed' && task.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 4),
    [tasks],
  );

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Dashboard</h2>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard label="Total Tasks" value={stats.total} icon="🗂️" accent="blue" />
        <StatsCard label="Pending" value={stats.pending} icon="⏳" accent="amber" />
        <StatsCard label="In Progress" value={stats.inProgress} icon="🚀" accent="purple" />
        <StatsCard label="Completed" value={stats.completed} icon="✅" accent="green" />
        <StatsCard label="High Priority" value={stats.highPriority} icon="⚠️" accent="red" />
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel__header">
            <h3>Recent Tasks</h3>
          </div>

          {recentTasks.length > 0 ? (
            <div className="list-stack">
              {recentTasks.map((task) => (
                <div key={task.id} className="mini-list-item">
                  <div>
                    <strong>{task.title}</strong>
                    <small>{task.status}</small>
                  </div>
                  <span className={`priority-badge priority-badge--${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No tasks found.</p>
          )}
        </section>

        <section className="panel">
          <div className="panel__header">
            <h3>Upcoming Deadlines</h3>
          </div>

          {upcomingDeadlines.length > 0 ? (
            <div className="list-stack">
              {upcomingDeadlines.map((task) => (
                <div key={task.id} className="mini-list-item">
                  <div>
                    <strong>{task.title}</strong>
                    <small>{new Date(task.dueDate).toLocaleDateString('en-GB')}</small>
                  </div>
                  <span className="deadline-pill">{task.status}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-state">No upcoming tasks.</p>
          )}
        </section>
      </div>

      <section className="panel panel--wide">
        <div className="panel__header">
          <h3>Completion Rate</h3>
        </div>
        <div className="completion-wrap">
          <div className="completion-ring">
            <span>{stats.completionRate}%</span>
          </div>
          <div className="completion-summary">
            <p>
              <strong>{stats.completed}</strong> tasks completed out of <strong>{stats.total}</strong>
            </p>
            <p>Stay consistent and finish your pending assignments before the next deadline.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
