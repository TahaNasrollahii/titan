import styles from './Footer.module.css';

const platformLinks = [
  { label: 'فروشگاه', href: '/store' },
  { label: 'مسابقات', href: '/tournaments' },
  { label: 'بازی‌ها', href: '/games' },
  { label: 'رتبه‌بندی', href: '/leaderboard' },
];

const supportLinks = [
  { label: 'مرکز کمک', href: '#' },
  { label: 'تماس با ما', href: '#' },
  { label: 'سوالات متداول', href: '#' },
  { label: 'قوانین و مقررات', href: '#' },
];

const socialLinks = [
  { label: 'Discord', href: '#', icon: '🎮' },
  { label: 'Instagram', href: '#', icon: '📸' },
  { label: 'Telegram', href: '#', icon: '✈️' },
  { label: 'X (Twitter)', href: '#', icon: '🐦' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glowLine} />
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoIcon}>◆</span>
              <span className={`${styles.logoText} en-text`}>TITAN</span>
            </a>
            <p className={styles.tagline}>مرز بعدی گیمینگ</p>
            <p className={styles.description}>
              پلتفرم گیمینگ و اسپورت تایتان — فروشگاه محصولات دیجیتال گیمینگ و تورنمنت‌های حرفه‌ای
            </p>
            <div className={styles.socialLinks}>
              {socialLinks.map(link => (
                <a key={link.label} href={link.href} className={styles.socialLink} aria-label={link.label}>
                  <span>{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>پلتفرم</h4>
            <ul className={styles.linkList}>
              {platformLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className={styles.footerLink}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>پشتیبانی</h4>
            <ul className={styles.linkList}>
              {supportLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className={styles.footerLink}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.linkCol}>
            <h4 className={styles.colTitle}>خبرنامه</h4>
            <p className={styles.newsletterText}>
              از آخرین تورنمنت‌ها و تخفیف‌ها باخبر شوید
            </p>
            <div className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="ایمیل شما"
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterBtn}>عضویت</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © ۲۰۲۶ <span className="en-text">TITAN</span>. تمامی حقوق محفوظ است.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#">حریم خصوصی</a>
            <a href="#">شرایط استفاده</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
