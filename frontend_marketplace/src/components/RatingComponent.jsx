// Star rating display component with interactive rating capability

export function StarRating({ rating, size = "md" }) {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  if (!rating) {
    return <span className={`${sizeClasses[size]} text-gray-300`}>Not rated</span>;
  }

  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;

  return (
    <div className={`flex gap-0.5 ${sizeClasses[size]}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= fullStars ? (
            <span>⭐</span>
          ) : hasHalf && star === fullStars + 1 ? (
            <span>⭐️</span>
          ) : (
            <span className="text-gray-300">☆</span>
          )}
        </span>
      ))}
      <span className="ml-1 text-gray-600">({rating.toFixed(1)})</span>
    </div>
  );
}

export function RatingInput({ onRate, currentRating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className={`text-lg transition ${star <= (currentRating || 0) ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"}`}
          title={`Rate ${star} stars`}
        >
          ⭐
        </button>
      ))}
    </div>
  );
}
