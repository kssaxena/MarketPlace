
import { useState, useEffect } from "react";
import Header from "../../components/Header.jsx";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    street: "", city: "", state: "", zipCode: ""
  });

  // Fetch cart from MongoDB on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/cart", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCart(data.items);
        }
      })
      .catch(err => console.error("Failed to fetch cart:", err));
  }, []);

  // Bill computation
  const itemTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = itemTotal > 500 ? 0 : 49;
  const platformFee = 20;
  const gst = Math.round(itemTotal * 0.05);
  const total = itemTotal + deliveryFee + platformFee + gst;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
        // Clear cart in MongoDB after order
        await fetch("/api/cart", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        });
        setCart([]);
        alert("Order placed! #" + data.order.orderNumber);
      } else {
        alert(data.message || "Checkout failed");
      }
    } catch (err) {
      alert("Network error, please try again");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">

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
              <div key={item.id || i} className="flex items-center gap-3 p-4">
                {item.image ? (
                  <img src={item.image} alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-gray-100" />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg flex-shrink-0">📦</div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Qty: {item.qty} · ₹{item.price} each</p>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ₹{(item.price * item.qty).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Step 2 — Bill Summary */}
        <SectionHeader step="2" title="Bill summary" />
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 space-y-2.5">
          <BillRow label={`Item total (${cart.length} items)`} value={`₹${itemTotal.toLocaleString()}`} />
          <BillRow label="Delivery charges" value={deliveryFee === 0 ? "Free" : `₹${deliveryFee}`} green={deliveryFee === 0} />
          <BillRow label="Platform fee" value={`₹${platformFee}`} />
          <BillRow label="GST (5%)" value={`₹${gst}`} />
          <div className="border-t border-gray-100 pt-2.5 flex justify-between text-base font-semibold text-gray-900">
            <span>Total payable</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Step 3 — Delivery Address */}
        <SectionHeader step="3" title="Delivery address" />
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Full name" name="name" placeholder="Rahul Sharma" onChange={handleChange} />
            <Field label="Phone" name="phone" placeholder="+91 98765 43210" onChange={handleChange} />
          </div>
          <Field label="Email" name="email" placeholder="you@example.com" onChange={handleChange} />
          <Field label="Street / flat / area" name="street" placeholder="12B, Sector 5" onChange={handleChange} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City" name="city" placeholder="Kolkata" onChange={handleChange} />
            <Field label="State" name="state" placeholder="West Bengal" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Zip code" name="zipCode" placeholder="700091" onChange={handleChange} />
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Country</label>
              <input value="India" readOnly
                className="w-full border border-gray-200 rounded-lg px-3 h-10 text-sm text-gray-400 bg-gray-50" />
            </div>
          </div>
        </div>

        {/* Step 4 — Payment */}
        <SectionHeader step="4" title="Payment method" />
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex gap-3">
            {[
              { value: "upi", label: "UPI" },
              { value: "credit_card", label: "Credit card" },
              { value: "debit_card", label: "Debit card" },
              { value: "net_banking", label: "Net banking" },
              { value: "wallet", label: "Wallet" },
            ].map((m) => (
              <button key={m.value} onClick={() => setPaymentMethod(m.value)}
                className={`flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-colors ${
                  paymentMethod === m.value
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}>
                <span className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  paymentMethod === m.value ? "border-teal-500" : "border-gray-300"
                }`}>
                  {paymentMethod === m.value && <span className="w-2 h-2 rounded-full bg-teal-500 block" />}
                </span>
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Place Order */}
        <button onClick={handleCheckout} disabled={cart.length === 0}
          className="w-full bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-base h-12 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99]">
          Place order · ₹{total.toLocaleString()}
        </button>

      </div>
    </div>
  );
}

function SectionHeader({ step, title, children }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 text-xs font-medium flex items-center justify-center">{step}</span>
      <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h2>
      {children}
    </div>
  );
}

function BillRow({ label, value, green }) {
  return (
    <div className="flex justify-between text-sm text-gray-500">
      <span>{label}</span>
      <span className={green ? "text-green-600 font-medium" : "text-gray-800"}>{value}</span>
    </div>
  );
}

function Field({ label, name, placeholder, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <input name={name} placeholder={placeholder} onChange={onChange}
        className="w-full border border-gray-200 rounded-lg px-3 h-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-400" />
    </div>
  );
}