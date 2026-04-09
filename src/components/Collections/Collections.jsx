import { useNavigate } from "react-router-dom"
import "./Collections.css"

const collections = [
  { id: 1, name: "Abayas", count: "42 pieces", image: "/Images/Collections/abaya.jpg", slug: "abayas" },
  { id: 2, name: "Thobes", count: "28 items", image: "/Images/Collections/thobes.jpg", slug: "thobes" },
  { id: 3, name: "Hijabs & Scarves", count: "19 items", image: "/Images/Collections/hijabs.jpg", slug: "hijabs-scarves" },
  { id: 4, name: "Books & Qurans", count: "35 items", image: "/Images/Collections/qurans.jpg", slug: "quran-books" },
  { id: 5, name: "Perfumes & Oils", count: "24 items", image: "/Images/Collections/perfumes.jpg", slug: "perfumes" },
  { id: 6, name: "Gift Box", count: "17 items", image: "/Images/Collections/giftbox.jpg", slug: "gift-boxes" },
]

export default function Collections() {
  const navigate = useNavigate()

  return (
    <section className="collections-section"  id="collections">

      <div className="collections-header">
        <div>
          <div className="collections-label">
            <div className="collections-label-line" />
            <span className="collections-label-text">Browse By</span>
          </div>
          <h2 className="collections-title">Our Collections</h2>
        </div>
        <a href="#" className="collections-view-all"> →</a>
      </div>

      <div className="collections-grid">
        {collections.map((col) => (
          <div key={col.id} className="col-card" onClick={() => navigate(`/collections/${col.slug}`)}>
            <div className="col-card-img-wrap">
              <img src={col.image} alt={col.name} className="col-card-img" />
              <div className="col-card-overlay" />
            <div className="col-card-info">
              <span className="col-card-name">{col.name}</span>
              <span className="col-card-count">{col.count}</span>
            </div>
              <div className="col-card-hover-btn" onClick={(e) => { e.stopPropagation(); navigate(`/collections/${col.slug}`) }}>
                Shop Now
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  )
}