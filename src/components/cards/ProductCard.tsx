import { Product } from '@/types';
import { ShoppingCart, Star } from 'lucide-react';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => price.toLocaleString('fa-IR');

  return (
    <article className={styles.card}>
      <a href={`/store/${product.slug}`} className={styles.imageWrapper}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url('${product.image || '/images/products/mock_product.png'}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {product.discount ? (
          <div className={styles.discountBadge}>
            {product.discount.toLocaleString('fa-IR')}٪ تخفیف
          </div>
        ) : null}
      </a>

      <div className={styles.content}>
        <div className={styles.tagRow}>
          {product.gameName && <span className={styles.platformTag}>{product.gameName}</span>}
        </div>

        <h3 className={styles.title}>
          <a href={`/store/${product.slug}`}>{product.title}</a>
        </h3>

        <div className={styles.metaRow}>
          <div className={styles.rating}>
            <span className={styles.ratingValue}>{product.rating.toLocaleString('fa-IR')}</span>
            <Star size={12} fill="var(--titan-status-warning)" stroke="var(--titan-status-warning)" />
          </div>
        </div>

        <div className={styles.priceRow}>
          <button className={styles.cartBtn} aria-label="افزودن به سبد خرید">
            <ShoppingCart size={18} />
          </button>
          
          <div className={styles.prices}>
            <span className={styles.price}>{formatPrice(product.price)} تومان</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
