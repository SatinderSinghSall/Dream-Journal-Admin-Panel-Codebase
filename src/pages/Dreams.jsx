import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../api/api";

const Dreams = () => {
  const [dreams, setDreams] = useState([]);

  const fetchDreams = async () => {
    try {
      const res = await API.get("/admin/dreams"); // Make sure backend is running
      setDreams(res.data);
    } catch (err) {
      console.error("Error fetching dreams:", err);
      alert("Failed to fetch dreams. Is the backend running?");
    }
  };

  const deleteDream = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dream?")) return;
    try {
      await API.delete(`/admin/dreams/${id}`); // Backend must have DELETE route
      setDreams(dreams.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Error deleting dream:", err);
      alert("Failed to delete dream.");
    }
  };

  useEffect(() => {
    fetchDreams();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Dreams</h2>
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4">Title</th>
                <th className="py-2 px-4">Owner</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dreams.length > 0 ? (
                dreams.map((dream) => (
                  <tr key={dream._id} className="border-b">
                    <td className="py-2 px-4">{dream.title}</td>
                    <td className="py-2 px-4">
                      {dream.user?.name || "Unknown"}
                    </td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => deleteDream(dream._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No dreams found
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

export default Dreams;
