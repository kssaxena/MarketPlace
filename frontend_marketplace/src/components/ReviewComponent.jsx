import { useEffect, useState } from "react";
import { Star, Trash2, Edit2 } from "lucide-react";
import { reviewAPI } from "../services/api.js";
import { isDarkModeEnabled } from "../utility/theme.js";

function ReviewComponent({ productId, onReviewAdded }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(() => isDarkModeEnabled());
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token")
  );
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  });

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    rating: 5,
    title: "",
    comment: "",
  });

  // Fetch reviews
  useEffect(() => {
    fetchReviews();
    const onThemeChange = (event) => {
      setDarkMode(Boolean(event.detail?.darkMode));
    };
    window.addEventListener("themechange", onThemeChange);
    return () => window.removeEventListener("themechange", onThemeChange);
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewAPI.getProductReviews(productId);
      setReviews(response.data.reviews || []);
      setError("");
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError("Please login to submit a review");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        await reviewAPI.updateReview(editingId, {
          ...formData,
          productId,
        });
      } else {
        await reviewAPI.createReview({
          ...formData,
          productId,
        });
      }
      setFormData({ rating: 5, title: "", comment: "" });
      setEditingId(null);
      setShowForm(false);
      await fetchReviews();
      onReviewAdded?.();
    } catch (err) {
      setError(err.response?.data?.message || "Error submitting review");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      setLoading(true);
      await reviewAPI.deleteReview(reviewId);
      await fetchReviews();
    } catch (err) {
      setError("Error deleting review");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setFormData({
      rating: review.rating,
      title: review.title,
      comment: review.comment,
    });
    setShowForm(true);
  };

  const renderStars = (rating, size = "sm") => {
    const sizeClass = size === "lg" ? "w-5 h-5" : "w-4 h-4";
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`${sizeClass} ${
              i <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  return (
    <div
      className={`mt-6 pt-6 border-t ${
        darkMode ? "border-slate-700" : "border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3
            className={`text-xl font-semibold mb-2 ${
              darkMode ? "text-slate-100" : "text-gray-900"
            }`}
          >
            Reviews ({reviews.length})
          </h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              {renderStars(Math.round(averageRating), "lg")}
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {averageRating} out of 5
              </span>
            </div>
          )}
        </div>
        {isAuthenticated && (
          <button
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
              setFormData({ rating: 5, title: "", comment: "" });
            }}
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700 transition"
          >
            {showForm ? "Cancel" : "Write Review"}
          </button>
        )}
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* FORM */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className={`mb-6 rounded-lg p-4 ${
            darkMode ? "bg-slate-800" : "bg-gray-100"
          }`}
        >
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-slate-200" : "text-gray-700"
              }`}
            >
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, rating: i })
                  }
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 cursor-pointer transition ${
                      i <= formData.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-slate-200" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Brief title for your review"
              className={`w-full rounded-lg px-3 py-2 text-sm border ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-slate-100"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-slate-200" : "text-gray-700"
              }`}
            >
              Comment
            </label>
            <textarea
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              placeholder="Share your experience with this product"
              className={`w-full rounded-lg px-3 py-2 text-sm border ${
                darkMode
                  ? "bg-slate-700 border-slate-600 text-slate-100"
                  : "bg-white border-gray-300 text-gray-900"
              } focus:outline-none focus:ring-2 focus:ring-teal-500`}
              rows="3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : editingId ? "Update Review" : "Submit Review"}
          </button>
        </form>
      )}

      {/* LOADING */}
      {loading && !showForm && (
        <div
          className={`text-center py-4 text-sm ${
            darkMode ? "text-slate-400" : "text-gray-500"
          }`}
        >
          Loading reviews...
        </div>
      )}

      {/* REVIEWS LIST */}
      <div className="space-y-4">
        {reviews.length === 0 && !showForm && !loading ? (
          <p
            className={`text-center py-4 text-sm ${
              darkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            No reviews yet. Be the first to review!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className={`rounded-lg p-4 ${
                darkMode ? "bg-slate-800" : "bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {renderStars(review.rating)}
                    <span
                      className={`text-sm font-medium ${
                        darkMode ? "text-slate-200" : "text-gray-700"
                      }`}
                    >
                      {review.rating}.0
                    </span>
                  </div>
                  <h4
                    className={`font-semibold ${
                      darkMode ? "text-slate-100" : "text-gray-900"
                    }`}
                  >
                    {review.title}
                  </h4>
                  <p
                    className={`text-xs ${
                      darkMode ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    by {review.user?.name || "Anonymous"} •{" "}
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* ACTIONS */}
                {currentUser?._id === review.user?._id && (
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => handleEdit(review)}
                      className={`p-1 rounded transition ${
                        darkMode
                          ? "hover:bg-slate-700"
                          : "hover:bg-gray-200"
                      }`}
                      title="Edit review"
                    >
                      <Edit2 className="w-4 h-4 text-teal-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className={`p-1 rounded transition ${
                        darkMode
                          ? "hover:bg-slate-700"
                          : "hover:bg-gray-200"
                      }`}
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                )}
              </div>

              <p
                className={`text-sm leading-relaxed ${
                  darkMode ? "text-slate-300" : "text-gray-700"
                }`}
              >
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewComponent;
