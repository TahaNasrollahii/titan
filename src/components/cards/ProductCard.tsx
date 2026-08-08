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
      {product.discount && (
        <div className={styles.discountBadge}>
          {product.discount.toLocaleString('fa-IR')}٪ تخفیف
        </div>
      )}

      <a href={`/store/${product.slug}`} className={styles.imageWrapper}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url('/images/products/mock_product.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </a>

      <div className={styles.content}>
        <div className={styles.platformTag}>{product.platform}</div>

        <h3 className={styles.title}>
          <a href={`/store/${product.slug}`}>{product.title}</a>
        </h3>

        {product.gameName && (
          <span className={styles.gameName}>{product.gameName}</span>
        )}

        <div className={styles.rating}>
          <Star size={14} fill="var(--titan-status-warning)" stroke="var(--titan-status-warning)" />
          <span className={styles.ratingValue}>{product.rating}</span>
          <span className={styles.reviewCount}>({product.reviewCount.toLocaleString('fa-IR')})</span>
        </div>

        <div className={styles.priceRow}>
          <div className={styles.prices}>
            <span className={styles.price}>{formatPrice(product.price)} تومان</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <button className={styles.cartBtn} aria-label="افزودن به سبد خرید">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
