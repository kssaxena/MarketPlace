import { FaCar, FaHome, FaTshirt, FaCouch, FaBriefcase, FaFutbol, FaBook, FaTv } from "react-icons/fa";

function Categories() {
  const categories = [
    { name: "All Ads", icon: null },
    { name: " Vehicles", icon: <FaCar /> },
    { name: " Property", icon: <FaHome /> },
    { name: " Electronics", icon: <FaTv /> },
    { name: " Fashion", icon: <FaTshirt /> },
    { name: " Furniture", icon: <FaCouch /> },
    { name: " Jobs", icon: <FaBriefcase /> },
    { name: " Hobbies", icon: <FaFutbol /> },
    { name: " Books", icon: <FaBook /> }
  ];

  return (
    <div className="category-section">
      <h2>Browse Categories</h2>

      <div className="category-list">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-btn ${index === 0 ? "active" : ""}`}
          >
            {cat.icon && <span className="icon">{cat.icon}</span>}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Categories;