import Navbar from "../components/navbar";
import CartDrawer from "../components/CartDrawer/CartDrawer";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/Products.json";
import "../Pages/CollectionPages.css";
import Footer from "../components/Footer/Footer";

const slugMap = {
  abayas: "Abayas",
  thobes: "Thobes",
  "quran-books": "Quran & Books",
  "hijabs-scarves": "Hijabs & Scarves",
  perfumes: "Perfumes & Oils",
  "gift-boxes": "Islamic Gift Boxes",
};

export default function CollectionPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const collection = products.collections.find((c) => c.id === slug);
  const items = collection?.products ?? [];
  const collectionName = collection?.name ?? "";
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <div className="collection-page">
        <div
          className="collection-page__hero"
          style={{ backgroundImage: `url(${collection.image})` }}
        >
          <button
            className="collection-page__back"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
          <p className="collection-page__label">NOOR STORE</p>
          <h1 className="collection-page__title">{collectionName}</h1>
          <p className="collection-page__count">{items.length} pieces</p>
        </div>

        <div className="collection-page__grid">
          {items.map((product) => (
            <div
              key={product.id}
              className="cp-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="cp-card__img-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="cp-card__img"
                />
                {product.badge && (
                  <span className="cp-card__badge">{product.badge}</span>
                )}
                {!product.inStock && (
                  <div className="cp-card__oos">Out of Stock</div>
                )}
                <div className="cp-card__overlay">
                  <span>View Product</span>
                </div>
              </div>
              <div className="cp-card__info">
                <h3 className="cp-card__name">{product.name}</h3>
                <div className="cp-card__pricing">
                  <span className="cp-card__price">
                    ₦{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="cp-card__old">
                      ₦{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </>
  );
}
