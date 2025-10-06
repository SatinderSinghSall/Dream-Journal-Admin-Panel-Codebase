import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../api/api";

import { User, Moon } from "lucide-react"; // icons

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, dreams: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await API.get("api/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  // Skeleton card
  const skeletonCard = (
    <div className="bg-white p-6 rounded-xl shadow flex items-center space-x-4 animate-pulse">
      <div className="p-3 bg-gray-200 rounded-full w-12 h-12"></div>
      <div className="flex-1 space-y-2 py-1">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loading ? (
              <>
                {skeletonCard}
                {skeletonCard}
              </>
            ) : (
              <>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <User className="text-blue-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-gray-500">Users</h3>
                    <p className="text-3xl font-bold">{stats.users}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Moon className="text-purple-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-gray-500">Dreams</h3>
                    <p className="text-3xl font-bold">{stats.dreams}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
