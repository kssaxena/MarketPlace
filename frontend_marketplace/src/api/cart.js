const API = "/api/cart";

const getToken = () => localStorage.getItem("token");

export const fetchCart = async () => {
  const res = await fetch(API, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return res.json();
};

export const addToCart = async (productId) => {
  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ product: productId, quantity: 1 })
  });
};

export const updateCartItem = async (id, quantity) => {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ quantity })
  });
};

export const deleteCartItem = async (id) => {
  await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};