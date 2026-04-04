import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-teal-600 text-white flex items-center justify-center text-3xl font-bold">
              M
            </div>
          </Link>
          <h2 className="mt-5 text-2xl font-semibold text-gray-900">Marketplace</h2>
          <p className="mt-4 text-base text-gray-600 max-w-sm">
            Buy and sell anything locally.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900">Quick Links</h3>
          <div className="mt-5 flex flex-col gap-3 text-gray-600">
            <Link to="/" className="hover:text-teal-600 transition-colors">Home</Link>
            <Link to="/post-ad" className="hover:text-teal-600 transition-colors">Post an Ad</Link>
            <Link to="/my-ads" className="hover:text-teal-600 transition-colors">My Ads</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900">Support</h3>
          <div className="mt-5 flex flex-col gap-3 text-gray-600">
            <Link to="/help" className="hover:text-teal-600 transition-colors">Help Center</Link>
            <Link to="/safety-tips" className="hover:text-teal-600 transition-colors">Safety Tips</Link>
            <Link to="/contact" className="hover:text-teal-600 transition-colors">Contact Us</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900">Legal</h3>
          <div className="mt-5 flex flex-col gap-3 text-gray-600">
            <Link to="/terms-and-conditions" className="hover:text-teal-600 transition-colors">Terms and Conditions</Link>
            <Link to="/privacy" className="hover:text-teal-600 transition-colors">Privacy Policy</Link>
            <Link to="/cookies" className="hover:text-teal-600 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
