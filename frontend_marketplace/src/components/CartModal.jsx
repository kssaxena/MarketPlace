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

  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 1), 0),
    [cartItems]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={`${darkMode ? "bg-slate-900 text-slate-100" : "bg-white"} flex max-h-[80vh] w-[420px] flex-col rounded-2xl p-5 shadow-xl transition-colors`}>

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h4 className={`text-lg font-semibold ${darkMode ? "text-slate-100" : "text-gray-900"}`}>Shopping</h4>
          <button onClick={onClose} className={darkMode ? "text-slate-400 hover:text-slate-200" : "text-gray-600"}>✕</button>
        </div>

        {/* Tabs */}
        <div className={`${darkMode ? "bg-slate-800" : "bg-gray-100"} mb-4 grid grid-cols-2 gap-2 rounded-xl p-1 text-sm font-semibold`}>
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
        <div className={`flex-1 space-y-3 overflow-y-auto ${darkMode ? "bg-slate-800" : ""}`}>

          {activeTab === "cart" && (
            cartItems.length === 0
              ? <p className={`py-8 text-center ${darkMode ? "text-slate-400" : "text-gray-500"}`}>Your cart is empty</p>
              : cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl bg-gray-100 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-200">
                      {item.image
                        ? <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                        : <div className="h-full w-full bg-gradient-to-br from-teal-200 to-teal-500" />
                      }
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{item.title}</h5>
                      <p className="text-sm text-gray-600">{formatCurrency(item.price, currency)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onDecreaseQty(item.id)}
                      className="rounded bg-gray-300 px-2"
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => onIncreaseQty(item.id)}
                      className="rounded bg-gray-300 px-2"
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
          )}

          {activeTab === "wishlist" && (
            wishlistItems.length === 0
              ? <p className="py-8 text-center text-gray-500">Your wishlist is empty</p>
              : wishlistItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-xl bg-gray-100 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-200">
                      {item.image
                        ? <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                        : <div className="h-full w-full bg-gradient-to-br from-teal-200 to-teal-500" />
                      }
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{item.title}</h5>
                      <p className="text-sm text-gray-600">{formatCurrency(item.price, currency)}</p>
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
          )}

        </div>

        {/* Footer */}
        {activeTab === "cart" && (
          <div className="mt-4 border-t pt-3">
            <h4 className="mb-2 font-semibold">Total: {formatCurrency(total, currency)}</h4>
            <button className="w-full rounded-lg bg-teal-600 py-2 text-white hover:bg-teal-700">
              Checkout →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CartModal;