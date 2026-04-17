import { useNavigate } from "react-router-dom";
import { getSavedSearches, removeSavedSearch } from "../utility/userTracking.js";

export default function SavedSearchesWidget() {
  const navigate = useNavigate();
  const saved = getSavedSearches().slice(0, 5);

  if (saved.length === 0) return null;

  return (
    <div className="bg-teal-50 border border-teal-100 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">⭐ Your Saved Searches</h3>
      <div className="space-y-2">
        {saved.map((item) => (
          <div key={item.query} className="flex items-center justify-between gap-2">
            <button
              onClick={() => navigate(`/search?q=${encodeURIComponent(item.query)}`)}
              className="flex-1 text-left text-sm text-teal-600 hover:text-teal-700 font-medium transition"
            >
              {item.query}
            </button>
            <button
              onClick={() => removeSavedSearch(item.query)}
              className="text-gray-300 hover:text-red-400 text-xs transition"
              title="Remove"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
