import { useState, useEffect } from "react";
import "./PostAdModal.css";

const categories = [
  { name: "Vehicles",    icon: "🚗" },
  { name: "Property",   icon: "🏠" },
  { name: "Electronics",icon: "💻" },
  { name: "Fashion",    icon: "👗" },
  { name: "Furniture",  icon: "🛋️" },
  { name: "Jobs",       icon: "💼" },
  { name: "Hobbies",    icon: "🎨" },
  { name: "Books",      icon: "📚" },
];

function PostAdModal({ isOpen, onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [form, setForm] = useState({ title: "", price: "", description: "", image: "" });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      setTimeout(() => {
        setStep(1);
        setSelectedCategory(null);
        setForm({ title: "", price: "", description: "", image: "" });
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setTimeout(() => setStep(2), 180);
  };

  const handleSubmit = () => {
    if (!form.title || !form.price) return;
    onSubmit({
      title: form.title,
      price: form.price,
      description: form.description,
      image: form.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      category: selectedCategory.name,
    });
    onClose();
  };

  return (
    <div
      className={`pad-overlay ${visible ? "show" : ""}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="pad-modal">

        {/* HEADER */}
        <div className="pad-header">
          <div className="pad-header-left">
            <h2 className="pad-title">Post Your Ad</h2>
            <div className="pad-steps">
              <div className={`pad-step-dot ${step >= 1 ? "active" : ""}`} />
              <div className={`pad-step-dot ${step >= 2 ? "active" : ""}`} />
            </div>
          </div>
          <button className="pad-close" onClick={onClose}>×</button>
        </div>

        {/* BODY */}
        <div className="pad-body">

          {/* STEP 1 — CATEGORY PICKER */}
          {step === 1 && (
            <>
              <p className="pad-subtitle">Choose a Category</p>
              <div className="cat-grid">
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    className={`cat-item ${hoveredCategory === cat.name ? "hovered" : ""}`}
                    onClick={() => handleCategorySelect(cat)}
                    onMouseEnter={() => setHoveredCategory(cat.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <div className="cat-icon-wrap">{cat.icon}</div>
                    <span className="cat-name">{cat.name}</span>
                    <span className="cat-arrow">›</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* STEP 2 — AD FORM */}
          {step === 2 && selectedCategory && (
            <>
              <button className="back-btn" onClick={() => setStep(1)}>
                ← Back
              </button>

              <div className="selected-cat-badge">
                <span>{selectedCategory.icon}</span>
                <span>{selectedCategory.name}</span>
              </div>

              <div className="field-group">
                <label className="field-label">Ad Title</label>
                <input
                  className="field-input"
                  placeholder="What are you selling?"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div className="field-group">
                <label className="field-label">Price</label>
                <div className="price-wrap">
                  <span className="price-prefix">₹</span>
                  <input
                    className="field-input price-input"
                    placeholder="0"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Description</label>
                <textarea
                  className="field-textarea"
                  placeholder="Describe your item — condition, features, reason for selling..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="field-group">
                <label className="field-label">
                  Image URL <span className="field-label-note">(optional)</span>
                </label>
                <input
                  className="field-input"
                  placeholder="https://..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
              </div>

              <button
                className="submit-btn"
                onClick={handleSubmit}
                disabled={!form.title || !form.price}
              >
                Publish Ad →
              </button>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default PostAdModal;
