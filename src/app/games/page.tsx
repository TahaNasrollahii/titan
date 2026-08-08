import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/ui/SectionHeader';
import GameCard from '@/components/cards/GameCard';
import GradientOrb from '@/components/effects/GradientOrb';
import { games } from '@/data/games';
import styles from './page.module.css';

export default function GamesPage() {
  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        <div className={styles.hero}>
          <GradientOrb color="violet" size={500} top="-10%" left="20%" opacity={0.12} />
          <div className="container">
            <SectionHeader 
              eyebrow="بازی‌های پلتفرم"
              title="دنیای خود را انتخاب کنید"
              subtitle="عناوین تحت پشتیبانی تایتان. برای هر بازی تورنمنت‌ها و محصولات اختصاصی را کشف کنید."
            />
          </div>
        </div>

        <div className="container">
          <div className={styles.content}>
            <div className={styles.grid}>
              {games.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
