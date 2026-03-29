function Categories() {
  const categories = [
    "All Ads",
    "Vehicles",
    "Property",
    "Electronics",
    "Fashion"
  ];

  return (
    <div className="category-section">
      <h1 style={{ color: "red" }}>TEST</h1>
      <h2>Browse Categories</h2>

      <div className="category-list">
        {categories.map((cat, index) => (
          <button key={index} className="category-btn">
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}