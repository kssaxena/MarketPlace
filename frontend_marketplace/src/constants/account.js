// Account dashboard constants: user profile, navigation, and dummy data for UI display.

export const DUMMY_USER = {
  name: "Alex Johnson",
  email: "alex.johnson@email.com",
  phone: "+1 (555) 234-5678",
  location: "New York, NY",
};

export const DUMMY_MESSAGES = [
  { id: 1, from: "Sarah M.", message: "Is the Toyota still available?", time: "2h ago", avatar: "S" },
  { id: 2, from: "John D.", message: "Can you do $800 for the iPhone?", time: "5h ago", avatar: "J" },
  { id: 3, from: "Priya K.", message: "What's the condition of the bed?", time: "1d ago", avatar: "P" },
];

export const DUMMY_TRANSACTIONS = [
  { id: 1, title: "Nike Air Jordan 1", amount: "$185", date: "Mar 28, 2026", type: "Sale" },
  { id: 2, title: "Samsung 65\" TV", amount: "$1,100", date: "Mar 15, 2026", type: "Purchase" },
  { id: 3, title: "IKEA MALM Bed", amount: "$320", date: "Feb 20, 2026", type: "Sale" },
];

export const ACCOUNT_NAV_ITEMS = ["Profile", "My Ads", "Messages", "Favorites", "Transactions", "Settings"];
