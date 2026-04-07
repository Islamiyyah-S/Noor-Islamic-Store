import "./About.css"
import { useNavigate } from "react-router-dom"

const stats = [
  { number: "500+", label: "Curated Products" },
  { number: "12K+", label: "Happy Customers" },
  { number: "6", label: "Collections" },
]

export default function About() {
  const navigate = useNavigate()
  return (
    <section className="about-editorial" id="about">
      <div className="about-shell">
        {/* Top Intro */}
        <div className="about-top">
          <div className="about-label">
            <div className="about-label-line" />
            <span className="about-label-text">Our Story</span>
          </div>

          <h2 className="about-title">
            Bringing <em>Light</em> into
            <br />
            everyday Muslim living
          </h2>
        </div>

        {/* Editorial Grid */}
        <div className="about-grid">
          {/* Left Text Block */}
          <div className="about-copy about-copy-one">
            <p>
              Noor Store was born from a simple belief that every Muslim home
              deserves beautiful, authentic pieces that reflect both faith and
              elegance.
            </p>

            <p>
              What began with a small collection of abayas slowly grew
              into something more meaningful.
            </p>
              <div className="about-bottom">
        <button className="about-btn-dark" onClick={() => {
  navigate("/")
  setTimeout(() => {
    document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" })
  }, 100)
}}>
  Our Collections
</button>
          <button className="about-btn-outline">Contact Us</button>
        </div>
          </div>

          {/* Main Image */}
          <div className="about-image-wrap">
            <img
              src="src/components/About/about.jpg"
              alt="Noor Store"
              className="about-image"
            />

         
            
          </div>

          {/* Right Text + Stats */}
          <div className="about-side-panel">
            <p className="about-side-text">
              Today, we curate hundreds of products across carefully chosen
              collections from premium Qurans and modest fashion to Oud
              perfumes and meaningful gift boxes.
            </p>

            <div className="about-stats">
              {stats.map((stat, i) => (
                <div key={i} className="about-stat">
                  <span className="about-stat-number">{stat.number}</span>
                  <span className="about-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
      
      </div>
    </section>
  )
}