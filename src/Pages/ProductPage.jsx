import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer/CartDrawer";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import products from "../data/Products.json";
import "../Pages/ProductPage.css";
import Footer from "../components/Footer/Footer";
const clothingCollections = ["Abayas", "Thobes", "Hijabs & Scarves"];

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const collection = products.collections.find((col) =>
    col.products.some((p) => p.id === id),
  );
  const product = collection?.products.find((p) => p.id === id);
  const isClothing = clothingCollections.includes(collection?.name);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  if (!product) return <div className="pp-not-found">Product not found.</div>;

  const canAdd = isClothing ? !!selectedSize : true;

  const handleAdd = () => {
    if (!canAdd) return;
    addToCart({ ...product, quantity, selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />
      <div className="pp">
        <button className="pp__back" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="pp__layout">
          {/* Left — Image */}
          <div className="pp__image-side">
            <div className="pp__img-wrap">
              <img src={product.image} alt={product.name} className="pp__img" />
              {product.badge && (
                <span className="pp__badge">{product.badge}</span>
              )}
            </div>
          </div>

          {/* Right — Details */}
          <div className="pp__detail-side">
            <p className="pp__collection">{collection?.name}</p>
            <h1 className="pp__name">{product.name}</h1>

            <div className="pp__pricing">
              <span className="pp__price">
                ₦{product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <span className="pp__old">
                  ₦{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="pp__divider" />

            <p className="pp__desc">{product.description}</p>

            {isClothing && (
              <div className="pp__option-group">
                <p className="pp__option-label">
                  Size{" "}
                  {selectedSize && (
                    <span className="pp__selected-val">— {selectedSize}</span>
                  )}
                </p>
                <div className="pp__sizes">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      className={`pp__size-btn ${selectedSize === size ? "pp__size-btn--active" : ""}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="pp__option-group">
              <p className="pp__option-label">Quantity</p>
              <div className="pp__qty">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
              </div>
            </div>

            {/* CTA */}
            {!product.inStock ? (
              <button className="pp__cta pp__cta--oos" disabled>
                Out of Stock
              </button>
            ) : (
              <button
                className={`pp__cta ${!canAdd ? "pp__cta--disabled" : ""} ${added ? "pp__cta--added" : ""}`}
                onClick={handleAdd}
                disabled={!canAdd}
              >
                {added
                  ? "✓ Added to Cart"
                  : !canAdd
                    ? "Select a Size Above"
                    : "Add to Cart"}
              </button>
            )}

            {isClothing && !canAdd && product.inStock && (
              <p className="pp__hint">Please select a size to continue</p>
            )}
          </div>
        </div>
      </div>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Footer />
    </>
  );
}