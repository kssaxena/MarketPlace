import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    navigate(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : "/search");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        activePage="login"
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onPostAdClick={() => navigate("/post-ad")}
      />

      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Log In
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Welcome back! Please enter your details.
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start gap-3 shadow-md">
            <div className="text-red-600 text-xl leading-none mt-0.5">⚠</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Login Failed</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button
              type="button"
              onClick={() => setError("")}
              className="text-red-500 hover:text-red-700 font-bold text-lg leading-none hover:bg-red-100 rounded px-2 py-1 transition"
              aria-label="Close error"
            >
              ×
            </button>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              required
            />
          </div>

          <div>

            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <span className="text-xs text-teal-600 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2.5 rounded-md font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-teal-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <div className="flex justify-center gap-4 text-xs text-gray-400 mt-8">
          <Link to="/help" className="hover:underline">
            Help Center
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-xs text-teal-600 hover:underline"
          >
            ← Back to Home
          </Link>
        </div>

      </div>

      </div>

    </div>
  );
}
