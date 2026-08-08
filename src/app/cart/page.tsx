import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import { Trash2, ArrowRight, ShieldCheck, Ticket } from 'lucide-react';
import styles from './page.module.css';

export default function CartPage() {
  const formatPrice = (price: number) => price.toLocaleString('fa-IR');

  // Hardcoded cart items for showcase
  const cartItems = [
    {
      id: 'p1',
      title: '۱,۰۰۰ ویباکس فورتنایت',
      category: 'ارز بازی',
      price: 299000,
      quantity: 1,
      imageEmoji: '🎮',
    },
    {
      id: 'p5',
      title: '۱,۰۰۰ پوینت ولورنت',
      category: 'ارز بازی',
      price: 350000,
      quantity: 2,
      imageEmoji: '🎯',
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <SectionHeader 
              title="سبد خرید"
              align="start"
              className={styles.sectionHeader}
            />
            <span className={styles.itemCount}>{cartItems.length} کالا</span>
          </div>

          <div className={styles.layout}>
            
            {/* Cart Items */}
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <span className={styles.emoji}>{item.imageEmoji}</span>
                  </div>
                  
                  <div className={styles.itemInfo}>
                    <span className={styles.itemCategory}>{item.category}</span>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    <div className={styles.itemPrice}>{formatPrice(item.price)} تومان</div>
                  </div>

                  <div className={styles.itemActions}>
                    <div className={styles.quantityControls}>
                      <button className={styles.qtyBtn}>+</button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button className={styles.qtyBtn}>-</button>
                    </div>
                    <button className={styles.removeBtn} aria-label="حذف از سبد">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Sidebar */}
            <aside className={styles.summarySidebar}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>خلاصه سفارش</h3>
                
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>جمع جزء</span>
                  <span className={styles.summaryValue}>{formatPrice(subtotal)} تومان</span>
                </div>
                
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>تخفیف‌ها</span>
                  <span className={styles.summaryValueDiscount}>۰ تومان</span>
                </div>

                <div className={styles.couponBox}>
                  <Ticket size={16} className={styles.couponIcon} />
                  <input type="text" placeholder="کد تخفیف" className={styles.couponInput} />
                  <button className={styles.couponBtn}>ثبت</button>
                </div>

                <div className={styles.summaryDivider} />

                <div className={styles.summaryTotalRow}>
                  <span className={styles.summaryTotalLabel}>جمع کل</span>
                  <span className={styles.summaryTotalValue}>{formatPrice(total)} تومان</span>
                </div>

                <Button 
                  size="lg" 
                  variant="primary" 
                  fullWidth 
                  glow 
                  href="/checkout"
                  icon={<ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />}
                  iconPosition="end"
                >
                  تکمیل خرید
                </Button>
                
                <div className={styles.secureCheckout}>
                  <ShieldCheck size={16} className={styles.secureIcon} />
                  <span>پرداخت امن و رمزنگاری شده</span>
                </div>
              </div>
            </aside>
            
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
