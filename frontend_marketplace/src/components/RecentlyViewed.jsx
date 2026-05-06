import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecentlyViewed } from "../utility/userTracking.js";
import {
  formatCurrency,
  getSelectedCurrency,
  subscribeCurrencyChange,
} from "../utility/currency.js";

export default function RecentlyViewed() {
  const recently = getRecentlyViewed();
  const [currency, setCurrency] = useState(() => getSelectedCurrency());

  useEffect(() => subscribeCurrencyChange(setCurrency), []);

  if (recently.length === 0) return null;

  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          🕐 Recently Viewed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {recently.map((product) => (
            <Link
              key={product.id}
              to={`/search?q=${encodeURIComponent(product.title)}`}
              className="group block overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-1"
            >
              <div className="relative h-40 overflow-hidden bg-gray-200">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">{product.title}</p>
                <p className="text-xs text-gray-500 mt-1">{product.location}</p>
                <p className="text-teal-600 font-semibold text-sm mt-2">{formatCurrency(product.price, currency)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
