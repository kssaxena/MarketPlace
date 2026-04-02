import { useState, useEffect } from "react";
import "./Home.css";
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPostAd, setShowPostAd] = useState(false);
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
          <div className="topbar-dropdown-wrapper">
            <span
              className="topbar-dropdown-trigger"
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

          <div className="topbar-dropdown-wrapper topbar-dropdown-currency">
            <span
              className="topbar-dropdown-trigger"
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

          <span className="topbar-order-status" onClick={() => setShowOrderPopup(true)}>
            Order Status
          </span>
        </div>
      </div>

      {/* HEADER */}
      <div className="header-bar">
        <div className="header-logo-wrap">
          <Link to="/" className="logo-link">
            <h1 className="logo-text">Marketplace</h1>
          </Link>
        </div>

        <button
          className="all-cat-btn"
          onClick={() => setShowCategories(!showCategories)}
        >
          ☰ CATEGORIES
        </button>

        <div className="header-search">
          <input
            type="text"
            placeholder="Search for anything..."
            className="search-bar"
          />
        </div>

        <div className="header-icons">
          <span className="header-icon" onClick={() => setShowProfile(true)}>👤</span>
          <span className="header-icon" onClick={() => setShowChat(true)}>💬</span>
          <span className="header-icon" onClick={() => setShowCart(true)}>🛒</span>
        </div>
      </div>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-links">
          <span>Home</span>
          <li className="nav-link-item" onClick={() => setShowAbout(true)}>About</li>
          <span>Shop</span>
          <span>Vendors</span>
          <span>Pages</span>
          <span>Blog</span>
          <li className="nav-link-item" onClick={() => setShowContact(true)}>Contact</li>
        </div>

        <button
          onClick={() => setShowPostAd(true)}
          className="post-ad-btn"
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
            <h1>Buy &amp; Sell Anything</h1>
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
      <footer className="footer-main">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <h1 className="logo-text">Marketplace</h1>
            </div>
            <p className="footer-tagline">Buy and sell anything locally.</p>
          </div>
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-list">
              <li className="footer-list-item">Home</li>
              <li className="footer-list-item" onClick={() => setShowPostAd(true)}>Post an Ad</li>
              <li className="footer-list-item">My Ads</li>
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Support</h3>
            <ul className="footer-list">
              <li className="footer-list-item">Help Center</li>
              <li className="footer-list-item">Safety Tips</li>
              <li className="footer-list-item" onClick={() => setShowContact(true)}>Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-list">
              <li className="footer-list-item">Terms of Service</li>
              <li className="footer-list-item">Privacy Policy</li>
              <li className="footer-list-item">Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
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
      <OrderStatusModal
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
