'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import GradientOrb from '@/components/effects/GradientOrb';
import { leaderboard } from '@/data/players';
import styles from './page.module.css';

export default function LeaderboardPage() {
  const [activeGame, setActiveGame] = useState('all');

  const filteredLeaderboard = activeGame === 'all'
    ? leaderboard
    : leaderboard.filter(entry => entry.player.favoriteGameId === activeGame);

  const topThree = filteredLeaderboard.slice(0, 3);
  const restOfPlayers = filteredLeaderboard.slice(3);

  const gamesList = [
    { id: 'all', label: 'رتبه‌بندی جهانی' },
    { id: 'fortnite', label: 'فورتنایت' },
    { id: 'valorant', label: 'ولورنت' },
    { id: 'call-of-duty', label: 'کال آو دیوتی' },
    { id: 'ea-fc', label: 'ای‌ای اف‌سی' },
  ];

  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <GradientOrb color="blue" size={600} top="-20%" right="10%" opacity={0.15} />
          <GradientOrb color="violet" size={400} bottom="-10%" left="20%" opacity={0.1} />
          
          <div className="container">
            <SectionHeader 
              eyebrow="رتبه‌بندی"
              title="تالار افتخارات تایتان"
              subtitle="بهترین بازیکنان پلتفرم. رقابت کنید، امتیاز بگیرید و به صدر جدول صعود کنید."
            />
            
            <div className={styles.tabsRow}>
              {gamesList.map(game => (
                <button
                  key={game.id}
                  className={`${styles.tab} ${activeGame === game.id ? styles.tabActive : ''}`}
                  onClick={() => setActiveGame(game.id)}
                >
                  {game.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.content}>
            
            {/* Top 3 Podium */}
            {topThree.length >= 3 && (
              <div className={styles.podium}>
                {/* Rank 2 */}
                <div className={`${styles.podiumItem} ${styles.rank2}`}>
                  <div className={styles.podiumAvatar}>
                    {topThree[1].player.username.charAt(0)}
                    <span className={styles.podiumBadge}>۲</span>
                  </div>
                  <h4 className={styles.podiumName}>{topThree[1].player.username}</h4>
                  <span className={styles.podiumPoints}>{topThree[1].points.toLocaleString('fa-IR')} PTS</span>
                </div>
                
                {/* Rank 1 */}
                <div className={`${styles.podiumItem} ${styles.rank1}`}>
                  <div className={styles.podiumAvatar}>
                    {topThree[0].player.username.charAt(0)}
                    <span className={styles.podiumBadge}>۱</span>
                  </div>
                  <h4 className={styles.podiumName}>{topThree[0].player.username}</h4>
                  <span className={styles.podiumPoints}>{topThree[0].points.toLocaleString('fa-IR')} PTS</span>
                  <span className={styles.crown}>👑</span>
                </div>
                
                {/* Rank 3 */}
                <div className={`${styles.podiumItem} ${styles.rank3}`}>
                  <div className={styles.podiumAvatar}>
                    {topThree[2].player.username.charAt(0)}
                    <span className={styles.podiumBadge}>۳</span>
                  </div>
                  <h4 className={styles.podiumName}>{topThree[2].player.username}</h4>
                  <span className={styles.podiumPoints}>{topThree[2].points.toLocaleString('fa-IR')} PTS</span>
                </div>
              </div>
            )}

            {/* Full Table */}
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>رتبه</th>
                    <th>بازیکن</th>
                    <th>سطح</th>
                    <th>بازی اصلی</th>
                    <th>نرخ برد</th>
                    <th>امتیاز</th>
                    <th>درآمد</th>
                  </tr>
                </thead>
                <tbody>
                  {restOfPlayers.map((entry, idx) => (
                    <tr key={entry.player.id}>
                      <td className={styles.rankCell}>#{entry.rank}</td>
                      <td>
                        <div className={styles.playerCell}>
                          <div className={styles.playerAvatarSm}>
                            {entry.player.username.charAt(0)}
                          </div>
                          <span className={`${styles.playerName} en-text`}>{entry.player.username}</span>
                        </div>
                      </td>
                      <td>Lvl {entry.player.level}</td>
                      <td>{entry.game}</td>
                      <td>{entry.winRate}٪</td>
                      <td className={styles.pointsCell}>{entry.points.toLocaleString('fa-IR')}</td>
                      <td className={styles.earningsCell}>{entry.earnings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
