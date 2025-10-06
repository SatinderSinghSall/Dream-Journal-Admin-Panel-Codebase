import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../api/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // new loading state

  // Fetch users from backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await API.get("api/admin/users");
      // Ensure users is always an array
      const fetchedUsers = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.users)
        ? res.data.users
        : [];
      setUsers(fetchedUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setUsers([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  };

  // Delete a user
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

  // Skeleton loader rows
  const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
    <tr key={index} className="border-b">
      <td className="py-2 px-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded-full animate-pulse"></div>
      </td>
      <td className="py-2 px-4">
        <div className="h-4 w-5/6 bg-gray-300 rounded-full animate-pulse"></div>
      </td>
      <td className="py-2 px-4">
        <div className="h-4 w-1/2 bg-gray-300 rounded-full animate-pulse"></div>
      </td>
      <td className="py-2 px-4">
        <div className="h-8 w-20 bg-gray-300 rounded-full animate-pulse"></div>
      </td>
    </tr>
  ));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Users</h2>
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                skeletonRows
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
