
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header activePage="privacy" />

      <div className="py-14 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500">
            Last updated: July 2024
          </p>
        </div>

        {/* INTRO */}
        <p className="text-sm text-gray-700 mb-10">
          At <strong>Marketly</strong>, we respect your privacy and are committed
          to protecting your personal data. This Privacy Policy explains how we
          collect, use, and safeguard your information when you use our
          platform.
        </p>

        <div className="space-y-10 text-sm text-gray-700 leading-relaxed">

          {/* 1 */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <span className="text-teal-600">①</span>
              Information We Collect
            </h2>

            <ul className="list-disc ml-5 space-y-2">
              <li>Personal details such as name, email, and phone number.</li>
              <li>Account credentials and profile information.</li>
              <li>Transaction and listing details.</li>
              <li>Device, browser, and usage data.</li>
            </ul>
          </section>

          {/* 2 */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <span className="text-teal-600">②</span>
              How We Use Information
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[#e9faf7] p-4 rounded-lg">
                <h4 className="font-medium mb-1">Service Operation</h4>
                <p>
                  To operate, maintain, and improve our marketplace services.
                </p>
              </div>

              <div className="bg-[#e9faf7] p-4 rounded-lg">
                <h4 className="font-medium mb-1">Communication</h4>
                <p>
                  To send updates, notifications, and respond to inquiries.
                </p>
              </div>

              <div className="bg-[#e9faf7] p-4 rounded-lg">
                <h4 className="font-medium mb-1">Fraud Prevention</h4>
                <p>
                  To detect suspicious activities and prevent misuse.
                </p>
              </div>

              <div className="bg-[#e9faf7] p-4 rounded-lg">
                <h4 className="font-medium mb-1">Personalization</h4>
                <p>
                  To personalize recommendations and user experience.
                </p>
              </div>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <span className="text-teal-600">③</span>
              Data Sharing & Disclosure
            </h2>

            <p className="mb-2">
              We may share your data only in the following situations:
            </p>

            <ul className="list-disc ml-5 space-y-2">
              <li>With trusted service providers.</li>
              <li>When required by law or legal processes.</li>
              <li>To protect platform safety and user rights.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <span className="text-teal-600">④</span>
              Your Privacy Rights
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border p-4 rounded-lg">
                <h4 className="font-medium mb-1">Right of Access</h4>
                <p>Request a copy of your personal data.</p>
              </div>

              <div className="border p-4 rounded-lg">
                <h4 className="font-medium mb-1">Right to Correction</h4>
                <p>Correct inaccurate or incomplete information.</p>
              </div>

              <div className="border p-4 rounded-lg">
                <h4 className="font-medium mb-1">Right to Deletion</h4>
                <p>Request deletion of your data when applicable.</p>
              </div>

              <div className="border p-4 rounded-lg">
                <h4 className="font-medium mb-1">Opt-out of Marketing</h4>
                <p>Unsubscribe from promotional communications.</p>
              </div>
            </div>
          </section>

          {/* 5 */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <span className="text-teal-600">⑤</span>
              Data Security Measures
            </h2>

            <div className="bg-gray-900 text-white p-5 rounded-lg">
              We implement industry-standard security measures to protect your
              personal data against unauthorized access, loss, or misuse.
            </div>
          </section>

          {/* 6 */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <span className="text-teal-600">⑥</span>
              Information Transfers
            </h2>

            <p>
              Your information may be transferred and processed in countries
              outside your jurisdiction, subject to appropriate safeguards.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold mb-3">
              <span className="text-teal-600">⑦</span>
              Policy Updates
            </h2>

            <p>
              We may update this Privacy Policy from time to time. Changes will
              be posted on this page and notified when appropriate.
            </p>
          </section>

        </div>

        {/* FOOTER */}
        <div className="mt-14 text-xs text-gray-400 text-center">
          © 2024 Marketly. All rights reserved.
        </div>

      </div>
      </div>
    </div>
  );
}
