'use client';

import { usePathname } from 'next/navigation';
import GalaxyBackground from './GalaxyBackground';
import SolarSystemJourney from './SolarSystemJourney';

export default function BackgroundManager() {
  const pathname = usePathname();

  // Show the solar system journey only on the home page
  if (pathname === '/') {
    return <SolarSystemJourney />;
  }

  // Fallback to the standard galaxy background for all other pages
  return <GalaxyBackground />;
}
