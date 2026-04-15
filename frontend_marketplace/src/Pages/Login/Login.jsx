import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header.jsx";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();
    navigate(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : "/search");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password
        }
      );

      alert("Login successful!");

      // store token
      localStorage.setItem("token", res.data.data.token);

      // store user
      localStorage.setItem("user", JSON.stringify(res.data.data));

      // notify navbar to update
      window.dispatchEvent(new Event("userLoggedIn"));

      // redirect to homepage
      navigate("/");

    } catch (error) {

      console.log(error.response?.data);

      alert("Invalid email or password");

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

        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Log In
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Welcome back! Please enter your details.
        </p>

        {/* FORM */}
        <form className="space-y-4" onSubmit={handleLogin}>

          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2.5 rounded-md font-medium hover:bg-teal-700 transition"
          >
            Login
          </button>

        </form>

        {/* SIGN UP LINK */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-teal-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* FOOTER */}
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

        {/* BACK */}
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
