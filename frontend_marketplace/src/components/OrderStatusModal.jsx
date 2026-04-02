function OrderModal({
  isOpen,
  onClose,
  orderId,
  setOrderId,
  orderStatus,
  setOrderStatus
}) {
  if (!isOpen) return null;

  const checkStatus = () => {
    if (orderId === "123") setOrderStatus("Delivered");
    else if (orderId === "456") setOrderStatus("Shipped");
    else setOrderStatus("Processing");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white w-[350px] p-6 rounded-xl shadow-xl relative">

        {/* Close */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-lg"
        >
          ✕
        </button>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-4 text-center">
          Track Your Order
        </h3>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg mb-3 outline-none"
        />

        {/* Button */}
        <button
          onClick={checkStatus}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Check Status
        </button>

        {/* Status */}
        {orderStatus && (
          <div className="mt-4 text-center bg-gray-100 p-3 rounded-lg">
            Status: <strong>{orderStatus}</strong>
          </div>
        )}

      </div>
    </div>
  );
}

export default OrderModal;