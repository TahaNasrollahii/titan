'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, ChevronDown, Crosshair, Swords, Flame, Target, Trophy, Gamepad2, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'خانه', href: '/' },
  { label: 'فروشگاه', href: '/store' },
  { label: 'مسابقات', href: '/tournaments' },
  { 
    label: 'بازی‌ها', 
    href: '/games',
    isGrid: true,
    dropdown: [
      { label: 'کال آف دیوتی', href: '/games/cod', icon: <Crosshair size={18} /> },
      { label: 'دوتا ۲', href: '/games/dota2', icon: <Swords size={18} /> },
      { label: 'ولورانت', href: '/games/valorant', icon: <Flame size={18} /> },
      { label: 'فیفا ۲۴', href: '/games/fc24', icon: <Trophy size={18} /> },
      { label: 'کانتر استرایک', href: '/games/cs2', icon: <Target size={18} /> },
      { label: 'سایر بازی‌ها', href: '/games/all', icon: <Gamepad2 size={18} /> },
    ]
  },
  { label: 'رتبه‌بندی', href: '/leaderboard' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.headerInner}`}>
          {/* Right Section (in RTL): Logo */}
          <div className={styles.logoWrapper}>
            <a href="/" className={styles.logo}>
              <span className={styles.logoIcon}>◆</span>
              <span className={`${styles.logoText} en-text`}>TITAN</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className={`${styles.desktopNav} ${styles.centerNav}`}>
            {navLinks.map(link => (
              <div key={link.href} className={styles.navItem}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className={styles.dropdownIcon} />}
                </a>
                
                {link.dropdown && (
                  <div className={`${styles.dropdownMenu} ${link.isGrid ? styles.gridMenu : ''}`}>
                    {link.dropdown.map(dropLink => (
                      <a key={dropLink.href} href={dropLink.href} className={styles.dropdownItem}>
                        {dropLink.icon && <span className={styles.dropIcon}>{dropLink.icon}</span>}
                        <span className={styles.dropText}>{dropLink.label}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Left Section (in RTL): Actions */}
          <div className={styles.actions}>
            {/* Search Bubble Toggle */}
            <div className={styles.searchContainer} ref={searchRef}>
              <button 
                className={`${styles.iconBtn} ${styles.searchBubbleBtn} ${isSearchOpen ? styles.active : ''}`}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="جستجو"
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>

              {/* Dropdown Search Bar */}
              {isSearchOpen && (
                <div className={styles.searchDropdown}>
                  <div className={styles.searchInner}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                      type="text"
                      placeholder="جستجوی بازی‌ها، محصولات..."
                      className={styles.searchInput}
                      autoFocus
                    />
                  </div>
                </div>
              )}
            </div>

            <button className={styles.iconBtn} aria-label="اعلانات">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </button>

            <a href="/cart" className={styles.iconBtn} aria-label="سبد خرید">
              <ShoppingCart size={20} />
              <span className={styles.cartBadge}>۲</span>
            </a>


            <div className={styles.desktopOnly}>
              <Button size="sm" variant="primary" href="/signup">
                ثبت نام
              </Button>
            </div>
          </div>
        </div>
      </header>

    </>
  );
}
