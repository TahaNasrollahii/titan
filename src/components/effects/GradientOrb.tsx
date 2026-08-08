'use client';

import styles from './GradientOrb.module.css';

interface GradientOrbProps {
  color?: 'blue' | 'violet' | 'magenta';
  size?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  opacity?: number;
  animate?: boolean;
}

export default function GradientOrb({
  color = 'blue',
  size = 400,
  top,
  left,
  right,
  bottom,
  opacity = 0.3,
  animate = true,
}: GradientOrbProps) {
  const colorMap = {
    blue: 'var(--titan-accent-blue)',
    violet: 'var(--titan-accent-violet)',
    magenta: 'var(--titan-accent-magenta)',
  };

  return (
    <div
      className={`${styles.orb} ${animate ? styles.animate : ''}`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        opacity,
        background: `radial-gradient(circle, ${colorMap[color]} 0%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
}
