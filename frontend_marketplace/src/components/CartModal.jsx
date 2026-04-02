function CartModal({ isOpen, onClose, cartItems, setCartItems }) {
  if (!isOpen) return null;

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems
        .map(item =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0) // remove if 0
    );
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[400px] max-h-[80vh] rounded-xl p-5 shadow-xl flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Your Cart</h4>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                
                <div>
                  <h5 className="font-medium">{item.name}</h5>
                  <p className="text-sm text-gray-600">₹ {item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 bg-gray-300 rounded"
                  >
                    -
                  </button>

                  <span>{item.qty}</span>

                  <button 
                    onClick={() => increaseQty(item.id)}
                    className="px-2 bg-gray-300 rounded"
                  >
                    +
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 border-t pt-3">
          <h4 className="font-semibold mb-2">Total: ₹ {total}</h4>
          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Checkout →
          </button>
        </div>

      </div>
    </div>
  );
}

export default CartModal;