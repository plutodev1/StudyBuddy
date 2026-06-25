"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import "../auth.css";

const slides = [
  {
    icon: '📄',
    title: 'Summarize Lectures in Seconds',
    description: 'Drop lecture slides, notes, or research papers and get structured, high-yield summaries instantly.',
    metric: '⚡ 10s Average Generate Time'
  },
  {
    icon: '🎯',
    title: 'Practice with AI Past Questions',
    description: 'Test your knowledge with mock exams built to match the grading styles of Nigerian universities.',
    metric: '📝 98% Practice Accuracy'
  },
  {
    icon: '📈',
    title: 'Keep Your CGPA on Track',
    description: 'Plan study timelines, calculate grade requirements, and keep learning even during strike delays.',
    metric: '🚀 Over 12k Active Students'
  }
];

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [school, setSchool] = useState("");
  const [password, setPassword] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    try {
      const supabase = createBrowserSupabaseClient();
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) {
          router.replace("/dashboard");
        }
      });
    } catch {
      // Supabase not configured yet.
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("");
    setIsBusy(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            school,
          },
        },
      });

      if (signUpError) {
        throw signUpError;
      }

      if (data.session) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      setStatus("Account created. Check your email if confirmations are enabled, then sign in.");
      router.push("/auth/login");
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Sign up failed.");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      {/* Background Glows */}
      <div className="auth-bg-glow auth-glow-violet"></div>
      <div className="auth-bg-glow auth-glow-pink"></div>
      <div className="auth-bg-glow auth-glow-cyan"></div>

      {/* Floating Back to Home Nav */}
      <Link href="/" className="auth-back-btn">
        <span>←</span> Back to Home
      </Link>

      <div className="auth-container-split">
        {/* Left Showcase Column */}
        <div className="auth-showcase-panel">
          <Link href="/" className="showcase-brand">
            <img src="/logo.svg" alt="StudyBuddy Logo" width={28} height={28} style={{ borderRadius: '6px' }} />
            <span>Study<span className="gradient-text">Buddy</span></span>
          </Link>

          <div className="auth-slideshow-container">
            <div 
              className="auth-slideshow-track"
              style={{ transform: `translateX(-${activeSlide * 33.333}%)` }}
            >
              {slides.map((slide, index) => (
                <div 
                  key={index} 
                  className={`auth-slide ${activeSlide === index ? 'active' : ''}`}
                >
                  <span className="slide-icon">{slide.icon}</span>
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <span className="slide-metric">{slide.metric}</span>
                </div>
              ))}
            </div>

            <div className="auth-carousel-pagination">
              <div className="auth-slide-indicators">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`auth-slide-indicator ${activeSlide === index ? 'active' : ''}`}
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <div className="auth-carousel-controls">
                <span className="auth-carousel-counter">
                  0{activeSlide + 1} <span className="counter-divider">/</span> 0{slides.length}
                </span>
                <div className="auth-carousel-nav">
                  <button 
                    type="button" 
                    className="auth-nav-btn prev-btn" 
                    onClick={() => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                    aria-label="Previous slide"
                  >
                    ←
                  </button>
                  <button 
                    type="button" 
                    className="auth-nav-btn next-btn" 
                    onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
                    aria-label="Next slide"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="showcase-footer">
            <div className="showcase-stats">
              <div className="stat-number-wrapper" style={{ display: 'flex', gap: '32px' }}>
                <div className="stat-item">
                  <span className="stat-number">12k+</span>
                  <span className="stat-label">Students Synced</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="auth-form-panel">
          <div className="auth-card">
            <div className="auth-card-header">
              <h1>Join the Squad</h1>
              <p>Lock in your CGPA, summarize slides, and practice past questions.</p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {error && <p className="auth-error">{error}</p>}
              {status && <p className="auth-status">{status}</p>}
              {/* Full Name field */}
              <div className="auth-group">
                <label className="auth-label">Full Name</label>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon-left">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </span>
                  <input 
                    type="text" 
                    className="auth-input auth-input-with-icon" 
                    placeholder="Tobi Adebayo"
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
                    placeholder="tobi@unilag.edu.ng"
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
                  <button 
                    type="button"
                    className="auth-input-icon" 
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="btn-primary auth-submit-btn" disabled={isBusy}>
                {isBusy ? "Creating account..." : "Create Account ➔"}
              </button>
            </form>

            {/* Social logins */}
            <div className="auth-divider">or sign up with</div>
            
            <div className="auth-oauth-grid">
              <button className="auth-oauth-btn" type="button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="auth-oauth-btn" type="button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                GitHub
              </button>
            </div>

            {/* Footer link */}
            <div className="auth-footer">
              Already have an account? <Link href="/auth/login">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
