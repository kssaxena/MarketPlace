import { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate, Link } from "react-router-dom";
import DemoPopUp from "../components/demopopup.jsx";
import ProductModal from "../components/ProductModal.jsx";
import PostAdModal from "../components/PostAdModal.jsx";
import CategoriesModal from "../components/CategoriesModal.jsx";
import ContactModal from "../components/ContactModal.jsx";
import AboutModal from "../components/AboutModal.jsx";
import CategoriesBar from "../components/CategoriesBar.jsx";
import ProfileModal from "../components/ProfileModal.jsx";
import OrderStatusModal from "../components/OrderStatusModal.jsx";
import ChatModal from "../components/ChatModal.jsx";
import CartModal from "../components/CartModal.jsx";
import { productsData } from "../constants/products.js";

function Home() {
  const [popup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPostAd, setShowPostAd] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [products, setProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("All Ads");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [language, setLanguage] = useState("English");
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const heroImages = [
    "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
    "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
  ];
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey! Is this still available?", sender: "other" },
    { text: "Yes, it's available.", sender: "me" }
  ]);
  const [input, setInput] = useState("");
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

  const [showProfile, setShowProfile] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "iPhone 13", price: 52000, qty: 1 },
    { id: 2, name: "Office Chair", price: 3500, qty: 1 }
  ]);

  return (
    <div className="home">

      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-right">
          <div style={{ position: "relative" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setShowLangMenu(!showLangMenu)}
            >
              {language} ▾
            </span>
            {showLangMenu && (
              <div className="lang-dropdown">
                <p onClick={() => { setLanguage("Hindi"); setShowLangMenu(false); }}>Hindi</p>
                <p onClick={() => { setLanguage("Bengali"); setShowLangMenu(false); }}>Bengali</p>
              </div>
            )}
          </div>

          <div style={{ position: "relative", marginLeft: "20px" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
            >
              {currency} ▾
            </span>
            {showCurrencyMenu && (
              <div className="currency-dropdown">
                <p onClick={() => { setCurrency("USD"); setShowCurrencyMenu(false); }}>$ USD</p>
                <p onClick={() => { setCurrency("EUR"); setShowCurrencyMenu(false); }}>€ EUR</p>
              </div>
            )}
          </div>

          <span onClick={() => setShowOrderPopup(true)} style={{ cursor: "pointer" }}>
            Order Status
          </span>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex items-center gap-6 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="logo-link">
            <h1 className="text-2xl font-bold text-emerald-600">Marketplace</h1>
          </Link>
        </div>

        <button
          className="all-cat-btn"
          onClick={() => setShowCategories(!showCategories)}
        >
          ☰ CATEGORIES
        </button>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Search for anything..."
            className="w-full px-6 py-4 rounded-full border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="flex items-center gap-6">
          <span onClick={() => setShowProfile(true)} style={{ cursor: "pointer" }}>👤</span>
          <span onClick={() => setShowChat(true)} style={{ cursor: "pointer" }}>💬</span>
          <span onClick={() => setShowCart(true)} style={{ cursor: "pointer" }}>🛒</span>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-links">
          <span>Home</span>
          <li onClick={() => setShowAbout(true)} style={{ cursor: "pointer" }}>
  About
</li>
          <span>Shop</span>
          <span>Vendors</span>
          <span>Pages</span>
          <span>Blog</span>
          <li onClick={() => setShowContact(true)} style={{ cursor: "pointer" }}>
  Contact
</li>
        </div>

        <button
          onClick={() => setShowPostAd(true)}
          className="bg-green-600 text-white px-8 py-3 rounded-full shadow-md hover:scale-105 transition"
        >
          + Post Ad
        </button>

        <button className="cta-btn">
          Get the Best Deals Right Here!
        </button>
      </div>

      {/* HERO */}
      <section className="hero">
        <div
          className="hero-slide"
          style={{ backgroundImage: `url(${heroImages[currentSlide]})` }}
        >
          <div className="hero-overlay">
            <h1>Buy & Sell Anything</h1>
            <p>Find great deals near you or list your items for free</p>
          </div>
        </div>
      </section>

      {/* CATEGORY BAR */}
      <div className="container">
        <CategoriesBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* PRODUCTS */}
      <section className="container products">
        {filteredProducts.length === 0 && (
          <p className="no-products">No products available</p>
        )}
        <div className="grid">
          {filteredProducts.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedProduct(item)}
              className="card"
            >
              <img src={item.image} alt={item.title} />
              <div className="card-body">
                <h4>₹ {item.price}</h4>
                <p>{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 border-t mt-16">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-2xl font-bold text-emerald-600">Marketplace</h1>
            </div>
            <p className="text-sm text-gray-500">Buy and sell anything locally.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-emerald-600 cursor-pointer">Home</li>
              <li className="hover:text-emerald-600 cursor-pointer" onClick={() => setShowPostAd(true)}>Post an Ad</li>
              <li className="hover:text-emerald-600 cursor-pointer">My Ads</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-emerald-600 cursor-pointer">Help Center</li>
              <li className="hover:text-emerald-600 cursor-pointer">Safety Tips</li>
              <li className="hover:text-emerald-600 cursor-pointer" onClick={() => setShowContact(true)}>Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="hover:text-emerald-600 cursor-pointer">Terms of Service</li>
              <li className="hover:text-emerald-600 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-emerald-600 cursor-pointer">Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="border-t text-center text-sm text-gray-400 py-4">
          © 2026 Marketplace.
        </div>
      </footer>

      {/* MODALS */}
      <ProfileModal 
  isOpen={showProfile} 
  onClose={() => setShowProfile(false)} 
/>

      <CartModal
  isOpen={showCart}
  onClose={() => setShowCart(false)}
  cartItems={cartItems}
  setCartItems={setCartItems}
/>

      <ChatModal
  isOpen={showChat}
  onClose={() => setShowChat(false)}
  messages={messages}
  setMessages={setMessages}
  input={input}
  setInput={setInput}
/>

      <OrderModal
  isOpen={showOrderPopup}
  onClose={() => setShowOrderPopup(false)}
  orderId={orderId}
  setOrderId={setOrderId}
  orderStatus={orderStatus}
  setOrderStatus={setOrderStatus}
/>

      {popup && <DemoPopUp onClose={() => setShowPopup(false)} />}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
      <PostAdModal
        isOpen={showPostAd}
        onClose={() => setShowPostAd(false)}
        onSubmit={handleAddProduct}
      />
      {showCategories && <CategoriesModal onClose={() => setShowCategories(false)} />}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}

export default Home;
