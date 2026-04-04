import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoriesModal from "./CategoriesModal.jsx";
import CartModal from "./CartModal.jsx";
import ChatModal from "./ChatModal.jsx";
import {
  getCartItems,
  getWishlistItems,
  moveWishlistToCart,
  removeFromCart,
  removeFromWishlist,
  subscribeMarketplaceStore,
  updateCartQty,
} from "../utility/marketplaceStore.js";
import {
  getSelectedCurrency,
  setSelectedCurrency,
  subscribeCurrencyChange,
} from "../utility/currency.js";

function Header({
  activePage = "home",
  searchQuery = "",
  onSearchQueryChange,
  onSearchSubmit = (event) => event.preventDefault(),
  onPostAdClick = () => {},
  darkMode = false,
  onToggleDarkMode,
  showDarkModeToggle = false,
}) {
  const [showCategories, setShowCategories] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState(() => getSelectedCurrency());
  const [messages, setMessages] = useState([
    { text: "Hey! Is this still available?", sender: "other" },
    { text: "Yes, it's available.", sender: "me" },
  ]);
  const [input, setInput] = useState("");
  const [cartItems, setCartItems] = useState(() => getCartItems());
  const [wishlistItems, setWishlistItems] = useState(() => getWishlistItems());

  useEffect(() => {
    const sync = () => {
      setCartItems(getCartItems());
      setWishlistItems(getWishlistItems());
    };

    sync();
    return subscribeMarketplaceStore(sync);
  }, []);

  useEffect(() => subscribeCurrencyChange(setCurrency), []);

  const linkClass = (page) =>
    page === activePage ? "text-teal-600 font-semibold" : "text-black hover:text-teal-600";

  return (
    <>
      <div className="flex justify-end px-6 py-2 bg-gray-100 text-[0.8rem] font-medium text-gray-500">
        <div className="flex items-center gap-5">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowCurrencyMenu(false);
                setShowLanguageMenu((value) => !value);
              }}
              className="flex items-center gap-1 transition hover:text-teal-600"
            >
              {language} <span className="text-[0.65rem]">▾</span>
            </button>

            {showLanguageMenu && (
              <div className="absolute right-0 top-full z-20 mt-2 w-36 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
                {["English", "Hindi", "Spanish"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setLanguage(item);
                      setShowLanguageMenu(false);
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-left text-[0.85rem] text-gray-700 transition hover:bg-teal-50 hover:text-teal-700"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowLanguageMenu(false);
                setShowCurrencyMenu((value) => !value);
              }}
              className="flex items-center gap-1 transition hover:text-teal-600"
            >
              {currency} <span className="text-[0.65rem]">▾</span>
            </button>

            {showCurrencyMenu && (
              <div className="absolute right-0 top-full z-20 mt-2 w-28 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg">
                {["INR", "USD", "EUR"].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setSelectedCurrency(item);
                      setShowCurrencyMenu(false);
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-left text-[0.85rem] text-gray-700 transition hover:bg-teal-50 hover:text-teal-700"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/order-status" className="cursor-pointer">
            Order Status
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-6 border-b bg-white px-6 py-4">
        <Link to="/">
          <h1 className="text-[1.7rem] font-extrabold tracking-[-0.03em] text-teal-500">
            Marketplace
          </h1>
        </Link>

        <button
          type="button"
          onClick={() => setShowCategories(true)}
          className="rounded-full border bg-white px-5 py-2 text-[0.9rem] font-semibold tracking-[0.04em] shadow transition hover:shadow-md"
        >
          ☰ CATEGORIES
        </button>

        <form onSubmit={onSearchSubmit} className="flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchQueryChange?.(e.target.value)}
            className="w-full rounded-full border bg-gray-50 px-6 py-3 text-[0.95rem] outline-none focus:ring-2 focus:ring-teal-400"
          />
        </form>

        <div className="flex cursor-pointer items-center gap-5 text-lg">
          <Link to="/login" aria-label="Login">
            👤
          </Link>
          <button type="button" onClick={() => setShowChat(true)} aria-label="Open chat">
            💬
          </button>
          <button type="button" onClick={() => setShowCart(true)} aria-label="Open cart">
            🛒
          </button>
          <Link
            to="/register"
            className="rounded-full border border-teal-600 px-4 py-1.5 text-[0.82rem] font-semibold text-teal-600 transition-colors hover:bg-teal-600 hover:text-white"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between border-b bg-white px-6 py-3">
        <div className="flex gap-4 text-[0.98rem] font-medium">
          <Link to="/" className={linkClass("home")}>Home</Link>
          <Link to="/about" className={linkClass("about")}>About</Link>
          <Link to="/blog" className={linkClass("blog")}>Blog</Link>
          <Link to="/contact" className={linkClass("contact")}>Contact</Link>
        </div>

        <div className="flex gap-4 text-[0.9rem] font-semibold">
          <button
            onClick={onPostAdClick}
            className="rounded-full bg-teal-600 px-6 py-2 text-white transition hover:scale-[1.02]"
          >
            + Post Ad
          </button>

          <Link to="/best-deals" className="rounded-full bg-teal-500 px-4 py-2 text-white transition hover:bg-teal-600">
            Best Deals
          </Link>

          {showDarkModeToggle && (
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-[0.8rem] font-medium text-gray-700 transition hover:border-teal-500 hover:text-teal-600"
            >
              <span>Dark Mode</span>
              <span className={`relative h-4 w-8 rounded-full transition ${darkMode ? "bg-teal-500" : "bg-gray-300"}`}>
                <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all ${darkMode ? "left-4.5" : "left-0.5"}`} />
              </span>
            </button>
          )}
        </div>
      </div>

      {showCategories && <CategoriesModal onClose={() => setShowCategories(false)} />}
      {showCart && (
        <CartModal
          isOpen={showCart}
          onClose={() => setShowCart(false)}
          cartItems={cartItems}
          wishlistItems={wishlistItems}
          onIncreaseQty={(id) => updateCartQty(id, 1)}
          onDecreaseQty={(id) => updateCartQty(id, -1)}
          onRemoveCartItem={removeFromCart}
          onMoveWishlistToCart={moveWishlistToCart}
          onRemoveWishlistItem={removeFromWishlist}
        />
      )}
      {showChat && <ChatModal isOpen={showChat} onClose={() => setShowChat(false)} messages={messages} setMessages={setMessages} input={input} setInput={setInput} />}
    </>
  );
}

export default Header;
