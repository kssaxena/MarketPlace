import { useState, useEffect } from "react";
import Header from "../../components/Header.jsx";
import {
  formatCurrency,
  getSelectedCurrency,
  subscribeCurrencyChange,
} from "../../utility/currency.js";
import { getCartItems, updateCartQty, removeFromCart, subscribeMarketplaceStore, getAddresses } from "../../utility/marketplaceStore.js";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [currency, setCurrency] = useState(() => getSelectedCurrency());
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    street: "", city: "", state: "", zipCode: ""
  });

  useEffect(() => subscribeCurrencyChange(setCurrency), []);

  useEffect(() => {
    const loadCart = () => {
      const items = getCartItems().map(item => ({
        ...item,
        qty: item.qty || 1  // Ensure qty is always set
      }));
      setCart(items);
    };
    
    loadCart();
    // load saved addresses
    setAddresses(getAddresses());
    const unsubscribe = subscribeMarketplaceStore(loadCart);
    return unsubscribe;
  }, []);

  // Addresses state
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressPicker, setShowAddressPicker] = useState(false);

  useEffect(() => {
    const refresh = () => setAddresses(getAddresses());
    refresh();
    const unsub = subscribeMarketplaceStore(refresh);
    return unsub;
  }, []);

  // initialize selected address to default or first
  useEffect(() => {
    if (!addresses || addresses.length === 0) return;
    const def = addresses.find((a) => a.isDefault) || addresses[0];
    if (!selectedAddressId) setSelectedAddressId(def.id);
  }, [addresses]);

  // Bill computation
  const itemTotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 1), 0);
  const deliveryFee = cart.length === 0 ? 0 : itemTotal > 500 ? 0 : 49;
  const platformFee = cart.length === 0 ? 0 : 20;
  const gst = Math.round(itemTotal * 0.05);
  const total = itemTotal + deliveryFee + platformFee + gst;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleQuantityChange = (itemId, action) => {
    console.log("Quantity change:", { itemId, action });
    const item = cart.find(item => String(item.id) === String(itemId));
    if (!item) {
      console.log("Item not found");
      return;
    }
    
    if (action === "decrease") {
      if (item.qty <= 1) {
        console.log("Removing item:", itemId);
        removeFromCart(itemId);
      } else {
        console.log("Decreasing qty from", item.qty, "to", item.qty - 1);
        updateCartQty(itemId, -1);
      }
    } else if (action === "increase") {
      console.log("Increasing qty from", item.qty, "to", item.qty + 1);
      updateCartQty(itemId, 1);
    }
  };

  const handleRemoveItem = (itemId) => {
    console.log("Removing item:", itemId);
    removeFromCart(itemId);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) { alert("Please login first"); return; }
    if (cart.length === 0) { alert("Your cart is empty"); return; }

    const payload = {
      items: cart.map((item) => ({
        product: item.id,
        quantity: item.qty,
        price: item.price
      })),
      shippingAddress: { ...form, country: "India" },
      paymentMethod
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        await fetch("/api/cart", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart([]);
        alert("Order placed! #" + data.order.orderNumber);
      } else {
        alert(data.message || "Checkout failed");
      }
    } catch {
      alert("Network error, please try again");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* MAIN CONTAINER */}
      <div className="max-w-2xl mx-auto px-4 py-8 pb-24">

        {/* Step 1 — Order Summary */}
        <SectionHeader step="1" title="Order summary">
          <span className="ml-auto text-xs bg-green-50 text-green-700 font-medium px-2.5 py-0.5 rounded-full">
            {cart.length} items
          </span>
        </SectionHeader>

        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 mb-6">
          {cart.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">Your cart is empty</p>
          ) : (
            cart.map((item, i) => (
              <div key={item.id || i} className="flex items-center gap-4 p-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    📦
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatCurrency(item.price, currency)}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuantityChange(item.id, "decrease");
                    }}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-200 font-bold cursor-pointer rounded transition bg-white border border-gray-300"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-gray-900">
                    {item.qty || 1}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuantityChange(item.id, "increase");
                    }}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:bg-gray-200 font-bold cursor-pointer rounded transition bg-white border border-gray-300"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-semibold text-gray-900 min-w-max">
                  {formatCurrency(item.price * (item.qty || 1), currency)}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveItem(item.id);
                  }}
                  className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Step 2 — Bill Summary */}
        <SectionHeader step="2" title="Bill summary" />

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 space-y-2.5">
          <BillRow label={`Item total (${cart.length} items)`} value={formatCurrency(itemTotal, currency)} />
          <BillRow label="Delivery charges" value={deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee, currency)} green={deliveryFee === 0} />
          <BillRow label="Platform fee" value={formatCurrency(platformFee, currency)} />
          <BillRow label="GST (5%)" value={formatCurrency(gst, currency)} />

          <div className="border-t pt-2.5 flex justify-between text-base font-semibold text-gray-900 dark:text-white">
            <span>Total payable</span>
            <span>{formatCurrency(total, currency)}</span>
          </div>
        </div>

        {/* Step 3 — Delivery Address */}
        <SectionHeader step="3" title="Delivery address" />

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 space-y-3">
          {addresses.length === 0 ? (
            <div>
              <p className="text-sm text-gray-700">No delivery addresses saved yet.</p>
              <div className="mt-3">
                <button onClick={() => navigate('/account?tab=Addresses')} className="text-sm bg-teal-600 text-white px-4 py-2 rounded-lg">Add a new delivery address</button>
              </div>
            </div>
          ) : (
            <div>
              {/* Selected address summary */}
              {(() => {
                const current = addresses.find((a) => String(a.id) === String(selectedAddressId)) || addresses.find((a) => a.isDefault) || addresses[0];
                if (!current) return null;
                return (
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-800">Delivering to <span className="font-semibold">{current.name}</span></p>
                      <p className="text-sm text-gray-600 mt-1">{current.street}, {current.city}, {current.state}, {current.zipCode}, {current.country}</p>
                      <p className="text-sm text-gray-500 mt-1">Phone: {current.phone}</p>
                    </div>
                    <div>
                      <button onClick={() => setShowAddressPicker(true)} className="text-sm text-teal-600">Change</button>
                    </div>
                  </div>
                );
              })()}

              {/* Address picker panel */}
              {showAddressPicker && (
                <div className="mt-4">
                  <div className="grid gap-3">
                    {addresses.map((a) => (
                      <label key={a.id} className={`flex items-center justify-between p-3 rounded-lg border ${String(selectedAddressId) === String(a.id) ? "border-teal-600 bg-teal-50" : "border-gray-100"}`}>
                        <div>
                          <p className="font-medium text-gray-800">{a.name} <span className="text-xs text-gray-500">{a.phone}</span></p>
                          <p className="text-sm text-gray-600">{a.street}, {a.city}, {a.state} {a.zipCode}</p>
                        </div>
                        <input type="radio" name="selectedAddress" checked={String(selectedAddressId) === String(a.id)} onChange={() => {
                          setSelectedAddressId(a.id);
                          setForm({ name: a.name, phone: a.phone, street: a.street, city: a.city, state: a.state, zipCode: a.zipCode });
                        }} />
                      </label>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button onClick={() => { setShowAddressPicker(false); }} className="px-4 py-2 border rounded">Cancel</button>
                    <button onClick={() => {
                      const sel = addresses.find((a) => String(a.id) === String(selectedAddressId)) || addresses.find((a) => a.isDefault) || addresses[0];
                      if (!sel) return alert("Please select an address or add one in your account.");
                      setSelectedAddressId(sel.id);
                      setForm({ name: sel.name, phone: sel.phone, street: sel.street, city: sel.city, state: sel.state, zipCode: sel.zipCode });
                      setShowAddressPicker(false);
                    }} className="px-4 py-2 bg-teal-600 text-white rounded">Deliver to this address</button>
                    <button onClick={() => navigate('/account?tab=Addresses')} className="ml-auto text-sm text-teal-600">Edit or add addresses</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 4 — Payment */}
        <SectionHeader step="4" title="Payment method" />

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            {["upi", "credit_card", "debit_card", "net_banking", "wallet"].map((m) => (
              <button
                key={m}
                onClick={() => setPaymentMethod(m)}
                className={`flex-1 px-3 py-2 rounded-lg border text-xs ${
                  paymentMethod === m
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {m.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Place Order */}
        <button
          onClick={handleCheckout}
          disabled={cart.length === 0}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 rounded-xl"
        >
          Place order · ₹{total.toLocaleString()}
        </button>

      </div>
    </div>
  );
}

// Components
function SectionHeader({ step, title, children }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-6 h-6 rounded-full bg-teal-600 text-white text-xs font-semibold flex items-center justify-center">
        {step}
      </span>
      <h2 className="text-sm font-semibold text-gray-900 uppercase">
        {title}
      </h2>
      {children}
    </div>
  );
}

function BillRow({ label, value, green }) {
  return (
    <div className="flex justify-between text-sm text-gray-700">
      <span>{label}</span>
      <span className={green ? "text-green-600 font-semibold" : "text-gray-900 font-medium dark:text-gray-100"}>
        {value}
      </span>
    </div>
  );
}

function Field({ label, name, placeholder, onChange }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">{label}</label>
      <input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        className="w-full border rounded-lg px-3 h-10 text-sm focus:ring-2 focus:ring-teal-100"
      />
    </div>
  );
}