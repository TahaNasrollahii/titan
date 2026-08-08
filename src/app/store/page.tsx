import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import ProductCard from '@/components/cards/ProductCard';
import GradientOrb from '@/components/effects/GradientOrb';
import { products } from '@/data/products';
import styles from './page.module.css';
import { Filter } from 'lucide-react';

export default function StorePage() {
  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.storeHero}>
          <GradientOrb color="violet" size={500} top="-20%" right="10%" opacity={0.15} />
          <GradientOrb color="blue" size={400} bottom="-10%" left="5%" opacity={0.1} />
          <div className="container">
            <SectionHeader 
              eyebrow="فروشگاه تایتان"
              title="تجهیزات گیمینگ خود را ارتقا دهید"
              subtitle="ویباکس، پوینت، گیفت کارت و بازی‌های اورجینال با بهترین قیمت و تحویل آنی."
            />
          </div>
        </div>

        <div className="container">
          <div className={styles.storeLayout}>
            {/* Sidebar Filters */}
            <aside className={styles.sidebar}>
              <div className={styles.filterHeader}>
                <Filter size={18} />
                <h3>فیلترها</h3>
              </div>
              
              <div className={styles.filterGroup}>
                <h4>دسته‌بندی</h4>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked />
                  <span>همه محصولات</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>ارز درون بازی</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>گیفت کارت</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>بازی اورجینال</span>
                </label>
              </div>

              <div className={styles.filterGroup}>
                <h4>پلتفرم</h4>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>PlayStation</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>Xbox</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>Steam</span>
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" />
                  <span>Epic Games</span>
                </label>
              </div>
            </aside>

            {/* Product Grid */}
            <div className={styles.productGrid}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
