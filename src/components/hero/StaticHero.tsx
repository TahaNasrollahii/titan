'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Trophy } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './StaticHero.module.css';

export default function StaticHero() {
  return (
    <section className={styles.heroSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.badge}>
              <span className={styles.badgePulse}></span>
              نسل جدید پلتفرم گیمینگ
            </div>
            
            <h1 className={styles.title}>
              پلتفرم <span className="text-gradient">تایتان</span> <br />
              آرنای قهرمانان
            </h1>
            
            <p className={styles.subtitle}>
              در بزرگترین تورنومنت‌های آنلاین شرکت کن، جوایز نقدی ببر و با خرید محصولات دیجیتال، قدرت خودت رو در بازی دوچندان کن.
            </p>
            
            <div className={styles.actions}>
              <Button href="/tournaments" variant="primary" size="lg" glow icon={<Trophy size={20} />}>
                ورود به مسابقات
              </Button>
              <Button href="/store" variant="outline" size="lg" icon={<Gamepad2 size={20} />}>
                فروشگاه تایتان
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className={styles.imageWrapper}>
          <motion.div 
            className={styles.imageContainer}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className={styles.glowBlue}></div>
            <div className={styles.glowMagenta}></div>
            <img src="/images/hero/hero-bg.jpg" alt="Titan Hero" className={styles.heroImage} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
