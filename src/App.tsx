import { useState, useEffect } from 'react';
import { api } from './api/apiClient';
import type { NewsItem, GalleryItem } from './types';

import Header from './components/Header';
import Slider from './components/Slider';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import NewsSection from './components/NewsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import './styles/global.scss'

export default function App() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const [fetchedNews, fetchedGallery] = await Promise.all([
          api.getNews(),
          api.getGallery()
        ]);
        setNews(fetchedNews);
        setGallery(fetchedGallery);
      } catch (error) {
        console.error("Помилка ініціалізації", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  //Скрол
  useEffect(() => {
    if (isLoading) return;

    const sections = document.querySelectorAll('main section[id]');

    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          window.history.replaceState(null, '', `#${id}`);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [isLoading]);

  if (isLoading) {
    return <div className="global-loader">Завантаження порталу...</div>;
  }

  return (
      <div className="app-wrapper">
        <Header />
        <main>
          {}
          <section id="home"><Slider news={news} /></section>
          <section id="about"><AboutSection /></section>
          <section id="gallery"><GallerySection gallery={gallery} /></section>
          <section id="news"><NewsSection news={news} /></section>
          <section id="contacts"><ContactSection /></section>
        </main>
        <Footer />
      </div>
  );
}