import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import {
  formatCurrency,
  getSelectedCurrency,
  subscribeCurrencyChange,
} from "../utility/currency.js";
import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
  subscribeMarketplaceStore,
} from "../utility/marketplaceStore.js";

function ProductCard({ product, onClick }) {
  const condition = product.condition || "Good";
  const [currency, setCurrency] = useState(() => getSelectedCurrency());
  const [isInWishlist, setIsInWishlist] = useState(() => {
    const wishlist = getWishlistItems();
    return wishlist.some((item) => String(item.id) === String(product?.id));
  });

  useEffect(() => subscribeCurrencyChange(setCurrency), []);

  useEffect(() => {
    const handleStoreUpdate = () => {
      const wishlist = getWishlistItems();
      setIsInWishlist(wishlist.some((item) => String(item.id) === String(product?.id)));
    };
    return subscribeMarketplaceStore(handleStoreUpdate);
  }, [product?.id]);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(product?.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div
      className="product-card group overflow-hidden rounded-[28px] bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 z-10 hover:bg-gray-50"
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={20}
            className={`transition-colors duration-200 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
          />
        </button>

        <div className="product-card__overlay absolute inset-x-5 bottom-5 rounded-2xl bg-white/95 p-5 shadow-lg opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <p className="product-card__condition text-sm font-semibold tracking-[0.02em] text-gray-900">
            <span className="product-card__condition-label text-gray-500">Condition:</span> {condition}
          </p>
          <p className="product-card__description mt-1 text-[0.8rem] leading-6 text-gray-600 line-clamp-2">
            {product.description}
          </p>
          <p className="product-card__time mt-3 text-[0.75rem] font-medium tracking-[0.12em] uppercase text-gray-400">
            {product.time}
          </p>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[1.4rem] font-bold tracking-[-0.03em] text-teal-600">
          {formatCurrency(product.price, currency)}
        </p>
        <h3 className="product-card__title mt-2 text-[1.02rem] font-semibold leading-7 tracking-[-0.02em] text-gray-900">
          {product.title}
        </h3>
        <p className="product-card__location mt-2 text-[0.9rem] font-medium text-gray-500">
          {product.location}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
          className="mt-3 w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-200"
        >
          View Product
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
