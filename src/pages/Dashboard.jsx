import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, dreams: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-gray-500">Users</h3>
              <p className="text-3xl font-bold">{stats.users}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-gray-500">Dreams</h3>
              <p className="text-3xl font-bold">{stats.dreams}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
