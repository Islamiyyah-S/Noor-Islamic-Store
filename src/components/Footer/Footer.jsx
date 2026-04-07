import "./Footer.css"
import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <p className="footer__logo">NOOR <span>STORE</span></p>
          <p className="footer__tagline">Dress your life with Noor.</p>
          <div className="footer__socials">
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaWhatsapp /></a>
            <a href="#"><FaTiktok /></a>
          </div>
        </div>

        <div className="footer__col">
          <p className="footer__col-title">Shop</p>
          <a href="#">Abayas</a>
          <a href="#">Thobes</a>
          <a href="#">Hijabs & Scarves</a>
          <a href="#">Perfumes & Oils</a>
          <a href="#">Gift Boxes</a>
        </div>

        <div className="footer__col">
          <p className="footer__col-title">Help</p>
          <a href="#">About</a>
          <a href="#">Size Guide</a>
          <a href="#">Contact Us</a>
        </div>

        <div className="footer__col">
          <p className="footer__col-title">Newsletter</p>
          <p className="footer__newsletter-text">Get new arrivals and exclusive offers.</p>
          <div className="footer__newsletter">
            <input type="email" placeholder="Your email" />
            <button>→</button>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© 2025 Noor Store. All rights reserved.</p>
      </div>
    </footer>
  )
}