import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import Account from "./Pages/Account/Account.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import HelpCenter from "./Pages/HelpCenter/HelpCenter.jsx";
import Login from "./Pages/Login/Login.jsx";
import PostAd from "./Pages/PostAd/PostAd.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy.jsx";
import Register from "./Pages/Register/Register.jsx";
import SafetyTips from "./Pages/SafetyTips/SafetyTips.jsx";
import Search from "./Pages/Search/Search.jsx";
import OrderStatus from "./Pages/OrderStatus/OrderStatus.jsx";
import Cookies from "./Pages/Cookies/Cookies.jsx";
import Blog from "./Pages/Blog/Blog.jsx";
import TermsConditions from "./Pages/Terms_and_Conditions/Terms_and_Conditions.jsx";
import Footer from "./components/Footer.jsx";
import CategoryPage from "./Pages/CategoryPage/CategoryPage.jsx";
import Header from "./components/Header.jsx";

function App() {
  return (
    <BrowserRouter>
     <div className="flex min-h-screen flex-col">
      <div className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<Account />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<HelpCenter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-ad" element={<PostAd />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/register" element={<Register />} />
        <Route path="/safety" element={<SafetyTips />} />
        <Route path="/safety-tips" element={<SafetyTips />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/my-ads" element={<Account />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/category/:categoryName/:subCategory" element={<CategoryPage />} />
      </Routes>
      </div>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
