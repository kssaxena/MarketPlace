
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";

export default function TermsConditions() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header activePage="terms" />

      <div className="py-14 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-sm text-gray-500">
            Last updated: January 2024
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="font-semibold text-lg mb-2">1. Introduction</h2>
            <p>
              Welcome to <strong>Marketly</strong>. By accessing or using our
              platform, you agree to be bound by these Terms & Conditions.
              Please read them carefully before using our services.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="font-semibold text-lg mb-2">
              2. User Accounts and Registration
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>You must provide accurate and complete information.</li>
              <li>You are responsible for maintaining account security.</li>
              <li>Accounts must not be shared with others.</li>
            </ul>
          </section>

          {/* 3 */}
          <section>
            <h2 className="font-semibold text-lg mb-2">
              3. Listing Policies
            </h2>

            <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded-md mb-4">
              <p className="text-red-700 font-medium mb-1">
                ⚠ Prohibited Items
              </p>
              <p className="text-red-600 text-sm">
                Illegal goods, weapons, drugs, counterfeit items, and
                misleading listings are strictly prohibited. Violations may
                result in permanent account suspension.
              </p>
            </div>

            <p>
              Sellers must ensure that all listings are accurate, lawful, and
              do not violate any local or international regulations.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="font-semibold text-lg mb-2">
              4. Buying and Selling Transactions
            </h2>
            <p>
              Marketly acts as a platform connecting buyers and sellers. We do
              not directly handle payments or guarantee transactions.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="font-semibold text-lg mb-2">
              5. Intellectual Property Rights
            </h2>
            <p>
              All content, logos, trademarks, and designs on this platform are
              the property of Marketly or its licensors and may not be used
              without permission.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="font-semibold text-lg mb-2">
              6. User Conduct and Prohibitions
            </h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>No harassment or abusive behavior.</li>
              <li>No fraudulent or misleading activities.</li>
              <li>No attempts to bypass platform security.</li>
            </ul>
          </section>

          {/* 7 */}
          <section>
            <h2 className="font-semibold text-lg mb-2">
              7. Limitation of Liability
            </h2>
            <div className="bg-gray-900 text-white p-5 rounded-md text-sm">
              Marketly shall not be liable for any indirect, incidental, or
              consequential damages arising from your use of the platform.
            </div>
          </section>

          {/* 8 */}
          <section>
            <h2 className="font-semibold text-lg mb-2">
              8. Privacy Policy
            </h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy
              to understand how we collect, use, and protect your information.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="font-semibold text-lg mb-2">
              9. Governing Law
            </h2>
            <p>
              These Terms & Conditions shall be governed and interpreted in
              accordance with the laws of your jurisdiction.
            </p>
          </section>
        </div>

        {/* FOOTER CTA */}
        <div className="mt-12 bg-gray-900 text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold mb-1">
              Questions about these terms?
            </h3>
            <p className="text-sm text-gray-300">
              Our support team is here to help you.
            </p>
          </div>

          <div className="flex gap-3">
            {/* CONTACT SUPPORT */}
            <Link
              to="/contact"
              className="bg-teal-600 px-5 py-2 rounded-md text-sm font-medium text-white text-center"
            >
              Contact Support
            </Link>

            {/* HELP CENTER */}
            <Link
              to="/help"
              className="border border-gray-500 px-5 py-2 rounded-md text-sm text-white text-center"
            >
              Help Center
            </Link>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
}
