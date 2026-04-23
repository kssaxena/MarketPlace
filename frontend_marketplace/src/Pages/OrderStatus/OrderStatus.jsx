import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import {
  getCartItems,
  getWishlistItems,
  subscribeMarketplaceStore,
} from "../../utility/marketplaceStore.js";
import {
  formatCurrency,
  getSelectedCurrency,
  subscribeCurrencyChange,
} from "../../utility/currency.js";

function OverviewPanel({ orderItems, wishlistItems, subtotal, tax, total, currency }) {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-[2rem] font-bold tracking-[-0.03em] text-gray-900">Overview</h1>
        <p className="mt-1 text-sm text-gray-500">Welcome back. Here's a summary of your account.</p>
      </div>
      <article className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">Profile Information</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Full Name", value: "User Account" },
            { label: "Email Address", value: "user@email.com" },
            { label: "Phone Number", value: "+1 (555) 012-3456" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[0.78rem] font-semibold text-gray-400">{label}</p>
              <p className="mt-1 text-[0.92rem] font-medium text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Active Orders", value: orderItems.length > 0 ? 1 : 0, color: "text-teal-600" },
          { label: "Cart Items", value: orderItems.length, color: "text-blue-600" },
          { label: "Saved Items", value: wishlistItems.length, color: "text-purple-600" },
        ].map((stat) => (
          <article key={stat.label} className="rounded-[20px] border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
            <p className={`mt-2 text-4xl font-bold ${stat.color}`}>{stat.value}</p>
          </article>
        ))}
      </div>
      <article className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">Recent Activity</p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-teal-50 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white text-xs font-bold">✓</div>
            <div>
              <p className="text-[0.88rem] font-semibold text-gray-800">Order placed successfully</p>
              <p className="text-[0.76rem] text-gray-500">Today, 09:20 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-white text-xs font-bold">📦</div>
            <div>
              <p className="text-[0.88rem] font-semibold text-gray-800">Order processing initiated</p>
              <p className="text-[0.76rem] text-gray-500">Yesterday, 2:15 PM</p>
            </div>
          </div>
        </div>
      </article>
      <article className="rounded-[24px] bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-teal-600">Payment Summary</p>
        <div className="mt-4 space-y-2 text-[0.9rem]">
          <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal, currency)}</span></div>
          <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-teal-600">Free</span></div>
          <div className="flex justify-between text-gray-600"><span>Tax</span><span>{formatCurrency(tax, currency)}</span></div>
          <div className="mt-4 border-t border-gray-200 pt-3">
            <div className="flex justify-between text-xl font-bold">
              <span>Total Paid</span>
              <span>{formatCurrency(total, currency)}</span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

function RecentOrdersPanel({ orderItems, currency }) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-[2rem] font-bold tracking-[-0.03em] text-gray-900">Recent Orders</h1>
        </div>
      </div>
      <article className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">Your Recent Orders</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {[1, 2, 3, 4].map((step, index) => (
            <div key={step} className="relative">
              {index < 3 && (
                <div className="absolute left-[calc(50%+14px)] top-[13px] h-[3px] w-[calc(100%-28px)] bg-teal-500" />
              )}
              <div className="relative z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full border-2 border-teal-500 bg-teal-500 text-white text-[0.72rem] font-bold">
                ✓
              </div>
              <p className="mt-3 text-center text-[0.78rem] font-semibold text-gray-900">Step {step}</p>
              <p className="text-center text-[0.72rem] text-gray-400">Completed</p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-2xl bg-teal-50 p-4 text-[0.9rem] text-teal-800">
          <p className="font-semibold">Estimated delivery: Within 5-7 business days</p>
          <p className="mt-1 text-[0.82rem] text-teal-700">Your package is being processed and prepared for shipment.</p>
        </div>
      </article>
      <article className="rounded-[24px] border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">Items Breakdown ({orderItems.length})</p>
        </div>
        <div className="divide-y divide-gray-100 px-6">
          {orderItems.length === 0 ? (
            <div className="py-7 text-center">
              <p className="text-[0.95rem] font-medium text-gray-700">No items in orders yet.</p>
              <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
            </div>
          ) : (
            orderItems.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4 py-5">
                <div className="flex gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-200 to-teal-500">
                    {item.image && <img src={item.image} alt={item.title} className="h-full w-full object-cover" />}
                  </div>
                  <div>
                    <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-teal-600">{item.category}</p>
                    <h3 className="mt-1 text-[1.02rem] font-semibold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-[0.8rem] text-gray-500">{item.description || "Premium item"}</p>
                    <p className="mt-1 text-[0.76rem] text-gray-400">Qty: {item.qty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[1.2rem] font-bold tracking-[-0.02em] text-gray-900">{formatCurrency(item.price * (item.qty ?? 1), currency)}</p>
                  <button className="mt-1 text-[0.76rem] font-semibold text-teal-600 hover:text-teal-700">Track item</button>
                </div>
              </div>
            ))
          )}
        </div>
      </article>
    </section>
  );
}

