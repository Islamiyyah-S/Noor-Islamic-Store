import { useState, useEffect } from "react";
import { useCart } from "../../Context/CartContext";
import "./CartDrawer.css";
import { QRCodeSVG } from "qrcode.react"

const WHATSAPP_NUMBER = "2348138685160"; 
const SHIPPING_FEE = 3500;
const VAT_RATE = 0.075; // 7.5%

function generateOrderNumber() {
  return "NS-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function buildWhatsAppMessage(orderNumber, cartItems, subtotal, shipping, vat, total) {
  const itemLines = cartItems
    .map((item) => {
      const variants = [item.selectedSize, item.selectedScent]
        .filter(Boolean)
        .join(", ");
      return `• ${item.name}${variants ? ` (${variants})` : ""} × ${item.quantity} — ₦${(item.price * item.quantity).toLocaleString()}`;
    })
    .join("\n");

  return `Hello Noor Store! 

*Order #${orderNumber}*

${itemLines}

━━━━━━━━━━━━━━━
Subtotal:  ₦${subtotal.toLocaleString()}
Shipping:  ₦${shipping.toLocaleString()}
VAT (7.5%): ₦${vat.toLocaleString()}
*Total:    ₦${total.toLocaleString()}*
━━━━━━━━━━━━━━━

Please confirm my order. Thank you!`;
}

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [orderNumber] = useState(() => generateOrderNumber());
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  const subtotal = totalPrice;
  const vat = Math.round(subtotal * VAT_RATE);
  const total = subtotal + SHIPPING_FEE + vat;

  const message = buildWhatsAppMessage(
    orderNumber,
    cartItems,
    subtotal,
    SHIPPING_FEE,
    vat,
    total
  );

  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleCheckout = () => setCheckout(true);
  const handleBack = () => setCheckout(false);

  return (
    <>
      <div
        className={`cart-backdrop ${isOpen ? "cart-backdrop-open" : ""}`}
        onClick={() => { onClose(); setCheckout(false); }}
      />

      <div className={`cart-drawer ${isOpen ? "cart-drawer-open" : ""}`}>

        {!checkout ? (
          <>
            {/* ── CART VIEW ── */}
            <div className="cart-header">
              <h2 className="cart-title">Your Cart</h2>
              <button className="cart-close" onClick={onClose}>✕</button>
            </div>

            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <p className="cart-empty-text">Your cart is empty</p>
                  <button className="cart-empty-btn" onClick={onClose}>
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-img-wrap">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                    </div>

                    <div className="cart-item-info">
                      <span className="cart-item-name">{item.name}</span>
                      {(item.selectedSize || item.selectedColor || item.selectedScent) && (
                        <p className="cart-item__variants">
                          {item.selectedSize && <span>{item.selectedSize}</span>}
                          {item.selectedScent && <span>{item.selectedScent}</span>}
                        </p>
                      )}
                      <span className="cart-item-price">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                      <div className="cart-item-qty">
                        <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, -1)}>−</button>
                        <span className="cart-qty-num">{item.quantity}</span>
                        <button className="cart-qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>

                    <button className="cart-item-remove" onClick={() => removeFromCart(item.id)}>✕</button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span className="cart-total-label">Total</span>
                  <span className="cart-total-price">₦{totalPrice.toLocaleString()}</span>
                </div>
                <button className="cart-checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
                <button className="cart-continue-btn" onClick={onClose}>
                  Continue Shopping
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            {/* ── CHECKOUT VIEW ── */}
            <div className="cart-header">
              <button className="cart-back-btn" onClick={handleBack}>← Back</button>
              <h2 className="cart-title">Checkout</h2>
              <button className="cart-close" onClick={() => { onClose(); setCheckout(false); }}>✕</button>
            </div>

            <div className="cart-items co-summary">
              {/* Order number */}
              <div className="co-order-num">
                <span className="co-label">Order</span>
                <span className="co-value">#{orderNumber}</span>
              </div>

              <div className="co-divider" />

              {/* Items */}
              {cartItems.map((item) => (
                <div key={item.id} className="co-item">
                  <div className="co-item-left">
                    <img src={item.image} alt={item.name} className="co-item-img" />
                    <div className="co-item-info">
                      <span className="co-item-name">{item.name}</span>
                      {item.selectedSize && (
                        <span className="co-item-variant">Size: {item.selectedSize}</span>
                      )}
                      {item.selectedScent && (
                        <span className="co-item-variant">Scent: {item.selectedScent}</span>
                      )}
                      <span className="co-item-qty">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="co-item-price">₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}

              <div className="co-divider" />

              {/* Pricing breakdown */}
              <div className="co-breakdown">
                <div className="co-row">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="co-row">
                  <span>Shipping</span>
                  <span>₦{SHIPPING_FEE.toLocaleString()}</span>
                </div>
                <div className="co-row">
                  <span>VAT (7.5%)</span>
                  <span>₦{vat.toLocaleString()}</span>
                </div>
                <div className="co-divider" />
                <div className="co-row co-row--total">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="co-divider" />

              {/* WhatsApp section */}
              <div className="co-whatsapp">
                <p className="co-wa-label">Complete your order on WhatsApp</p>

                {mobile ? (
                  /* Mobile — direct link */
                  <a
                    href={whatsappURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="co-wa-btn"
                  >
                    <svg viewBox="0 0 24 24" className="co-wa-icon" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Send Order on WhatsApp
                  </a>
                ) : (
                  /* Desktop — QR code */
                  <div className="co-qr-wrap">
                    <p className="co-qr-hint">Scan with your phone to open WhatsApp</p>
                    <div className="co-qr-box">
                      <QRCodeSVG
                        value={whatsappURL}
                        size={180}
                        bgColor="#ffffff"
                        fgColor="#1A1A1A"
                        level="M"
                      />
                    </div>
                    <p className="co-qr-sub">Opens WhatsApp with your order details pre-filled</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}