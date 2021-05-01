import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <Link href="/">
      <a>
        <header className={styles.header}>
          <img src="/logo.svg" alt="logo" />
        </header>
      </a>
    </Link>
  );
}
