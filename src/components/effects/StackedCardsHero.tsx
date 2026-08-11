'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MousePointerClick, Trophy, Crosshair, Target, Gamepad2 } from 'lucide-react';
import styles from './StackedCardsHero.module.css';

const initialCards = [
  {
    id: 'tournaments',
    title: 'لیگ قهرمانان تایتان',
    subtitle: 'رقابت برای جوایز میلیونی',
    bgColor: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)', // Gold/Amber
    baseColor: '#b45309',
    textColor: '#ffffff',
    icon: <Trophy size={32} opacity={0.8} />
  },
  {
    id: 'fortnite',
    title: 'فورتنایت (Fortnite)',
    subtitle: 'ویباکس، کرو پک و باندل‌های نایاب',
    bgColor: 'linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)', // Blue/Purple
    baseColor: '#8b5cf6',
    textColor: '#ffffff',
    icon: <Gamepad2 size={32} opacity={0.8} />
  },
  {
    id: 'cod',
    title: 'کالاف دیوتی (Warzone)',
    subtitle: 'شارژ فوری CP و بتل‌پس بلک‌سل',
    bgColor: 'linear-gradient(135deg, #4d7c0f 0%, #1a2e05 100%)', // Army Green
    baseColor: '#1a2e05',
    textColor: '#ffffff',
    icon: <Crosshair size={32} opacity={0.8} />
  },
  {
    id: 'other',
    title: 'ولورانت و بیشتر',
    subtitle: 'ولورانت پوینت، کوین اپکس',
    bgColor: 'linear-gradient(135deg, #ef4444 0%, #9f1239 100%)', // Red
    baseColor: '#9f1239',
    textColor: '#ffffff',
    icon: <Target size={32} opacity={0.8} />
  }
];

export default function StackedCardsHero() {
  const [cards, setCards] = React.useState(initialCards);
  const [isAnimating, setIsAnimating] = React.useState(false);

  // Force sync during hot reload if the content actually changes
  React.useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

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
                        <div className={styles.gameIcon}>
                          {card.icon}
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
