"use client";

import { useState } from 'react';
import Link from 'next/link';
import '../auth.css';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('');
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
          <h1>Join the Squad</h1>
          <p>Lock in your CGPA. Automate slides, generate practice tests, and study stress-free.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Name field */}
          <div className="auth-group">
            <label className="auth-label">Full Name</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </span>
              <input 
                type="text" 
                className="auth-input auth-input-with-icon" 
                placeholder="e.g. Tobi Adebayo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          </div>

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

          {/* School Selector */}
          <div className="auth-group">
            <label className="auth-label">University / Institution</label>
            <div className="auth-input-wrapper">
              <span className="auth-input-icon-left">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
              </span>
              <select 
                className="auth-input auth-select auth-input-with-icon"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                required
              >
                <option value="" disabled>Select your university</option>
                <option value="unilag">University of Lagos (UNILAG)</option>
                <option value="ui">University of Ibadan (UI)</option>
                <option value="oau">Obafemi Awolowo University (OAU)</option>
                <option value="covenant">Covenant University</option>
                <option value="lasu">Lagos State University (LASU)</option>
                <option value="other">Other / International</option>
              </select>
              <span className="auth-select-arrow" style={{ right: '16px' }}>▼</span>
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
                placeholder="Minimum 8 characters"
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
            Create Account
          </button>
        </form>

        {/* Social logins */}
        <div className="auth-divider">or sign up with</div>
        
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
          Already have an account? <Link href="/auth/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
