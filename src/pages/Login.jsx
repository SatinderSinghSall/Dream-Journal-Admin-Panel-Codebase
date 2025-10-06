import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import API from "../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/api/admin/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md md:p-10 transition-all duration-300 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-600 mb-1 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6 relative">
          <label className="block text-gray-600 mb-1 font-medium">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition ${
            loading ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 w-5 h-5" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-gray-400 mt-6 text-sm text-center">
          © 2025 Admin Panel
        </p>
      </form>
    </div>
  );
};

export default Login;
