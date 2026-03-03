import { useEffect, useState } from "react";
import API from "../api/axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">My Tasks</h2>

      <div className="flex mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 flex-1"
          placeholder="New Task"
        />
        <button
          onClick={createTask}
          className="bg-green-500 text-white px-4"
        >
          Add
        </button>
      </div>

      {tasks.map((task) => (
        <div key={task._id} className="border p-2 mb-2">
          {task.title}
        </div>
      ))}
    </div>
  );
};

export default Tasks;
