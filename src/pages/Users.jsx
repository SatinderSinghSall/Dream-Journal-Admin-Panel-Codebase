import { useEffect, useState } from "react";
import { User, Mail, Shield, Trash2, Search } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../api/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("api/admin/users");
      const fetchedUsers = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.users)
        ? res.data.users
        : [];
      setUsers(fetchedUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/user/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  // Skeleton loading rows
  const skeletonRows = Array.from({ length: 4 }).map((_, index) => (
    <tr key={index} className="border-b">
      <td className="py-3 px-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded-full animate-pulse"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 w-5/6 bg-gray-300 rounded-full animate-pulse"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 w-1/2 bg-gray-300 rounded-full animate-pulse"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-8 w-20 bg-gray-300 rounded-full animate-pulse"></div>
      </td>
    </tr>
  ));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />

        <div className="p-6 pt-24">
          {" "}
          {/* padding top for fixed Navbar */}
          {/* Header section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <User className="text-indigo-600" /> Users
              </h2>
              <p className="text-gray-500 mt-1">
                Manage all registered Dream Journal users here.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mt-4 sm:mt-0">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-64 bg-white shadow-sm"
              />
            </div>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="w-full overflow-x-auto rounded-xl shadow">
              <table className="w-full min-w-[600px] text-sm text-gray-700 border-collapse">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left whitespace-nowrap">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">
                      Email
                    </th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">
                      Role
                    </th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    skeletonRows
                  ) : filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className={`border-b transition-colors ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-indigo-50`}
                      >
                        <td className="py-3 px-4 whitespace-nowrap font-medium flex items-center gap-2">
                          <User className="text-indigo-500 w-5 h-5 shrink-0" />
                          <span className="truncate">{user.name || "—"}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
                          <Mail className="text-gray-400 w-4 h-4 shrink-0" />
                          <span className="truncate">{user.email || "—"}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
                          <Shield className="text-gray-400 w-4 h-4 shrink-0" />
                          {user.role || "user"}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-gray-500 italic"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="block sm:hidden p-2 space-y-3">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-gray-200 h-20 rounded-lg" />
                  ))}
                </div>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <User className="text-indigo-600 w-5 h-5" />
                      <p className="font-semibold text-gray-800">
                        {user.name || "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm break-all">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Shield className="w-4 h-4" />
                      {user.role || "user"}
                    </div>
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="mt-2 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 italic py-4">
                  No users found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
