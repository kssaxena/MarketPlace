import { useState } from "react";
import Header from "../../components/Header.jsx";

const steps = ["Category", "Details", "Photos"];

export default function PostAd() {
  const [step, setStep] = useState(1);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header activePage="post-ad" />

      <div className="py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold mb-1">Post an Ad</h1>
        <p className="text-sm text-gray-600 mb-8">
          Fill out the details to list your item locally.
        </p>

        {/* ===== STEP PROGRESS BAR ===== */}
        <div className="relative flex items-center justify-between mb-10">
          {/* GRAY LINE */}
          <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 -translate-y-1/2" />

          {/* GREEN FILL LINE */}
          <div
            className="absolute top-1/2 left-0 h-[3px] bg-green-600 -translate-y-1/2 transition-all duration-500"
            style={{
              width: `${((step - 1) / (steps.length - 1)) * 100}%`,
            }}
          />

          {/* STEP CIRCLES */}
          {steps.map((label, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition
                  ${
                    step >= index + 1
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
              >
                {index + 1}
              </div>

              <span
                className={`mt-2 text-xs ${
                  step >= index + 1
                    ? "text-green-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ===== STEP CONTENT ===== */}

        {/* STEP 1: CATEGORY */}
        {step === 1 && (
          <section className="mb-8">
            <h3 className="font-semibold mb-4">Choose Category</h3>

            <select className="border rounded-md px-4 py-2 text-sm w-full">
               <option>Vehicles</option>
              <option>Property</option>
              <option>Electronics</option>
              <option>Furnitures</option>
              <option>Books</option>
              <option>Jobs</option>
              <option>Fashion</option>
            </select>
          </section>
        )}

        {/* STEP 2: DETAILS */}
        {step === 2 && (
          <section className="mb-8">
            <h3 className="font-semibold mb-4">Ad Details</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Ad Title"
                className="border rounded-md px-4 py-2 text-sm"
              />

              <input
                type="number"
                placeholder="Price"
                className="border rounded-md px-4 py-2 text-sm"
              />
            </div>

            <textarea
              placeholder="Describe your item in detail..."
              className="border rounded-md px-4 py-3 text-sm w-full mt-4 h-28 resize-none"
            />
          </section>
        )}

        {/* STEP 3: PHOTOS */}
        {step === 3 && (
          <section className="mb-8">
            <h3 className="font-semibold mb-4">Upload Photos</h3>

            <div className="border-2 border-dashed rounded-lg p-8 text-center text-sm text-gray-600">
              <div className="text-green-600 text-2xl mb-2">☁️</div>
              <p className="font-medium">Drag & drop photos here</p>
              <p className="text-xs mt-1">
                or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Max 10 photos • JPG, PNG, WEBP
              </p>
            </div>
          </section>
        )}

        {/* ===== ACTION BUTTONS ===== */}
        <div className="flex justify-between mt-10">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 border rounded-md text-sm disabled:opacity-40"
          >
            Back
          </button>

          {step < steps.length ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-green-600 text-white px-6 py-2 rounded-md text-sm"
            >
              Next
            </button>
          ) : (
            <button className="bg-green-600 text-white px-6 py-2 rounded-md text-sm">
              Post My Ad
            </button>
          )}
        </div>

        </div>
      </div>
    </div>
  );
}
