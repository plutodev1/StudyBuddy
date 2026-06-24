import Link from 'next/link';
import './Header.css';

export default function Header() {
  return (
    <header className="header glass">
      <div className="container header-content">
        <Link href="/" className="logo">
          Study<span className="gradient-text">Buddy</span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
