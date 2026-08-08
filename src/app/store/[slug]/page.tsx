import { getProductBySlug } from '@/data/products';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import GradientOrb from '@/components/effects/GradientOrb';
import { ShoppingCart, Star, Shield, Clock, Check } from 'lucide-react';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => price.toLocaleString('fa-IR');

  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <GradientOrb color="blue" size={500} top="-10%" right="-10%" opacity={0.1} />
          
          <div className="container">
            <div className={styles.productLayout}>
              
              {/* Product Image Section */}
              <div className={styles.imageSection}>
                <div className={styles.imageWrapper}>
                  {product.discount && (
                    <div className={styles.discountBadge}>
                      {product.discount.toLocaleString('fa-IR')}٪ تخفیف
                    </div>
                  )}
                  {/* Real app would use Next/Image here */}
                  <div className={styles.imagePlaceholder} style={{ backgroundImage: "url('/images/products/mock_product.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
                </div>
              </div>

              {/* Product Info Section */}
              <div className={styles.infoSection}>
                <div className={styles.header}>
                  <div className={styles.tags}>
                    <span className={styles.platformTag}>{product.platform}</span>
                    <span className={styles.categoryTag}>{product.category}</span>
                  </div>
                  
                  <h1 className={styles.title}>{product.title}</h1>
                  
                  <div className={styles.rating}>
                    <div className={styles.stars}>
                      <Star size={16} fill="var(--titan-status-warning)" stroke="var(--titan-status-warning)" />
                      <span className={styles.ratingValue}>{product.rating}</span>
                    </div>
                    <span className={styles.reviewCount}>({product.reviewCount.toLocaleString('fa-IR')} دیدگاه)</span>
                  </div>
                </div>

                <div className={styles.priceSection}>
                  <div className={styles.prices}>
                    <span className={styles.price}>{formatPrice(product.price)} تومان</span>
                    {product.originalPrice && (
                      <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  
                  {!product.inStock && (
                    <span className={styles.outOfStock}>ناموجود</span>
                  )}
                </div>

                <div className={styles.description}>
                  <p>{product.description}</p>
                </div>

                {product.variants && (
                  <div className={styles.variants}>
                    <h3 className={styles.variantsTitle}>انتخاب گزینه:</h3>
                    <div className={styles.variantsGrid}>
                      {product.variants.map((v, i) => (
                        <button key={v.id} className={`${styles.variantBtn} ${i === 2 ? styles.variantActive : ''}`}>
                          <span className={styles.variantLabel}>{v.label}</span>
                          <span className={styles.variantPrice}>{formatPrice(v.price)} ت</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.actions}>
                  <Button 
                    size="lg" 
                    variant="primary" 
                    icon={<ShoppingCart size={20} />} 
                    fullWidth 
                    disabled={!product.inStock}
                    glow
                  >
                    افزودن به سبد خرید
                  </Button>
                </div>

                <div className={styles.features}>
                  <div className={styles.feature}>
                    <Clock size={20} className={styles.featureIcon} />
                    <span>{product.deliveryInfo}</span>
                  </div>
                  <div className={styles.feature}>
                    <Shield size={20} className={styles.featureIcon} />
                    <span>تضمین اصالت و سلامت کد</span>
                  </div>
                  <div className={styles.feature}>
                    <Check size={20} className={styles.featureIcon} />
                    <span>پشتیبانی ۲۴ ساعته</span>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
