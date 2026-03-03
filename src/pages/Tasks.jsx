import { useEffect, useState } from "react";
import API from "../api/axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await API.put(`/tasks/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post("/tasks", form);
    }

    setForm({ title: "", description: "", priority: "medium" });
    fetchTasks();
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const newStatus =
      task.status === "pending"
        ? "in-progress"
        : task.status === "in-progress"
        ? "completed"
        : "pending";

    await API.put(`/tasks/${task._id}`, { status: newStatus });
    fetchTasks();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>

      {/* Form */}
      <div className="bg-white p-4 shadow rounded mb-6">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 w-full mb-2"
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Task" : "Create Task"}
        </button>
      </div>

      {/* Task List */}
      {tasks.map((task) => (
        <div
          key={task._id}
          className="border p-4 mb-3 rounded shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm">
              Priority:{" "}
              <span className="font-semibold">{task.priority}</span>
            </p>
            <p className="text-sm">
              Status:{" "}
              <span className="font-semibold">{task.status}</span>
            </p>
          </div>

          <div className="space-x-2">
            <button
              onClick={() => toggleStatus(task)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Change Status
            </button>

            <button
              onClick={() => handleEdit(task)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tasks;
