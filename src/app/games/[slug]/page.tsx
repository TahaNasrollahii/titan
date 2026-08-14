import { getGameBySlug } from '@/data/games';
import { getTournamentsByGame } from '@/data/tournaments';
import { getProductsByGame } from '@/data/products';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import SectionHeader from '@/components/ui/SectionHeader';
import TournamentCard from '@/components/cards/TournamentCard';
import ProductCard from '@/components/cards/ProductCard';
import GradientOrb from '@/components/effects/GradientOrb';
import TrendingBanner from '@/components/effects/TrendingBanner';
import { Users, Trophy, ShoppingBag } from 'lucide-react';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GamePage({ params }: Props) {
  const { slug } = await params;
  const game = getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const tournaments = getTournamentsByGame(game.id);
  const products = getProductsByGame(game.id);

  return (
    <>
      <Navbar />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <TrendingBanner />

        {/* Content */}
        <div className="container">
          
          {tournaments.length > 0 && (
            <section className={styles.section}>
              <SectionHeader 
                title="تورنمنت‌های فعال" 
                align="start"
                className={styles.sectionHeader}
              />
              <div className={styles.grid}>
                {tournaments.map(t => (
                  <TournamentCard key={t.id} tournament={t} />
                ))}
              </div>
            </section>
          )}

          {products.length > 0 && (
            <section className={styles.section}>
              <SectionHeader 
                title="محصولات فروشگاه" 
                align="start"
                className={styles.sectionHeader}
              />
              <div className={styles.gridProducts}>
                {products.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
