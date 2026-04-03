import {
  FaCar,
  FaHome,
  FaTv,
  FaTshirt,
  FaCouch,
  FaBriefcase,
  FaFutbol,
  FaBook,
} from "react-icons/fa";

const categories = [
  { name: "All Ads", icon: null },
  { name: "Vehicles", icon: <FaCar /> },
  { name: "Property", icon: <FaHome /> },
  { name: "Electronics", icon: <FaTv /> },
  { name: "Fashion", icon: <FaTshirt /> },
  { name: "Furniture", icon: <FaCouch /> },
  { name: "Jobs", icon: <FaBriefcase /> },
  { name: "Hobbies", icon: <FaFutbol /> },
  { name: "Books", icon: <FaBook /> },
];


function CategoriesBar({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="w-full mt-10 py-4">
      <h2 className="mb-5 text-[1.35rem] font-semibold tracking-[-0.02em] text-gray-900">
        Browse Categories
      </h2>

      <div className="flex flex-wrap gap-3">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat.name)}
            className={`group inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-[0.95rem] font-medium tracking-[-0.01em] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm
              ${
                selectedCategory === cat.name
                  ? "border-green-500 bg-green-50 text-green-700 shadow-sm"
                  : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
              }`}
          >
            {cat.icon && (
              <span
                className={`text-[1.05rem] transition-colors ${
                  selectedCategory === cat.name
                    ? "text-green-600"
                    : "text-green-600/90 group-hover:text-green-700"
                }`}
              >
                {cat.icon}
              </span>
            )}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoriesBar;