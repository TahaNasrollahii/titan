export interface Game {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  genre: string;
  coverImage: string;
  logoImage: string;
  tournamentCount: number;
  productCount: number;
  playerCount: number;
  accentColor: string;
  accentGradient: string;
}

export interface Tournament {
  id: string;
  slug: string;
  title: string;
  gameId: string;
  gameName: string;
  gameImage: string;
  status: 'live' | 'upcoming' | 'completed';
  prizePool: string;
  prizePoolValue: number;
  participants: number;
  maxParticipants: number;
  entryFee: string;
  entryFeeType: 'free' | 'paid';
  startDate: string;
  endDate: string;
  region: string;
  format: string;
  description: string;
  rules: string[];
  coverImage: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  platform: string;
  gameId?: string;
  gameName?: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  inStock: boolean;
  variants?: ProductVariant[];
  deliveryInfo: string;
}

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
}

export interface Player {
  id: string;
  username: string;
  avatar: string;
  level: number;
  rank: number;
  xp: number;
  maxXp: number;
  favoriteGame: string;
  favoriteGameId: string;
  wins: number;
  matches: number;
  winRate: number;
  points: number;
  earnings: string;
  earningsValue: number;
  badges: string[];
  joinDate: string;
}

export interface CartItem {
  product: Product;
  selectedVariant?: ProductVariant;
  quantity: number;
}

export interface LeaderboardEntry {
  rank: number;
  player: Player;
  game: string;
  wins: number;
  matches: number;
  winRate: number;
  points: number;
  earnings: string;
}

export type AtmosphereIntensity = 'hero' | 'high' | 'medium' | 'low' | 'none';
