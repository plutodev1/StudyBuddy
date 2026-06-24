"use client";

import { useState } from 'react';
import Link from 'next/link';
import '../auth.css';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth logic goes here
  };

  return (
    <div className="auth-page-wrapper">
      {/* Background Glows */}
      <div className="auth-bg-glow auth-glow-violet"></div>
      <div className="auth-bg-glow auth-glow-pink"></div>
      <div className="auth-bg-glow auth-glow-cyan"></div>

      {/* Floating Home Nav button */}
      <Link href="/" className="auth-back-btn">
        <span>←</span> Back to Home
      </Link>

      {/* Glass card container */}
      <div className="auth-card">
        <div className="auth-card-header">
          <img src="/logo.png" alt="StudyBuddy Logo" width={48} height={48} style={{ borderRadius: '12px', marginBottom: '16px' }} />
          <h1>Resume your study</h1>
          <p>Access your AI study guides, schedules, and ASUU catch-up tools.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email field */}
          <div className="auth-group">
            <label className="auth-label">Student Email</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </span>
              <input 
                type="email" 
                className="auth-input auth-input-with-icon" 
                placeholder="e.g. tobi@unilag.edu.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="auth-group">
            <label className="auth-label">Password</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="auth-input auth-input-with-icon" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span 
                className="auth-input-icon" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ fontSize: '1rem', right: '16px' }}
              >
                {showPassword ? '🔓' : '🔒'}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn-primary glow-effect" style={{ padding: '14px', width: '100%', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 700 }}>
            Sign In
          </button>
        </form>

        {/* Social logins */}
        <div className="auth-divider">or continue with</div>
        
        <div className="auth-oauth-grid">
          <button className="auth-oauth-btn">
            <span style={{ fontSize: '1.1rem' }}>🌐</span> Google
          </button>
          <button className="auth-oauth-btn">
            <span style={{ fontSize: '1.1rem' }}>🐙</span> GitHub
          </button>
        </div>

        {/* Footer link */}
        <div className="auth-footer">
          Don't have an account? <Link href="/auth/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
