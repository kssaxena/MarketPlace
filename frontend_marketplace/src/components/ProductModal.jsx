import { useState } from "react";
import { addToCart, addToWishlist } from "../utility/marketplaceStore.js";

function ProductModal({ product, onClose }) {
  const [toast, setToast] = useState("");

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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-2xl rounded-xl shadow-xl relative overflow-hidden animate-fadeIn"
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 hover:bg-white text-red-700 rounded-full px-2 py-1 text-lg shadow-md"
        >
          ✕
        </button>

        {/* IMAGE */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-cover"
        />

        {/* CONTENT */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>

          <p className="text-teal-600 text-xl font-bold mb-4">
            {String(product.price).startsWith("$") || String(product.price).startsWith("₹")
              ? product.price
              : `₹ ${product.price}`}
          </p>

          <p className="text-gray-700 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* 🔥 SELLER INFO (NO API CALL NEEDED) */}
          {product.seller && (
            <div className="mb-4 p-4 bg-gray-100 rounded-xl">
              <h3 className="font-semibold text-lg mb-1">Seller Info</h3>

              <p className="text-gray-700">
                {product.seller?.personalDetails?.name}
              </p>

              <p className="text-gray-500 text-sm">
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
              className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Add to Wishlist
            </button>
            {toast && <span className="text-sm font-medium text-teal-700">{toast}</span>}
          </div>

          {/* LOCATION & TIME */}
          <div className="text-sm text-gray-500 flex justify-between">
            <span>{product.location}</span>
            <span>{product.time}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductModal;
