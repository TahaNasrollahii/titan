import { getTournamentBySlug } from '@/data/tournaments';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import GradientOrb from '@/components/effects/GradientOrb';
import { Trophy, Users, Calendar, ShieldAlert, Swords, MapPin, Gamepad2 } from 'lucide-react';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

const statusLabels = {
  live: 'در حال برگزاری',
  upcoming: 'ثبت‌نام باز است',
  completed: 'پایان‌یافته',
};

export default async function TournamentPage({ params }: Props) {
  const { slug } = await params;
  const tournament = getTournamentBySlug(slug);

  if (!tournament) {
    notFound();
  }

  const progressPercent = (tournament.participants / tournament.maxParticipants) * 100;
  const isRegistrationOpen = tournament.status === 'upcoming';

  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        {/* Cover Header */}
        <div className={styles.coverHeader}>
          <div className={styles.coverImage} style={{ backgroundImage: "url('/images/tournaments/mock_tournament.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className={styles.coverOverlay} />
          <GradientOrb color="blue" size={600} bottom="-20%" left="10%" opacity={0.3} />
          
          <div className={`container ${styles.headerContent}`}>
            <div className={styles.headerTop}>
              <Badge variant={tournament.status} pulse={tournament.status === 'live'} size="md">
                {statusLabels[tournament.status]}
              </Badge>
              <div className={styles.gameTag}>
                <span className={`${styles.gameTagText} en-text`}>{tournament.gameName}</span>
              </div>
            </div>
            
            <h1 className={styles.title}>{tournament.title}</h1>
            
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <MapPin size={18} />
                <span>{tournament.region}</span>
              </div>
              <div className={styles.metaItem}>
                <Gamepad2 size={18} />
                <span>{tournament.format}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.layout}>
            
            {/* Main Content */}
            <div className={styles.mainCol}>
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>درباره مسابقه</h2>
                <p className={styles.description}>{tournament.description}</p>
              </section>

              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <ShieldAlert size={24} className={styles.iconWarning} />
                  <h2 className={styles.sectionTitle}>قوانین و مقررات</h2>
                </div>
                <ul className={styles.rulesList}>
                  {tournament.rules.map((rule, idx) => (
                    <li key={idx} className={styles.ruleItem}>
                      <span className={styles.ruleDot} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sidebar Stats & CTA */}
            <aside className={styles.sidebar}>
              <div className={styles.statsCard}>
                
                <div className={styles.statBox}>
                  <Trophy size={24} className={styles.statIcon} style={{ color: 'var(--titan-status-paid)' }} />
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>مجموع جوایز</span>
                    <span className={styles.statValuePrize}>{tournament.prizePool}</span>
                  </div>
                </div>

                <div className={styles.statDivider} />

                <div className={styles.statRow}>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>شرکت‌کنندگان</span>
                    <span className={styles.statValue}>
                      {tournament.participants.toLocaleString('fa-IR')} <small>/ {tournament.maxParticipants.toLocaleString('fa-IR')}</small>
                    </span>
                  </div>
                  <Users size={20} className={styles.statIcon} />
                </div>
                
                <div className={styles.progressBar}>
                  <div className={styles.progressTrack}>
                    <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
                  </div>
                </div>

                <div className={styles.statRow}>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>تاریخ شروع</span>
                    <span className={styles.statValue}>{tournament.startDate}</span>
                  </div>
                  <Calendar size={20} className={styles.statIcon} />
                </div>

                <div className={styles.statRow}>
                  <div className={styles.statInfo}>
                    <span className={styles.statLabel}>ورودیه</span>
                    <span className={styles.statValue}>
                      {tournament.entryFeeType === 'free' ? 'رایگان' : tournament.entryFee}
                    </span>
                  </div>
                  <div className={styles.feeIcon}>
                    {tournament.entryFeeType === 'free' ? '🎁' : '💎'}
                  </div>
                </div>

                <div className={styles.actionBox}>
                  <Button 
                    size="lg" 
                    variant={isRegistrationOpen ? 'primary' : 'secondary'} 
                    fullWidth 
                    glow={isRegistrationOpen}
                    icon={isRegistrationOpen ? <Swords size={20} /> : undefined}
                  >
                    {isRegistrationOpen ? 'ثبت‌نام در تورنمنت' : 'ثبت‌نام بسته شده'}
                  </Button>
                  <p className={styles.actionNote}>
                    {isRegistrationOpen ? 'ظرفیت محدود است. همین حالا جای خود را رزرو کنید.' : 'این تورنمنت دیگر بازیکن جدید نمی‌پذیرد.'}
                  </p>
                </div>
                
              </div>
            </aside>
            
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
