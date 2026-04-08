import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Ticker from "./components/Ticker";
import Heropage from "./components/Hero/Hero";
import Collections from "./components/Collections/Collections";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import About from "./components/About/About";
import CartDrawer from "./components/CartDrawer/CartDrawer";
import CollectionPage from "./Pages/CollectionPages"
import ProductPage from "./Pages/ProductPage"
import ShopPage from "./Pages/ShopPage";
import AboutPage from "./Pages/AboutPage";
import Footer from "./components/Footer/Footer"

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  return (
     <Routes>
        <Route path="/" element={
        
    <>
      <Ticker />
      <Navbar onCartClick={() => setCartOpen(true)} />
      <Heropage />
      <Collections />
      <FeaturedProducts />
      <About />
      <Footer/>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
       } />
        <Route path="/collections/:slug" element={<CollectionPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/shop" element={<ShopPage />} /> 
          <Route path="/about" element={<AboutPage />} />
      </Routes>
  );
}

export default App;
