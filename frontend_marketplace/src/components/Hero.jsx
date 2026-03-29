export function Hero() {
  return (
    <section className="hero">
      <h1>Buy & Sell Anything</h1>
      <p>Find great deals near you or list your items for free</p>
    </section>
  );
}

export function Categories() {
  const cats = ["All Ads", "Vehicles", "Property", "Electronics", "Fashion"];

  return (
    <div className="categories">
      {cats.map((c, i) => (
        <button key={i}>{c}</button>
      ))}
    </div>
  );
}

export default Hero;