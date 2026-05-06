import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";

import { productsData } from "../../constants/products.js";
import {
  formatCurrency,
  getSelectedCurrency,
  subscribeCurrencyChange,
} from "../../utility/currency.js";
import { PRODUCT_CATEGORIES, BEST_DEALS_SORT_OPTIONS } from "../../constants/filters.js";

// Extract numeric price value by stripping currency symbols for sortable comparisons.
function parsePrice(p) {
  if (!p) return 0;
  return parseFloat(String(p).replace(/[^0-9.]/g, "")) || 0;
}

export default function BestDeals() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState(() => getSelectedCurrency());

  // Curate deals from the featured-flagged products in the product database.
  const featuredProducts = productsData.filter((p) => p.featured);

  useEffect(() => subscribeCurrencyChange(setCurrency), []);

  // Apply multi-stage filtering: by category → search → sort. Separate top deal for hero layout.
  const filtered = featuredProducts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price_asc") return parsePrice(a.price) - parsePrice(b.price);
      if (sortBy === "price_desc") return parsePrice(b.price) - parsePrice(a.price);
      return 0;
    });

  const topPick = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="best-deals" onSearchQueryChange={setSearchQuery} searchQuery={searchQuery} onSearchSubmit={(e) => e.preventDefault()} onPostAdClick={() => navigate("/post-ad")} />

      <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-teal-400 px-6 py-14 text-white">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 left-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-[0.78rem] font-bold uppercase tracking-[0.2em]">
            🔥 Limited Time
          </span>
          <h1 className="mt-4 text-[2.8rem] font-extrabold tracking-[-0.03em]">Best Deals</h1>
          <p className="mt-3 text-[1.05rem] text-teal-100">
            Hand-picked listings with the biggest savings — updated daily
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="rounded-2xl bg-white/15 px-5 py-3 text-center">
              <p className="text-2xl font-bold">{featuredProducts.length}</p>
              <p className="text-[0.75rem] text-teal-100">Active Deals</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-5 py-3 text-center">
              <p className="text-2xl font-bold">{PRODUCT_CATEGORIES.length - 1}</p>
              <p className="text-[0.75rem] text-teal-100">Categories</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-5 py-3 text-center">
              <p className="text-2xl font-bold">Up to 60%</p>
              <p className="text-[0.75rem] text-teal-100">Off</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8">

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-[0.85rem] font-semibold transition ${
                  activeCategory === cat
                    ? "bg-teal-600 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-[0.85rem] font-medium text-gray-700 outline-none focus:border-teal-400"
          >
            {BEST_DEALS_SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-5xl">🔍</p>
            <p className="mt-4 text-lg font-semibold text-gray-700">No deals found</p>
            <p className="mt-1 text-sm text-gray-400">Try a different category or search term</p>
          </div>
        ) : (
          <>
            {topPick && (
              <div
                onClick={() => navigate(`/product/${topPick.id}`)}
                className="mb-8 cursor-pointer overflow-hidden rounded-[28px] border border-teal-100 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <img src={topPick.image} alt={topPick.title} className="h-full w-full object-cover" />
                    <span className="absolute left-4 top-4 rounded-full bg-teal-600 px-3 py-1 text-[0.75rem] font-bold text-white shadow">
                      ⭐ Top Pick
                    </span>
                  </div>
                  <div className="flex flex-col justify-center p-8">
                    <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-teal-500">{topPick.category}</span>
                    <h2 className="mt-2 text-[1.6rem] font-bold tracking-[-0.02em] text-gray-900">{topPick.title}</h2>
                    <p className="mt-3 text-[0.9rem] leading-relaxed text-gray-500 line-clamp-3">{topPick.description}</p>
                    <div className="mt-5 flex items-center justify-between">
                      <p className="text-[2rem] font-extrabold tracking-[-0.03em] text-teal-600">{formatCurrency(topPick.price, currency)}</p>
                      <div className="text-right text-[0.8rem] text-gray-400">
                        <p>📍 {topPick.location}</p>
                        <p className="mt-1">🕒 {topPick.time}</p>
                      </div>
                    </div>
                    <button className="mt-5 rounded-xl bg-teal-600 px-6 py-3 text-[0.88rem] font-semibold text-white transition hover:bg-teal-700">
                      View Deal →
                    </button>
                  </div>
                </div>
              </div>
            )}

            <p className="mb-4 text-[0.85rem] text-gray-400 font-medium">
              Showing <span className="text-teal-600 font-bold">{filtered.length}</span> deals
              {activeCategory !== "All" && <> in <span className="text-gray-700 font-semibold">{activeCategory}</span></>}
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rest.map((product, index) => (
                <div
                  key={product.id ?? index}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group cursor-pointer overflow-hidden rounded-[24px] bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-teal-600/90 px-2.5 py-0.5 text-[0.7rem] font-bold text-white">
                      DEAL
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-teal-500">{product.category}</p>
                    <p className="mt-2 text-[1.3rem] font-extrabold tracking-[-0.02em] text-teal-600">{formatCurrency(product.price, currency)}</p>
                    <p className="mt-1 text-[0.78rem] text-gray-400">📍 {product.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
