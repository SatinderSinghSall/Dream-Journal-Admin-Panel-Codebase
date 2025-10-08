import { useEffect, useState } from "react";
import { BookOpen, User, Trash2, Search } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import API from "../api/api";

const Dreams = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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

  const filteredDreams = dreams.filter(
    (d) =>
      d.title?.toLowerCase().includes(search.toLowerCase()) ||
      d.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Skeleton rows
  const skeletonRows = Array.from({ length: 4 }).map((_, index) => (
    <tr key={index} className="border-b">
      <td className="py-3 px-4">
        <div className="h-4 w-3/4 bg-gray-300 rounded-full animate-pulse"></div>
      </td>
      <td className="py-3 px-4">
        <div className="h-4 w-5/6 bg-gray-300 rounded-full animate-pulse"></div>
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

        <div className="p-6 pt-24 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                <BookOpen className="text-indigo-600" /> Dreams
              </h2>
              <p className="text-gray-500 mt-1">
                View and manage all dreams shared by users.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mt-4 sm:mt-0">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search dreams..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-64 bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Table/Card Wrapper */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            {/* TABLE VIEW (Desktop) */}
            <div className="w-full overflow-x-auto rounded-xl shadow hidden sm:block">
              <table className="w-full min-w-[700px] text-sm text-gray-700 border-collapse">
                <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <tr>
                    <th className="py-3 px-4 text-left whitespace-nowrap">
                      Title
                    </th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">
                      Owner
                    </th>
                    <th className="py-3 px-4 text-left whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    skeletonRows
                  ) : filteredDreams.length > 0 ? (
                    filteredDreams.map((dream, index) => (
                      <tr
                        key={dream._id}
                        className={`border-b transition-colors ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-indigo-50 cursor-pointer`}
                        onClick={() => setSelectedDream(dream)}
                      >
                        <td className="py-3 px-4 whitespace-nowrap font-medium flex items-center gap-2">
                          <BookOpen className="text-indigo-500 w-5 h-5 shrink-0" />
                          <span className="truncate">{dream.title || "—"}</span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap flex items-center gap-2">
                          <User className="text-gray-400 w-4 h-4 shrink-0" />
                          <span className="truncate">
                            {dream.user?.name || "Unknown"}
                          </span>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteDream(dream._id);
                            }}
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
                        colSpan="3"
                        className="text-center py-6 text-gray-500 italic"
                      >
                        No dreams found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* CARD VIEW (Mobile) */}
            <div className="block sm:hidden p-2 space-y-3">
              {loading ? (
                <div className="animate-pulse space-y-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-gray-200 h-20 rounded-lg" />
                  ))}
                </div>
              ) : filteredDreams.length > 0 ? (
                filteredDreams.map((dream) => (
                  <div
                    key={dream._id}
                    onClick={() => setSelectedDream(dream)}
                    className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-indigo-600 w-5 h-5" />
                      <p className="font-semibold text-gray-800">
                        {dream.title || "—"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span className="text-sm break-all">
                        {dream.user?.name || "Unknown"}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDream(dream._id);
                      }}
                      className="mt-2 flex items-center justify-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg shadow-sm transition-all text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 italic py-4">
                  No dreams found
                </p>
              )}
            </div>
          </div>

          {/* Dream Details Modal */}
          {selectedDream && (
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
              <div
                className="absolute inset-0 bg-gray-800/30 backdrop-blur-sm"
                onClick={() => setSelectedDream(null)}
              ></div>

              <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 animate-fadeIn z-10">
                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-xl font-bold"
                  onClick={() => setSelectedDream(null)}
                >
                  ✕
                </button>
                <h3 className="text-2xl font-bold mb-3 text-indigo-700">
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
