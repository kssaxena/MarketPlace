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
    <div className="w-full py-6 mt-10">
      <h2 className="text-xl font-semibold mb-4">Browse Categories</h2>

      <div className="flex flex-wrap gap-3">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat.name)}
            className={`
              flex items-center gap-2 px-4 py-2 border rounded-lg 
              transition
              ${selectedCategory === cat.name ? "bg-emerald-100 border-emerald-500" : "hover:bg-gray-100"}
            `}
          >
            {cat.icon && (
              <span className={`text-lg text-emerald-600`}>
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