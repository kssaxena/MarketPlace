import Navbar from "./components/Navbar";
import { Hero, Categories } from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <ProductGrid />
      <Footer />
    </>
  );
}

export default App;