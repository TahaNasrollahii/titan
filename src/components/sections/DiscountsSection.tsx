'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Clock, Flame, Tag } from 'lucide-react';
import styles from './DiscountsSection.module.css';

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const formatPrice = (price: number) => price.toLocaleString('fa-IR');

const discountData = [
  {
    id: 1,
    title: 'کوین اپکس لجندز',
    badge: 'فروش فوری',
    originalPrice: 385000,
    price: 299000,
    discount: 22,
    pillGradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
    offset: 0,
    image: '/images/products/apex-coins.jpg'
  },
  {
    id: 2,
    title: 'پک اپراتور کال آو دیوتی',
    badge: 'باندل ویژه',
    originalPrice: 1018000,
    price: 729000,
    discount: 28,
    pillGradient: 'linear-gradient(135deg, #3b82f6, #a855f7)',
    offset: 20, // middle card is slightly lower in the design
    image: '/images/products/cod-points.jpg'
  },
  {
    id: 3,
    title: '۲۸۰۰ وی‌باکس فورتنایت',
    badge: 'پیشنهاد شبانه',
    originalPrice: 999000,
    price: 649000,
    discount: 35,
    pillGradient: 'linear-gradient(135deg, #06b6d4, #a855f7)',
    offset: 0,
    image: '/images/products/vbucks-1000.jpg'
  }
];

export default function DiscountsSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className={styles.wrapper}>
      {/* Background Rings */}
      <div className={styles.ringsContainer}>
        <div className={styles.ring} style={{ width: '1400px', height: '1400px', opacity: 0.015 }}></div>
        <div className={styles.ring} style={{ width: '1000px', height: '1000px', opacity: 0.02 }}></div>
        <div className={styles.ring} style={{ width: '600px', height: '600px', opacity: 0.04 }}></div>
        <div className={styles.ring} style={{ width: '300px', height: '300px', opacity: 0.06 }}></div>
      </div>
      
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpItem}
        >
          <div className={styles.badgeRow}>
            <div className={styles.topBadge}>
              <Flame size={14} className={styles.flameIcon} />
              <span>منطقه ۰۱ — دروازه تخفیف‌ها</span>
            </div>
          </div>
          
          <h2 className={styles.title}>
            بهترین <span className={styles.titleGradient}>پیشنهادهای</span> این چرخه
          </h2>
          
          <p className={styles.subtitle}>
            هر ۲۴ ساعت دروازه باز می‌شود و قیمت‌ها سقوط می‌کنند. تا بسته شدن دروازه فرصت داری.
          </p>
          
          <div className={styles.timerWrapper}>
            <div className={styles.timer}>
              <span className={styles.timerText} dir="ltr">۱۸ : ۴۲ : ۰۶</span>
              <Clock size={16} className={styles.clockIcon} />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.cardsGrid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpItem}
        >
          {discountData.map((item) => (
            <div key={item.id} className={styles.card} style={{ transform: `translateY(${item.offset}px)` }}>
              <div 
                className={styles.cardImage}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {/* Top Badge (moved inside image) */}
                <div className={styles.cardBadge}>
                  <Tag size={12} className={styles.cardBadgeIcon} />
                  {item.badge}
                </div>
              </div>

              {/* Discount Pill */}
              <div 
                className={styles.discountPill}
                style={{ background: item.pillGradient, boxShadow: `0 0 20px ${item.pillGradient.split(',')[1].trim()}80` }}
              >
                {item.discount.toLocaleString('fa-IR')}٪
              </div>

              <div className={styles.cardContent}>
                {/* Title */}
                <h3 className={styles.cardTitle}>{item.title}</h3>

                {/* Prices */}
                <div className={styles.priceArea}>
                  <div className={styles.originalPrice}>
                    {formatPrice(item.originalPrice)}
                  </div>
                  <div className={styles.currentPrice}>
                    {formatPrice(item.price)}
                    <span className={styles.currency}>تومان</span>
                  </div>
                </div>

                {/* Button */}
                <button className={styles.addButton}>
                  افزودن به سبد
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
