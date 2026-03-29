import "./Navbar.css";

function Navbar() {
  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="top-right">
          <span>English ▾</span>
          <span>INR ▾</span>
          <span>Track Order</span>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="main-nav">
        <div className="logo">Marketplace</div>

        <button className="category-btn">☰ Categories</button>

        <input
          type="text"
          placeholder="Search for products..."
          className="search-bar"
        />

        <div className="actions">
          <div>👤 Account</div>
          <div>♡ Wishlist</div>
          <div>🛒 Cart</div>
        </div>
      </div>

      {/* MENU BAR */}
      <div className="menu-bar">

        {/* LEFT MENU */}
        <div className="menu-left">
          {["Home","Explore","About","Contact","Pages","Help","Post AD"].map((item) =>
            item === "Post AD" ? (
              <button key={item} className="post-ad-btn">
                + Post Ad
              </button>
            ) : (
              <span key={item}>{item}</span>
            )
          )}
        </div>

        {/* RIGHT PROMO */}
        <div className="menu-right">
          <span className="promo-text">
            Get the Best Deals Right Here!
          </span>
        </div>

      </div>
    </>
  );
}

export default Navbar;