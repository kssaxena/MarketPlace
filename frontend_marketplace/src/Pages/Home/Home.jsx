import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "../../components/ProductModal.jsx";
import CategoriesBar from "../../components/CategoriesBar.jsx";
import ProductCard from "../../components/ProductCard.jsx";
import Header from "../../components/Header.jsx";
import { productsData } from "../../constants/products.js";

function Home() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("All Ads");
  const [searchQuery, setSearchQuery] = useState("");

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [language, setLanguage] = useState("English");

  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [currency, setCurrency] = useState("INR");

  const heroImages = [
    "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
    "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts =
    selectedCategory === "All Ads"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();
    navigate(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : "/search");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header
        activePage="home"
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onPostAdClick={() => navigate("/post-ad")}
      />

      {/* HERO */}
      <div className="p-10 bg-gray-100 text-center">
        <div
          className="h-[400px] rounded-xl bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
        >
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl font-bold">Buy & Sell Anything</h1>
            <p className="mt-2">Find great deals near you</p>
          </div>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <div className="max-w-6xl mx-auto px-4">
        <CategoriesBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* PRODUCTS */}
      <div className="max-w-6xl mx-auto p-6">
        {filteredProducts.length === 0 && <p>No products available</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item, index) => (
            <ProductCard
              key={item.id ?? index}
              product={item}
              onClick={() => setSelectedProduct(item)}
            />
          ))}
        </div>
      </div>

      {/* MODALS */}
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}

export default Home;
