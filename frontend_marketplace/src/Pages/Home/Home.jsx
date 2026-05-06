import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "../../components/ProductModal.jsx";
import ProductCard from "../../components/ProductCard.jsx";
import Header from "../../components/Header.jsx";
import RecentlyViewed from "../../components/RecentlyViewed.jsx";
import SavedSearchesWidget from "../../components/SavedSearchesWidget.jsx";
import { productsData } from "../../constants/products.js";
import { productAPI } from "../../services/api.js";
import { isDarkModeEnabled, setDarkMode } from "../../utility/theme.js";
import { addToRecentlyViewed } from "../../utility/userTracking.js";

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
  "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da",
];

function Home() {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(productsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [darkMode, setDarkModeState] = useState(() => isDarkModeEnabled());

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAllProducts();
        if (response.data.products && response.data.products.length > 0) {
          setProducts(response.data.products);
          setError(null);
        } else {
          // Use mock data if no products from backend
          setProducts(productsData);
        }
      } catch (err) {
        console.warn("Failed to fetch from backend, using mock data:", err.message);
        // Use mock data as fallback
        setProducts(productsData);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Rotate hero visuals on a fixed interval for lightweight motion.
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Keep local UI state aligned with global theme changes.
    const onThemeChange = (event) => {
      setDarkModeState(Boolean(event.detail?.darkMode));
    };

    window.addEventListener("themechange", onThemeChange);
    return () => window.removeEventListener("themechange", onThemeChange);
  }, []);

  const handleSearchSubmit = (event) => {
    // Normalize empty searches to the base search route.
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
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        showDarkModeToggle
      />

      <div className="p-10 bg-gray-100 text-center">
        <div
          className="h-[400px] rounded-xl bg-cover bg-center relative"
          style={{ backgroundImage: `url(${HERO_IMAGES[currentSlide]})` }}
        >
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white">
            <h1 className="text-3xl font-bold">Buy & Sell Anything</h1>
            <p className="mt-2">Find great deals near you</p>
          </div>
        </div>
      </div>

      

      <div className="max-w-6xl mx-auto p-6">
        {products.length === 0 && <p>No products available</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <ProductCard
              key={item.id ?? index}
              product={item}
              onClick={() => setSelectedProduct(item)}
            />
          ))}
        </div>
      </div>

      <RecentlyViewed />

      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
}

export default Home;