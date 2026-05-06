import { useEffect, useState } from "react";
import { X, Star, ShoppingCart } from "lucide-react";
import { addToCart } from "../utility/marketplaceStore.js";
import { isDarkModeEnabled } from "../utility/theme.js";
import ReviewComponent from "./ReviewComponent.jsx";
import {
  formatCurrency,
  getSelectedCurrency,
  subscribeCurrencyChange,
} from "../utility/currency.js";

function ProductModal({ product, onClose }) {
  const [toast, setToast] = useState("");
  const [currency, setCurrency] = useState(() => getSelectedCurrency());
  const [darkMode, setDarkMode] = useState(() => isDarkModeEnabled());
  useEffect(() => subscribeCurrencyChange(setCurrency), []);

  useEffect(() => {
    const onThemeChange = (event) => {
      setDarkMode(Boolean(event.detail?.darkMode));
    };

    window.addEventListener("themechange", onThemeChange);
    return () => window.removeEventListener("themechange", onThemeChange);
  }, []);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setToast("Added to cart");
    setTimeout(() => setToast(""), 1400);
  };

  // Mock specs and features - these should ideally come from your product data
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

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${darkMode ? "bg-slate-900" : "bg-white"} w-full max-w-4xl rounded-xl shadow-xl relative overflow-hidden animate-fadeIn transition-colors my-8`}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 rounded-full p-2 shadow-md transition z-10 ${
            darkMode 
              ? "bg-slate-700/80 hover:bg-slate-700 text-slate-300" 
              : "bg-white/90 hover:bg-white text-gray-700"
          }`}
        >
          <X size={24} />
        </button>

        {/* SCROLLABLE CONTENT */}
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            
            {/* LEFT: IMAGE */}
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.title}
                className="w-full rounded-lg object-cover"
              />
            </div>

            {/* RIGHT: DETAILS */}
            <div className="space-y-6">
              {/* TITLE & PRICE */}
              <div>
                <h2 className={`text-3xl font-bold mb-3 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                  {product.title}
                </h2>
                
                {/* RATING */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
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

                <p className="text-teal-600 text-3xl font-bold">
                  {formatCurrency(product.price, currency)}
                </p>
              </div>

              {/* DESCRIPTION */}
              <div>
                <p className={`leading-relaxed ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                  {product.description}
                </p>
              </div>

              {/* KEY FEATURES */}
              <div>
                <h3 className={`text-lg font-bold mb-3 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {keyFeatures.map((feature, idx) => (
                    <li key={idx} className={`flex items-start gap-3 text-sm ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                      <span className="text-teal-600 font-bold mt-1">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* LOCATION & TIME */}
              <div className={`text-sm flex gap-8 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                <div>
                  <span className="font-semibold block mb-1">Location</span>
                  <span>{product.location}</span>
                </div>
                <div>
                  <span className="font-semibold block mb-1">Posted</span>
                  <span>{product.time}</span>
                </div>
              </div>

              {/* CTA BUTTON */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full rounded-xl bg-teal-600 px-6 py-3 text-lg font-bold text-white transition hover:bg-teal-700 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>

          {/* SPECIFICATIONS SECTION */}
          <div className={`px-8 py-6 border-t ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
            <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
              Specifications
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(specifications).map(([key, value]) => (
                <div key={key} className={`p-4 rounded-lg ${darkMode ? "bg-slate-800" : "bg-gray-50"}`}>
                  <p className={`text-xs font-semibold mb-1 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                    {key}
                  </p>
                  <p className={`font-semibold ${darkMode ? "text-slate-200" : "text-gray-900"}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* SELLER INFO */}
          {product.seller && (
            <div className={`px-8 py-6 border-t ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
              <h3 className={`text-lg font-bold mb-3 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                Seller Information
              </h3>
              <div className={`p-4 rounded-lg ${darkMode ? "bg-slate-800" : "bg-gray-50"}`}>
                <p className={`font-semibold ${darkMode ? "text-slate-200" : "text-gray-900"}`}>
                  {product.seller?.personalDetails?.name || "Seller"}
                </p>
                <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-600"}`}>
                  {product.seller?.communityDetails?.name || "Member"}
                </p>
              </div>
            </div>
          )}

          {/* REVIEWS SECTION */}
          <div className={`px-8 py-6 border-t ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
            <ReviewComponent 
              productId={product._id || product.id} 
              onReviewAdded={() => {
                // Optionally refresh product data if needed
              }}
            />
          </div>

          {/* TOAST MESSAGE */}
          {toast && (
            <div className="fixed bottom-4 left-4 bg-teal-600 text-white px-4 py-2 rounded-lg shadow-lg">
              {toast}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProductModal;
