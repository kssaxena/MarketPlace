import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const registerCommunity = async (data) => {
  const res = await fetch("http://localhost:5000/api/community/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginCommunity = async (data) => {
  const res = await fetch("http://localhost:5000/api/community/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export default api;