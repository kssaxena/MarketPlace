import { useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";
export default function About() {
  const navigate = useNavigate();
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate("/search");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header onSearchSubmit={handleSearchSubmit} onPostAdClick={() => navigate("/post-ad")} />

      {/* HERO */}
      <section className="text-center py-20 px-4 bg-white">
        <h1 className="text-4xl font-bold mb-4">
          Connecting Communities, One Item at a Time
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Marketplace helps people buy and sell locally, building trust and
          strengthening neighborhoods through simple technology.
        </p>
      </section>

      {/* CORE PILLARS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-10">
          Our Core Pillars
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="font-semibold mb-2">Our Mission</h3>
            <p className="text-sm text-gray-600">
              Empower individuals to buy and sell items easily within their local communities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="font-semibold mb-2">Our Vision</h3>
            <p className="text-sm text-gray-600">
              To create a trusted, local-first marketplace accessible to everyone.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="font-semibold mb-2">Our Values</h3>
            <p className="text-sm text-gray-600">
              Trust, simplicity, sustainability, and community growth.
            </p>
          </div>
        </div>
      </section>

      {/* SIMPLE FAST LOCAL */}
      <section className="py-16 bg-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Simple, Fast & Local
            </h2>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li>✔ List items in seconds</li>
              <li>✔ Discover nearby deals instantly</li>
              <li>✔ Chat and meet locally</li>
              <li>✔ No middlemen, no hassle</li>
            </ul>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
              alt="Mobile usage"
              className="rounded-xl shadow"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-teal-600 rounded-xl text-white text-center py-12 px-6">
          <h2 className="text-3xl font-bold mb-4">
            Ready to join your local marketplace?
          </h2>
          <p className="mb-6 text-gray-100">
            Start buying and selling today — it’s fast and free.
          </p>

          <div className="flex justify-center gap-4">
             <button
               onClick={() => navigate("/")}
               className="bg-white text-teal-600 px-6 py-3 rounded-md font-medium"
             >
               Get Started
             </button>
            <button className="border border-white px-6 py-2 rounded-md">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
