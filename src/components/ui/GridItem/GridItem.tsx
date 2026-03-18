import type { ReactNode } from 'react';
import styles from './GridItem.module.css';

interface GridItemProps {
  children: ReactNode;
}

export default function GridItem({ children }: GridItemProps) {
  return <li className={styles.item}>{children}</li>;
}
