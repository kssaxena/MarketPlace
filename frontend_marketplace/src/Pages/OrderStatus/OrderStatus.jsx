import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { orderAPI } from "../../services/api.js";
import {
  getWishlistItems,
  subscribeMarketplaceStore,
} from "../../utility/marketplaceStore.js";
import {
  formatCurrency,
  getSelectedCurrency,
  subscribeCurrencyChange,
} from "../../utility/currency.js";


const ORDER_STATUS_STEPS = {
  pending: ["pending"],
  processing: ["pending", "processing"],
  shipped: ["pending", "processing", "shipped"],
  delivered: ["pending", "processing", "shipped", "delivered"],
  cancelled: ["cancelled"],
};

function OrderCard({ order, currency }) {
  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-50 text-yellow-700",
      processing: "bg-blue-50 text-blue-700",
      shipped: "bg-purple-50 text-purple-700",
      delivered: "bg-teal-50 text-teal-700",
      cancelled: "bg-red-50 text-red-700",
    };
    return colors[status] || colors.pending;
  };

  const completedSteps = ORDER_STATUS_STEPS[order.orderStatus] || [];
  const allSteps = ["pending", "processing", "shipped", "delivered"];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
      {/* Order Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Order ID</p>
          <h3 className="text-xl font-bold text-gray-900 mt-1">{order.orderNumber}</h3>
        </div>
        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
          {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
        </span>
      </div>

      {/* Order Status Timeline */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Tracking Progress</p>
        <div className="grid grid-cols-4 gap-2">
          {allSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(step);
            const stepLabels = {
              pending: "Pending",
              processing: "Processing",
              shipped: "Shipped",
              delivered: "Delivered",
            };

            return (
              <div key={step} className="relative">
                {index < allSteps.length - 1 && (
                  <div className={`absolute left-[calc(50%+18px)] top-5 h-1 w-[calc(100%-36px)] ${isCompleted ? "bg-teal-500" : "bg-gray-200"}`} />
                )}
                <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 font-bold text-sm ${
                  isCompleted
                    ? "border-teal-500 bg-teal-500 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}>
                  {isCompleted ? "✓" : index + 1}
                </div>
                <p className={`text-center text-xs font-semibold mt-2 ${isCompleted ? "text-gray-900" : "text-gray-400"}`}>
                  {stepLabels[step]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Total Amount</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{formatCurrency(order.totalAmount, currency)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Items</p>
          <p className="text-lg font-bold text-gray-900 mt-1">{order.items?.length || 0} item{order.items?.length !== 1 ? "s" : ""}</p>
        </div>
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">Tracking</p>
          <p className="text-sm font-semibold text-gray-900 mt-1">{order.trackingNumber || "Not available"}</p>
        </div>
      </div>

      {/* Items List */}
      <div className="border-t pt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Items ({order.items?.length || 0})</p>
        <div className="space-y-3">
          {order.items && order.items.length > 0 ? (
            order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start py-2 border-b last:border-0">
                <div>
                  <p className="font-semibold text-gray-900">{item.product?.title || "Product"}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">{formatCurrency(item.price * item.quantity, currency)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in this order</p>
          )}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">Shipping To</p>
        <p className="text-sm font-semibold text-gray-900">{order.shippingAddress?.name}</p>
        <p className="text-sm text-gray-600">{order.shippingAddress?.street}</p>
        <p className="text-sm text-gray-600">{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
        <p className="text-sm text-gray-600">{order.shippingAddress?.country}</p>
      </div>
    </div>
  );
}

export default function OrderStatus() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlistItems, setWishlistItems] = useState(() => getWishlistItems());
  const [currency, setCurrency] = useState(() => getSelectedCurrency());

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Fetch user orders
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await orderAPI.getUserOrders();
        setOrders(response.data.orders || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  // Sync wishlist
  useEffect(() => {
    const sync = () => {
      setWishlistItems(getWishlistItems());
    };
    sync();
    return subscribeMarketplaceStore(sync);
  }, []);

  useEffect(() => subscribeCurrencyChange(setCurrency), []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">Please login to view orders</p>
            <Link to="/login" className="mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="order-status" />

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage all your orders from one place</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{user?.name}</p>
              <p className="text-gray-600">{user?.email}</p>
              {user?.phone && <p className="text-gray-600">{user?.phone}</p>}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase text-gray-400">Total Orders</p>
            <p className="text-3xl font-bold text-teal-600 mt-2">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase text-gray-400">Delivered</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{orders.filter(o => o.orderStatus === "delivered").length}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs font-bold uppercase text-gray-400">In Progress</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{orders.filter(o => ["pending", "processing", "shipped"].includes(o.orderStatus)).length}</p>
          </div>
        </div>

        {/* Orders List */}
        <div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-2xl mb-2">📦</p>
              <p className="text-lg font-semibold text-gray-900">No orders yet</p>
              <p className="text-gray-600 mt-1">Start shopping to see your orders here</p>
              <Link to="/" className="mt-4 inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div>
              {orders.map((order) => (
                <OrderCard key={order._id} order={order} currency={currency} />
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-teal-50 border border-teal-200 rounded-xl p-6">
          <p className="text-lg font-semibold text-teal-900 mb-2">Need help with an order?</p>
          <p className="text-teal-800 mb-4">Our support team is here to assist you with tracking, delivery, and any questions about your orders.</p>
          <Link to="/contact" className="inline-block bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 font-semibold">
            Contact Support
          </Link>
        </div>
      </main>
    </div>
  );
}
