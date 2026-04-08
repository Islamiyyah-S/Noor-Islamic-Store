import { useNavigate } from "react-router-dom"
import Navbar from "../components/navbar"
import Footer from "../components/Footer/Footer"
import { useState } from "react"
import CartDrawer from "../components/CartDrawer/CartDrawer"
import "./AboutPage.css"

const values = [
  {
    number: "01",
    title: "Authenticity",
    text: "Every product we carry is sourced with intention. No filler, no shortcuts — only pieces that feel true to the faith and the culture.",
  },
  {
    number: "02",
    title: "Elegance",
    text: "We believe modesty and beauty are not opposites. Noor Store exists to prove that dressing with intention can also mean dressing beautifully.",
  },
  {
    number: "03",
    title: "Community",
    text: "We are not just a store. We are a gathering place for Muslims in Lagos and beyond who want their homes and wardrobes to reflect their values.",
  },
  {
    number: "04",
    title: "Trust",
    text: "From honest pricing to careful packaging — every touchpoint is designed to make you feel like you are buying from someone who genuinely cares.",
  },
]


export default function AboutPage() {
  const navigate = useNavigate()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <Navbar onCartClick={() => setCartOpen(true)} />

      <div className="ap">

        <div className="ap__hero">
          <div className="ap__hero-inner">
            <p className="ap__hero-label">✦ Our Story</p>
            <h1 className="ap__hero-title">
              Built on <em>light.</em>
              <br />Rooted in faith.
            </h1>
          </div>
          <div className="ap__hero-scroll">scroll ↓</div>
        </div>

        <div className="ap__mv">
          <div className="ap__mv-card ap__mv-card--dark">
            <span className="ap__mv-tag">Mission</span>
            <p className="ap__mv-text">
              To make beautiful, authentic Islamic products accessible to every
              Muslim home in Nigeria — without compromise on quality, ethics, or
              elegance.
            </p>
          </div>
          <div className="ap__mv-card ap__mv-card--light">
            <span className="ap__mv-tag">Vision</span>
            <p className="ap__mv-text">
              A world where Muslim identity is expressed with pride, confidence,
              and beauty — and Noor Store is the destination that makes that
              possible.
            </p>
          </div>
        </div>

        <div className="ap__values">
          <div className="ap__section-head">
            <div className="ap__section-line" />
            <p className="ap__section-label">What We Stand For</p>
          </div>
          <div className="ap__values-grid">
            {values.map((v) => (
              <div key={v.number} className="ap__value-card">
                <span className="ap__value-num">{v.number}</span>
                <h3 className="ap__value-title">{v.title}</h3>
                <p className="ap__value-text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>

        

        <div className="ap__cta">
          <h2 className="ap__cta-title">Ready to explore?</h2>
          <p className="ap__cta-sub">Browse our collections or get in touch — we would love to hear from you.</p>
          <div className="ap__cta-btns">
            <button className="ap__btn-dark" onClick={() => navigate("/collections/abayas")}>
              Shop Collections
            </button>
            <button className="ap__btn-outline" onClick={() => navigate("/contact")}>
              Contact Us
            </button>
          </div>
        </div>

      </div>

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}