import { useState, useRef, useEffect } from "react";
import {
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaMoon,
  FaUserCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setMenuOpen(false);
    navigate("/login");
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      role="navigation"
      className="w-full bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 shadow-md sticky top-0 left-0 z-[40]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <FaMoon className="text-yellow-400 text-2xl" />
          <h1 className="text-lg sm:text-xl font-bold text-white tracking-wide">
            Dream Journal{" "}
            <span className="hidden sm:inline">– Admin Panel</span>
          </h1>
        </div>

        {/* Desktop Section */}
        <div className="hidden sm:flex items-center gap-4 relative">
          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleDropdownToggle}
              className={`flex items-center gap-2 text-white font-medium px-3 py-1.5 rounded-lg transition-all ${
                dropdownOpen ? "bg-white/20" : "hover:bg-white/10"
              }`}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <FaUserCircle className="text-2xl text-yellow-300" />
              <span>Admin</span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-44 bg-black/30 backdrop-blur-md rounded-xl shadow-lg border border-white/20 text-white overflow-hidden z-[50]"
                >
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 transition"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 transition"
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-red-600/80 transition flex items-center gap-2 text-red-300"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Logout */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl 
                       font-medium shadow-md hover:shadow-lg transition-all"
          >
            <FaSignOutAlt className="text-white" />
            Logout
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="text-white text-2xl focus:outline-none"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden bg-gradient-to-b from-indigo-700 via-purple-700 to-pink-600 border-t border-white/10 z-[30]"
          >
            <div className="flex flex-col px-4 py-3 space-y-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/");
                }}
                className="text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all text-left"
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/");
                }}
                className="text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all text-left"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
