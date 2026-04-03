import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productsData as products } from "../../constants/products";
import ProductCard from "../../components/ProductCard.jsx";
import Header from "../../components/Header.jsx";


export default function Search() {

  const location = useLocation();
  const navigate = useNavigate();
  const queryFromUrl = new URLSearchParams(location.search).get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryFromUrl);

  useEffect(() => {
    setSearchQuery(queryFromUrl);
  }, [queryFromUrl]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();
    navigate(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : "/search");
  };

  const filteredProducts = products.filter((item) => {

    const searchText = searchQuery.toLowerCase();

    return (
      item.title.toLowerCase().includes(searchText) ||
      item.category.toLowerCase().includes(searchText) ||
      item.location.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText)
    );

  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header
        activePage="search"
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onPostAdClick={() => navigate("/post-ad")}
      />

      <div className="max-w-6xl mx-auto p-10 w-full flex-1">
        <h2 className="mb-8 text-[1.45rem] font-semibold tracking-[-0.02em] text-gray-900">
          Search Results for "{searchQuery}"
        </h2>

        {filteredProducts.length === 0 ? (

          <p className="text-gray-500">No items found.</p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredProducts.map((item) => (
              <ProductCard key={item.id} product={item} />

            ))}

          </div>

        )}
      </div>
    </div>
  );
}
