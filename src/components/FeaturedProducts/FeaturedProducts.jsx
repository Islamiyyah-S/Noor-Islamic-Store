import data from "../../data/Products.json";
import "./FeaturedProducts.css";
import { useCart } from "../../Context/CartContext";

export default function FeaturedProducts() {
  const { addToCart } = useCart();

  const products = data.collections.map((c) => {
    const pick =
      c.products.find((p) => p.badge === "Bestseller") || c.products[0];
    return { ...pick, collection: c.name };
  });

  return (
    <section className="fp-section">
      <div className="fp-header">
        <div>
          <div className="fp-label">
            <div className="fp-label-line" />
            <span className="fp-label-text">Featured Product</span>
          </div>
          <h2 className="fp-title">From Every Collection</h2>
        </div>
        <a href="/shop" className="fp-view-all">
          Shop All →
        </a>
      </div>

      <div className="fp-grid">
        {products.map((product) => (
          <div key={product.id} className="fp-card">
            <div className="fp-card-img-wrap">
              <img
                src={product.image}
                alt={product.name}
                className="fp-card-img"
              />

              {product.badge && (
                <span
                  className={`fp-badge fp-badge-${product.badge.toLowerCase()}`}
                >
                  {product.badge}
                </span>
              )}

              {!product.inStock && (
                <div className="fp-out-of-stock">Out of Stock</div>
              )}

              <div className="fp-card-actions">
                <button
                  className="fp-add-btn"
                  disabled={!product.inStock}
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="fp-card-info">
              <span className="fp-card-collection">{product.collection}</span>
              <span className="fp-card-name">{product.name}</span>
              <div className="fp-card-price">
                <span className="fp-price">
                  ₦{product.price.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <span className="fp-old-price">
                    ₦{product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}