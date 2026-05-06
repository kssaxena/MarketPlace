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

  const condition = product.condition || "Good";
  const keyFeatures =
    product.features ||
    product.description
      .split(". ")
      .slice(0, 4)
      .map((feature) => feature.replace(/\.$/, ""))
      .filter(Boolean);

  const specifications = product.specifications || [
    { label: "Category", value: product.category || "General" },
    { label: "Location", value: product.location || "Unknown" },
    { label: "Condition", value: condition },
    { label: "Posted", value: product.time || "Recently" },
  ];

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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${darkMode ? "bg-slate-950" : "bg-white"} w-full max-w-6xl rounded-3xl shadow-2xl relative overflow-hidden animate-fadeIn transition-colors my-8`}
      >
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 rounded-full px-3 py-2 text-lg shadow-lg transition z-10 ${
            darkMode
              ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          ✕
        </button>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr] p-6 lg:p-8">
          <div className="space-y-6">
            <img
              src={product.image}
              alt={product.title}
              className="w-full rounded-3xl h-[430px] object-cover border border-gray-200"
            />

            <div className={`${darkMode ? "bg-slate-900/80 border-slate-800" : "bg-gray-50 border-gray-200"} rounded-3xl border p-6`}>
              <div className="mb-4">
                <p className="text-sm uppercase tracking-[0.24em] text-teal-600 font-semibold">
                  Delivery Options
                </p>
              </div>

              <ul className={`space-y-3 text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                <li className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />
                  Delivery within 3-5 business days
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />
                  Pickup available from seller location
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-600" />
                  Free returns within 7 days
                </li>
              </ul>
            </div>

            <div className={`${darkMode ? "bg-slate-900/80 border-slate-800" : "bg-gray-50 border-gray-200"} rounded-3xl border p-6`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                Key Features
              </h3>
              <ul className={`space-y-3 text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                {keyFeatures.map((feature, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-teal-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${darkMode ? "bg-slate-950 border-slate-800" : "bg-white border-gray-200"} rounded-3xl border p-6`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                Specifications
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {specifications.map((spec) => (
                  <div key={spec.label} className={`${darkMode ? "bg-slate-900" : "bg-gray-50"} rounded-2xl p-4`}>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500 mb-2">{spec.label}</p>
                    <p className={`${darkMode ? "text-slate-200" : "text-gray-800"} font-medium`}>{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`${darkMode ? "bg-slate-900/80 border-slate-800" : "bg-white border-gray-200"} rounded-3xl border p-6 shadow-sm`}>
              <p className="text-sm text-teal-600 font-semibold uppercase tracking-[0.24em] mb-3">{product.category || "Marketplace"}</p>
              <h2 className={`text-3xl font-semibold mb-4 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                {product.title}
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="rounded-full bg-teal-600/10 px-3 py-1 text-sm font-semibold text-teal-700">
                  {formatCurrency(product.price, currency)}
                </span>
                <span className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                  {product.location}
                </span>
              </div>
              <div className={`${darkMode ? "bg-slate-900 border-slate-800" : "bg-gray-50 border border-gray-200"} rounded-3xl p-4 mb-5`}>
                <p className={`text-sm mb-3 ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                  {product.description}
                </p>
                <p className={`text-sm font-medium ${darkMode ? "text-slate-200" : "text-gray-900"}`}>
                  Condition: {condition}
                </p>
              </div>

              <div className="grid gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="rounded-3xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  onClick={handleAddToWishlist}
                  className={`rounded-3xl bg-white px-5 py-3 text-sm font-semibold transition ${
                    darkMode
                      ? "border border-slate-700 text-slate-100 hover:bg-slate-800"
                      : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Add to Wishlist
                </button>
              </div>

              {toast && <p className={`mt-4 text-sm font-medium ${darkMode ? "text-teal-400" : "text-teal-700"}`}>{toast}</p>}
            </div>

            <div className={`${darkMode ? "bg-slate-950 border-slate-800" : "bg-white border-gray-200"} rounded-3xl border p-6`}>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>Delivery Options</h3>
              <div className={`space-y-3 text-sm ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                <div className={`flex justify-between items-center rounded-2xl p-4 ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
                  <div>
                    <p className="font-semibold">Standard Delivery</p>
                    <p className="text-xs text-gray-500">3-5 business days</p>
                  </div>
                  <span className="text-teal-600 font-semibold">Free</span>
                </div>
                <div className={`flex justify-between items-center rounded-2xl p-4 ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
                  <div>
                    <p className="font-semibold">Pickup Available</p>
                    <p className="text-xs text-gray-500">Pickup from seller address</p>
                  </div>
                  <span className="text-teal-600 font-semibold">Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`border-t ${darkMode ? "border-slate-800" : "border-gray-200"} px-6 py-6 lg:px-8`}>
          <ReviewComponent
            productId={product._id || product.id}
            onReviewAdded={() => {
              // Optional refresh logic
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
