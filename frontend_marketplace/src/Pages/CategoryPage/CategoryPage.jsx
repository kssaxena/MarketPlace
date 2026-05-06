import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productsData } from "../../constants/products";
import ProductCard from "../../components/ProductCard";
import Header from "../../components/Header";
import { CATEGORY_PAGE_SORT_OPTIONS } from "../../constants/filters.js";

function parsePrice(str) {
  // Normalize mixed currency strings into sortable numeric values.
  return Number(String(str).replace(/[^0-9.]/g, "")) || 0;
}

function CategoryPage() {
  const { categoryName, subCategory } = useParams();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("newest");
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const decodedCategory = decodeURIComponent(categoryName || "");
  const decodedSubCategory = subCategory ? decodeURIComponent(subCategory) : null;

  const filteredAds = useMemo(() => {
    // Apply filters in stages to keep each branch easy to reason about.
    let ads = productsData;

    if (decodedCategory.toLowerCase() !== "all ads") {
      ads = ads.filter(
        (ad) => ad.category?.toLowerCase() === decodedCategory.toLowerCase()
      );
    }

    if (decodedSubCategory) {
      const subcatFiltered = ads.filter(
        (ad) => ad.subCategory?.toLowerCase() === decodedSubCategory.toLowerCase()
      );
      // Only tighten by subcategory when matching data exists.
      if (subcatFiltered.length > 0) ads = subcatFiltered;
    }

    if (minPrice !== "") ads = ads.filter((ad) => parsePrice(ad.price) >= Number(minPrice));
    if (maxPrice !== "") ads = ads.filter((ad) => parsePrice(ad.price) <= Number(maxPrice));

    if (condition !== "") {
      ads = ads.filter(
        (ad) => ad.condition?.toLowerCase() === condition.toLowerCase()
      );
    }

    if (sortBy === "price_asc") {
      ads = [...ads].sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price_desc") {
      ads = [...ads].sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else {
      ads = [...ads].reverse();
    }

    return ads;
  }, [decodedCategory, decodedSubCategory, sortBy, minPrice, maxPrice, condition]);

  const clearFilters = () => {
    setSortBy("newest");
    setMinPrice("");
    setMaxPrice("");
    setCondition("");
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    navigate(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : "/search");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activePage="home"
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onPostAdClick={() => navigate("/post-ad")}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 capitalize">
            {decodedCategory} Ads
          </h1>
          {decodedSubCategory && (
            <p className="text-sm text-gray-500 mt-1">
              {decodedCategory} &rsaquo; {decodedSubCategory}
            </p>
          )}
          <p className="text-sm text-gray-400 mt-1">{filteredAds.length} ads found</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">

          <aside className="w-full md:w-56 flex-shrink-0">
            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">

              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-xs font-medium tracking-wide text-gray-700 uppercase">
                  Filters
                </span>
                <button
                  onClick={clearFilters}
                  className="text-xs text-teal-700 bg-teal-50 rounded-full px-3 py-1 font-medium hover:bg-teal-100 transition"
                >
                  Clear
                </button>
              </div>

              <div className="p-4 space-y-4">

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Sort by</p>
                  <div className="space-y-2">
                    {CATEGORY_PAGE_SORT_OPTIONS.map((o) => (
                      <label
                        key={o.value}
                        className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
                      >
                        <input
                          type="radio"
                          name="sort"
                          value={o.value}
                          checked={sortBy === o.value}
                          onChange={() => setSortBy(o.value)}
                          className="accent-teal-600"
                        />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Price range</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <span className="text-gray-300 text-xs">—</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-0 flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">Condition</p>
                  <div className="flex flex-wrap gap-2">
                    {["New", "Used", "Refurbished"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCondition(condition === c ? "" : c)}
                        className={`text-xs px-3 py-1 rounded-full border font-medium transition ${
                          condition === c
                            ? "border-teal-600 bg-teal-50 text-teal-700"
                            : "border-gray-200 bg-gray-50 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <div className="px-4 pb-4 pt-1">
                <button className="w-full bg-teal-700 text-teal-50 rounded-xl py-2.5 text-sm font-medium hover:bg-teal-800 transition">
                  Apply filters
                </button>
              </div>

            </div>
          </aside>

          <div className="flex-1">
            {filteredAds.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-gray-400">
                <span className="text-5xl mb-4">🔍</span>
                <p className="text-lg font-medium">No ads found</p>
                <p className="text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAds.map((ad) => (
                  <ProductCard
                    key={ad.id}
                    product={ad}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
