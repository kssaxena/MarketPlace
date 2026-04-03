import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";

export default function Cookies() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header activePage="cookies" />

      <div className="py-14 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Cookies Policy</h1>
          <p className="text-sm text-gray-500">Last updated: April 2026</p>
        </div>

        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">
          <section>
            <h2 className="font-semibold text-lg mb-2">1. What Cookies Do</h2>
            <p>
              Cookies help us keep you signed in, remember preferences, and improve your marketplace experience.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">2. Types of Cookies</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Essential cookies for login and session handling.</li>
              <li>Preference cookies for saved settings.</li>
              <li>Analytics cookies for usage insights.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">3. Managing Cookies</h2>
            <p>
              You can clear or block cookies in your browser settings, but some features may not work as intended.
            </p>
          </section>
        </div>

        <div className="mt-12 flex gap-3 flex-wrap">
          <Link to="/privacy" className="bg-green-600 px-5 py-2 rounded-md text-sm font-medium text-white text-center">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="border border-gray-300 px-5 py-2 rounded-md text-sm text-gray-700 text-center">
            Terms and Conditions
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

