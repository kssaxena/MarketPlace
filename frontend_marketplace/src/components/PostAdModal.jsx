import { useState } from "react";

function PostAdModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = () => {
    if (!title || !image || !description || !location || !price) {
      alert("Please fill all fields!");
      return;
    }

    onSubmit({
      title,
      image,
      description,
      location,
      price,
      time: "Just now",
      featured: false,
      category: "Misc",
    });

    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-xl relative"
      >

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4">Post a New Ad</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Product Title</label>
          <input
            type="text"
            className="w-full border p-3 rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. iPhone 14 Pro Max"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Image URL</label>
          <input
            type="text"
            className="w-full border p-3 rounded-xl"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Paste image link"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Description</label>
          <textarea
            className="w-full border p-3 rounded-xl h-28"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your product..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Location</label>
          <input
            type="text"
            className="w-full border p-3 rounded-xl"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, State"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium">Price</label>
          <input
            type="text"
            className="w-full border p-3 rounded-xl"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="$100"
          />
        </div>

        <button
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl text-lg font-medium"
          onClick={handleSubmit}
        >
          Submit Ad
        </button>

      </div>
    </div>
  );
}

export default PostAdModal;