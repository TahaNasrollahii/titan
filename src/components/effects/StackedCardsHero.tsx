'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';
import styles from './StackedCardsHero.module.css';

const baseCards = [
  {
    id: 'fortnite',
    title: 'فورتنایت',
    subtitle: 'Fortnite Player',
    accentColor: '#0ea5e9',
    logoUrl: '/logos/fortnite.svg',
    tag: 'Battle Royale'
  },
  {
    id: 'apex',
    title: 'ایپکس لجندز',
    subtitle: 'Apex Player',
    accentColor: '#dc2626',
    logoUrl: '/logos/apex.svg',
    tag: 'Hero Shooter'
  },
  {
    id: 'valorant',
    title: 'ولورانت',
    subtitle: 'Valorant Player',
    accentColor: '#ef4444',
    logoUrl: '/logos/valorant.svg',
    tag: 'Tactical'
  },
  {
    id: 'cod',
    title: 'کالاف دیوتی',
    subtitle: 'CoD Player',
    accentColor: '#fbbf24',
    logoUrl: '/logos/cod.svg',
    tag: 'Action'
  }
];

const cards = [...baseCards, ...baseCards.map(c => ({ ...c, id: c.id + '_copy' }))];

export default function StackedCardsHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleCardClick = (offset: number) => {
    if (offset !== 0) {
      setCurrentIndex((prev) => {
        let next = prev + offset;
        while (next < 0) next += cards.length;
        return next % cards.length;
      });
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.contentWrapper}>

          <div className={styles.textContent}>
            <h1 className={styles.mainTitle}>
              خرید <span className={styles.lightText}>آیتم‌های بازی</span> <br />
              با کارت‌های <span className={styles.lightText}>تایتان</span> <ArrowLeft className={styles.arrowIcon} size={48} />
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

          <div className={styles.cardsSide}>

            {/* Glassy Click Hint */}
            <motion.div
              className={styles.clickHintBadge}
              animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <span className={styles.hintText}>برای تغییر کلیک کنید</span>
              <motion.div
                className={styles.hintPulse}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </motion.div>

            {/* Cosmic Eruption Beams Removed */}

            <motion.div
              className={styles.cardsContainer}
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              {cards.map((card, i) => {
                let offset = i - currentIndex;
                const length = cards.length;

                while (offset > length / 2) offset -= length;
                while (offset < -length / 2) offset += length;

                const absOffset = Math.abs(offset);
                const isActive = absOffset === 0;

                let y = 0;
                let scale = 1;
                let blur = 0;
                let opacity = 1;
                let zIndex = 10;

                if (absOffset === 0) {
                  y = 0;
                  scale = 1;
                  blur = 0;
                  opacity = 1;
                  zIndex = 10;
                } else if (absOffset === 1) {
                  y = offset * 160;
                  scale = 0.85;
                  blur = 5;
                  opacity = 0.6;
                  zIndex = 5;
                } else {
                  y = offset * 240;
                  scale = 0.6;
                  blur = 10;
                  opacity = 0;
                  zIndex = 0;
                }

                const rotateX = offset * -8; // slight tilt for top/bottom

                return (
                  <motion.div
                    key={card.id}
                    className={styles.bannerCard}
                    onClick={() => handleCardClick(offset)}
                    animate={{
                      y,
                      scale,
                      opacity,
                      filter: `blur(${blur}px)`,
                      rotateX,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 90,
                      damping: 18,
                      mass: 1.2,
                    }}
                    style={{
                      zIndex,
                      cursor: isActive ? 'default' : 'pointer',
                      pointerEvents: opacity === 0 ? 'none' : 'auto',
                    }}
                  >
                    <motion.div className={styles.preserve3dWrapper}>
                      <div className={styles.glassBg}>
                        {/* Removed glow orbs per user request */}
                      </div>

                      <div className={styles.bannerContent}>
                        <div className={styles.bannerHeader}>
                          <img
                            src={card.logoUrl}
                            alt={card.title}
                            className={styles.gameLogo}
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div className={styles.tagBadge}>
                            <Zap size={14} color={card.accentColor} />
                            <span style={{ color: '#fff' }}>{card.tag}</span>
                          </div>
                        </div>

                        <div className={styles.bannerFooter}>
                          <h3 className={styles.bannerTitle}>{card.title}</h3>
                          <p className={styles.bannerSubtitle}>{card.subtitle}</p>
                        </div>
                      </div>
                    </motion.div>
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
