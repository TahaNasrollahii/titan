import { Game } from '@/types';
import { Gamepad2, ShoppingBag } from 'lucide-react';
import styles from './GameCard.module.css';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <a href={`/games/${game.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <div
          className={styles.image}
          style={{
            backgroundImage: `url('/images/games/mock_game.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className={styles.overlay} />
        <div className={styles.glowEdge} style={{ background: game.accentColor }} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{game.title}</h3>
        <span className={styles.genre}>{game.genre}</span>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <Gamepad2 size={14} />
            <span>{game.tournamentCount.toLocaleString('fa-IR')} تورنمنت</span>
          </div>
          <div className={styles.metaItem}>
            <ShoppingBag size={14} />
            <span>{game.productCount.toLocaleString('fa-IR')} محصول</span>
          </div>
        </div>

        <div className={styles.cta}>
          <span>کاوش کنید</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.arrow}>
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </a>
  );
}
