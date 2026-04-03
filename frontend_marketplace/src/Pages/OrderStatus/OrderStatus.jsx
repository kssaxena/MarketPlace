import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
import {
  getCartItems,
  getWishlistItems,
  subscribeMarketplaceStore,
} from "../../utility/marketplaceStore.js";

const progressSteps = [
  { label: "Order Placed", time: "Oct 24, 10:15 AM", done: true },
  { label: "Shipped", time: "Oct 25, 01:15 PM", done: true },
  { label: "Out for Delivery", time: "Today, 09:20 AM", done: true },
  { label: "Delivered", time: "Expected today", done: false },
];

export default function OrderStatus() {
  const [orderItems, setOrderItems] = useState(() => getCartItems());
  const [wishlistItems, setWishlistItems] = useState(() => getWishlistItems());

  useEffect(() => {
    const sync = () => {
      setOrderItems(getCartItems());
      setWishlistItems(getWishlistItems());
    };

    sync();
    return subscribeMarketplaceStore(sync);
  }, []);

  const subtotal = useMemo(
    () => orderItems.reduce((sum, item) => sum + (item.price ?? 0) * (item.qty ?? 1), 0),
    [orderItems]
  );
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage="order-status" />

      <main className="mx-auto grid max-w-[1280px] gap-6 px-4 py-8 xl:grid-cols-[240px_1fr_320px]">
        <aside className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
              AC
            </div>
            <div>
              <p className="text-[0.92rem] font-semibold text-gray-900">Alex Curator</p>
              <p className="text-[0.78rem] text-gray-500">Premium Member</p>
            </div>
          </div>

          <p className="mt-5 text-[0.73rem] font-bold uppercase tracking-[0.24em] text-green-600">Dashboard</p>

          <div className="mt-3 space-y-2 text-[0.9rem]">
            <button className="w-full rounded-xl px-3 py-2 text-left text-gray-600 transition hover:bg-gray-50">Overview</button>
            <button className="w-full rounded-xl bg-green-50 px-3 py-2 text-left font-semibold text-green-700">Recent Orders</button>
            <button className="w-full rounded-xl px-3 py-2 text-left text-gray-600 transition hover:bg-gray-50">Saved Items</button>
            <button className="w-full rounded-xl px-3 py-2 text-left text-gray-600 transition hover:bg-gray-50">Settings</button>
          </div>

          <div className="mt-8 rounded-2xl bg-gray-50 p-4">
            <p className="text-[0.85rem] font-semibold text-gray-800">Need help?</p>
            <p className="mt-1 text-[0.78rem] text-gray-500">Support is available 24/7.</p>
            <Link
              to="/contact"
              className="mt-3 block rounded-xl bg-green-600 px-3 py-2 text-center text-[0.82rem] font-semibold text-white transition hover:bg-green-700"
            >
              Contact Support
            </Link>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-gray-400">Order #ELM-992834</p>
              <h1 className="mt-1 text-[2rem] font-bold tracking-[-0.03em] text-gray-900">Order Status</h1>
            </div>
            <div className="flex gap-3">
              <button className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-[0.85rem] font-semibold text-gray-700 transition hover:bg-gray-50">
                View Invoice
              </button>
              <Link
                to="/contact"
                className="rounded-xl bg-green-600 px-4 py-2 text-[0.85rem] font-semibold text-white transition hover:bg-green-700"
              >
                Contact Seller
              </Link>
            </div>
          </div>

          <article className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">Tracking Progress</p>

            <div className="mt-6 grid gap-3 sm:grid-cols-4">
              {progressSteps.map((step, index) => (
                <div key={step.label} className="relative">
                  {index < progressSteps.length - 1 && (
                    <div className={`absolute left-[calc(50%+14px)] top-[13px] h-[3px] w-[calc(100%-28px)] ${step.done ? "bg-green-500" : "bg-gray-200"}`} />
                  )}
                  <div className={`relative z-10 mx-auto flex h-7 w-7 items-center justify-center rounded-full border-2 text-[0.72rem] font-bold ${step.done ? "border-green-500 bg-green-500 text-white" : "border-gray-300 bg-white text-gray-400"}`}>
                    {index + 1}
                  </div>
                  <p className={`mt-3 text-center text-[0.78rem] font-semibold ${step.done ? "text-gray-900" : "text-gray-400"}`}>
                    {step.label}
                  </p>
                  <p className="text-center text-[0.72rem] text-gray-400">{step.time}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-green-50 p-4 text-[0.9rem] text-green-800">
              <p className="font-semibold">Estimated delivery: Oct 26, 2026</p>
              <p className="mt-1 text-[0.82rem] text-green-700">Your package is with the courier and may arrive by 8:00 PM.</p>
            </div>
          </article>

          <article className="rounded-[24px] border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">
                Items Breakdown ({orderItems.length})
              </p>
            </div>

            <div className="divide-y divide-gray-100 px-6">
              {orderItems.length === 0 ? (
                <div className="py-7 text-center">
                  <p className="text-[0.95rem] font-medium text-gray-700">No items in cart yet.</p>
                  <p className="mt-1 text-sm text-gray-500">Add products from listings to see them here.</p>
                </div>
              ) : (
                orderItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-4 py-5">
                    <div className="flex gap-4">
                      <div className="h-16 w-16 overflow-hidden rounded-2xl bg-gradient-to-br from-green-200 to-green-500">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="text-[0.72rem] font-bold uppercase tracking-[0.22em] text-green-600">{item.category}</p>
                        <h3 className="mt-1 text-[1.02rem] font-semibold text-gray-900">{item.title}</h3>
                        <p className="mt-1 text-[0.8rem] text-gray-500">{item.description || "Premium listing item"}</p>
                        <p className="mt-1 text-[0.76rem] text-gray-400">Qty: {item.qty} | Seller: {item.seller}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[1.2rem] font-bold tracking-[-0.02em] text-gray-900">
                        ₹ {(item.price * (item.qty ?? 1)).toLocaleString()}
                      </p>
                      <button className="mt-1 text-[0.76rem] font-semibold text-green-600 hover:text-green-700">Track item</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="rounded-[24px] border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 px-6 py-4">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">
                Wishlist ({wishlistItems.length})
              </p>
            </div>

            <div className="divide-y divide-gray-100 px-6">
              {wishlistItems.length === 0 ? (
                <div className="py-7 text-center text-sm text-gray-500">Your wishlist is empty.</div>
              ) : (
                wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 overflow-hidden rounded-xl bg-gray-200">
                        {item.image && (
                          <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="text-[0.92rem] font-medium text-gray-900">{item.title}</p>
                        <p className="text-xs text-gray-500">₹ {item.price?.toLocaleString?.() ?? item.price}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-green-600">Saved</span>
                  </div>
                ))
              )}
            </div>
          </article>
        </section>

        <aside className="space-y-5">
          <article className="rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-gray-400">Shipping Details</p>
            <div className="mt-4 space-y-1 text-[0.86rem] text-gray-600">
              <p className="font-semibold text-gray-900">Alex Curator</p>
              <p>742 Evergreen Terrace</p>
              <p>Floor 4, Suite 102</p>
              <p>Springfield, OR 97403</p>
              <p>United States</p>
            </div>

            <div className="mt-5 rounded-xl bg-gray-50 p-3">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gray-400">Tracking Number</p>
              <p className="mt-1 text-[0.9rem] font-semibold text-gray-800">LM-8820-9912-PX</p>
            </div>
          </article>

          <article className="rounded-[24px] bg-gray-900 p-5 text-white shadow-md">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-green-300">Payment Summary</p>
            <div className="mt-4 space-y-2 text-[0.9rem]">
              <div className="flex justify-between text-gray-300"><span>Subtotal</span><span>₹ {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-300"><span>Shipping</span><span className="text-green-300">Free</span></div>
              <div className="flex justify-between text-gray-300"><span>Tax</span><span>₹ {tax.toLocaleString()}</span></div>
              <div className="mt-4 border-t border-gray-700 pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Paid</span>
                  <span>₹ {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button className="mt-5 w-full rounded-xl bg-white px-4 py-3 text-[0.85rem] font-semibold text-gray-900 transition hover:bg-gray-100">
              Download PDF Receipt
            </button>
          </article>

          <article className="rounded-[20px] bg-green-50 p-4">
            <p className="text-[0.9rem] font-semibold text-green-800">Need help with this order?</p>
            <p className="mt-1 text-[0.78rem] text-green-700">Our support team is here to help with delivery and payment questions.</p>
          </article>
        </aside>
      </main>
    </div>
  );
}

