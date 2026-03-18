import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.backdrop}>
      <ClipLoader size={60} color="#4f8cff" />
    </div>
  );
}
