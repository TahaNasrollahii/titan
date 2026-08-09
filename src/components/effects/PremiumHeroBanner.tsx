'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { ShoppingBag, Trophy, ArrowLeft, Swords, CreditCard, Gamepad2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './PremiumHeroBanner.module.css';

const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };

interface TiltCardProps {
  children: React.ReactNode;
  href: string;
  className: string;
  glowColor: string;
}

function TiltCard({ children, href, className, glowColor }: TiltCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Rotate based on mouse position relative to center of card
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  // Spotlight follows mouse
  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { damping: 40, stiffness: 200 });
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { damping: 40, stiffness: 200 });

  const background = useMotionTemplate`radial-gradient(circle at ${spotlightX}% ${spotlightY}%, ${glowColor} 0%, transparent 60%)`;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize between -0.5 and 0.5
    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${styles.bannerCard} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
      }}
    >
      <div className={styles.gridBg} />
      
      {/* Glow layers */}
      <motion.div className={styles.spotlight} style={{ background }} />
      <motion.div className={styles.borderSpotlight} style={{ background }} />
      
      {children}
    </motion.a>
  );
}

export default function PremiumHeroBanner() {
  return (
    <section className={styles.hero}>
      <div className={styles.bannerContainer}>
        {/* SHOP BANNER (Primary) */}
        <TiltCard href="/store" className={styles.shopCard} glowColor="rgba(0, 212, 255, 0.2)">
        {/* Floating Graphics specific to Shop */}
        <div className={styles.floatingGraphics}>
          <motion.div 
            className={`${styles.floatingCard} ${styles.cardShop1}`}
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            <CreditCard size={40} />
          </motion.div>
          <motion.div 
            className={`${styles.floatingCard} ${styles.cardShop2}`}
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
          >
            <Gamepad2 size={30} />
          </motion.div>
          <motion.div 
            className={`${styles.floatingCard} ${styles.cardShop3}`}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
          >
            <ShoppingBag size={24} />
          </motion.div>
        </div>

        <div className={styles.content}>
          <span className={`${styles.badge} ${styles.badgeShop}`}>تایتان آیتم</span>
          <h1 className={`${styles.title} ${styles.titleShop}`}>تجهیز شو.<br/>پیروز شو.</h1>
          <p className={`${styles.subtitle} ${styles.subtitleShop}`}>
            بزرگترین مرجع خرید آیتم‌های گیمینگ، گیفت کارت و پول بازی‌ها با تحویل آنی.
          </p>
          <div className={styles.btnWrapper}>
            <Button size="lg" variant="primary" glow icon={<ArrowLeft size={20} />} iconPosition="end">
              ورود به فروشگاه
            </Button>
          </div>
        </div>
      </TiltCard>

      {/* TOURNAMENT BANNER (Secondary) */}
      <TiltCard href="/tournaments" className={styles.tournamentCard} glowColor="rgba(139, 92, 246, 0.2)">
        {/* Floating Graphics specific to Tournament */}
        <div className={styles.floatingGraphics}>
          <motion.div 
            className={`${styles.floatingCard} ${styles.cardTourney1}`}
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut" }}
          >
            <Trophy size={32} />
          </motion.div>
          <motion.div 
            className={`${styles.floatingCard} ${styles.cardTourney2}`}
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.5 }}
          >
            <Swords size={24} />
          </motion.div>
        </div>

        <div className={styles.content}>
          <span className={`${styles.badge} ${styles.badgeTourney}`}>تایتان تورنمنت</span>
          <h2 className={`${styles.title} ${styles.titleTourney}`}>وارد آرنا شو</h2>
          <p className={styles.subtitle}>
            رقابت با بهترین‌ها.
          </p>
          <div className={styles.btnWrapper}>
            <Button size="md" variant="outline" icon={<Swords size={18} />}>
              مسابقات
            </Button>
          </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
