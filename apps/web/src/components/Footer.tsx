import './Footer.css';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-brand">
          <Link href="/" className="logo">
            Study<span className="gradient-text">Buddy</span>
          </Link>
          <p className="footer-desc">
            Your AI copilot for surviving and thriving in Nigerian universities.
          </p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Product</h4>
            <Link href="/">Web App</Link>
            <Link href="/">Browser Extension</Link>
            <Link href="/">Pricing</Link>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} StudyBuddy. All rights reserved.</p>
      </div>
    </footer>
  );
}
