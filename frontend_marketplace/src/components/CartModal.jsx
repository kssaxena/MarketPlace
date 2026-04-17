import { useEffect, useMemo, useState } from "react";
import {
  formatCurrency,
  getSelectedCurrency,
  subscribeCurrencyChange,
} from "../utility/currency.js";
import { isDarkModeEnabled } from "../utility/theme.js";

function CartModal({
  isOpen,
  onClose,
  cartItems,
  wishlistItems,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveCartItem,
  onMoveWishlistToCart,
  onRemoveWishlistItem,
}) {
  const [activeTab, setActiveTab] = useState("cart");
  const [currency, setCurrency] = useState(() => getSelectedCurrency());
  const [darkMode, setDarkMode] = useState(() => isDarkModeEnabled());

  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 1), 0),
    [cartItems]
  );

  useEffect(() => {
    const unsubscribe = subscribeCurrencyChange(setCurrency);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const onThemeChange = (event) => {
      setDarkMode(Boolean(event.detail?.darkMode));
    };

    window.addEventListener("themechange", onThemeChange);
    return () => window.removeEventListener("themechange", onThemeChange);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className={`${darkMode ? "bg-slate-900 text-slate-100" : "bg-white text-gray-900"} w-[420px] max-h-[80vh] rounded-2xl p-5 shadow-xl flex flex-col transition-colors`}>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h4 className={`text-lg font-semibold ${darkMode ? "text-slate-100" : "text-gray-900"}`}>Shopping</h4>
          <button onClick={onClose} className={darkMode ? "text-slate-400 hover:text-slate-200" : "text-gray-600 hover:text-gray-900"}>✕</button>
        </div>

        <div className={`mb-4 grid grid-cols-2 gap-2 rounded-xl ${darkMode ? "bg-slate-800" : "bg-gray-100"} p-1 text-sm font-semibold`}>
          <button
            type="button"
            onClick={() => setActiveTab("cart")}
            className={`rounded-lg px-3 py-2 transition ${
              activeTab === "cart" 
                ? darkMode ? "bg-slate-700 text-slate-100 shadow-sm" : "bg-white text-gray-900 shadow-sm" 
                : darkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            Cart ({cartItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("wishlist")}
            className={`rounded-lg px-3 py-2 transition ${
              activeTab === "wishlist" 
                ? darkMode ? "bg-slate-700 text-slate-100 shadow-sm" : "bg-white text-gray-900 shadow-sm"
                : darkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            Wishlist ({wishlistItems.length})
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {activeTab === "cart" &&
            (cartItems.length === 0 ? (
              <p className={`text-center py-8 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className={`flex justify-between items-center p-3 rounded-xl ${darkMode ? "bg-slate-800" : "bg-gray-100"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 overflow-hidden rounded-lg ${darkMode ? "bg-slate-700" : "bg-gray-200"}`}>
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-teal-200 to-teal-500" />
                      )}
                    </div>
                    <div>
                      <h5 className={`font-medium ${darkMode ? "text-slate-100" : "text-gray-900"}`}>{item.title}</h5>
                      <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{formatCurrency(item.price, currency)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onDecreaseQty(item.id)}
                      className={`px-2 rounded ${darkMode ? "bg-slate-700 text-slate-200 hover:bg-slate-600" : "bg-gray-300 text-gray-900 hover:bg-gray-400"}`}
                    >
                      -
                    </button>

                    <span className={`w-6 text-center ${darkMode ? "text-slate-200" : "text-gray-900"}`}>{item.qty}</span>

                    <button
                      type="button"
                      onClick={() => onIncreaseQty(item.id)}
                      className={`px-2 rounded ${darkMode ? "bg-slate-700 text-slate-200 hover:bg-slate-600" : "bg-gray-300 text-gray-900 hover:bg-gray-400"}`}
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveCartItem(item.id)}
                      className="ml-1 text-xs font-semibold text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ))}

          {activeTab === "wishlist" &&
            (wishlistItems.length === 0 ? (
              <p className={`text-center py-8 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>Your wishlist is empty</p>
            ) : (
              wishlistItems.map((item) => (
                <div key={item.id} className={`flex justify-between items-center p-3 rounded-xl ${darkMode ? "bg-slate-800" : "bg-gray-100"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 overflow-hidden rounded-lg ${darkMode ? "bg-slate-700" : "bg-gray-200"}`}>
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-teal-200 to-teal-500" />
                      )}
                    </div>
                    <div>
                      <h5 className={`font-medium ${darkMode ? "text-slate-100" : "text-gray-900"}`}>{item.title}</h5>
                      <p className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-600"}`}>{formatCurrency(item.price, currency)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onMoveWishlistToCart(item.id)}
                      className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                    >
                      Move to cart
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveWishlistItem(item.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ))}
        </div>

        {/* Footer */}
        {activeTab === "cart" && (
          <div className={`mt-4 border-t pt-3 ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
            <h4 className={`font-semibold mb-2 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>Total: {formatCurrency(total, currency)}</h4>
            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
              Checkout →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CartModal;
