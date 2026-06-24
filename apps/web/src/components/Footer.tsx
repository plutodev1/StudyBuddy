"use client";

import './Footer.css';
import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-content">
        {/* Brand details */}
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <img src="/logo.png" alt="StudyBuddy" width={32} height={32} style={{ borderRadius: '8px' }} />
            <span>Study<span className="gradient-text">Buddy</span></span>
          </Link>
          <p className="footer-desc">
            Your AI copilot for surviving and thriving in Nigerian universities. Study smart, beat ASUU delays, and secure your first-class.
          </p>
          
          <div className="footer-status-badge">
            <span className="status-dot"></span>
            <span className="status-text">ASUU Sync: Active & Online</span>
          </div>

          <div className="footer-socials">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon twitter" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon github" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon discord" aria-label="Discord">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8m-8-3h8m-8 6h6"/></svg>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-links">
          <div className="link-group">
            <h4>Features</h4>
            <Link href="/auth/signup">Lecture Summarizer</Link>
            <Link href="/auth/signup">Past Questions Hub</Link>
            <Link href="/auth/signup">CGPA Target Tracker</Link>
            <Link href="/auth/signup">AI Study Planner</Link>
          </div>
          <div className="link-group">
            <h4>Resources</h4>
            <Link href="/">Study Hacks Blog</Link>
            <Link href="/">Campus Wiki</Link>
            <Link href="/">Student Support</Link>
            <Link href="/contact">Contact Support</Link>
          </div>
          <div className="link-group">
            <h4>Company</h4>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Page</Link>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>
          </div>
        </div>

        {/* Newsletter subscribe widget */}
        <div className="footer-newsletter">
          <h4>Stay Ahead</h4>
          <p className="newsletter-text">Join 12,000+ students. Get weekly exam tips, study hacks, and platform updates.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="newsletter-input-wrapper">
              <input 
                type="email" 
                placeholder="Student email address" 
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter-btn">
                {subscribed ? '✓' : '➔'}
              </button>
            </div>
            {subscribed && <span className="newsletter-success">Subscribed successfully! Check your inbox.</span>}
          </form>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} StudyBuddy. Built for the academic hustle.</p>
          <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top">
            Back to Top <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}

