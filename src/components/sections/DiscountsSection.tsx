'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { ChevronRight, ChevronLeft, Percent, ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/cards/ProductCard';
import GradientOrb from '@/components/effects/GradientOrb';
import { products } from '@/data/products';
import styles from './DiscountsSection.module.css';

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function DiscountsSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Filter products that have a discount and sort by highest discount
  const discountedProducts = products
    .filter(p => p.discount)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 8); // Take top 8

  if (discountedProducts.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (swiperInstance) {
      if (direction === 'left') {
        swiperInstance.slideNext();
      } else {
        swiperInstance.slidePrev();
      }
    }
  };

  return (
    <section className={styles.wrapper}>
      <GradientOrb color="violet" size={600} top="-10%" left="-10%" opacity={0.15} />
      <GradientOrb color="blue" size={500} bottom="-20%" right="20%" opacity={0.1} />
      
      <div className={styles.container}>
        <motion.div 
          className={styles.box}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpItem}
        >
          {/* Sidebar / Title Area */}
          <div className={styles.sidebar}>
            <div className={styles.badge}>پیشنهاد ویژه</div>
            <h2 className={styles.title}>شگفت‌انگیز</h2>
            <p className={styles.subtitle}>تخفیف‌های بی‌نظیر امروز</p>
            
            <div className={styles.percentCircle}>
              <Percent size={40} strokeWidth={3} />
            </div>

            <div className={styles.navButtons}>
              <button className={styles.navBtn} onClick={() => scroll('right')} aria-label="بعدی">
                <ChevronRight size={24} />
              </button>
              <button className={styles.navBtn} onClick={() => scroll('left')} aria-label="قبلی">
                <ChevronLeft size={24} />
              </button>
            </div>

            <Link href="/store?filter=discount" className={styles.viewAll}>
              مشاهده همه
              <ArrowLeft size={16} />
            </Link>
          </div>

          {/* Carousel Area */}
          <div className={styles.carouselContainer}>
            <Swiper
              onSwiper={setSwiperInstance}
              spaceBetween={16}
              slidesPerView="auto"
              className={styles.swiper}
            >
              {discountedProducts.map(product => (
                <SwiperSlide key={product.id} className={styles.swiperSlide}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