function SavedItemsPanel({ wishlistItems, currency }) {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-[2rem] font-bold tracking-[-0.03em] text-gray-900">Saved Items</h1>
        <p className="mt-1 text-sm text-gray-500">{wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} in your wishlist</p>
      </div>
      <article className="rounded-[24px] border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">Wishlist ({wishlistItems.length})</p>
        </div>
        <div className="divide-y divide-gray-100 px-6">
          {wishlistItems.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-4xl">🤍</p>
              <p className="mt-3 text-[0.95rem] font-medium text-gray-700">Your wishlist is empty.</p>
              <p className="mt-1 text-sm text-gray-500">Browse listings and save items you love.</p>
              <Link to="/" className="mt-4 inline-block rounded-xl bg-teal-600 px-5 py-2.5 text-[0.85rem] font-semibold text-white transition hover:bg-teal-700">
                Browse Listings
              </Link>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 overflow-hidden rounded-xl bg-gray-200">
                    {item.image && <img src={item.image} alt={item.title} className="h-full w-full object-cover" />}
                  </div>
                  <div>
                    <p className="text-[0.92rem] font-medium text-gray-900">{item.title}</p>
                    <p className="text-xs text-gray-500">{formatCurrency(item.price, currency)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700 hover:bg-teal-100 transition">
                    Add to Cart
                  </button>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-600">Saved</span>
                </div>
              </div>
            ))
          )}
        </div>
      </article>
    </section>
  );
}

