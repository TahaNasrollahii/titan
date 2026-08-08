'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import TournamentCard from '@/components/cards/TournamentCard';
import GradientOrb from '@/components/effects/GradientOrb';
import { tournaments } from '@/data/tournaments';
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
        <div className={styles.hero}>
          <GradientOrb color="blue" size={600} top="-30%" left="-10%" opacity={0.15} />
          <div className="container">
            <SectionHeader 
              eyebrow="میدان نبرد"
              title="نبرد بعدی خود را پیدا کنید"
              subtitle="در بزرگ‌ترین تورنمنت‌های خاورمیانه رقابت کنید و جوایز نقدی برنده شوید."
            />
          </div>
        </div>

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
