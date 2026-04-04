import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header.jsx";
import {
  getWishlistItems,
  removeFromWishlist,
  subscribeMarketplaceStore,
} from "../../utility/marketplaceStore.js";

const DUMMY_USER = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 234-5678",
  location: "New York, NY",
};

const DUMMY_MESSAGES = [
  { id: 1, from: "Sarah M.", message: "Is the Toyota still available?", time: "2h ago", avatar: "S" },
  { id: 2, from: "John D.", message: "Can you do $800 for the iPhone?", time: "5h ago", avatar: "J" },
  { id: 3, from: "Priya K.", message: "What's the condition of the bed?", time: "1d ago", avatar: "P" },
];

const DUMMY_TRANSACTIONS = [
  { id: 1, title: "Nike Air Jordan 1", amount: "$185", date: "Mar 28, 2026", type: "Sale" },
  { id: 2, title: "Samsung 65\" TV", amount: "$1,100", date: "Mar 15, 2026", type: "Purchase" },
  { id: 3, title: "IKEA MALM Bed", amount: "$320", date: "Feb 20, 2026", type: "Sale" },
];

const NAV_ITEMS = ["Profile", "My Ads", "Messages", "Favorites", "Transactions", "Settings"];

export default function Account() {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser || DUMMY_USER);
  const [activeTab, setActiveTab] = useState("Profile");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || DUMMY_USER.name);
  const [phone, setPhone] = useState(user?.phone || DUMMY_USER.phone);
  const [location, setLocation] = useState(user?.location || DUMMY_USER.location);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // ── My Ads — from localStorage ──
  const [myAds, setMyAds] = useState(() =>
    JSON.parse(localStorage.getItem("myAds") || "[]")
  );

  // ── Wishlist — live from store ──
  const [wishlist, setWishlist] = useState(getWishlistItems());

  useEffect(() => {
    const unsub = subscribeMarketplaceStore(() => {
      setWishlist(getWishlistItems());
    });
    return unsub;
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const saveProfile = () => {
    const updated = { ...user, name, phone, location };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
    setEditing(false);
  };

  const deleteAd = (id) => {
    const updated = myAds.filter((a) => a.id !== id);
    setMyAds(updated);
    localStorage.setItem("myAds", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activePage="account" />

      <div className="flex">

        {/* LEFT SIDEBAR */}
        <div className="w-64 min-h-screen bg-white shadow-md p-6 flex flex-col">

          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-teal-600 text-white flex items-center justify-center text-3xl font-bold mb-3">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <h2 className="font-semibold text-lg text-center">{user?.name}</h2>
            <p className="text-xs text-gray-400 text-center">{user?.email}</p>
          </div>

          <div className="flex flex-col gap-1 text-sm flex-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`text-left px-3 py-2 rounded-lg transition font-medium flex items-center justify-between ${
                  activeTab === item
                    ? "bg-teal-50 text-teal-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-teal-600"
                }`}
              >
                {item}
                {item === "Favorites" && wishlist.length > 0 && (
                  <span className="text-xs bg-teal-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
                {item === "My Ads" && myAds.length > 0 && (
                  <span className="text-xs bg-teal-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {myAds.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={logout}
            className="text-left text-sm text-red-500 hover:underline px-3 py-2 mt-4"
          >
            Logout
          </button>

        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-8">

          {/* ── PROFILE ── */}
          {activeTab === "Profile" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex justify-between mb-6">
                <h3 className="font-semibold text-lg">Personal Information</h3>
                {editing ? (
                  <button onClick={saveProfile} className="text-teal-600 text-sm font-medium">Save</button>
                ) : (
                  <button onClick={() => setEditing(true)} className="text-teal-600 text-sm font-medium">Edit Profile</button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Full Name</p>
                  {editing ? (
                    <input value={name} onChange={(e) => setName(e.target.value)} className="border px-2 py-1 rounded w-full" />
                  ) : (
                    <p className="font-medium text-gray-800">{user?.name}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Email</p>
                  <p className="font-medium text-gray-800">{user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Phone</p>
                  {editing ? (
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} className="border px-2 py-1 rounded w-full" />
                  ) : (
                    <p className="font-medium text-gray-800">{user?.phone}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Location</p>
                  {editing ? (
                    <input value={location} onChange={(e) => setLocation(e.target.value)} className="border px-2 py-1 rounded w-full" />
                  ) : (
                    <p className="font-medium text-gray-800">{user?.location || "Add location"}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── MY ADS ── */}
          {activeTab === "My Ads" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">My Ads</h3>
                <button
                  onClick={() => navigate("/post-ad")}
                  className="text-sm bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition"
                >
                  + Post New Ad
                </button>
              </div>

              {myAds.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <span className="text-5xl mb-4">📋</span>
                  <p className="font-medium">No ads posted yet</p>
                  <p className="text-sm mt-1">Click "Post New Ad" to get started</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {myAds.map((ad) => (
                    <div key={ad.id} className="flex items-center gap-4 border border-gray-100 rounded-xl p-4">
                      <img src={ad.image} alt={ad.title} className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{ad.title}</p>
                        <p className="text-teal-600 font-semibold text-sm mt-1">{ad.price}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{ad.category}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          ad.status === "Active" ? "bg-teal-50 text-teal-700" : "bg-gray-100 text-gray-500"
                        }`}>
                          {ad.status}
                        </span>
                        <button
                          onClick={() => deleteAd(ad.id)}
                          className="text-xs text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── MESSAGES ── */}
          {activeTab === "Messages" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-6">Messages</h3>
              <div className="flex flex-col gap-3">
                {DUMMY_MESSAGES.map((msg) => (
                  <div key={msg.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition">
                    <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center font-semibold text-sm flex-shrink-0">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm">{msg.from}</p>
                      <p className="text-gray-400 text-xs truncate">{msg.message}</p>
                    </div>
                    <span className="text-xs text-gray-300 flex-shrink-0">{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── FAVORITES ── */}
          {activeTab === "Favorites" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg">Favorites</h3>
                <span className="text-sm text-gray-400">{wishlist.length} saved</span>
              </div>

              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <span className="text-5xl mb-4">🤍</span>
                  <p className="font-medium">No favorites yet</p>
                  <p className="text-sm mt-1">Add items to your wishlist from any product</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border border-gray-100 rounded-xl p-4">
                      <img src={item.image} alt={item.title} className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{item.title}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.location}</p>
                      </div>
                      <p className="text-teal-600 font-semibold text-sm flex-shrink-0">
                        ${item.price?.toLocaleString?.() ?? item.price}
                      </p>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="text-gray-300 hover:text-red-400 transition text-lg flex-shrink-0"
                        title="Remove from favorites"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── TRANSACTIONS ── */}
          {activeTab === "Transactions" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-6">Transactions</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium">Item</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {DUMMY_TRANSACTIONS.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-50">
                      <td className="py-3 font-medium text-gray-800">{tx.title}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          tx.type === "Sale" ? "bg-teal-50 text-teal-700" : "bg-blue-50 text-blue-700"
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-3 text-gray-400">{tx.date}</td>
                      <td className="py-3 text-right font-semibold text-gray-800">{tx.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {activeTab === "Settings" && (
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-6">Settings</h3>
              <div className="flex flex-col gap-5 text-sm">

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">Email Notifications</p>
                    <p className="text-gray-400 text-xs mt-0.5">Receive updates about your ads and messages</p>
                  </div>
                  <button
                    onClick={() => setNotifications(!notifications)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${notifications ? "bg-teal-500" : "bg-gray-200"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifications ? "left-6" : "left-1"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">Dark Mode</p>
                    <p className="text-gray-400 text-xs mt-0.5">Switch to a darker interface</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${darkMode ? "bg-teal-500" : "bg-gray-200"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? "left-6" : "left-1"}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-800">Change Password</p>
                    <p className="text-gray-400 text-xs mt-0.5">Update your account password</p>
                  </div>
                  <button className="text-teal-600 font-medium hover:underline">Update</button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-red-500">Delete Account</p>
                    <p className="text-gray-400 text-xs mt-0.5">Permanently remove your account</p>
                  </div>
                  <button className="text-red-500 font-medium hover:underline">Delete</button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
