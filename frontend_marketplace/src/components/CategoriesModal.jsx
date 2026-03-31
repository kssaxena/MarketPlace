import { FaCar, FaHome, FaTv, FaTshirt, FaCouch, FaBriefcase, FaFutbol, FaBook } from "react-icons/fa";

function CategoriesModal({ onClose }) {
  const categories = [
    { name: "Vehicles", icon: <FaCar size={28} className="text-emerald-600" /> },
    { name: "Property", icon: <FaHome size={28} className="text-emerald-600" /> },
    { name: "Electronics", icon: <FaTv size={28} className="text-emerald-600" /> },
    { name: "Fashion", icon: <FaTshirt size={28} className="text-emerald-600" /> },
    { name: "Furniture", icon: <FaCouch size={28} className="text-emerald-600" /> },
    { name: "Jobs", icon: <FaBriefcase size={28} className="text-emerald-600" /> },
    { name: "Hobbies", icon: <FaFutbol size={28} className="text-emerald-600" /> },
    { name: "Books", icon: <FaBook size={28} className="text-emerald-600" /> },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl relative"
      >
        
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">All Categories</h2>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition"
            >
              {cat.icon}
              <p className="text-sm font-medium">{cat.name}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default CategoriesModal;