import { useEffect, useState } from "react";
import { User, Moon, Clock, Activity, Server, NotebookPen } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, dreams: 0 });
  const [loading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentDreams, setRecentDreams] = useState([]);

  // Example chart data (could be replaced with backend data)
  const activityData = [
    { name: "Mon", users: 4, dreams: 10 },
    { name: "Tue", users: 6, dreams: 12 },
    { name: "Wed", users: 3, dreams: 9 },
    { name: "Thu", users: 8, dreams: 15 },
    { name: "Fri", users: 5, dreams: 7 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await API.get("api/admin/dashboard");
        setStats(res.data);

        const [usersRes, dreamsRes] = await Promise.all([
          API.get("api/admin/users?limit=3"),
          API.get("api/admin/dreams?limit=3"),
        ]);

        const usersData = Array.isArray(usersRes.data)
          ? usersRes.data
          : usersRes.data.users || [];

        const dreamsData = Array.isArray(dreamsRes.data)
          ? dreamsRes.data
          : dreamsRes.data.dreams || [];

        setRecentUsers(usersData.slice(0, 3));
        setRecentDreams(dreamsData.slice(0, 3));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = dateTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  // Skeleton loader
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

        <div className="p-6 pt-24 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {getGreeting()}, Admin 👋
              </h2>
              <p className="text-gray-500 mt-1">
                Here’s what’s happening with Dream Journal today.
              </p>
            </div>

            <div className="flex items-center gap-2 mt-3 sm:mt-0 text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="text-indigo-600" />
              <span className="font-medium">
                {dateTime.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                • {dateTime.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {loading ? (
              <>
                {skeletonCard}
                {skeletonCard}
              </>
            ) : (
              <>
                <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-all flex items-center space-x-4">
                  <div className="p-3 bg-blue-500 text-white rounded-full shadow-md">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-medium">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.users}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition-all flex items-center space-x-4">
                  <div className="p-3 bg-purple-500 text-white rounded-full shadow-md">
                    <Moon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-medium">Total Dreams</h3>
                    <p className="text-3xl font-bold text-gray-800">
                      {stats.dreams}
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-teal-50 p-6 rounded-xl shadow hover:shadow-lg transition-all flex items-center space-x-4">
                  <div className="p-3 bg-green-500 text-white rounded-full shadow-md">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-medium">
                      Active Sessions
                    </h3>
                    <p className="text-3xl font-bold text-gray-800">—</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-100 to-blue-50 p-6 rounded-xl shadow hover:shadow-lg transition-all flex items-center space-x-4">
                  <div className="p-3 bg-indigo-500 text-white rounded-full shadow-md">
                    <Server className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-medium">Server Status</h3>
                    <p className="text-lg font-semibold text-green-600">
                      Online
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Weekly Overview Chart */}
          <div className="mt-10 bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Activity className="text-indigo-600" /> Weekly Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#4f46e5"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="dreams"
                  stroke="#ec4899"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Users & Dreams */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Recent Users
              </h3>
              <ul className="space-y-3">
                {recentUsers.length > 0 ? (
                  recentUsers.slice(0, 3).map((u) => (
                    <li
                      key={u._id}
                      className="flex items-center justify-between text-gray-700"
                    >
                      <span>{u.name}</span>
                      <span className="text-sm text-gray-500">{u.email}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No users yet.</p>
                )}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                Recent Dreams
              </h3>
              <ul className="space-y-3">
                {recentDreams.length > 0 ? (
                  recentDreams.slice(0, 3).map((d) => (
                    <li
                      key={d._id}
                      className="flex items-center justify-between text-gray-700"
                    >
                      <span>{d.title}</span>
                      <span className="text-sm text-gray-500">
                        {d.user?.name || "Unknown"}
                      </span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No dreams yet.</p>
                )}
              </ul>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="mt-10 bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <NotebookPen className="text-indigo-600" /> Admin Notes
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write reminders, updates, or admin notes..."
              className="w-full border rounded-lg p-3 text-gray-700 bg-gray-50 focus:ring-2 focus:ring-indigo-500"
              rows="4"
            />
          </div>

          {/* Original Recent Activity Section */}
          <div className="mt-10 bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
              <Activity className="text-indigo-600" /> Recent Activity
            </h3>
            <p className="text-gray-500 italic">
              No recent activity to display.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
