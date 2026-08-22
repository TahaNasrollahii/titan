'use client';

import { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
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
    image: '/images/products/vbucks-1000.jpg'
  },
  {
    id: 4,
    title: 'گیفت کارت ۵۰ دلاری استیم',
    badge: 'محبوب',
    originalPrice: 2800000,
    price: 2450000,
    discount: 12,
    pillGradient: 'linear-gradient(135deg, #10b981, #3b82f6)',
    image: '/images/products/steam-50.jpg'
  },
  {
    id: 5,
    title: '۱۱۵۰۰ پوینت فیفا ۲۴',
    badge: 'تخفیف ویژه',
    originalPrice: 4200000,
    price: 3600000,
    discount: 14,
    pillGradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    image: '/images/products/fc-points.jpg'
  },
  {
    id: 6,
    title: 'پرمیوم پس ولورانت',
    badge: 'جدید',
    originalPrice: 650000,
    price: 490000,
    discount: 24,
    pillGradient: 'linear-gradient(135deg, #ef4444, #a855f7)',
    image: '/images/products/vp-1000.jpg'
  }
];

export default function DiscountsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.4]);

  return (
    <section ref={containerRef} className={styles.wrapper}>
      {/* Background Rings */}
      <motion.div className={styles.ringsContainer} style={{ scale, x: "-50%", y: "-50%" }}>
        <div className={styles.ring} style={{ width: '1000px', height: '1000px', opacity: 0.08 }}></div>
        <div className={styles.ring} style={{ width: '750px', height: '750px', opacity: 0.12 }}></div>
        <div className={styles.ring} style={{ width: '500px', height: '500px', opacity: 0.18 }}></div>
        <div className={styles.ring} style={{ width: '250px', height: '250px', opacity: 0.25 }}></div>
      </motion.div>
      
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
          className={styles.sliderWrapper}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpItem}
        >
          <motion.div ref={carouselRef} className={styles.carouselContainer}>
            <motion.div 
              className={styles.innerCarousel}
              drag="x"
              dragConstraints={carouselRef}
              whileTap={{ cursor: "grabbing" }}
            >
              {discountData.map((item, index) => (
                <div key={item.id} className={styles.carouselItem}>
                <motion.div 
                  className={styles.card}
                  animate={{ y: [0, -12, 0] }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.4
                  }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 30px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 40px rgba(168, 85, 247, 0.2)" 
                  }}
                >
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
                    suppressHydrationWarning
                  >
                    {item.discount.toLocaleString('fa-IR')}٪
                  </div>

                  <div className={styles.cardContent}>
                    {/* Title */}
                    <h3 className={styles.cardTitle}>{item.title}</h3>

                    {/* Prices */}
                    <div className={styles.priceArea}>
                      <div className={styles.originalPrice} suppressHydrationWarning>
                        {formatPrice(item.originalPrice)}
                      </div>
                      <div className={styles.currentPrice} suppressHydrationWarning>
                        {formatPrice(item.price)}
                        <span className={styles.currency}>تومان</span>
                      </div>
                    </div>

                    {/* Button */}
                    <button className={styles.addButton}>
                      افزودن به سبد
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
