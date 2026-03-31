import { useState } from "react";
import api from "../Utility/api";

function LoginModal({ onClose }) {
  const [role, setRole] = useState("user"); // user or community

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      let res;

      if (role === "user") {
        // NORMAL USER LOGIN
        res = await api.post("/users/login", {
          email,
          password,
        });
      } else {
        // COMMUNITY (SELLER) LOGIN
        res = await api.post("/community/login", {
          email,
          password,
        });
      }

      console.log("Login Success:", res.data);

      // 🔐 Store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      onClose();

    } catch (err) {
      console.log(err);
      alert("Login failed!");
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl relative"
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-5">Login</h2>

        {/* 🔥 ROLE TOGGLE */}
        <div className="flex gap-4 mb-5">
          <button
            onClick={() => setRole("user")}
            className={`px-4 py-2 rounded-lg ${
              role === "user"
                ? "bg-emerald-500 text-white"
                : "bg-gray-200"
            }`}
          >
            User
          </button>

          <button
            onClick={() => setRole("community")}
            className={`px-4 py-2 rounded-lg ${
              role === "community"
                ? "bg-emerald-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Seller
          </button>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-3 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full border p-3 rounded-xl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        {/* SUBMIT */}
        <button
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-lg font-medium"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  );
}

export default LoginModal;