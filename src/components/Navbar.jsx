import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 shadow">
      <h1 className="text-xl font-bold">Dream Journal - Admin Panel</h1>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        <FaSignOutAlt /> Logout
      </button>
    </div>
  );
};

export default Navbar;
