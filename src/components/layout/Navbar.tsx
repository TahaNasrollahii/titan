'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, X, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'خانه', href: '/' },
  { label: 'فروشگاه', href: '/store' },
  { label: 'مسابقات', href: '/tournaments' },
  { 
    label: 'بازی‌ها', 
    href: '/games',
    dropdown: [
      { label: 'کال آف دیوتی', href: '/games/cod' },
      { label: 'دوتا ۲', href: '/games/dota2' },
      { label: 'ولورانت', href: '/games/valorant' },
      { label: 'فیفا ۲۴', href: '/games/fc24' },
      { label: 'کانتر استرایک', href: '/games/cs2' },
    ]
  },
  { label: 'رتبه‌بندی', href: '/leaderboard' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



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
              <div key={link.href} className={styles.navItem}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className={styles.dropdownIcon} />}
                </a>
                
                {link.dropdown && (
                  <div className={styles.dropdownMenu}>
                    {link.dropdown.map(dropLink => (
                      <a key={dropLink.href} href={dropLink.href} className={styles.dropdownItem}>
                        {dropLink.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
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

    </>
  );
}
