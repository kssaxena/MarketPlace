import React from "react";
import { IoClose } from "react-icons/io5";
import { FaShieldAlt, FaRocket, FaHeart, FaGlobe } from "react-icons/fa";

function AboutModal({ onClose }) {
  return (
    <div
  onClick={onClose}
  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-[9999]"
>
  <div
  onClick={(e) => e.stopPropagation()}
  className="bg-white w-full max-w-2xl rounded-2xl p-8 shadow-xl relative overflow-y-auto max-h-[90vh] [scrollbar-width:none] [-ms-overflow-style:none]"
  style={{ scrollbarWidth: "none" }}
>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 hover:text-black text-2xl"
        >
          <IoClose />
        </button>
        {/*TITLE*/}
        <h2 className="text-3xl font-bold font-satoshi text-center mb-6 text-emerald-600">
  ABOUT MARKETPLACE
</h2>

        {/* SECTION 1 */}
        <div className="space-y-6 text-gray-700 text-[15px] leading-relaxed">

          <p>
            Marketplace is a simple, fast, and trusted platform that helps people buy and sell anything in their local area. Whether you're looking for a great deal or want to sell something you no longer need, we make the process smooth and effortless.
          </p>

          <p>
            We started Marketplace with one small idea — <strong>make trading between people easier, safer, and more friendly.</strong> No complicated steps. No hidden fees. Just a clean experience built for everyone.
          </p>

          {/* WHAT WE BELIEVE */}
          <div>
            <div className="flex items-center gap-2 text-xl font-semibold mb-2 text-emerald-600">
              <FaHeart /> What We Believe
            </div>

            <ul className="list-disc pl-6 space-y-2">
              <li>Buy quality used or new items at fair prices</li>
              <li>Sell products instantly without extra hassle</li>
              <li>Connect with real people nearby</li>
              <li>Enjoy a safe and transparent environment</li>
            </ul>

            <p className="mt-3">
              Our goal is to help you save money, earn money, and discover useful things around you.
            </p>
          </div>

          {/* WHAT YOU CAN DO */}
          <div>
            <div className="flex items-center gap-2 text-xl font-semibold mb-2 text-emerald-600">
              <FaRocket /> What You Can Do Here
            </div>

            <ul className="list-disc pl-6 space-y-2">
              <li>Post ads for free</li>
              <li>Find electronics, cars, furniture, fashion, and more</li>
              <li>Chat instantly with buyers and sellers</li>
              <li>Explore verified & featured listings</li>
              <li>Browse safely with clean info and quick moderation</li>
            </ul>
          </div>

          {/* SAFETY */}
          <div>
            <div className="flex items-center gap-2 text-xl font-semibold mb-2 text-emerald-600">
              <FaShieldAlt /> Your Safety Matters
            </div>

            <p>
              We take safety very seriously. Our team constantly works to keep fake listings and suspicious activity away from the community.
            </p>
            <p>Your experience is our top priority.</p>
          </div>

          {/* MISSION */}
          <div>
            <div className="flex items-center gap-2 text-xl font-semibold mb-2 text-emerald-600">
              <FaGlobe /> Our Mission
            </div>

            <p>
              To build the most user-friendly local marketplace where anyone can confidently buy, sell, and connect — all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;