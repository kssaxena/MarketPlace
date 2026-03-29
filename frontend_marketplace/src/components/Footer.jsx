function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* LEFT */}
        <div className="footer-col logo-col">
          <h3>Marketplace</h3>
          <p>Buy and sell anything locally.</p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <span>Home</span>
          <span>Post an Ad</span>
          <span>My Ads</span>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h4>Support</h4>
          <span>Help Center</span>
          <span>Safety Tips</span>
          <span>Contact Us</span>
        </div>

        {/* LEGAL */}
        <div className="footer-col">
          <h4>Legal</h4>
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Cookie Policy</span>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © 2026 Marketplace.
      </div>

    </footer>
  );
}

export default Footer;