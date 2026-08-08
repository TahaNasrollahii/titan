import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import { CreditCard, Wallet, AlertCircle } from 'lucide-react';
import styles from './page.module.css';

export default function CheckoutPage() {
  const formatPrice = (price: number) => price.toLocaleString('fa-IR');

  const total = 649000; // Hardcoded from cart subtotal for showcase

  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        <div className="container">
          <SectionHeader 
            title="تکمیل خرید"
            align="start"
            className={styles.sectionHeader}
          />

          <div className={styles.layout}>
            
            {/* Checkout Form */}
            <div className={styles.formSection}>
              
              <div className={styles.formCard}>
                <h3 className={styles.cardTitle}>اطلاعات حساب کاربری</h3>
                <div className={styles.alertBox}>
                  <AlertCircle size={20} className={styles.alertIcon} />
                  <p>برای دریافت کد محصولات، ایمیل معتبر وارد کنید.</p>
                </div>
                
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>نام و نام خانوادگی</label>
                    <input type="text" placeholder="مثال: علی حسینی" className={styles.input} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>ایمیل</label>
                    <input type="email" placeholder="آدرس ایمیل شما" className={styles.input} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>شماره موبایل</label>
                    <input type="tel" placeholder="۰۹۱۲۳۴۵۶۷۸۹" className={styles.input} />
                  </div>
                  <div className={styles.formGroup}>
                    <label>شناسه کاربری (اختیاری)</label>
                    <input type="text" placeholder="Player ID برای شارژ مستقیم" className={styles.input} />
                  </div>
                </div>
              </div>

              <div className={styles.formCard}>
                <h3 className={styles.cardTitle}>روش پرداخت</h3>
                
                <div className={styles.paymentMethods}>
                  <label className={styles.paymentMethod}>
                    <input type="radio" name="payment" defaultChecked className={styles.radioInput} />
                    <div className={styles.paymentContent}>
                      <CreditCard size={24} className={styles.paymentIcon} />
                      <div className={styles.paymentText}>
                        <h4>درگاه پرداخت اینترنتی</h4>
                        <p>پرداخت امن با کلیه کارت‌های عضو شتاب</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className={styles.paymentMethod}>
                    <input type="radio" name="payment" className={styles.radioInput} />
                    <div className={styles.paymentContent}>
                      <Wallet size={24} className={styles.paymentIcon} />
                      <div className={styles.paymentText}>
                        <h4>کیف پول تایتان</h4>
                        <p>موجودی: ۰ تومان</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Order Summary */}
            <aside className={styles.summarySidebar}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>فاکتور شما</h3>
                
                <div className={styles.orderItems}>
                  <div className={styles.orderItem}>
                    <span>۱,۰۰۰ ویباکس فورتنایت</span>
                    <span>۱x</span>
                  </div>
                  <div className={styles.orderItem}>
                    <span>۱,۰۰۰ پوینت ولورنت</span>
                    <span>۲x</span>
                  </div>
                </div>

                <div className={styles.summaryDivider} />
                
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>جمع کل</span>
                  <span className={styles.summaryValue}>{formatPrice(total)} تومان</span>
                </div>
                
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>مالیات</span>
                  <span className={styles.summaryValue}>۰ تومان</span>
                </div>

                <div className={styles.summaryDivider} />

                <div className={styles.summaryTotalRow}>
                  <span className={styles.summaryTotalLabel}>مبلغ قابل پرداخت</span>
                  <span className={styles.summaryTotalValue}>{formatPrice(total)} تومان</span>
                </div>

                <Button 
                  size="lg" 
                  variant="primary" 
                  fullWidth 
                  glow 
                >
                  پرداخت و تکمیل سفارش
                </Button>
                
                <p className={styles.termsText}>
                  با ثبت سفارش، قوانین و مقررات تایتان را می‌پذیرم.
                </p>
              </div>
            </aside>
            
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
