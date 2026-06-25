"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from '@/lib/auth/use-session';
import './Header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { session, loading } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header glass">
      <div className="container header-content">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logo.svg" alt="StudyBuddy" width={32} height={32} style={{ borderRadius: '8px' }} />
          <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
            Study<span className="gradient-text">Buddy</span>
          </span>
        </Link>
        
        {/* Desktop Links */}
        <nav className="nav-links desktop-only">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        
        <div className="header-actions desktop-only" style={{ display: 'flex', gap: '16px' }}>
          {!loading && session ? (
            <Link href="/dashboard" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Dashboard</Link>
          ) : (
            <>
              <Link href="/auth/login" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Sign In</Link>
              <Link href="/auth/signup" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <motion.line 
              x1="3" y1="6" x2="21" y2="6" 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.line 
              x1="3" y1="12" x2="21" y2="12" 
              animate={{ opacity: isOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.line 
              x1="3" y1="18" x2="21" y2="18" 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-drawer glass"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="mobile-nav-links">
              <Link href="/" onClick={toggleMenu}>Home</Link>
              <Link href="/about" onClick={toggleMenu}>About</Link>
              <Link href="/contact" onClick={toggleMenu}>Contact</Link>
              <div className="mobile-actions">
                {!loading && session ? (
                  <Link href="/dashboard" className="btn-primary" onClick={toggleMenu}>Dashboard</Link>
                ) : (
                  <>
                    <Link href="/auth/login" className="btn-secondary" onClick={toggleMenu}>Sign In</Link>
                    <Link href="/auth/signup" className="btn-primary" onClick={toggleMenu}>Get Started</Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

