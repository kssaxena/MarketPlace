import { useState } from "react";
import {
  FaCar, FaMotorcycle, FaCog, FaBicycle,
  FaHome, FaBuilding, FaStore,
  FaTv, FaLaptop, FaCamera, FaGamepad, FaSnowflake, FaMobileAlt,
  FaTshirt, FaCouch, FaBriefcase, FaFutbol, FaBook,
  FaPaw, FaWrench, FaChevronRight
} from "react-icons/fa";
import { MdChair, MdOutlineOtherHouses } from "react-icons/md";

const categoryData = [
  {
    name: "Vehicles",
    icon: <FaCar size={20} />,
    subcategories: {
      Cars: ["Cars"],
      Bikes: ["Motorcycles", "Scooters", "Spare Parts", "Bicycles"],
    },
  },
  {
    name: "Property",
    icon: <FaHome size={20} />,
    subcategories: {
      Properties: [
        "For Sale: Houses & Apartments",
        "For Rent: Houses & Apartments",
        "Lands & Plots",
        "New Projects",
        "For Rent: Shops & Offices",
        "For Sale: Shops & Offices",
        "PG & Guest Houses",
      ],
    },
  },
  {
    name: "Electronics",
    icon: <FaTv size={20} />,
    subcategories: {
      "Electronics & Appliances": [
        "TVs, Video - Audio",
        "Kitchen & Other Appliances",
        "Computers & Laptops",
        "Cameras & Lenses",
        "Games & Entertainment",
        "Fridges",
        "Computer Accessories",
        "Hard Disks, Printers & Monitors",
        "ACs",
        "Washing Machines",
      ],
      Mobiles: ["Mobile Phones", "Accessories", "Tablets"],
    },
  },
  {
    name: "Fashion",
    icon: <FaTshirt size={20} />,
    subcategories: {
      Fashion: ["Men", "Women", "Kids"],
    },
  },
  {
    name: "Furniture",
    icon: <FaCouch size={20} />,
    subcategories: {
      Furniture: [
        "Sofa & Dining",
        "Beds & Wardrobes",
        "Home Decor & Garden",
        "Kids Furniture",
        "Other Household Items",
      ],
    },
  },
  {
    name: "Jobs",
    icon: <FaBriefcase size={20} />,
    subcategories: {
      Jobs: [
        "Data entry & Back office",
        "Sales & Marketing",
        "BPO & Telecaller",
        "Driver",
        "Office Assistant",
        "Delivery & Collection",
        "Teacher",
        "Cook",
        "Receptionist & Front office",
        "Operator & Technician",
        "IT Engineer & Developer",
        "Hotel & Travel Executive",
        "Accountant",
        "Warehouse Staff",
        "Designer",
        "Security Guards",
        "Other Jobs",
      ],
    },
  },
  {
    name: "Hobbies",
    icon: <FaFutbol size={20} />,
    subcategories: {
      "Books, Sports & Hobbies": [
        "Books",
        "Gym & Fitness",
        "Musical Instruments",
        "Sports Equipment",
        "Other Hobbies",
      ],
      Pets: ["Fishes & Aquarium", "Pet Food & Accessories", "Dogs", "Other Pets"],
      Services: [
        "Education & Classes",
        "Tours & Travel",
        "Electronics Repair & Services",
        "Health & Beauty",
        "Home Renovation & Repair",
        "Cleaning & Pest Control",
        "Legal & Documentation Services",
        "Packers & Movers",
        "Other Services",
      ],
    },
  },
  {
    name: "Books",
    icon: <FaBook size={20} />,
    subcategories: {
      "Books & Learning": ["Books", "Gym & Fitness", "Musical Instruments", "Sports Equipment"],
    },
  },
];

function CategoriesModal({ onClose }) {
  const [activeCategory, setActiveCategory] = useState(categoryData[0]);

  const subcatGroups = activeCategory?.subcategories || {};
  const groupKeys = Object.keys(subcatGroups);

  // Distribute groups into columns (max 2–3 groups per column)
  const columns = [];
  let col = [];
  groupKeys.forEach((key, i) => {
    col.push(key);
    if (col.length === 2 || i === groupKeys.length - 1) {
      columns.push(col);
      col = [];
    }
  });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start p-4 z-50 pt-16"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden relative flex"
        style={{ minHeight: 480, maxHeight: "80vh" }}
      >
        {/* LEFT SIDEBAR — Category List */}
        <div className="w-52 bg-gray-50 border-r border-gray-200 flex-shrink-0 overflow-y-auto">
          <div className="py-3 px-4 border-b border-gray-200">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">All Categories</span>
          </div>
          {categoryData.map((cat) => {
            const isActive = activeCategory?.name === cat.name;
            return (
              <button
                key={cat.name}
                onMouseEnter={() => setActiveCategory(cat)}
                onClick={() => setActiveCategory(cat)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all group
                  ${isActive
                    ? "bg-white border-l-4 border-emerald-500 text-emerald-700 font-semibold"
                    : "border-l-4 border-transparent text-gray-600 hover:bg-white hover:text-emerald-600"
                  }`}
              >
                <span className={`${isActive ? "text-emerald-500" : "text-gray-400 group-hover:text-emerald-400"} transition-colors`}>
                  {cat.icon}
                </span>
                <span className="text-sm">{cat.name}</span>
                <FaChevronRight
                  size={10}
                  className={`ml-auto transition-all ${isActive ? "text-emerald-400 opacity-100" : "opacity-0 group-hover:opacity-50"}`}
                />
              </button>
            );
          })}
        </div>

        {/* RIGHT PANEL — Subcategories */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
            <span className="text-emerald-500">{activeCategory?.icon}</span>
            <h2 className="text-lg font-bold text-gray-800">{activeCategory?.name}</h2>
          </div>

          {/* Subcategory columns */}
          <div className="grid gap-x-8 gap-y-2" style={{ gridTemplateColumns: `repeat(${Math.min(columns.length + 1, 3)}, 1fr)` }}>
            {groupKeys.map((groupName) => (
              <div key={groupName} className="mb-4">
                {/* Group heading */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-800">{groupName}</span>
                </div>
                <div className="border-b border-gray-200 mb-3" />
                {/* Items */}
                <ul className="space-y-1">
                  {subcatGroups[groupName].map((item) => (
                    <li key={item}>
                      <button className="text-sm text-gray-500 hover:text-emerald-600 hover:translate-x-1 transition-all text-left w-full">
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all text-lg font-light"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default CategoriesModal;
