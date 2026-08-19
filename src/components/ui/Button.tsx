import styles from './Button.module.css';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'galaxy' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  fullWidth?: boolean;
  glow?: boolean;
  href?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'start',
  fullWidth = false,
  glow = false,
  className = '',
  disabled,
  href,
  ...props
}: ButtonProps) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    glow ? styles.glow : '',
    loading ? styles.loading : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <Loader2 className={styles.spinner} size={size === 'sm' ? 14 : 18} />}
      {!loading && icon && iconPosition === 'start' && <span className={styles.icon}>{icon}</span>}
      {children && <span>{children}</span>}
      {!loading && icon && iconPosition === 'end' && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classNames}>
        {content}
      </a>
    );
  }

  return (
    <button className={classNames} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}
