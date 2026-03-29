import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Footer from "./components/Footer";
import Categories from "./components/Categories";
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