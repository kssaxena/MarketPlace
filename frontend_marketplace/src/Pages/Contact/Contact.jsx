import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header.jsx";

export default function Contact() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = searchQuery.trim();
    navigate(trimmedQuery ? `/search?q=${encodeURIComponent(trimmedQuery)}` : "/search");
  };

  const faqs = [
    {
      q: "How to post an ad?",
      a: "Click the “Post Ad” button in the top navigation bar, upload clear photos, set your price, and add a description.",
    },
    {
      q: "Is my data safe?",
      a: "Yes. We follow best practices to protect your personal information and never share it without consent.",
    },
    {
      q: "How to report a scam?",
      a: "Use the report option on the listing or contact our support team immediately.",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header
        activePage="contact"
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onPostAdClick={() => navigate("/post-ad")}
      />

      <div className="px-4 py-16">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Contact Us
        </h1>
        <p className="text-gray-600">
          Have a question or need assistance? Our team is here to help you.
        </p>
      </div>

      {/* CONTACT FORM */}
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 mb-16">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Your Message
          </label>
          <textarea
            rows="4"
            placeholder="Tell us how we can help..."
            className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button className="w-full bg-green-600 text-white py-2.5 rounded-md font-medium hover:bg-green-700">
          Send Message
        </button>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-center mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-md shadow px-4 py-3 cursor-pointer"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium text-sm">{item.q}</p>
                <span>{openFaq === index ? "−" : "+"}</span>
              </div>

              {openFaq === index && (
                <p className="text-sm text-gray-600 mt-2">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* VISIT HELP CENTER LINK */}
        <div className="text-center mt-8">
          <Link
            to="/help"
            className="inline-block border px-6 py-3 rounded-md text-sm hover:bg-gray-50"
          >
            Visit Help Center →
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
