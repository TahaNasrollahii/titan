'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'خانه', href: '/' },
  { label: 'فروشگاه', href: '/store' },
  { label: 'مسابقات', href: '/tournaments' },
  { label: 'بازی‌ها', href: '/games' },
  { label: 'رتبه‌بندی', href: '/leaderboard' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.headerInner}`}>
          {/* Logo */}
          <a href="/" className={styles.logo}>
            <span className={styles.logoIcon}>◆</span>
            <span className={`${styles.logoText} en-text`}>TITAN</span>
          </a>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="جستجو"
            >
              <Search size={20} />
            </button>

            <a href="/cart" className={styles.iconBtn} aria-label="سبد خرید">
              <ShoppingCart size={20} />
              <span className={styles.cartBadge}>۲</span>
            </a>

            <div className={styles.desktopOnly}>
              <Button size="sm" variant="primary" href="/login" icon={<User size={16} />}>
                ورود
              </Button>
            </div>

            <button
              className={`${styles.menuToggle} ${styles.mobileOnly}`}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'بستن منو' : 'باز کردن منو'}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className={styles.searchBar}>
            <div className="container">
              <div className={styles.searchInner}>
                <Search size={20} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="جستجوی بازی، تورنمنت، محصول..."
                  className={styles.searchInput}
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)} className={styles.searchClose}>
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      <div className={`${styles.mobileOverlay} ${isMobileOpen ? styles.open : ''}`} onClick={() => setIsMobileOpen(false)} />
      <nav className={`${styles.mobileMenu} ${isMobileOpen ? styles.open : ''}`}>
        <div className={styles.mobileHeader}>
          <a href="/" className={styles.logo}>
            <span className={styles.logoIcon}>◆</span>
            <span className={`${styles.logoText} en-text`}>TITAN</span>
          </a>
          <button className={styles.iconBtn} onClick={() => setIsMobileOpen(false)} aria-label="بستن منو">
            <X size={24} />
          </button>
        </div>
        <div className={styles.mobileLinks}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className={styles.mobileLink}>
              {link.label}
            </a>
          ))}
        </div>
        <div className={styles.mobileFooter}>
          <Button fullWidth variant="primary" href="/login" icon={<User size={18} />}>
            ورود / ثبت‌نام
          </Button>
        </div>
      </nav>
    </>
  );
}
