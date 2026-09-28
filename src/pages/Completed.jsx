import TaskCard from '../components/TaskCard';

function Completed({ tasks, onRestoreTask, onDeleteTask }) {
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  return (
    <div className="page-stack">
      <div className="page-header">
        <div>
          <p className="eyebrow">Progress</p>
          <h2>Completed Tasks</h2>
        </div>
      </div>

      <section className="task-grid">
        {completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              variant="completed"
              onRestore={onRestoreTask}
              onDelete={onDeleteTask}
            />
          ))
        ) : (
          <div className="empty-state-container">
            <p className="empty-state">No tasks found.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Completed;
