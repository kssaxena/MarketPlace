import { useMemo, useState } from "react";

function CartModal({
  isOpen,
  onClose,
  cartItems,
  wishlistItems,
  onIncreaseQty,
  onDecreaseQty,
  onRemoveCartItem,
  onMoveWishlistToCart,
  onRemoveWishlistItem,
}) {
  const [activeTab, setActiveTab] = useState("cart");

  if (!isOpen) return null;

  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 1), 0),
    [cartItems]
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[420px] max-h-[80vh] rounded-2xl p-5 shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-900">Shopping</h4>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab("cart")}
            className={`rounded-lg px-3 py-2 transition ${
              activeTab === "cart" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            Cart ({cartItems.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("wishlist")}
            className={`rounded-lg px-3 py-2 transition ${
              activeTab === "wishlist" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"
            }`}
          >
            Wishlist ({wishlistItems.length})
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {activeTab === "cart" &&
            (cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-200">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-teal-200 to-teal-500" />
                      )}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{item.title}</h5>
                      <p className="text-sm text-gray-600">₹ {item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onDecreaseQty(item.id)}
                      className="px-2 bg-gray-300 rounded"
                    >
                      -
                    </button>

                    <span className="w-6 text-center">{item.qty}</span>

                    <button
                      type="button"
                      onClick={() => onIncreaseQty(item.id)}
                      className="px-2 bg-gray-300 rounded"
                    >
                      +
                    </button>

                    <button
                      type="button"
                      onClick={() => onRemoveCartItem(item.id)}
                      className="ml-1 text-xs font-semibold text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ))}

          {activeTab === "wishlist" &&
            (wishlistItems.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Your wishlist is empty</p>
            ) : (
              wishlistItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-200">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-teal-200 to-teal-500" />
                      )}
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{item.title}</h5>
                      <p className="text-sm text-gray-600">₹ {item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onMoveWishlistToCart(item.id)}
                      className="rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700"
                    >
                      Move to cart
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemoveWishlistItem(item.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ))}
        </div>

        {/* Footer */}
        {activeTab === "cart" && (
          <div className="mt-4 border-t pt-3">
            <h4 className="font-semibold mb-2">Total: ₹ {total.toLocaleString()}</h4>
            <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700">
              Checkout →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default CartModal;
