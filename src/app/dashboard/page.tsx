import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { User, Settings, Trophy, ShoppingBag, Clock, LogOut, ChevronLeft } from 'lucide-react';
import styles from './page.module.css';

export default function DashboardPage() {
  const user = {
    username: 'ShadowStrike',
    email: 'shadow.strike@titan.com',
    joinDate: '۱۴۰۳/۰۲/۱۵',
    level: 87,
    points: 15420,
    walletBalance: 250000,
  };

  const formatCurrency = (val: number) => val.toLocaleString('fa-IR');

  const recentOrders = [
    { id: 'ORD-77X92', date: '۱۴۰۴/۰۸/۱۲', total: 299000, status: 'تکمیل شده', item: '۱,۰۰۰ ویباکس فورتنایت' },
    { id: 'ORD-81B45', date: '۱۴۰۴/۰۷/۲۸', total: 350000, status: 'تکمیل شده', item: '۱,۰۰۰ پوینت ولورنت' },
  ];

  const upcomingTournaments = [
    { id: 't1', title: 'جام زیرو بیلد تایتان', date: '۱۴۰۵/۰۵/۱۸', game: 'فورتنایت' },
  ];

  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        <div className="container">
          <div className={styles.layout}>
            
            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
              <div className={styles.userProfile}>
                <div className={styles.avatar}>
                  {user.username.charAt(0)}
                </div>
                <div className={styles.userInfo}>
                  <h2 className={styles.username}>{user.username}</h2>
                  <p className={styles.email}>{user.email}</p>
                  <div className={styles.levelBadge}>سطح {user.level}</div>
                </div>
              </div>

              <nav className={styles.navMenu}>
                <a href="#" className={`${styles.navLink} ${styles.active}`}>
                  <User size={18} />
                  <span>پروفایل من</span>
                </a>
                <a href="#" className={styles.navLink}>
                  <ShoppingBag size={18} />
                  <span>سفارشات</span>
                </a>
                <a href="#" className={styles.navLink}>
                  <Trophy size={18} />
                  <span>مسابقات من</span>
                </a>
                <a href="#" className={styles.navLink}>
                  <Settings size={18} />
                  <span>تنظیمات حساب</span>
                </a>
              </nav>

              <button className={styles.logoutBtn}>
                <LogOut size={18} />
                <span>خروج از حساب</span>
              </button>
            </aside>

            {/* Main Content Area */}
            <div className={styles.contentArea}>
              
              <h1 className={styles.pageTitle}>داشبورد کاربری</h1>

              {/* Stats Grid */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIconWrapper} style={{ color: 'var(--titan-accent-blue)' }}>
                    <Trophy size={24} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>امتیاز تایتان (TP)</span>
                    <span className={styles.statValue}>{formatCurrency(user.points)}</span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrapper} style={{ color: 'var(--titan-status-success)' }}>
                    <ShoppingBag size={24} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>موجودی کیف پول</span>
                    <span className={styles.statValue}>{formatCurrency(user.walletBalance)} <small>تومان</small></span>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIconWrapper} style={{ color: 'var(--titan-accent-violet)' }}>
                    <Clock size={24} />
                  </div>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>تاریخ عضویت</span>
                    <span className={styles.statValue}>{user.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Tournaments & Orders Rows */}
              <div className={styles.sectionsRow}>
                
                {/* Upcoming Tournaments */}
                <div className={styles.cardSection}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>مسابقات پیش‌رو</h3>
                    <a href="#" className={styles.viewAllLink}>
                      مشاهده همه <ChevronLeft size={16} />
                    </a>
                  </div>
                  
                  <div className={styles.list}>
                    {upcomingTournaments.map(t => (
                      <div key={t.id} className={styles.listItem}>
                        <div className={styles.itemMain}>
                          <h4 className={styles.itemTitle}>{t.title}</h4>
                          <span className={styles.itemMeta}>{t.game} — {t.date}</span>
                        </div>
                        <Badge variant="upcoming">ثبت‌نام شده</Badge>
                      </div>
                    ))}
                    {upcomingTournaments.length === 0 && (
                      <p className={styles.emptyText}>شما در هیچ مسابقه‌ای ثبت‌نام نکرده‌اید.</p>
                    )}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className={styles.cardSection}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>آخرین سفارشات</h3>
                    <a href="#" className={styles.viewAllLink}>
                      مشاهده همه <ChevronLeft size={16} />
                    </a>
                  </div>
                  
                  <div className={styles.list}>
                    {recentOrders.map(order => (
                      <div key={order.id} className={styles.listItem}>
                        <div className={styles.itemMain}>
                          <h4 className={styles.itemTitle}>{order.item}</h4>
                          <span className={styles.itemMeta}>کد سفارش: {order.id} — {order.date}</span>
                        </div>
                        <div className={styles.itemTrailing}>
                          <span className={styles.itemPrice}>{formatCurrency(order.total)} ت</span>
                          <span className={styles.statusSuccess}>{order.status}</span>
                        </div>
                      </div>
                    ))}
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
