import { useMemo, useState } from 'react';
import Modal from '../components/Modal';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const emptyTask = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  dueDate: '',
  category: '',
};

function Tasks({ tasks, onAddTask, onUpdateTask, onDeleteTask, onCompleteTask }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (searchTerm.trim()) {
      const searchValue = searchTerm.trim().toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchValue) ||
          task.description.toLowerCase().includes(searchValue),
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter((task) => task.status === statusFilter);
    }

    if (priorityFilter !== 'All') {
      result = result.filter((task) => task.priority === priorityFilter);
    }

    if (sortBy === 'dueDate') {
      result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [tasks, searchTerm, statusFilter, priorityFilter, sortBy]);

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
    } else {
      onAddTask(taskData);
    }

    closeModal();
  };

  return (
    <div className="page-stack">
      <div className="page-header page-header--with-action">
        <div>
          <p className="eyebrow">Tasks</p>
          <h2>My Tasks</h2>
        </div>
        <button type="button" className="btn btn--primary" onClick={openAddModal}>
          + Add Task
        </button>
      </div>

      <section className="panel filter-panel">
        <div className="filter-row">
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search tasks..."
            className="search-input"
          />

          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
            <option value="All">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="dueDate">Sort by Due Date</option>
            <option value="latest">Latest Added</option>
          </select>
        </div>
      </section>

      <section className="task-grid">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={openEditModal}
              onDelete={onDeleteTask}
              onComplete={onCompleteTask}
            />
          ))
        ) : (
          <div className="empty-state-container">
            <p className="empty-state">No tasks found.</p>
          </div>
        )}
      </section>

      <Modal
        isOpen={isModalOpen}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
        onClose={closeModal}
      >
        <TaskForm
          initialValues={editingTask || emptyTask}
          onSubmit={handleSaveTask}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}

export default Tasks;
