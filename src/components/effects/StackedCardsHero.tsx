'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MousePointerClick, Wifi } from 'lucide-react';
import styles from './StackedCardsHero.module.css';

const initialCards = [
  {
    id: 'fortnite',
    title: 'فورتنایت',
    subtitle: 'Fortnite Player',
    bgColor: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)', // Blue
    baseColor: '#0ea5e9',
    textColor: '#ffffff',
    logoUrl: '/logos/fortnite.svg'
  },
  {
    id: 'apex',
    title: 'ایپکس لجندز',
    subtitle: 'Apex Player',
    bgColor: 'linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%)', // White/Light
    baseColor: '#e5e7eb',
    textColor: '#111827', // Black text
    logoUrl: '/logos/apex.svg'
  },
  {
    id: 'valorant',
    title: 'ولورانت',
    subtitle: 'Valorant Player',
    bgColor: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', // Red
    baseColor: '#b91c1c',
    textColor: '#ffffff',
    logoUrl: '/logos/valorant.svg'
  },
  {
    id: 'cod',
    title: 'کالاف دیوتی',
    subtitle: 'CoD Player',
    bgColor: 'linear-gradient(135deg, #27272a 0%, #18181b 100%)', // Dark Gray
    baseColor: '#18181b',
    textColor: '#ffffff',
    logoUrl: '/logos/cod.svg'
  }
];

export default function StackedCardsHero() {
  const [cards, setCards] = React.useState(initialCards);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Force sync during hot reload if the content actually changes
  React.useEffect(() => {
    setCards(initialCards);
  }, []);

  const moveToEnd = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCards((prev) => {
      const newCards = [...prev];
      const first = newCards.shift();
      if (first) newCards.push(first);
      return newCards;
    });
    // Prevent clicking too fast
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.contentWrapper}>

          {/* Right Side: Text Content (RTL) */}
          <div className={styles.textContent}>
            <h1 className={styles.mainTitle}>
              خرید <span className={styles.lightText}>آیتم‌های بازی</span> با <br />
              کارت‌های <span className={styles.lightText}>اختصاصی</span> <br />
              تایتان <ArrowLeft className={styles.arrowIcon} size={48} />
            </h1>

            <p className={styles.description}>
              طراحی اختصاصی کارت‌های گیمینگ خود را با تایتان در دست بگیرید - فقط کافیست بازی مورد علاقه خود را انتخاب کنید و وارد دنیای رقابت شوید.
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🎧</span>
                <span>پشتیبانی کاربری</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🛡️</span>
                <span>خرید امن و سریع</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>⚡</span>
                <span>تحویل آنی</span>
              </div>
            </div>
          </div>

          {/* Left Side: Stacked Cards */}
          <div className={styles.cardsSide}>
            {/* User Hint */}
            <motion.div
              className={styles.clickHint}
              animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <MousePointerClick size={20} />
              <span>برای تغییر کارت کلیک کنید</span>
            </motion.div>

            {/* Floating Container */}
            <motion.div
              className={styles.cardsContainer}
              onClick={moveToEnd}
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              {cards.map((card, index) => {
                const isFront = index === 0;

                return (
                  <motion.div
                    key={card.id}
                    className={styles.card}
                    animate={{
                      // Based on the image: stacked to the right, behind the front card
                      x: isFront ? -40 : index * 40 - 40,
                      y: isFront ? 0 : index * 15,
                      z: isFront ? 40 : index * -50,
                      rotateY: isFront ? 15 : 15,
                      rotateX: isFront ? 10 : 10,
                      rotateZ: isFront ? -5 : -5,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 120,
                      damping: 15,
                      mass: 1,
                    }}
                    style={{
                      cursor: isFront ? 'pointer' : 'default',
                      zIndex: cards.length - index,
                    }}
                  >
                    {/* 3D Thickness Layers */}
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={styles.volumeLayer}
                        style={{
                          transform: `translateZ(${-i}px)`,
                          backgroundColor: card.baseColor,
                          opacity: 1
                        }}
                      />
                    ))}

                    {/* Front Face Content */}
                    <div
                      className={styles.cardFront}
                      style={{ background: card.bgColor, color: card.textColor }}
                    >
                      <div className={styles.cardHeader}>
                        <div className={styles.chip}>
                          <div className={styles.chipLine}></div>
                          <div className={styles.chipLine}></div>
                          <div className={styles.chipLine}></div>
                          <div className={styles.chipLine}></div>
                        </div>
                        <Wifi className={styles.contactlessIcon} size={28} />
                      </div>

                      <div className={styles.logoContainer}>
                        <img
                          src={card.logoUrl}
                          alt={`${card.title} logo`}
                          className={styles.gameLogo}
                          onError={(e) => {
                            // fallback if image fails to load
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>

                      {/* Card Content Footer */}
                      <div className={styles.cardContent}>
                        <div>
                          <h3 className={styles.cardTitle}>{card.title}</h3>
                          <p className={styles.cardSubtitle}>{card.subtitle}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
