import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaMoon,
  FaTachometerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(window.innerWidth >= 1024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setOpen(false);
      else setOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
    { name: "Dreams", path: "/dreams", icon: <FaMoon /> },
  ];

  return (
    <>
      {/* Mobile Floating Toggle Button */}
      {isMobile && !open && (
        <motion.button
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.9 }}
          className="fixed top-5 left-5 z-50 bg-gradient-to-r from-indigo-600 to-pink-500 
          text-white p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          <FaBars size={20} />
        </motion.button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background Overlay for Mobile */}
            {isMobile && (
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setOpen(false)}
              />
            )}

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: isMobile ? -260 : 0, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isMobile ? -260 : 0, opacity: 0 }}
              transition={{
                duration: 0.25, // ⚡ Faster animation (reduced from ~1s)
                ease: [0.45, 0, 0.55, 1], // smooth cubic ease
              }}
              className={`fixed lg:static top-0 left-0 z-50 h-screen flex flex-col justify-between 
              bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#312e81]
              border-r border-white/10 shadow-xl backdrop-blur-md p-5 pt-8
              transition-all duration-200 ${open ? "w-64" : "w-20"}`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <FaMoon className="text-3xl text-yellow-400" />
                  <h1
                    className={`text-2xl font-extrabold tracking-tight text-white ${
                      !open && "hidden"
                    }`}
                  >
                    Dream Journal
                  </h1>
                </div>
                {isMobile && (
                  <button
                    onClick={() => setOpen(false)}
                    className="text-white text-2xl hover:text-pink-400 transition"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              {/* Menu */}
              <nav className="flex flex-col gap-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      to={item.path}
                      key={item.name}
                      className={`group relative flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200
                        ${
                          isActive
                            ? "bg-gradient-to-r from-pink-600/70 to-indigo-600/70 border-l-4 border-yellow-400"
                            : "hover:bg-white/10"
                        }`}
                    >
                      <div
                        className={`text-lg transition-transform duration-300 ${
                          isActive
                            ? "text-yellow-300 scale-110"
                            : "text-gray-300 group-hover:text-white"
                        }`}
                      >
                        {item.icon}
                      </div>

                      {open && (
                        <span
                          className={`font-medium text-sm tracking-wide ${
                            isActive ? "text-yellow-200" : "text-gray-300"
                          }`}
                        >
                          {item.name}
                        </span>
                      )}

                      {!open && (
                        <span className="absolute left-full ml-2 w-max px-2 py-1 rounded-md bg-gray-900 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Footer */}
              <div className="mt-6 border-t border-white/10 pt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold">
                  S
                </div>
                {open && (
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      Satinder Singh Sall
                    </span>
                    <span className="text-xs text-gray-400">Admin</span>
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
