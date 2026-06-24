import Link from 'next/link';
import './Header.css';

export default function Header() {
  return (
    <header className="header glass">
      <div className="container header-content">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.png" alt="StudyBuddy" width={32} height={32} style={{ borderRadius: '8px' }} />
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link href="/login" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Sign In</Link>
          <Link href="/login" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Get Started</Link>
        </div>
      </div>
    </header>
  );
}
