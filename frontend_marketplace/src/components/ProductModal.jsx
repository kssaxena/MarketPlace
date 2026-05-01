import { useEffect, useState } from "react";
import { addToCart, addToWishlist } from "../utility/marketplaceStore.js";
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

  const handleAddToWishlist = () => {
    addToWishlist(product);
    setToast("Added to wishlist");
    setTimeout(() => setToast(""), 1400);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${darkMode ? "bg-slate-900" : "bg-white"} w-full max-w-2xl rounded-xl shadow-xl relative overflow-hidden animate-fadeIn transition-colors my-8`}
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 rounded-full px-2 py-1 text-lg shadow-md transition z-10 ${
            darkMode 
              ? "bg-slate-700/80 hover:bg-slate-700 text-red-400" 
              : "bg-white/80 hover:bg-white text-red-700"
          }`}
        >
          ✕
        </button>

        {/* SCROLLABLE CONTENT */}
        <div className="max-h-[85vh] overflow-y-auto">
          {/* IMAGE */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-cover"
          />

          {/* CONTENT */}
          <div className="p-6">
            <h2 className={`text-2xl font-semibold mb-2 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>{product.title}</h2>

            <p className="text-teal-600 text-xl font-bold mb-4">
              {formatCurrency(product.price, currency)}
            </p>

            <p className={`leading-relaxed mb-6 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
              {product.description}
            </p>

            {/* 🔥 SELLER INFO (NO API CALL NEEDED) */}
            {product.seller && (
              <div className={`mb-4 p-4 rounded-xl ${darkMode ? "bg-slate-800" : "bg-gray-100"}`}>
                <h3 className={`font-semibold text-lg mb-1 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>Seller Info</h3>

                <p className={darkMode ? "text-slate-300" : "text-gray-700"}>
                  {product.seller?.personalDetails?.name}
                </p>

                <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                  {product.seller?.communityDetails?.name}
                </p>
              </div>
            )}

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
              >
                Add to Cart
              </button>
              <button
                type="button"
                onClick={handleAddToWishlist}
                className={`rounded-xl border px-5 py-2.5 text-sm font-semibold transition ${
                  darkMode
                    ? "border-slate-600 bg-slate-800 text-slate-200 hover:bg-slate-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                Add to Wishlist
              </button>
              {toast && <span className={`text-sm font-medium ${darkMode ? "text-teal-400" : "text-teal-700"}`}>{toast}</span>}
            </div>

            {/* LOCATION & TIME */}
            <div className={`text-sm flex justify-between mb-6 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
              <span>{product.location}</span>
              <span>{product.time}</span>
            </div>

            {/* REVIEWS COMPONENT */}
            <ReviewComponent 
              productId={product._id || product.id} 
              onReviewAdded={() => {
                // Optionally refresh product data if needed
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductModal;
