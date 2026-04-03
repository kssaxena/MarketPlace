import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header.jsx";
export default function SafetyTips() {

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header activePage="safety" />

      <div className="px-10 py-12">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-10">

        <h1 className="text-3xl font-bold">
          Your Safety is Our <span className="text-green-600">Priority</span>.
        </h1>

        <p className="text-gray-500 mt-3 max-w-2xl">
          We've built a curated guide to help you navigate local trading with
          confidence. From payment protection to meeting protocols, here is
          how we stay safe together.
        </p>

      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {/* GENERAL SAFETY */}
        <div className="bg-white p-6 rounded-xl shadow-sm">

          <h3 className="font-semibold text-lg mb-4">
            General Safety
          </h3>

          <ul className="space-y-3 text-sm text-gray-600">

            <li>
              <span className="font-semibold">Meet in Public</span>
              <p>Choose busy places like malls, cafes, or police stations.</p>
            </li>

            <li>
              <span className="font-semibold">Bring a Friend</span>
              <p>Always let someone know where you are going.</p>
            </li>

            <li>
              <span className="font-semibold">Inspect the Item</span>
              <p>Check the item carefully before paying.</p>
            </li>

          </ul>

        </div>

        {/* PAYMENT SAFETY */}
        <div className="bg-white p-6 rounded-xl shadow-sm">

          <h3 className="font-semibold text-lg mb-4">
            Payment Safety
          </h3>

          <ul className="space-y-3 text-sm text-gray-600">

            <li>
              <span className="font-semibold text-green-600">
                Use Platform Payments
              </span>
              <p>Use secure payment systems for protection.</p>
            </li>

            <li>
              <span className="font-semibold text-red-500">
                Avoid Wire Transfers
              </span>
              <p>Never send money before seeing the item.</p>
            </li>

            <li>
              <span className="font-semibold">
                Beware of Fake Proof
              </span>
              <p>Scammers may send fake payment screenshots.</p>
            </li>

          </ul>

        </div>

        {/* REPORTING */}
        <div className="bg-[#1e293b] text-white p-6 rounded-xl shadow-sm">

          <h3 className="font-semibold text-lg mb-3">
            Reporting Behavior
          </h3>

          <p className="text-sm text-gray-300 mb-5">
            If something feels suspicious, report it immediately.
            Our team reviews reports 24/7.
          </p>

          <Link to="/contact">
            <button className="bg-green-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition">
             Report an Issue
            </button>
        </Link>

        </div>

      </div>

      {/* SCAM SECTION */}
      <div className="max-w-6xl mx-auto mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Identifying Scams
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-medium">Too Good to be True</h4>
            <p className="text-sm text-gray-500 mt-2">
              Extremely low prices are often used by scammers.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-medium">Urgent Requests</h4>
            <p className="text-sm text-gray-500 mt-2">
              Pressure tactics are used to bypass safety checks.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h4 className="font-medium">External Communication</h4>
            <p className="text-sm text-gray-500 mt-2">
              Avoid moving conversations outside the platform.
            </p>
          </div>

        </div>

      </div>

      </div>
    </div>
  );
}
