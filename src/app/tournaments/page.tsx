'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import TournamentCard from '@/components/cards/TournamentCard';
import GradientOrb from '@/components/effects/GradientOrb';
import { tournaments } from '@/data/tournaments';
import { Swords, ShoppingBag } from 'lucide-react';
import styles from './page.module.css';

type TournamentTab = 'all' | 'live' | 'upcoming' | 'completed';

export default function TournamentsPage() {
  const [activeTab, setActiveTab] = useState<TournamentTab>('all');

  const filteredTournaments = activeTab === 'all'
    ? tournaments
    : tournaments.filter(t => t.status === activeTab);

  const tabs: { key: TournamentTab; label: string }[] = [
    { key: 'all', label: 'همه' },
    { key: 'live', label: 'زنده' },
    { key: 'upcoming', label: 'بزودی' },
    { key: 'completed', label: 'پایان‌یافته' },
  ];

  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroBackground}>
            <GradientOrb color="blue" size={600} top="-10%" left="-15%" opacity={0.2} />
            <GradientOrb color="violet" size={500} top="20%" right="-20%" opacity={0.15} />
            <GradientOrb color="magenta" size={300} bottom="10%" left="30%" opacity={0.1} />
            <div className={styles.heroGradient} />
          </div>

          {/* HUD Elements */}
          <div className={`${styles.hudElement} ${styles.hudTopRight}`}>
            <span>SYS://TITAN.V2.4</span>
            <span>COORD: 35.6892°N</span>
            <span>STATUS: ONLINE</span>
          </div>
          <div className={`${styles.hudElement} ${styles.hudBottomLeft}`}>
            <span>SEASON 04 — ACTIVE</span>
            <span>PLAYERS ONLINE: 12,847</span>
            <span>NEXT EVENT: 02:14:33</span>
          </div>

          <div className={`container ${styles.heroContent}`}>
            <div className={styles.heroInner}>
              <div className={styles.heroEyebrow}>
                <span className={styles.heroEyebrowDot} />
                میدان نبرد تایتان
              </div>

              <h1 className={styles.heroHeading}>
                وارد{' '}
                <span className={styles.heroHeadingAccent}>آرنا</span>{' '}
                شو
              </h1>

              <p className={styles.heroSubtitle}>
                در بزرگ‌ترین تورنمنت‌های خاورمیانه رقابت کنید و جوایز نقدی برنده شوید.
              </p>

              <div className={styles.heroCTAs}>
                <Button size="lg" variant="primary" glow href="#tournaments-list" icon={<Swords size={20} />}>
                  مشاهده تورنمنت‌ها
                </Button>
              </div>

              <div className={styles.heroStats}>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>25K+</span>
                  <span className={styles.heroStatLabel}>بازیکن فعال</span>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>150+</span>
                  <span className={styles.heroStatLabel}>تورنمنت</span>
                </div>
                <div className={styles.heroStat}>
                  <span className={styles.heroStatValue}>$500K</span>
                  <span className={styles.heroStatLabel}>جوایز توزیع‌شده</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <div className={styles.content}>
            <div className={styles.controls}>
              <div className={styles.tabsRow}>
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ''}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className={styles.filters}>
                <select className={styles.select}>
                  <option value="">همه بازی‌ها</option>
                  <option value="fortnite">فورتنایت</option>
                  <option value="valorant">ولورنت</option>
                  <option value="ea-fc">ای‌ای اف‌سی</option>
                  <option value="call-of-duty">کال آو دیوتی</option>
                </select>
                <select className={styles.select}>
                  <option value="">نوع ورودیه</option>
                  <option value="free">رایگان</option>
                  <option value="paid">ورودی‌دار</option>
                </select>
              </div>
            </div>

            <div className={styles.grid}>
              {filteredTournaments.map(t => (
                <TournamentCard key={t.id} tournament={t} />
              ))}
            </div>
            
            {filteredTournaments.length === 0 && (
              <div className={styles.emptyState}>
                <p>هیچ تورنمنتی با این فیلترها یافت نشد.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
