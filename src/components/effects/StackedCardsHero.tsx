'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MousePointerClick } from 'lucide-react';
import styles from './StackedCardsHero.module.css';

const initialCards = [
  {
    id: 'tournaments',
    title: 'لیگ قهرمانان تایتان',
    subtitle: 'رقابت برای جوایز میلیونی',
    bgColor: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)', // Gold/Amber for tournaments
    baseColor: '#b45309',
    textColor: '#ffffff',
  },
  {
    id: 'fortnite',
    title: 'فورتنایت (Fortnite)',
    subtitle: 'ویباکس، کرو پک و باندل‌های نایاب',
    bgColor: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)', // Blue/Purple for Fortnite
    baseColor: '#8b5cf6',
    textColor: '#ffffff',
  },
  {
    id: 'cod',
    title: 'کالاف دیوتی (Warzone)',
    subtitle: 'شارژ فوری CP و بتل‌پس بلک‌سل',
    bgColor: 'linear-gradient(135deg, #4d7c0f 0%, #1a2e05 100%)', // Army Green for CoD
    baseColor: '#1a2e05',
    textColor: '#ffffff',
  },
  {
    id: 'other',
    title: 'ولورانت و بیشتر',
    subtitle: 'ولورانت پوینت، کوین اپکس',
    bgColor: 'linear-gradient(135deg, #ef4444 0%, #9f1239 100%)', // Red for Valorant/Apex
    baseColor: '#9f1239',
    textColor: '#ffffff',
  }
];

export default function StackedCardsHero() {
  const [cards, setCards] = useState(initialCards);
  const [isAnimating, setIsAnimating] = useState(false);

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
              <span className={styles.lightText}>با تایتان</span> وارد دنیای<br/>
              <span className={styles.lightText}>تورنمنت‌ها</span> و<br/>
              آیتم‌های بازی شوید <ArrowLeft className={styles.arrowIcon} size={48} />
            </h1>
            
            <p className={styles.description}>
              پلتفرم جامع گیمینگ تایتان به شما اجازه می‌دهد در مسابقات حرفه‌ای رقابت کنید، و با خرید سریع آیتم‌های مختلف، همیشه یک قدم جلوتر از رقبا باشید.
            </p>

            <div className={styles.features}>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🎮</span>
                <span>مسابقات حرفه‌ای</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>⚡</span>
                <span>تحویل آنی آیتم‌ها</span>
              </div>
              <div className={styles.featureItem}>
                <span className={styles.featureIcon}>🛡️</span>
                <span>پلتفرم امن و مطمئن</span>
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
              animate={{ y: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              {cards.map((card, index) => {
                const isFront = index === 0;
                
                return (
                  <motion.div
                    key={card.id}
                    className={styles.card}
                    animate={{
                      // When it moves back, it swings out and goes behind
                      x: isFront ? 0 : index * -50,
                      y: isFront ? 0 : index * -30,
                      z: isFront ? 40 : index * -60,
                      rotateY: isFront ? 0 : index * 12,
                      rotateX: isFront ? 5 : 15,
                      rotateZ: isFront ? 0 : index * -3,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 18,
                      mass: 1.2,
                    }}
                    style={{
                      cursor: isFront ? 'pointer' : 'default',
                      zIndex: cards.length - index,
                    }}
                  >
                    {/* 3D Thickness Layers */}
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className={styles.volumeLayer} 
                        style={{ 
                          transform: `translateZ(${-i}px)`,
                          backgroundColor: i === 11 ? '#111' : card.baseColor,
                          opacity: i === 11 ? 0.5 : 1
                        }} 
                      />
                    ))}

                    {/* Front Face Content */}
                    <div 
                      className={styles.cardFront}
                      style={{ background: card.bgColor, color: card.textColor }}
                    >
                      {/* Card Chip Icon */}
                      <div className={styles.chip}>
                        <div className={styles.chipLine}></div>
                        <div className={styles.chipLine}></div>
                        <div className={styles.chipLine}></div>
                      </div>
                      
                      {/* Card Content */}
                      <div className={styles.cardContent}>
                        <div>
                          <h3 className={styles.cardTitle}>{card.title}</h3>
                          <p className={styles.cardSubtitle}>{card.subtitle}</p>
                        </div>
                        {/* Fake Contactless Icon */}
                        <div className={styles.contactless}>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" fill="currentColor" fillOpacity="0.2"/>
                            <path d="M8.5 15.5C9.88071 16.8807 11.5 17.5 13 17.5C14.5 17.5 16.1193 16.8807 17.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M10 12.5C10.9204 13.4204 12 13.8333 13 13.8333C14 13.8333 15.0796 13.4204 16 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M11.5 9.5C11.9602 9.9602 12.5 10.1667 13 10.1667C13.5 10.1667 14.0398 9.9602 14.5 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
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
