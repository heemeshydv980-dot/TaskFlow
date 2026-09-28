function TaskCard({ task, onEdit, onDelete, onComplete, onRestore, variant = 'default' }) {
  const priorityClass = `priority-badge priority-badge--${task.priority.toLowerCase()}`;
  const statusClass = `status-badge status-badge--${task.status.toLowerCase().replace(/\s+/g, '-')}`;

  const formatDate = (value) => {
    if (!value) return 'No date';
    return new Date(value).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <article className="task-card">
      <div className="task-card__top">
        <div>
          <h4>{task.title}</h4>
          <p className="task-card__category">{task.category || 'General'}</p>
        </div>
        <span className={statusClass}>{task.status}</span>
      </div>

      <p className="task-card__description">{task.description || 'No description added yet.'}</p>

      <div className="task-card__meta">
        <span className={priorityClass}>{task.priority}</span>
        <span>Due: {formatDate(task.dueDate)}</span>
      </div>

      <div className="task-card__details">
        <span>Created: {formatDate(task.createdAt)}</span>
      </div>

      <div className="task-card__actions">
        {variant === 'completed' ? (
          <>
            <button type="button" className="btn btn--secondary" onClick={() => onRestore(task.id)}>
              Restore
            </button>
            <button type="button" className="btn btn--danger" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn--secondary" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button type="button" className="btn btn--danger" onClick={() => onDelete(task.id)}>
              Delete
            </button>
            {task.status !== 'Completed' && (
              <button type="button" className="btn btn--primary" onClick={() => onComplete(task.id)}>
                Complete
              </button>
            )}
          </>
        )}
      </div>
    </article>
  );
}

export default TaskCard;