function SettingsPanel() {
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-[2rem] font-bold tracking-[-0.03em] text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account preferences</p>
      </div>

      <article className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">Notification Preferences</p>
        <div className="mt-5 space-y-3">
          {[
            { key: "email", label: "Email Notifications", desc: "Order updates, promotions, and news" },
            { key: "sms", label: "SMS Notifications", desc: "Delivery alerts and OTPs" },
            { key: "push", label: "Push Notifications", desc: "Real-time updates in browser" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
              <div>
                <p className="text-[0.88rem] font-semibold text-gray-800">{label}</p>
                <p className="text-[0.76rem] text-gray-500">{desc}</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${notifications[key] ? "bg-teal-500" : "bg-gray-300"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${notifications[key] ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </article>
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="rounded-xl bg-teal-600 px-6 py-2.5 text-[0.88rem] font-semibold text-white transition hover:bg-teal-700"
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
        <button className="rounded-xl border border-gray-300 bg-white px-6 py-2.5 text-[0.88rem] font-semibold text-gray-600 transition hover:bg-gray-50">
          Cancel
        </button>
      </div>
    </section>
  );
}

function RightSidebar({ subtotal, tax, total }) {
  const [currency, setCurrency] = useState(() => getSelectedCurrency());

  useEffect(() => subscribeCurrencyChange(setCurrency), []);

  return (
    <aside className="space-y-5">
      <article className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">Shipping Details</p>
        <div className="mt-4 space-y-1 text-[0.86rem] text-gray-600">
          <p className="font-semibold text-gray-900">Your Name</p>
          <p>742 Main Street</p>
          <p>Floor 4, Suite 102</p>
          <p>New York, NY 10001</p>
          <p>United States</p>
        </div>
        <div className="mt-5 rounded-xl bg-gray-50 p-3">
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gray-400">Tracking Number</p>
          <p className="mt-1 text-[0.9rem] font-semibold text-gray-800">TRK-8820-9912-PX</p>
        </div>
      </article>
      <article className="rounded-[24px] bg-white border border-gray-200 p-5 shadow-sm">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-teal-600">Payment Summary</p>
        <div className="mt-4 space-y-2 text-[0.9rem]">
          <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(subtotal, currency)}</span></div>
          <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-teal-600">Free</span></div>
          <div className="flex justify-between text-gray-600"><span>Tax</span><span>{formatCurrency(tax, currency)}</span></div>
          <div className="mt-4 border-t border-gray-200 pt-3">
            <div className="flex justify-between text-xl font-bold">
              <span>Total Paid</span>
              <span>{formatCurrency(total, currency)}</span>
            </div>
          </div>
        </div>
        <button className="mt-5 w-full rounded-xl bg-teal-600 px-4 py-3 text-[0.85rem] font-semibold text-white transition hover:bg-teal-700">
          Download PDF Receipt
        </button>
      </article>
      <article className="rounded-[20px] bg-teal-50 p-4">
        <p className="text-[0.9rem] font-semibold text-teal-800">Need help with your order?</p>
        <p className="mt-1 text-[0.78rem] text-teal-700">Our support team is here to help with delivery and payment questions.</p>
      </article>
    </aside>
  );
}

const NAV_TABS = [
  { id: "overview", label: "Overview" },
  { id: "recent-orders", label: "Recent Orders" },
  { id: "saved-items", label: "Saved Items" },
  { id: "settings", label: "Settings" },
];

export default function OrderStatus() {
  const [activeTab, setActiveTab] = useState("recent-orders");
  const [orderItems, setOrderItems] = useState(() => getCartItems());
  const [wishlistItems, setWishlistItems] = useState(() => getWishlistItems());
  const [currency, setCurrency] = useState(() => getSelectedCurrency());

  useEffect(() => {
    const sync = () => {
      setOrderItems(getCartItems());
      setWishlistItems(getWishlistItems());
    };
    sync();
    return subscribeMarketplaceStore(sync);
  }, []);

  useEffect(() => subscribeCurrencyChange(setCurrency), []);

  const subtotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + (item.price ?? 0) * (item.qty ?? 1), 0),
    [orderItems]
  );
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-white">
      <Header activePage="order-status" />
      <main className="mx-auto grid max-w-[1280px] gap-6 px-4 py-8 xl:grid-cols-[240px_1fr_320px]">
        <aside className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm h-fit">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-700">
              AC
            </div>
            <div>
              <p className="text-[0.92rem] font-semibold text-gray-900">Account</p>
              <p className="text-[0.78rem] text-gray-500">Member</p>
            </div>
          </div>
          <p className="mt-5 text-[0.73rem] font-bold uppercase tracking-[0.24em] text-teal-600">Dashboard</p>
          <nav className="mt-3 space-y-1 text-[0.9rem]">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full rounded-xl px-3 py-2 text-left transition cursor-pointer ${
                    isActive
                      ? "bg-teal-50 font-semibold text-teal-700 ring-1 ring-teal-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-8 rounded-2xl bg-gray-50 p-4">
            <p className="text-[0.85rem] font-semibold text-gray-800">Need help?</p>
            <p className="mt-1 text-[0.78rem] text-gray-500">Support is available 24/7.</p>
            <Link
              to="/contact"
              className="mt-3 block rounded-xl bg-teal-600 px-3 py-2 text-center text-[0.82rem] font-semibold text-white transition hover:bg-teal-700"
            >
              Contact Support
            </Link>
          </div>
        </aside>

        {activeTab === "overview" && (
          <OverviewPanel
            orderItems={orderItems}
            wishlistItems={wishlistItems}
            subtotal={subtotal}
            tax={tax}
            total={total}
            currency={currency}
          />
        )}
        {activeTab === "recent-orders" && (
          <RecentOrdersPanel orderItems={orderItems} currency={currency} />
        )}
        {activeTab === "saved-items" && (
          <SavedItemsPanel wishlistItems={wishlistItems} currency={currency} />
        )}
        {activeTab === "settings" && <SettingsPanel />}

        <RightSidebar subtotal={subtotal} tax={tax} total={total} />
      </main>
    </div>
  );
}