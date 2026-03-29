import { useEffect, useState } from "react";
const images = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da", // shopping bags
  "https://images.unsplash.com/photo-1607083206968-13611e3d76db", // online shopping
  "https://images.unsplash.com/photo-1607082350899-7e105aa886ae"  // premium shopping aesthetic (🔥 new)
];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // 🔥 change every 3 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hero"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      <div className="overlay">
        <h1>Buy & Sell Anything</h1>
        <p>Find great deals near you or list your items for free</p>
      </div>
    </div>
  );
}

export default Hero;