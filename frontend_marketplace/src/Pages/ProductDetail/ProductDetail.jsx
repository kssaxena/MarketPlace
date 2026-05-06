import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
} from "lucide-react";
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

  useEffect(() => {
    const foundProduct = productsData.find(
      (p) => String(p.id) === String(productId)
    );

    if (foundProduct) {
      addToRecentlyViewed(foundProduct);
      setProduct(foundProduct);
      setLoading(false);
    } else {
      setProduct(productsData[0] || null);
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-white"}`}>
        <Header />
        <div className="flex h-96 items-center justify-center">
          <p className={darkMode ? "text-slate-300" : "text-gray-600"}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-white"}`}>
        <Header />
        <div className="flex h-96 items-center justify-center">
          <p className={darkMode ? "text-slate-300" : "text-gray-600"}>Product not found</p>
        </div>
      </div>
    );
  }

  const specifications = product.specifications || {
    Display: product.display || "6.7 inch AMOLED",
    Storage: product.storage || "256 GB",
    RAM: product.ram || "8 GB RAM",
    Processor: product.processor || "Snapdragon 8 Gen 2",
    Battery: product.battery || "5000 mAh",
    Condition: product.condition || "Good",
  };

  const keyFeatures = product.features || [
    "120Hz display with dynamic refresh rate",
    "Advanced thermal management system",
    "Professional camera with optical image stabilization",
    "Ultra-fast charging technology",
    "Premium build with Gorilla Glass Armor",
    "Extended software support",
  ];

  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 128;
  const discountPercent = product.discountPercent || 10;
  const originalPrice =
    product.originalPrice ||
    Math.round(Number(product.price || 0) * (1 + discountPercent / 100));

  const reviewItems = Array.isArray(product.reviews)
    ? product.reviews.map((review) => {
        if (typeof review === "string") {
          return {
            author: "Verified Buyer",
            text: review,
            rating: 5,
            time: "Recently",
          };
        }

        return {
          author: review.author || review.user || "Verified Buyer",
          text: review.text || review.comment || "Great product quality.",
          rating: Number(review.rating || 5),
          time: review.time || review.createdAt || "Recently",
        };
      })
    : [
        {
          author: "Best camera in a phone yet",
          text: "The low-light performance and AI image tuning feel genuinely premium for the price.",
          rating: 5,
          time: "2 days ago",
        },
      ];

  const handleAddToCart = () => {
    addToCart(product);
    setToast("Added to cart");
    setTimeout(() => setToast(""), 1400);
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout");
  };

  const cardBase = darkMode
    ? "rounded-3xl border border-slate-700 bg-slate-800"
    : "rounded-3xl border border-gray-200 bg-white";

  const mutedBox = darkMode ? "bg-slate-700" : "bg-gray-100";

  return (
    <div className={`min-h-screen ${darkMode ? "bg-slate-900" : "bg-[#f2f2f2]"}`}>
      <Header />

      <div className="w-full px-4 pb-32 pt-4 md:pb-12">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() => navigate(-1)}
            className={`mb-4 flex items-center gap-2 rounded-md px-2 py-2 text-sm transition ${
              darkMode
                ? "text-slate-300 hover:bg-slate-800"
                : "text-slate-700 hover:bg-white"
            }`}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className={`${cardBase} overflow-hidden mb-6`}>
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-96 h-96 shrink-0 overflow-hidden rounded-2xl bg-[#0f1720]">
                  <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                </div>

                <div className="flex-1">
                  <h1
                    className={`text-2xl font-bold md:text-3xl ${
                      darkMode ? "text-slate-100" : "text-gray-900"
                    }`}
                  >
                    {product.title}
                  </h1>

                  <div className="mt-4 flex items-center gap-3">
                    <p className="text-4xl font-bold text-[#0ea5a0]">
                      {formatCurrency(product.price, currency)}
                    </p>
                    <p
                      className={`text-sm line-through ${
                        darkMode ? "text-slate-400" : "text-gray-400"
                      }`}
                    >
                      {formatCurrency(originalPrice, currency)}
                    </p>
                    <p className="rounded bg-[#ecfdf5] px-2 py-1 text-xs font-bold text-[#16a34a]">
                      {discountPercent}% off
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-lg font-bold text-[#16a34a]">{rating}★</span>
                    <span className={`text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                      {reviewCount} ratings
                    </span>
                  </div>

                  <p className={`mt-3 text-sm ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                    {product.location} • Listed {product.time}
                  </p>

                  <div className={`mt-6 rounded-lg border p-4 ${darkMode ? "border-slate-600 bg-slate-700" : "border-gray-200 bg-white"}`}>
                    <p className={`text-xs font-semibold ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
                      DELIVERY OPTIONS
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className={darkMode ? "text-slate-100" : "text-gray-900"}>Standard Delivery</p>
                        <p className="font-semibold text-[#0ea5a0]">Free</p>
                      </div>
                      <p className={`text-xs ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                        3-5 business days
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className={`rounded-lg p-3 text-center ${mutedBox}`}>
                      <Truck size={16} className="text-[#0ea5a0] mx-auto mb-1" />
                      <p className={`text-xs ${darkMode ? "text-slate-300" : "text-gray-700"}`}>Free Delivery</p>
                    </div>
                    <div className={`rounded-lg p-3 text-center ${mutedBox}`}>
                      <RotateCcw size={16} className="text-[#0ea5a0] mx-auto mb-1" />
                      <p className={`text-xs ${darkMode ? "text-slate-300" : "text-gray-700"}`}>Easy Returns</p>
                    </div>
                    <div className={`rounded-lg p-3 text-center ${mutedBox}`}>
                      <ShieldCheck size={16} className="text-[#0ea5a0] mx-auto mb-1" />
                      <p className={`text-xs ${darkMode ? "text-slate-300" : "text-gray-700"}`}>Secure</p>
                    </div>
                  </div>

                  <div className="mt-6 hidden gap-3 md:flex">
                    <button
                      onClick={handleAddToCart}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-[#f59e0b] bg-white px-4 py-3 text-sm font-bold text-[#f59e0b]"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#f59e0b] px-4 py-3 text-sm font-bold text-white"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <section className={`${cardBase} p-6 md:col-span-2`}>
              <h2 className={`text-2xl font-bold ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                Key Features
              </h2>
              <ul className="mt-4 space-y-3">
                {keyFeatures.slice(0, 6).map((feature, idx) => (
                  <li key={idx} className={`flex items-start gap-3 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#0ea5a0]" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${cardBase} p-6`}>
              <h2 className={`text-2xl font-bold ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                Delivery Options
              </h2>
              <div className="mt-4 space-y-3">
                <div className={`rounded-lg p-3 ${mutedBox}`}>
                  <p className={`font-semibold ${darkMode ? "text-slate-100" : "text-gray-900"}`}>Standard</p>
                  <p className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>3-5 days</p>
                  <p className="text-sm font-semibold text-[#0ea5a0] mt-1">Free</p>
                </div>
                <div className={`rounded-lg p-3 ${mutedBox}`}>
                  <p className={`font-semibold ${darkMode ? "text-slate-100" : "text-gray-900"}`}>Pickup</p>
                  <p className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>From seller</p>
                  <p className="text-sm font-semibold text-[#0ea5a0] mt-1">Free</p>
                </div>
              </div>
            </section>

            <section className={`${cardBase} p-6 md:col-span-2`}>
              <h2 className={`text-2xl font-bold ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                Specifications
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {Object.entries(specifications)
                  .slice(0, 6)
                  .map(([key, value]) => (
                    <div key={key} className={`rounded-lg p-3 ${mutedBox}`}>
                      <p className={`text-xs font-semibold ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                        {key}
                      </p>
                      <p className={`text-sm font-bold mt-1 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                        {value}
                      </p>
                    </div>
                  ))}
              </div>
            </section>

            <section className={`${cardBase} p-6`}>
              <h2 className={`text-2xl font-bold ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                Reviews
              </h2>
              <div className="mt-3 flex items-center gap-1">
                <span className="text-2xl font-bold text-[#16a34a]">{rating}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.round(rating) ? "fill-[#16a34a] text-[#16a34a]" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <p className={`text-xs mt-1 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                {reviewCount} ratings
              </p>
              {reviewItems[0] && (
                <div className={`mt-3 rounded-lg border p-3 ${darkMode ? "border-slate-600 bg-slate-700" : "border-gray-200"}`}>
                  <p className="text-xs font-bold text-[#16a34a]">{"★".repeat(5)}</p>
                  <p className={`text-sm font-semibold mt-1 ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                    {reviewItems[0].author}
                  </p>
                  <p className={`text-xs mt-1 ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                    {reviewItems[0].text.substring(0, 60)}...
                  </p>
                </div>
              )}
            </section>

            <section className={`${cardBase} p-6 md:col-span-3`}>
              <h2 className={`text-2xl font-bold ${darkMode ? "text-slate-100" : "text-gray-900"}`}>
                Description
              </h2>
              <p className={`mt-3 text-sm leading-relaxed ${darkMode ? "text-slate-300" : "text-gray-700"}`}>
                {product.description}
              </p>
            </section>
          </div>
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 z-30 border-t px-4 py-3 md:hidden ${darkMode ? "border-slate-700 bg-slate-900" : "border-gray-200 bg-white"}`}>
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-lg border-2 border-[#f59e0b] bg-white py-3 text-xs font-bold text-[#f59e0b]"
          >
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 rounded-lg bg-[#f59e0b] py-3 text-xs font-bold text-white"
          >
            Buy Now
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-24 left-4 right-4 z-40 rounded-lg bg-[#0ea5a0] px-4 py-3 text-xs font-bold text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
