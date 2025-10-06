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
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <FaBars
        className="absolute cursor-pointer top-5 right-5 text-white text-xl hover:text-gray-300 transition-colors"
        onClick={() => setOpen(!open)}
      />

      {/* Logo / Title */}
      <div className="flex items-center gap-4 mb-8">
        <FaMoon className="text-3xl text-yellow-400" />
        <h1
          className={`text-2xl font-bold text-white origin-left duration-300 ${
            !open && "scale-0"
          }`}
        >
          DreamApp
        </h1>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300 ${
              location.pathname === item.path ? "bg-gray-700 shadow-inner" : ""
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
          </Link>
        ))}
      </div>

      {/* Optional Footer */}
      <div
        className={`absolute bottom-5 w-full flex items-center justify-center ${
          !open && "flex-col gap-2"
        }`}
      >
        <span
          className={`text-sm text-gray-400 duration-300 ${!open && "hidden"}`}
        >
          Satinder Singh Sall
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
