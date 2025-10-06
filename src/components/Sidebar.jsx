import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaMoon, FaTachometerAlt, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/users", icon: <FaUsers /> },
    { name: "Dreams", path: "/dreams", icon: <FaMoon /> },
  ];

  return (
    <div
      className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen p-5 pt-8 relative shadow-lg duration-300 ${
        open ? "w-70" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <div
        className="absolute top-5 right-5 cursor-pointer text-white text-xl hover:text-gray-300 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <FaBars
          className={`transform duration-300 ${open ? "" : "rotate-180"}`}
        />
      </div>

      {/* Logo / Title */}
      <div className="flex items-center gap-4 mb-8">
        <FaMoon className="text-3xl text-yellow-400" />
        <h1
          className={`text-2xl font-bold text-white origin-left duration-300 ${
            !open && "scale-0"
          }`}
        >
          Dream Journal
        </h1>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              to={item.path}
              key={item.name}
              className={`relative flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300
                ${
                  isActive
                    ? "bg-gray-700 shadow-inner border-l-4 border-yellow-400"
                    : ""
                }`}
            >
              <div className="text-lg">{item.icon}</div>
              <span
                className={`text-md font-medium whitespace-pre duration-300 ${
                  !open && "opacity-0 pointer-events-none"
                }`}
              >
                {item.name}
              </span>

              {/* Tooltip when collapsed */}
              {!open && (
                <span className="absolute left-full ml-2 w-max px-2 py-1 rounded-md bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-5 left-0 w-full flex justify-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold">
            S
          </div>
          {open && (
            <span className="text-sm text-gray-300">Satinder Singh Sall</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
