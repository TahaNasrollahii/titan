import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import GradientOrb from '@/components/effects/GradientOrb';
import { Mail, Lock, LogIn } from 'lucide-react';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        <GradientOrb color="blue" size={600} top="-10%" left="-10%" opacity={0.15} />
        <GradientOrb color="violet" size={500} bottom="-10%" right="-10%" opacity={0.1} />
        
        <div className="container">
          <div className={styles.authContainer}>
            <div className={styles.authCard}>
              
              <div className={styles.header}>
                <a href="/" className={styles.logo}>
                  <span className={styles.logoIcon}>◆</span>
                  <span className={`${styles.logoText} en-text`}>TITAN</span>
                </a>
                <h1 className={styles.title}>ورود به حساب کاربری</h1>
                <p className={styles.subtitle}>برای دسترسی به تورنمنت‌ها و خریدهای خود وارد شوید.</p>
              </div>

              <form className={styles.form}>
                <div className={styles.inputGroup}>
                  <div className={styles.inputIconWrapper}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input type="email" placeholder="ایمیل خود را وارد کنید" className={styles.input} />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <div className={styles.inputIconWrapper}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input type="password" placeholder="رمز عبور" className={styles.input} />
                  </div>
                </div>

                <div className={styles.formOptions}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" />
                    <span>مرا به خاطر بسپار</span>
                  </label>
                  <a href="#" className={styles.forgotLink}>رمز عبور را فراموش کرده‌اید؟</a>
                </div>

                <Button 
                  size="lg" 
                  variant="primary" 
                  fullWidth 
                  glow 
                  icon={<LogIn size={18} />}
                >
                  ورود
                </Button>
              </form>

              <div className={styles.divider}>
                <span>یا ورود با</span>
              </div>

              <div className={styles.socialAuth}>
                <Button variant="outline" fullWidth icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                }>
                  <span className="en-text">Google</span>
                </Button>
                <Button variant="outline" fullWidth icon={<span style={{ fontSize: '18px' }}>🎮</span>}>
                  <span className="en-text">Discord</span>
                </Button>
              </div>

              <p className={styles.footerText}>
                حساب کاربری ندارید؟ <a href="/register">ثبت‌نام کنید</a>
              </p>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
