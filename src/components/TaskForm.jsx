import { useEffect, useState } from 'react';

const emptyTask = {
  title: '',
  description: '',
  priority: 'Medium',
  status: 'Pending',
  dueDate: '',
  category: '',
};

function TaskForm({ initialValues, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialValues || emptyTask);

  useEffect(() => {
    setFormData(initialValues || emptyTask);
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim() || !formData.description.trim() || !formData.dueDate || !formData.category.trim()) {
      alert('Please fill in all required fields before saving.');
      return;
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__grid">
        <label>
          <span>Task Title</span>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
          />
        </label>

        <label>
          <span>Category</span>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Academic"
          />
        </label>

        <label>
          <span>Priority</span>
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <label>
          <span>Status</span>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>

        <label className="task-form__full">
          <span>Description</span>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Add task details"
          />
        </label>

        <label>
          <span>Due Date</span>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        </label>
      </div>

      <div className="task-form__actions">
        <button type="button" className="btn btn--secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          Save Task
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
