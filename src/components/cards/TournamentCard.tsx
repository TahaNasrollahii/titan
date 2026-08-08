import { Tournament } from '@/types';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Users, Trophy, Calendar, Zap } from 'lucide-react';
import styles from './TournamentCard.module.css';

interface TournamentCardProps {
  tournament: Tournament;
}

const statusLabels = {
  live: 'زنده',
  upcoming: 'بزودی',
  completed: 'پایان‌یافته',
};

export default function TournamentCard({ tournament }: TournamentCardProps) {
  const progressPercent = (tournament.participants / tournament.maxParticipants) * 100;

  return (
    <article className={styles.card}>
      <div className={styles.coverImage} style={{ backgroundImage: "url('/images/tournaments/mock_tournament.png')" }} />
      <div className={styles.cardHeader}>
        <div className={styles.gameInfo}>
          <div className={styles.gameIcon}>
            <span className={`${styles.gameName} en-text`}>{tournament.gameName}</span>
          </div>
          <Badge variant={tournament.status} pulse={tournament.status === 'live'}>
            {statusLabels[tournament.status]}
          </Badge>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.title}>
          <a href={`/tournaments/${tournament.slug}`}>{tournament.title}</a>
        </h3>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <Trophy size={16} className={styles.statIcon} />
            <div className={styles.statContent}>
              <span className={styles.statLabel}>جایزه</span>
              <span className={styles.statValue}>{tournament.prizePool}</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <Users size={16} className={styles.statIcon} />
            <div className={styles.statContent}>
              <span className={styles.statLabel}>شرکت‌کنندگان</span>
              <span className={styles.statValue}>
                {tournament.participants.toLocaleString('fa-IR')} / {tournament.maxParticipants.toLocaleString('fa-IR')}
              </span>
            </div>
          </div>

          <div className={styles.statItem}>
            <Zap size={16} className={styles.statIcon} />
            <div className={styles.statContent}>
              <span className={styles.statLabel}>ورودیه</span>
              <span className={styles.statValue}>{tournament.entryFee}</span>
            </div>
          </div>

          <div className={styles.statItem}>
            <Calendar size={16} className={styles.statIcon} />
            <div className={styles.statContent}>
              <span className={styles.statLabel}>تاریخ</span>
              <span className={styles.statValue}>{tournament.startDate}</span>
            </div>
          </div>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className={styles.progressLabel}>
            {Math.round(progressPercent).toLocaleString('fa-IR')}٪ تکمیل
          </span>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <Badge variant={tournament.entryFeeType === 'free' ? 'free' : 'paid'} size="md">
          {tournament.entryFeeType === 'free' ? 'رایگان' : 'ورودی‌دار'}
        </Badge>
        <Button
          size="sm"
          variant={tournament.status === 'completed' ? 'secondary' : 'primary'}
          href={`/tournaments/${tournament.slug}`}
        >
          {tournament.status === 'completed' ? 'مشاهده نتایج' : tournament.status === 'live' ? 'ورود به مسابقه' : 'ثبت‌نام'}
        </Button>
      </div>
    </article>
  );
}
