import {useState, useEffect} from 'react';
import type {SliderProps} from '../types';
import '../styles/Slider.scss'

export default function Slider({news}: SliderProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) %
        Math.min(3, news.length));
    }, 5000);
    return () => clearInterval(interval);
  }, [news]);

  if (news.length === 0) {
    return <div className="slider-placeholder">
      Завантаження слайдера...
    </div>;
  }

  const activeNews = news[currentSlide];

  return (
    <section className="slider-section">
      <div
        className="slide"
        style={{backgroundImage: `url(${activeNews?.imageUrl})`}}
      >
        <div className="slide-overlay">
          <div className="container">
            <h2 className="slide-title">{activeNews?.title}</h2>
            <p className="slide-desc">{activeNews?.content
              .substring(0, 100)}...</p>
            <a href="#news" className="btn-primary">
              Дізнатися більше
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}