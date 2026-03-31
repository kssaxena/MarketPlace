import { useState, useEffect } from "react";
import "./Home.css";

import DemoPopUp from "../components/demopopup.jsx";
import ProductModal from "../components/ProductModal.jsx";
import PostAdModal from "../components/PostAdModal.jsx";
import LoginModal from "../components/LoginModal.jsx";
import RegisterModal from "../components/RegisterModal.jsx";
import CategoriesModal from "../components/CategoriesModal.jsx";
import ContactModal from "../components/ContactModal.jsx";
import AboutModal from "../components/AboutModal.jsx";
import CategoriesBar from "../components/CategoriesBar.jsx";

import { productsData } from "../constants/products.js";

function Home() {
  const [popup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPostAd, setShowPostAd] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [products, setProducts] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState("All Ads");

  const heroImages = [
    "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
    "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide
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

  return (
    <div className="home">

      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-right">
          <span>English ▾</span>
          <span>INR ▾</span>
          <span>Track Order</span>
        </div>
      </div>

      {/* HEADER */}
      <div className="flex items-center gap-6 px-6 py-4">

  {/* LEFT */}
  <div className="flex items-center gap-4">
    <h1 className="text-2xl font-bold text-emerald-600">Marketplace</h1>

    <button className="bg-gray-100 px-4 py-2 rounded-lg">
      ☰ Categories
    </button>
  </div>

  {/* 🔥 SEARCH (IMPORTANT) */}
  <div className="flex-1">
    <input
      type="text"
      placeholder="Search for anything..."
      className="w-full px-6 py-4 rounded-full border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-emerald-400"
    />
  </div>

  {/* RIGHT ICONS */}
  <div className="flex items-center gap-6">
    <span>👤</span>
    <span>📍</span>
    <span>🛒</span>
  </div>

</div>

      {/* NAVBAR */}
      <div className="navbar">
        <div className="nav-links">
          <span>Home</span>
          <span>About</span>
          <span>Shop</span>
          <span>Vendors</span>
          <span>Pages</span>
          <span>Blog</span>
          <span>Contact</span>
        </div>

       {/* POST AD */}
      <button className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-semibold 
shadow-md hover:bg-emerald-600 hover:shadow-lg 
transition-all duration-300 active:scale-95">

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
          style={{
            backgroundImage: `url(${heroImages[currentSlide]})`
          }}
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

  {/* MAIN FOOTER */}
  <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

    {/* LOGO + TEXT */}
    <div>
      <div className="flex items-center gap-3 mb-3">
        <h1 className="text-2xl font-bold text-emerald-600">Marketplace</h1>
      </div>

      <p className="text-sm text-gray-500">
        Buy and sell anything locally.
      </p>
    </div>

    {/* QUICK LINKS */}
    <div>
      <h3 className="font-semibold mb-3">Quick Links</h3>
      <ul className="space-y-2 text-sm text-gray-500">
        <li className="hover:text-emerald-600 cursor-pointer">Home</li>
        <li className="hover:text-emerald-600 cursor-pointer">Post an Ad</li>
        <li className="hover:text-emerald-600 cursor-pointer">My Ads</li>
      </ul>
    </div>

    {/* SUPPORT */}
    <div>
      <h3 className="font-semibold mb-3">Support</h3>
      <ul className="space-y-2 text-sm text-gray-500">
        <li className="hover:text-emerald-600 cursor-pointer">Help Center</li>
        <li className="hover:text-emerald-600 cursor-pointer">Safety Tips</li>
        <li className="hover:text-emerald-600 cursor-pointer">Contact Us</li>
      </ul>
    </div>

    {/* LEGAL */}
    <div>
      <h3 className="font-semibold mb-3">Legal</h3>
      <ul className="space-y-2 text-sm text-gray-500">
        <li className="hover:text-emerald-600 cursor-pointer">Terms of Service</li>
        <li className="hover:text-emerald-600 cursor-pointer">Privacy Policy</li>
        <li className="hover:text-emerald-600 cursor-pointer">Cookie Policy</li>
      </ul>
    </div>

  </div>

  {/* BOTTOM BAR */}
  <div className="border-t text-center text-sm text-gray-400 py-4">
    © 2026 Marketplace.
  </div>

</footer>

      {/* MODALS */}
      {popup && <DemoPopUp onClose={() => setShowPopup(false)} />}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      {showPostAd && (
        <PostAdModal
          onClose={() => setShowPostAd(false)}
          onSubmit={handleAddProduct}
        />
      )}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
      {showCategories && <CategoriesModal onClose={() => setShowCategories(false)} />}
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
}

export default Home;
