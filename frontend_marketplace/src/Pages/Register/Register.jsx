import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header.jsx";
import { COUNTRY_CODES } from "../../constants/auth.js";
import { useAuth } from "../../contexts/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneError, setPhoneError] = useState("");
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

  const getStrength = () => {
    if (password.length === 0) return null;
    if (password.length < 6) return "weak";
    if (password.length < 10) return "medium";
    return "strong";
  };

  const strength = getStrength();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (phone.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password, countryCode + phone);
      alert("Account created successfully!");
      navigate("/account");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        activePage="register"
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onPostAdClick={() => navigate("/post-ad")}
      />

      <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Join the Marketplace
        </h2>

        <p className="text-sm text-gray-500 mb-6">
          Connect with buyers in your neighborhood.
        </p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start gap-3 shadow-md">
            <div className="text-red-600 text-xl leading-none mt-0.5">⚠</div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-red-800">Registration Failed</p>
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

        <form className="space-y-4" onSubmit={handleRegister}>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>

            <div className="flex gap-2">

              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>

              <input
                type="tel"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "");
                  setPhone(digits);
                  setPhoneError("");
                }}
                className="flex-1 px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />

            </div>

            {phoneError && (
              <p className="text-red-500 text-xs mt-1">
                {phoneError}
              </p>
            )}
          </div>

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            {strength && (
              <>
                <div className="mt-2 h-1 w-full bg-gray-200 rounded">

                  <div
                    className={`h-1 rounded transition-all ${
                      strength === "weak"
                        ? "w-1/3 bg-red-500"
                        : strength === "medium"
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-teal-600"
                    }`}
                  />

                </div>

                <p className="text-xs mt-1 text-gray-500">
                  {strength.charAt(0).toUpperCase() + strength.slice(1)} strength
                </p>
              </>
            )}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2.5 rounded-md font-medium hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-600 font-medium hover:underline"
          >
            Log In
          </Link>
        </p>

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
