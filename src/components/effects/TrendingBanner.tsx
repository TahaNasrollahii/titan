'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import styles from './TrendingBanner.module.css';

interface Slide {
  id: string;
  tag: string;
  title: React.ReactNode;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
  bgColor: string;
}

interface TrendingBannerProps {
  slides?: Slide[];
}

const defaultSlides: Slide[] = [
  {
    id: '1',
    tag: '#ترند',
    title: 'تماشای استریم بازی‌ها، هر زمان، هر مکان',
    subtitle: 'قهرمان خود را در رقابت‌های تایتان همراهی کنید',
    buttonText: 'تماشا کنید',
    buttonLink: '#',
    image: '/images/banner_characters.png', // Or another appropriate image
    bgColor: '#ff5470',
  },
  {
    id: '2',
    tag: '#آپدیت جدید',
    title: 'تجربه نهایی در میدان نبرد گیمینگ',
    subtitle: 'به تورنمنت‌ها بپیوندید و هر روز جوایز بی‌نظیر ببرید',
    buttonText: 'ورود به آرنا',
    buttonLink: '/tournaments',
    image: '/images/banner_characters.png',
    bgColor: '#8b5cf6',
  },
  {
    id: '3',
    tag: '#فروشگاه',
    title: 'با بهترین تجهیزات وارد میدان شوید',
    subtitle: 'همین حالا برای پیشنهادات ویژه محصولات دیجیتال خرید کنید',
    buttonText: 'خرید از فروشگاه',
    buttonLink: '/store',
    image: '/images/banner_characters.png',
    bgColor: '#3b82f6',
  }
];

export default function TrendingBanner({ slides = defaultSlides }: TrendingBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className={styles.bannerWrapper}>
      <div className="container">
        <div className={styles.bannerContainer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={styles.bannerSlide}
              style={{ backgroundColor: slides[currentSlide].bgColor }}
            >
              <div className={styles.backgroundGlow} />
              
              <div className={styles.contentBox}>
                <motion.span 
                  className={styles.tag}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  style={{ color: slides[currentSlide].bgColor }}
                >
                  {slides[currentSlide].tag}
                </motion.span>
                <motion.h1 
                  className={styles.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p 
                  className={styles.subtitle}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link href={slides[currentSlide].buttonLink} className={styles.button} style={{ color: slides[currentSlide].bgColor }}>
                    {slides[currentSlide].buttonText}
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                className={styles.imageBox}
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                <img src={slides[currentSlide].image} alt="Banner graphic" className={styles.image} />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.pagination}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
