import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import Header from "../../components/Header.jsx";
import {
  formatCurrency,
  getSelectedCurrency,
  subscribeCurrencyChange,
} from "../../utility/currency.js";
import { addToCart } from "../../utility/marketplaceStore.js";
import { isDarkModeEnabled } from "../../utility/theme.js";
import { productsData } from "../../constants/products.js";
import { addToRecentlyViewed } from "../../utility/userTracking.js";

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currency, setCurrency] = useState(() => getSelectedCurrency());
  const [darkMode, setDarkMode] = useState(() => isDarkModeEnabled());
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => subscribeCurrencyChange(setCurrency), []);

  useEffect(() => {
    const onThemeChange = (event) => {
      setDarkMode(Boolean(event.detail?.darkMode));
    };
    window.addEventListener("themechange", onThemeChange);
    return () => window.removeEventListener("themechange", onThemeChange);
  }, []);

  // Fetch product details
  useEffect(() => {
    const foundProduct = productsData.find(
      (p) => String(p.id) === String(productId)
    );
    
    if (foundProduct) {
      addToRecentlyViewed(foundProduct);
      setProduct(foundProduct);
      setLoading(false);
    } else {
      // Fallback: use first product if not found
      setProduct(productsData[0]);
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-white"}`}>
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className={darkMode ? "text-slate-300" : "text-gray-600"}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-white"}`}>
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className={darkMode ? "text-slate-300" : "text-gray-600"}>Product not found</p>
        </div>
      </div>
    );
  }

  const specifications = product.specifications || {
    "Display": product.display || "6.7 inch AMOLED",
    "Storage": product.storage || "256 GB",
    "RAM": product.ram || "8 GB RAM",
    "Processor": product.processor || "Snapdragon 8 Gen 2",
    "Battery": product.battery || "5000 mAh",
    "Condition": product.condition || "Good"
  };

  const keyFeatures = product.features || [
    "120Hz display with dynamic refresh rate",
    "Advanced thermal management system",
    "Professional camera with optical image stabilization",
    "Ultra-fast charging technology",
    "Premium build with Gorilla Glass Armor",
    "Extended software support"
  ];

  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 128;

  const handleAddToCart = () => {
    addToCart(product);
    setToast("Added to cart");
    setTimeout(() => setToast(""), 1400);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
      <Header />

      {/* BACK BUTTON */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            darkMode
              ? "hover:bg-slate-800 text-slate-300"
              : "hover:bg-gray-200 text-gray-700"
          }`}
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        
        {/* TOP SECTION: IMAGE + BASIC INFO */}
        <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg overflow-hidden mb-8`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            
            {/* LEFT: PRODUCT IMAGE */}
            <div className="flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto max-h-96 object-cover rounded-lg"
              />
            </div>

            {/* RIGHT: PRODUCT INFO */}
            <div className="flex flex-col justify-start space-y-6">
              {/* TITLE */}
              <div>
                <h1 className={`text-4xl font-bold mb-4 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                  {product.title}
                </h1>

                {/* RATING */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={`${
                          i < Math.floor(rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-sm font-semibold ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                    {rating} ({reviewCount} reviews)
                  </span>
                </div>

                {/* PRICE */}
                <p className="text-4xl font-bold text-teal-600 mb-6">
                  {formatCurrency(product.price, currency)}
                </p>

                {/* LOCATION & TIME */}
                <div className={`grid grid-cols-2 gap-4 mb-6 text-sm ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                  <div>
                    <p className={`font-semibold mb-1 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>Location</p>
                    <p>{product.location}</p>
                  </div>
                  <div>
                    <p className={`font-semibold mb-1 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>Posted</p>
                    <p>{product.time}</p>
                  </div>
                </div>

                {/* CTA BUTTON */}
                <button
                  onClick={handleAddToCart}
                  className="w-full rounded-xl bg-teal-600 px-6 py-4 text-lg font-bold text-white transition hover:bg-teal-700 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={24} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg p-8 mb-8`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
            Description
          </h2>
          <p className={`text-lg leading-relaxed ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
            {product.description}
          </p>
        </div>

        {/* KEY FEATURES SECTION */}
        <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg p-8 mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {keyFeatures.map((feature, idx) => (
              <div key={idx} className={`flex items-start gap-3 p-4 rounded-lg ${darkMode ? "bg-slate-700" : "bg-gray-50"}`}>
                <span className="text-teal-600 font-bold text-xl">✓</span>
                <p className={`text-base ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SPECIFICATIONS SECTION */}
        <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg p-8 mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
            Specifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(specifications).map(([key, value]) => (
              <div key={key} className={`p-5 rounded-lg ${darkMode ? "bg-slate-700" : "bg-gray-50"}`}>
                <p className={`text-xs font-bold mb-2 uppercase tracking-widest ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                  {key}
                </p>
                <p className={`font-semibold text-base ${darkMode ? "text-slate-200" : "text-gray-900"}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SELLER INFORMATION SECTION */}
        {product.seller && (
          <div className={`${darkMode ? "bg-slate-800" : "bg-white"} rounded-xl shadow-lg p-8 mb-8`}>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
              Seller Information
            </h2>
            <div className={`p-6 rounded-lg border-2 ${darkMode ? "bg-slate-700 border-slate-600" : "bg-gray-50 border-gray-200"}`}>
              <p className={`font-bold text-lg mb-1 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                {product.seller?.personalDetails?.name || "Seller"}
              </p>
              <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                {product.seller?.communityDetails?.name || "Member"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-teal-600 text-white px-6 py-3 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}