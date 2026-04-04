import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header.jsx";

const steps = ["Category", "Details", "Photos"];

const CATEGORIES = ["Vehicles", "Property", "Electronics", "Furniture", "Books", "Jobs", "Fashion"];

export default function PostAd() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [category, setCategory] = useState("Vehicles");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 10);
    const urls = files.map((f) => URL.createObjectURL(f));
    setPhotos(urls);
  };

  const handleSubmit = () => {
    if (!title.trim() || !price) {
      alert("Please fill in the title and price.");
      return;
    }

    const newAd = {
      id: Date.now(),
      title,
      price: `$${price}`,
      description,
      category,
      image: photos[0] || `https://picsum.photos/seed/${Date.now()}/300/200`,
      location: "Your Location",
      time: "Just now",
      status: "Active",
      postedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("myAds") || "[]");
    localStorage.setItem("myAds", JSON.stringify([newAd, ...existing]));

    alert("Ad posted successfully!");
    navigate("/account");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header activePage="post-ad" />

      <div className="py-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-8">

          <h1 className="text-2xl font-semibold mb-1">Post an Ad</h1>
          <p className="text-sm text-gray-600 mb-8">Fill out the details to list your item locally.</p>

          {/* STEP PROGRESS BAR */}
          <div className="relative flex items-center justify-between mb-10">
            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-[3px] bg-teal-600 -translate-y-1/2 transition-all duration-500"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((label, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold transition ${
                  step >= index + 1 ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"
                }`}>
                  {index + 1}
                </div>
                <span className={`mt-2 text-xs ${step >= index + 1 ? "text-teal-600 font-medium" : "text-gray-500"}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: CATEGORY */}
          {step === 1 && (
            <section className="mb-8">
              <h3 className="font-semibold mb-4">Choose Category</h3>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded-md px-4 py-2 text-sm w-full"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border rounded-md px-4 py-2 text-sm"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border rounded-md px-4 py-2 text-sm"
                />
              </div>
              <textarea
                placeholder="Describe your item in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded-md px-4 py-3 text-sm w-full mt-4 h-28 resize-none"
              />
            </section>
          )}

          {/* STEP 3: PHOTOS */}
          {step === 3 && (
            <section className="mb-8">
              <h3 className="font-semibold mb-4">Upload Photos</h3>
              <label className="border-2 border-dashed rounded-lg p-8 text-center text-sm text-gray-600 block cursor-pointer hover:border-teal-400 transition">
                <div className="text-teal-600 text-2xl mb-2">☁️</div>
                <p className="font-medium">Drag & drop photos here</p>
                <p className="text-xs mt-1">or click to browse</p>
                <p className="text-xs text-gray-400 mt-2">Max 10 photos • JPG, PNG, WEBP</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>

              {photos.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {photos.map((url, i) => (
                    <img key={i} src={url} alt="" className="w-24 h-20 object-cover rounded-lg border" />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ACTION BUTTONS */}
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
                className="bg-teal-600 text-white px-6 py-2 rounded-md text-sm"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-teal-600 text-white px-6 py-2 rounded-md text-sm"
              >
                Post My Ad
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
