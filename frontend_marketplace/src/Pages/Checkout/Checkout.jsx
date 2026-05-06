import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header.jsx";

import {
  formatCurrency,
  getSelectedCurrency,
  subscribeCurrencyChange,
} from "../../utility/currency.js";

import {
  getCartItems,
  updateCartQty,
  removeFromCart,
  subscribeMarketplaceStore,
  getAddresses,
} from "../../utility/marketplaceStore.js";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("upi");

  const [currency, setCurrency] = useState(() =>
    getSelectedCurrency()
  );

  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const [showAddressPicker, setShowAddressPicker] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Currency sync
  useEffect(() => {
    return subscribeCurrencyChange(setCurrency);
  }, []);

  // Cart sync
  useEffect(() => {
    const loadCart = () => {
      const items = getCartItems().map((item) => ({
        ...item,
        qty: item.qty || 1,
      }));

      setCart(items);
    };

    loadCart();

    const unsubscribe =
      subscribeMarketplaceStore(loadCart);

    return unsubscribe;
  }, []);

  // Address sync
  useEffect(() => {
    const refreshAddresses = () => {
      const latestAddresses = getAddresses();

      setAddresses(latestAddresses);

      if (latestAddresses.length > 0) {
        const selected =
          latestAddresses.find(
            (a) =>
              String(a.id) ===
              String(selectedAddressId)
          ) ||
          latestAddresses.find((a) => a.isDefault) ||
          latestAddresses[0];

        if (selected) {
          setSelectedAddressId(selected.id);

          setForm({
            name: selected.name || "",
            email: selected.email || "",
            phone: selected.phone || "",
            street: selected.street || "",
            city: selected.city || "",
            state: selected.state || "",
            zipCode: selected.zipCode || "",
          });
        }
      }
    };

    refreshAddresses();

    const unsubscribe =
      subscribeMarketplaceStore(
        refreshAddresses
      );

    window.addEventListener(
      "storage",
      refreshAddresses
    );

    return () => {
      unsubscribe();

      window.removeEventListener(
        "storage",
        refreshAddresses
      );
    };
  }, [selectedAddressId]);

  // Bill calculations
  const itemTotal = cart.reduce(
    (sum, item) =>
      sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const deliveryFee =
    cart.length === 0
      ? 0
      : itemTotal > 500
      ? 0
      : 49;

  const platformFee =
    cart.length === 0 ? 0 : 20;

  const gst = Math.round(itemTotal * 0.05);

  const total =
    itemTotal +
    deliveryFee +
    platformFee +
    gst;

  // Quantity controls
  const handleQuantityChange = (
    itemId,
    action
  ) => {
    const item = cart.find(
      (item) =>
        String(item.id) === String(itemId)
    );

    if (!item) return;

    if (action === "decrease") {
      if (item.qty <= 1) {
        removeFromCart(itemId);
      } else {
        updateCartQty(itemId, -1);
      }
    }

    if (action === "increase") {
      updateCartQty(itemId, 1);
    }
  };

  // Remove item
  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Checkout
  const handleCheckout = async () => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    const payload = {
      items: cart.map((item) => ({
        product: item.id,
        quantity: item.qty,
        price: item.price,
      })),

      shippingAddress: {
        ...form,
        country: "India",
      },

      paymentMethod,
    };

    try {
      const res = await fetch(
        "/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        await fetch("/api/cart", {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCart([]);

        alert(
          "Order placed successfully!"
        );
      } else {
        alert(
          data.message ||
            "Checkout failed"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "Network error, please try again"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 py-8 pb-24">

        {/* ORDER SUMMARY */}

        <SectionHeader
          step="1"
          title="Order summary"
        >
          <span className="ml-auto text-xs bg-green-50 text-green-700 font-medium px-2.5 py-0.5 rounded-full">
            {cart.length} items
          </span>
        </SectionHeader>

        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 mb-6">

          {cart.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              Your cart is empty
            </p>
          ) : (
            cart.map((item, i) => (
              <div
                key={item.id || i}
                className="flex items-center gap-4 p-4"
              >
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
                    {formatCurrency(
                      item.price,
                      currency
                    )}
                  </p>
                </div>

                {/* Qty */}

                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        "decrease"
                      )
                    }
                    className="w-8 h-8 flex items-center justify-center bg-white border rounded"
                  >
                    −
                  </button>

                  <span className="w-6 text-center text-sm font-medium">
                    {item.qty || 1}
                  </span>

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.id,
                        "increase"
                      )
                    }
                    className="w-8 h-8 flex items-center justify-center bg-white border rounded"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-semibold min-w-max">
                  {formatCurrency(
                    item.price *
                      (item.qty || 1),
                    currency
                  )}
                </span>

                <button
                  onClick={() =>
                    handleRemoveItem(item.id)
                  }
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* BILL SUMMARY */}

        <SectionHeader
          step="2"
          title="Bill summary"
        />

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 space-y-2.5">

          <BillRow
            label={`Item total (${cart.length} items)`}
            value={formatCurrency(
              itemTotal,
              currency
            )}
          />

          <BillRow
            label="Delivery charges"
            value={
              deliveryFee === 0
                ? "Free"
                : formatCurrency(
                    deliveryFee,
                    currency
                  )
            }
            green={deliveryFee === 0}
          />

          <BillRow
            label="Platform fee"
            value={formatCurrency(
              platformFee,
              currency
            )}
          />

          <BillRow
            label="GST (5%)"
            value={formatCurrency(
              gst,
              currency
            )}
          />

          <div className="border-t pt-3 flex justify-between text-base font-semibold">
            <span>Total payable</span>

            <span>
              {formatCurrency(
                total,
                currency
              )}
            </span>
          </div>
        </div>

        {/* ADDRESS */}

        <SectionHeader
          step="3"
          title="Delivery address"
        />

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">

          {addresses.length === 0 ? (
            <div>
              <p className="text-sm text-gray-600">
                No saved addresses yet.
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/account?tab=Addresses"
                  )
                }
                className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-xl"
              >
                Add Address
              </button>
            </div>
          ) : (
            <>
              {(() => {
                const current =
                  addresses.find(
                    (a) =>
                      String(a.id) ===
                      String(
                        selectedAddressId
                      )
                  ) ||
                  addresses[0];

                if (!current) return null;

                return (
                  <div className="flex items-start justify-between">

                    <div>
                      <p className="font-semibold text-gray-800">
                        {current.name}
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        {current.street},{" "}
                        {current.city},{" "}
                        {current.state}{" "}
                        {current.zipCode}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Phone:{" "}
                        {current.phone}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setShowAddressPicker(
                          !showAddressPicker
                        )
                      }
                      className="text-sm text-teal-600"
                    >
                      Change
                    </button>
                  </div>
                );
              })()}

              {/* Picker */}

              {showAddressPicker && (
                <div className="mt-5 space-y-3">

                  {addresses.map((a) => (
                    <label
                      key={a.id}
                      className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer ${
                        String(
                          selectedAddressId
                        ) === String(a.id)
                          ? "border-teal-600 bg-teal-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div>
                        <p className="font-medium text-gray-800">
                          {a.name}
                        </p>

                        <p className="text-sm text-gray-600">
                          {a.street},{" "}
                          {a.city},{" "}
                          {a.state}
                        </p>
                      </div>

                      <input
                        type="radio"
                        checked={
                          String(
                            selectedAddressId
                          ) ===
                          String(a.id)
                        }
                        onChange={() =>
                          setSelectedAddressId(
                            a.id
                          )
                        }
                      />
                    </label>
                  ))}

                  <div className="flex gap-3 pt-2">

                    <button
                      onClick={() =>
                        setShowAddressPicker(
                          false
                        )
                      }
                      className="px-4 py-2 border rounded-lg"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() =>
                        navigate(
                          "/account?tab=Addresses"
                        )
                      }
                      className="ml-auto px-4 py-2 text-sm font-semibold text-teal-700 border border-teal-500 rounded-xl hover:bg-teal-50 active:scale-95 transition-all duration-200"
                    >
                      Edit or add addresses
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* PAYMENT */}

        <SectionHeader
          step="4"
          title="Payment method"
        />

        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">

          <div className="grid grid-cols-2 gap-3">

            {[
              "upi",
              "credit_card",
              "debit_card",
              "wallet",
            ].map((m) => (
              <button
                key={m}
                onClick={() =>
                  setPaymentMethod(m)
                }
                className={`px-3 py-3 rounded-xl border text-sm capitalize transition ${
                  paymentMethod === m
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-gray-200 text-gray-500"
                }`}
              >
                {m.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* PLACE ORDER */}

        <button
          onClick={handleCheckout}
          disabled={cart.length === 0}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 rounded-xl font-semibold"
        >
          Place order · ₹
          {total.toLocaleString()}
        </button>
      </div>
    </div>
  );
}

/* COMPONENTS */

function SectionHeader({
  step,
  title,
  children,
}) {
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

function BillRow({
  label,
  value,
  green,
}) {
  return (
    <div className="flex justify-between text-sm">

      <span className="text-gray-600">
        {label}
      </span>

      <span
        className={
          green
            ? "text-green-600 font-semibold"
            : "text-gray-900 font-medium"
        }
      >
        {value}
      </span>
    </div>
  );
}