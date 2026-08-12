'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MousePointerClick, Zap } from 'lucide-react';
import styles from './StackedCardsHero.module.css';

const initialBanners = [
  {
    id: 'fortnite',
    title: 'فورتنایت',
    subtitle: 'شروع یک نبرد حماسی',
    accentColor: '#0ea5e9',
    logoUrl: '/logos/fortnite.svg',
    tag: 'Battle Royale'
  },
  {
    id: 'apex',
    title: 'ایپکس لجندز',
    subtitle: 'قهرمان خودت باش',
    accentColor: '#ef4444',
    logoUrl: '/logos/apex.svg',
    tag: 'Hero Shooter'
  },
  {
    id: 'valorant',
    title: 'ولورانت',
    subtitle: 'دقت، استراتژی، پیروزی',
    accentColor: '#dc2626',
    logoUrl: '/logos/valorant.svg',
    tag: 'Tactical'
  },
  {
    id: 'cod',
    title: 'کالاف دیوتی',
    subtitle: 'تاریکی در انتظار شماست',
    accentColor: '#fbbf24',
    logoUrl: '/logos/cod.svg',
    tag: 'Action'
  }
];

export default function StackedCardsHero() {
  const [banners, setBanners] = useState(initialBanners);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setBanners(initialBanners);
  }, []);

  const moveToEnd = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setBanners((prev) => {
      const newBanners = [...prev];
      const first = newBanners.shift();
      if (first) newBanners.push(first);
      return newBanners;
    });
    setTimeout(() => setIsAnimating(false), 800);
  };

  return (
    <section className={styles.heroSection}>
      <div className="container">
        <div className={styles.contentWrapper}>

          {/* Right Side: Text Content */}
          <div className={styles.textContent}>
            <h1 className={styles.mainTitle}>
              خرید <span className={styles.lightText}>آیتم‌های بازی</span> <br />
              با کارت‌های <span className={styles.lightText}>تایتان</span> <br />
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

          {/* Left Side: 3D Glass Banners */}
          <div className={styles.cardsSide}>
            <motion.div
              className={styles.clickHint}
              animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <MousePointerClick size={20} />
              <span>برای دیدن بنر بعدی کلیک کنید</span>
            </motion.div>

            <div className={styles.cardsContainer} onClick={moveToEnd}>
              <AnimatePresence mode="popLayout">
                {banners.map((banner, index) => {
                  const isFront = index === 0;

                  // Base 3D Position
                  let z = -index * 100;
                  let y = index * -40;
                  let x = index * -50;
                  let rotateX = 10 + index * 5;
                  let rotateY = -15 + index * -5;
                  let rotateZ = index * -2;
                  let opacity = 1 - (index * 0.25);
                  let blur = index * 2;

                  // Enhance the front card
                  if (isFront) {
                    z = 80;
                    y = 0;
                    x = 0;
                    rotateX = 5;
                    rotateY = -20;
                    rotateZ = 0;
                  }

                  return (
                    <motion.div
                      key={banner.id}
                      className={styles.bannerCard}
                      animate={{
                        z,
                        y,
                        x,
                        rotateX,
                        rotateY,
                        rotateZ,
                        opacity: index > 3 ? 0 : opacity,
                        filter: `blur(${blur}px)`,
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 90,
                        damping: 14,
                        mass: 1.2,
                      }}
                      style={{
                        zIndex: banners.length - index,
                      }}
                    >
                      {/* Floating animation for the active card */}
                      <motion.div
                        className={styles.preserve3dWrapper}
                        animate={isFront ? { y: [-8, 8, -8] } : { y: 0 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                      >
                        <div className={styles.glassBg}>
                          <div
                            className={styles.glowOrb}
                            style={{ backgroundColor: banner.accentColor }}
                          />
                          <div
                            className={styles.glowOrbSecondary}
                            style={{ backgroundColor: banner.accentColor }}
                          />
                        </div>

                        <div className={styles.bannerContent}>
                          <div className={styles.bannerHeader}>
                            <img
                              src={banner.logoUrl}
                              alt={banner.title}
                              className={styles.gameLogo}
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                            <div className={styles.tagBadge}>
                              <Zap size={14} color={banner.accentColor} />
                              <span style={{ color: '#fff' }}>{banner.tag}</span>
                            </div>
                          </div>

                          <div className={styles.bannerFooter}>
                            <h3 className={styles.bannerTitle}>{banner.title}</h3>
                            <p className={styles.bannerSubtitle}>{banner.subtitle}</p>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
