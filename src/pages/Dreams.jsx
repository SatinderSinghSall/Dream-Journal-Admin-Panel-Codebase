import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../api/api";

const Dreams = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDream, setSelectedDream] = useState(null);

  const fetchDreams = async () => {
    setLoading(true);
    try {
      const res = await API.get("api/admin/dreams");
      const fetchedDreams = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.dreams)
        ? res.data.dreams
        : [];
      setDreams(fetchedDreams);
    } catch (err) {
      console.error("Error fetching dreams:", err);
      setDreams([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteDream = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dream?")) return;
    try {
      await API.delete(`/admin/dreams/${id}`);
      setDreams(dreams.filter((d) => d._id !== id));
      if (selectedDream?._id === id) setSelectedDream(null);
    } catch (err) {
      console.error("Error deleting dream:", err);
    }
  };

  useEffect(() => {
    fetchDreams();
  }, []);

  // Modern skeleton rows
  const skeletonRows = Array.from({ length: 5 }).map((_, index) => (
    <tr key={index} className="border-b">
      <td className="py-2 px-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded-full animate-pulse"></div>
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
          <h2 className="text-2xl font-bold mb-4">Dreams</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Owner</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  skeletonRows
                ) : dreams.length > 0 ? (
                  dreams.map((dream) => (
                    <tr
                      key={dream._id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                    >
                      <td
                        className="py-2 px-4"
                        onClick={() => setSelectedDream(dream)}
                      >
                        {dream.title}
                      </td>
                      <td
                        className="py-2 px-4"
                        onClick={() => setSelectedDream(dream)}
                      >
                        {dream.user?.name || "Unknown"}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => deleteDream(dream._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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

          {/* Modern Glassmorphic Modal */}
          {selectedDream && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              {/* Transparent overlay but very subtle */}
              <div
                className="absolute inset-0 bg-gray-200/20 backdrop-blur-sm"
                onClick={() => setSelectedDream(null)}
              ></div>

              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 animate-fadeIn z-10">
                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-bold"
                  onClick={() => setSelectedDream(null)}
                >
                  ✕
                </button>
                <h3 className="text-2xl font-bold mb-3">
                  {selectedDream.title}
                </h3>
                <p className="text-gray-500 mb-3">
                  Owner: {selectedDream.user?.name || "Unknown"} (
                  {selectedDream.user?.email || "N/A"})
                </p>
                <p className="mb-2">
                  <strong>Content:</strong> {selectedDream.content}
                </p>
                <p className="mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedDream.dateOfDream).toLocaleDateString()}
                </p>
                <p className="mb-2">
                  <strong>Tags:</strong>{" "}
                  {selectedDream.tags?.length
                    ? selectedDream.tags.join(", ")
                    : "None"}
                </p>
                <p className="mb-2">
                  <strong>Mood:</strong> {selectedDream.mood || "N/A"}
                </p>
                <p className="mb-2">
                  <strong>Rating:</strong> {selectedDream.rating || "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dreams;
