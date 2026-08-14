'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay, Navigation } from 'swiper/modules';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './HeroCoverflow.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface SlideData {
  id: string;
  tag: string;
  title: React.ReactNode;
  subtitle: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  glowColor: string;
}

const slides: SlideData[] = [
  {
    id: 'tournaments',
    tag: '#تورنومنت_های_تایتان',
    title: (
      <>
        رقابت کن و <span style={{ color: '#fbbf24' }}>قهرمان</span> شو!
      </>
    ),
    subtitle: 'در بزرگترین تورنومنت‌های آنلاین شرکت کن و جوایز نقدی ببر.',
    features: [
      'جوایز نقدی و ارزشمند',
      'سیستم براکت‌بندی حرفه‌ای',
      'پشتیبانی آنلاین در طول مسابقات',
    ],
    buttonText: 'ورود به مسابقات',
    buttonLink: '/tournaments',
    glowColor: '#fbbf24', // Gold
  },
  {
    id: 'fortnite',
    tag: '#آیتم_های_فورتنایت',
    title: (
      <>
        خرید <span style={{ color: '#a855f7' }}>وی‌باکس</span> فورتنایت
      </>
    ),
    subtitle: 'اسکین‌ها و بتل‌پس فورتنایت را در سریع‌ترین زمان ممکن دریافت کن.',
    features: [
      'واریز سریع و آنی',
      'ارزان‌ترین قیمت بازار',
      'خرید قانونی و مطمئن',
    ],
    buttonText: 'خرید از فروشگاه',
    buttonLink: '/store?category=fortnite',
    glowColor: '#a855f7', // Purple
  },
  {
    id: 'apex',
    tag: '#آیتم_های_ایپکس',
    title: (
      <>
        شارژ <span style={{ color: '#ef4444' }}>ایپکس کوین</span>
      </>
    ),
    subtitle: 'با کوین‌های ایپکس بهترین لوت‌ها را باز کن و قهرمان آرنا شو.',
    features: [
      'فعال‌سازی بدون بن',
      'پشتیبانی قدرتمند',
      'تحویل در کمترین زمان',
    ],
    buttonText: 'خرید ایپکس کوین',
    buttonLink: '/store?category=apex',
    glowColor: '#ef4444', // Red
  },
  {
    id: 'cod',
    tag: '#آیتم_های_کال_آف_دیوتی',
    title: (
      <>
        خرید <span style={{ color: '#22c55e' }}>سی‌پی</span> کال آف دیوتی
      </>
    ),
    subtitle: 'گان‌های متیک و اسکین‌های لجندری با خرید CP ارزان.',
    features: [
      'تضمین بهترین قیمت',
      'خرید امن از تایتان',
      'شارژ فوری اکانت',
    ],
    buttonText: 'خرید سی‌پی',
    buttonLink: '/store?category=cod',
    glowColor: '#22c55e', // Green
  },
];

const TiltCard = ({ slide }: { slide: SlideData }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      style={{ width: '100%', height: '100%', perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={styles.glassCard}
        style={{ rotateX, rotateY }}
      >
        <div 
          className={styles.glowBg} 
          style={{ backgroundColor: slide.glowColor }} 
        />
        
        <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={styles.tag}
          style={{ color: slide.glowColor }}
        >
          {slide.tag}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.title}
        >
          {slide.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={styles.subtitle}
        >
          {slide.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className={styles.features}
        >
          {slide.features.map((feature, idx) => (
            <div key={idx} className={styles.feature}>
              <div className={styles.featureIcon} style={{ backgroundColor: slide.glowColor }}>
                <Check size={14} strokeWidth={3} />
              </div>
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className={styles.buttonWrapper}
        >
          <Button href={slide.buttonLink} variant="primary" glow size="lg">
            {slide.buttonText}
          </Button>
        </motion.div>
      </div>
    </motion.div>
    </div>
  );
};

export default function HeroCoverflow() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.heroSection}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        coverflowEffect={{
          rotate: 30, // Angle of side slides
          stretch: 0, // Space between slides
          depth: 150, // Depth offset
          modifier: 1.5, // Effect multiplier
          slideShadows: false, // We'll use our own shadows/glassmorphism
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className={styles.swiperContainer}
      >
        {[...slides, ...slides].map((slide, index) => {
          return (
            <SwiperSlide key={`${slide.id}-${index}`} className={styles.swiperSlide}>
              <TiltCard slide={slide} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: var(--titan-accent-blue) !important;
        }
      `}</style>
    </section>
  );
}
