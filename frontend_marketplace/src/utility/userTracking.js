// Utility functions for tracking user behavior: recently viewed products, saved searches, seller ratings, etc.

const RECENTLY_VIEWED_KEY = "marketplace_recently_viewed";
const SAVED_SEARCHES_KEY = "marketplace_saved_searches";
const SELLER_RATINGS_KEY = "marketplace_seller_ratings";
const PRODUCT_RATINGS_KEY = "marketplace_product_ratings";

function readList(key) {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function writeList(key, list) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(list));
}

// Recently Viewed Products tracking
export function addToRecentlyViewed(product) {
  if (!product?.id) return;
  
  const list = readList(RECENTLY_VIEWED_KEY);
  const filtered = list.filter((p) => p.id !== product.id);
  const updated = [product, ...filtered].slice(0, 10); // Keep last 10
  writeList(RECENTLY_VIEWED_KEY, updated);
}

export function getRecentlyViewed() {
  return readList(RECENTLY_VIEWED_KEY);
}

export function clearRecentlyViewed() {
  writeList(RECENTLY_VIEWED_KEY, []);
}

// Saved Searches
export function addSavedSearch(query) {
  if (!query?.trim()) return;
  
  const list = readList(SAVED_SEARCHES_KEY);
  const existing = list.find((s) => s.query.toLowerCase() === query.toLowerCase());
  if (existing) {
    existing.lastUsed = new Date().toISOString();
  } else {
    list.unshift({ query, createdAt: new Date().toISOString(), lastUsed: new Date().toISOString() });
  }
  writeList(SAVED_SEARCHES_KEY, list.slice(0, 15)); // Keep last 15
}

export function getSavedSearches() {
  return readList(SAVED_SEARCHES_KEY);
}

export function removeSavedSearch(query) {
  const list = readList(SAVED_SEARCHES_KEY);
  writeList(SAVED_SEARCHES_KEY, list.filter((s) => s.query !== query));
}

// Product Ratings
export function setProductRating(productId, rating) {
  if (!productId || rating < 1 || rating > 5) return;
  
  const ratings = readList(PRODUCT_RATINGS_KEY);
  const existing = ratings.find((r) => String(r.productId) === String(productId));
  
  if (existing) {
    existing.rating = rating;
  } else {
    ratings.push({ productId, rating, ratedAt: new Date().toISOString() });
  }
  writeList(PRODUCT_RATINGS_KEY, ratings);
}

export function getProductRating(productId) {
  const ratings = readList(PRODUCT_RATINGS_KEY);
  return ratings.find((r) => String(r.productId) === String(productId));
}

export function getAverageProductRating(productId) {
  const ratings = readList(PRODUCT_RATINGS_KEY);
  const productRatings = ratings.filter((r) => String(r.productId) === String(productId));
  
  if (productRatings.length === 0) return null;
  const sum = productRatings.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / productRatings.length) * 2) / 2;
}

// Seller Ratings
export function setSellerRating(sellerName, rating) {
  if (!sellerName || rating < 1 || rating > 5) return;
  
  const ratings = readList(SELLER_RATINGS_KEY);
  const existing = ratings.find((r) => r.sellerName === sellerName);
  
  if (existing) {
    existing.ratings = [...existing.ratings, { rating, ratedAt: new Date().toISOString() }];
  } else {
    ratings.push({ sellerName, ratings: [{ rating, ratedAt: new Date().toISOString() }] });
  }
  writeList(SELLER_RATINGS_KEY, ratings);
}

export function getSellerAverageRating(sellerName) {
  const ratings = readList(SELLER_RATINGS_KEY);
  const seller = ratings.find((r) => r.sellerName === sellerName);
  
  if (!seller || seller.ratings.length === 0) return null;
  const sum = seller.ratings.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / seller.ratings.length) * 2) / 2;
}

export function getSellerRatingCount(sellerName) {
  const ratings = readList(SELLER_RATINGS_KEY);
  const seller = ratings.find((r) => r.sellerName === sellerName);
  return seller?.ratings?.length || 0;
}
