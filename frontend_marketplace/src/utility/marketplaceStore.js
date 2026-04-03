const CART_KEY = "marketplace_cart_items";
const WISHLIST_KEY = "marketplace_wishlist_items";
const STORE_EVENT = "marketplace:store-updated";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readList(key) {
  if (!isBrowser()) return [];

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeList(key, list) {
  if (!isBrowser()) return;

  window.localStorage.setItem(key, JSON.stringify(list));
}

function emitStoreUpdate() {
  if (!isBrowser()) return;

  window.dispatchEvent(new CustomEvent(STORE_EVENT));
}

function parsePrice(value) {
  if (typeof value === "number") return value;

  const normalized = String(value ?? "").replace(/[^0-9.]/g, "");
  const numeric = Number.parseFloat(normalized);
  return Number.isNaN(numeric) ? 0 : numeric;
}

function normalizeProduct(product) {
  return {
    id: product?.id ?? `${product?.title ?? "product"}-${Date.now()}`,
    title: product?.title ?? product?.name ?? "Untitled product",
    price: parsePrice(product?.price),
    image: product?.image ?? "",
    location: product?.location ?? "",
    description: product?.description ?? "",
    category: product?.category ?? "General",
    seller:
      product?.seller?.personalDetails?.name ??
      product?.seller?.communityDetails?.name ??
      "Marketplace Seller",
  };
}

export function getCartItems() {
  return readList(CART_KEY);
}

export function getWishlistItems() {
  return readList(WISHLIST_KEY);
}

export function addToCart(product) {
  const item = normalizeProduct(product);
  const cart = getCartItems();
  const existing = cart.find((entry) => String(entry.id) === String(item.id));

  const next = existing
    ? cart.map((entry) =>
        String(entry.id) === String(item.id)
          ? { ...entry, qty: (entry.qty ?? 1) + 1 }
          : entry
      )
    : [...cart, { ...item, qty: 1 }];

  writeList(CART_KEY, next);
  emitStoreUpdate();
}

export function addToWishlist(product) {
  const item = normalizeProduct(product);
  const wishlist = getWishlistItems();

  const alreadyExists = wishlist.some((entry) => String(entry.id) === String(item.id));
  if (alreadyExists) return;

  writeList(WISHLIST_KEY, [item, ...wishlist]);
  emitStoreUpdate();
}

export function updateCartQty(id, delta) {
  const next = getCartItems()
    .map((item) =>
      String(item.id) === String(id)
        ? { ...item, qty: Math.max(0, (item.qty ?? 1) + delta) }
        : item
    )
    .filter((item) => item.qty > 0);

  writeList(CART_KEY, next);
  emitStoreUpdate();
}

export function removeFromCart(id) {
  const next = getCartItems().filter((item) => String(item.id) !== String(id));
  writeList(CART_KEY, next);
  emitStoreUpdate();
}

export function removeFromWishlist(id) {
  const next = getWishlistItems().filter((item) => String(item.id) !== String(id));
  writeList(WISHLIST_KEY, next);
  emitStoreUpdate();
}

export function moveWishlistToCart(id) {
  const wishlist = getWishlistItems();
  const selected = wishlist.find((item) => String(item.id) === String(id));

  if (!selected) return;

  addToCart(selected);
  removeFromWishlist(id);
}

export function subscribeMarketplaceStore(onChange) {
  if (!isBrowser()) {
    return () => {};
  }

  const handler = () => onChange();
  window.addEventListener(STORE_EVENT, handler);

  return () => {
    window.removeEventListener(STORE_EVENT, handler);
  };
}
