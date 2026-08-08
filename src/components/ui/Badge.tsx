import styles from './Badge.module.css';

interface BadgeProps {
  variant: 'live' | 'upcoming' | 'completed' | 'free' | 'paid' | 'default';
  children: React.ReactNode;
  pulse?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  variant = 'default',
  children,
  pulse = false,
  size = 'sm',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={`${styles.badge} ${styles[variant]} ${styles[size]} ${
        pulse ? styles.pulse : ''
      } ${className}`}
    >
      {variant === 'live' && <span className={styles.liveDot} />}
      {children}
    </span>
  );
}
