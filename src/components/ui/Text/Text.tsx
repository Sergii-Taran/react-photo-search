import type { ReactNode } from 'react';
import styles from './Text.module.css';

interface TextProps {
  children: ReactNode;
  align?: 'start' | 'center' | 'end' | 'justify';
  marginBottom?: '0' | '10' | '20';
}

export default function Text({
  children,
  align = 'start',
  marginBottom = '20',
}: TextProps) {
  const alignClass = styles[align];
  const marginClass = styles[`marginBottom${marginBottom}`];

  return (
    <p
      className={`${styles.text} ${styles.error} ${alignClass} ${marginClass}`}
    >
      {children}
    </p>
  );
}
