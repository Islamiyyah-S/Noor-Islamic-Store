import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "./Hero.css";

const slides = [
  {
    type: "video",
    src: "public/Videos/Hero-vid.mp4",
  },
  {
    type: "video",
    src: "public/Videos/Hero-vid2.mp4",
  },
];

export default function Hero() {
  const videoRefs = useRef([]);

  const handleSlideChange = (swiper) => {
    const index = swiper.realIndex;
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === index) {
        vid.currentTime = 0;
        vid.play();
      } else {
        vid.pause();
      }
    });
  };

  return (
    <section className="hero-section">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop={true}
        speed={1500}
        onSlideChange={handleSlideChange}
        className="hero-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {slide.type === "video" ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={slide.src}
                poster={slide.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="hero-media"
              />
            ) : (
              <img src={slide.src} alt="" className="hero-media" />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-overlay" />

      <div className="hero-content-wrapper">
        <div className="hero-content">
          <div className="hero-tag">
            <div className="hero-tag-line" />
            <span className="hero-tag-text">Est. 2024 · Ogun, Nigeria</span>
          </div>

          <h1 className="hero-title">
            Dress Your Life
            <br />
            With
            <span className="hero-title-gold"> Noor</span>
          </h1>

          <p className="hero-subtitle">
            Abayas,Thobes, Qurans, Perfumes & Home Decor. Everything a Muslim
            home deserves, in one beautiful place.
          </p>

          <div className="hero-buttons">
            <button className="hero-btn-gold">Explore Collections</button>
            <button className="hero-btn-outline">Our Story</button>
          </div>
        </div>
      </div>
    </section>
  );
}
