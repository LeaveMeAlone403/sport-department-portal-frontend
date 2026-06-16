import {useRef, useEffect, useState} from 'react';
import type {NewsSectionProps} from '../types';
import '../styles/NewsSection.scss';

export default function NewsSection({news}: NewsSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [expandedCards, setExpandedCards] = useState<(number | string)[]>([]);

  const tripledNews = [...news, ...news, ...news];

  useEffect(() => {
    if (sliderRef.current && news.length > 0) {
      const container = sliderRef.current;
      const firstCard = container.querySelector('.news-card');
      if (firstCard) {
        const cardWidth = firstCard.getBoundingClientRect().width;
        const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
        const oneSetWidth = news.length * (cardWidth + gap);
        container.scrollLeft = oneSetWidth;
      }
    }
  }, [news]);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current || news.length === 0) return;

    const container = sliderRef.current;
    const firstCard = container.querySelector('.news-card');
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
    const scrollAmount = cardWidth + gap;
    const oneSetWidth = news.length * scrollAmount;

    let currentScroll = container.scrollLeft;

    if (direction === 'right') {
      const rightBoundary = oneSetWidth * 2 - container.clientWidth;
      if (currentScroll >= rightBoundary) {
        const resetPosition = currentScroll - oneSetWidth;
        container.scrollTo({
          left: resetPosition, behavior: 'auto'}
        );
        currentScroll = resetPosition;
      }
      container.scrollTo({
        left: currentScroll + scrollAmount, behavior: 'smooth'}
      );
    } else {
      const leftBoundary = oneSetWidth;
      if (currentScroll <= leftBoundary) {
        const resetPosition = currentScroll + oneSetWidth;
        container.scrollTo({
          left: resetPosition, behavior: 'auto'}
        );
        currentScroll = resetPosition;
      }
      container.scrollTo({
        left: currentScroll - scrollAmount, behavior: 'smooth'}
      );
    }
  };

  const toggleExpand = (id: number | string) => {
    setExpandedCards(prev =>
      prev.includes(id) ?
        prev.filter(cardId => cardId !== id) : [...prev, id]
    );
  };

  return (
    <section id="news" className="section bg-light">
      <div className="container">
        <h2 className="section-title">Останні новини порталу</h2>
        {news.length === 0 ? (
          <p>Немає новин для відображення.</p>
        ) : (
          <div className="slider-wrapper">
            <button
              className="arrow-btn left"
              onClick={() => scroll('left')}
              aria-label="Попередня новина"
            >
              &#8249;
            </button>

            <div className="news-scroll-container" ref={sliderRef}>
              {tripledNews.map((item, index) => {
                const isExpanded = expandedCards.includes(item.id);

                return (
                  <article key={`${item.id}-${index}`} className="news-card">
                    <div className="news-img-wrapper">
                      <img src={item.imageUrl} alt={item.title}
                           loading="lazy"/>
                    </div>
                    <div className="news-content">
                      <h3 className="news-title">{item.title}</h3>
                      <p className={
                        `news-excerpt ${isExpanded ? 'expanded' : ''}`
                      }>
                        {item.content}
                      </p>
                      <button
                        className="read-more-btn"
                        onClick={() => toggleExpand(item.id)}
                      >
                        {isExpanded ? 'Згорнути' : 'Читати далі'}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              className="arrow-btn right"
              onClick={() => scroll('right')}
              aria-label="Наступна новина"
            >
              &#8250;
            </button>
          </div>
        )}
      </div>
    </section>
  );
}