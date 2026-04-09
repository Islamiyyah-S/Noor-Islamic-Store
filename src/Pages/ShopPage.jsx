import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer/CartDrawer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../data/Products.json";
import "./ShopPage.css";
import Footer from "../components/Footer/Footer";

const tabs = ["All", ...data.collections.map((c) => c.name)];

export default function ShopPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const getProducts = () => {
    if (activeTab === "All") {
      return data.collections.flatMap((c) =>
        c.products.map((p) => ({ ...p, collection: c.name })),
      );
    }
    const col = data.collections.find((c) => c.name === activeTab);
    return col ? col.products.map((p) => ({ ...p, collection: col.name })) : [];
  };

  const products = getProducts();

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <main className="sp-page">
        <div className="sp-hero">
          <div className="sp-hero-inner">
            <div className="sp-label">
              <div className="sp-label-line" />
              <span className="sp-label-text">Our Collections</span>
            </div>
            <h1 className="sp-hero-title">Shop All Products</h1>
            <p className="sp-hero-sub">
              Handcrafted with care — explore every piece from our collections.
            </p>
          </div>
        </div>

        <section className="sp-section">
          {/* Toolbar */}
          <div className="sp-toolbar">
            <div className="sp-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`sp-tab ${activeTab === tab ? "sp-tab-active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="sp-count">{products.length} products</span>
          </div>

          {/* Grid */}
          <div className="sp-grid">
            {products.map((product) => (
              <div
                key={product.id}
                className="sp-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="sp-card-img-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="sp-card-img"
                  />

                  {product.badge && (
                    <span
                      className={`sp-badge sp-badge-${product.badge.toLowerCase()}`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {!product.inStock && (
                    <div className="sp-out-of-stock">Out of Stock</div>
                  )}

                  {/* View Product overlay — same pattern as CollectionPage */}
                  <div className="sp-card-actions">
                    <span>View Product</span>
                  </div>
                </div>

                <div className="sp-card-info">
                  <span className="sp-card-collection">{product.collection}</span>
                  <span className="sp-card-name">{product.name}</span>
                  <div className="sp-card-price">
                    <span className="sp-price">
                      ₦{product.price.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="sp-old-price">
                        ₦{product.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </>
  );
}