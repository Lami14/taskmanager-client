import { useEffect, useState } from "react";
import API from "../api/axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status !== "completed").length;

  const chartData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Analytics</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg">Total Tasks</h3>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg">Completed</h3>
          <p className="text-2xl font-bold text-green-600">{completed}</p>
        </div>

        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg">Pending</h3>
          <p className="text-2xl font-bold text-red-600">{pending}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 shadow rounded">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
