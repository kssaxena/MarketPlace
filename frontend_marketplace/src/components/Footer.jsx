import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))]">

        {/* Brand */}
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-600 text-3xl font-bold text-white">
              M
            </div>
          </Link>
          <h2 className="mt-5 text-2xl font-semibold text-gray-900">Marketplace</h2>
          <p className="mt-4 max-w-sm text-base text-gray-600">
            Buy and sell anything locally.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Quick Links</h3>
          <div className="mt-5 flex flex-col gap-3 text-gray-600">
            <Link to="/" className="transition-colors hover:text-teal-600">Home</Link>
            <Link to="/post-ad" className="transition-colors hover:text-teal-600">Post an Ad</Link>
            <Link to="/my-ads" className="transition-colors hover:text-teal-600">My Ads</Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Support</h3>
          <div className="mt-5 flex flex-col gap-3 text-gray-600">
            <Link to="/help" className="transition-colors hover:text-teal-600">Help Center</Link>
            <Link to="/safety-tips" className="transition-colors hover:text-teal-600">Safety Tips</Link>
            <Link to="/contact" className="transition-colors hover:text-teal-600">Contact Us</Link>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Legal</h3>
          <div className="mt-5 flex flex-col gap-3 text-gray-600">
            <Link to="/terms-and-conditions" className="transition-colors hover:text-teal-600">Terms and Conditions</Link>
            <Link to="/privacy" className="transition-colors hover:text-teal-600">Privacy Policy</Link>
            <Link to="/cookies" className="transition-colors hover:text-teal-600">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;