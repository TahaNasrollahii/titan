import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'start';
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${styles.header} ${styles[align]} ${className}`}>
      {eyebrow && (
        <span className={styles.eyebrow}>{eyebrow}</span>
      )}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && (
        <p className={styles.subtitle}>{subtitle}</p>
      )}
      <div className={styles.decorLine}>
        <span className={styles.decorDot} />
      </div>
    </div>
  );
}
