"use client";

import { useState, useEffect, useRef } from 'react';
import './Magazine.css';

interface PageSpread {
  id: number;
  left: {
    badge?: string;
    title: string;
    text?: string;
    quote?: string;
    author?: string;
    dept?: string;
    rating?: string;
  };
  right: {
    badge?: string;
    title: string;
    text?: string;
    quote?: string;
    author?: string;
    dept?: string;
    rating?: string;
  };
}

const SPREADS: PageSpread[] = [
  {
    id: 1,
    left: {
      badge: "CAMPUS ARCHIVES",
      title: "StudyBuddy Chronicles",
      text: "Real university academic survival stories. From ASUU strike backlogs to 48-hour exam crunches, see how students use AI to defend their CGPA and stay stress-free."
    },
    right: {
      badge: "COVER STORY",
      title: "The 400L CGPA Rescue",
      quote: "Omo, StudyBuddy saved my CGPA. I didn't know anything two weeks to exams, but the AI summaries were a lifesaver. The mock exams generated from my exact slides are too accurate.",
      author: "Tobi Adebayo",
      dept: "Computer Science, UNILAG",
      rating: "⭐⭐⭐⭐⭐"
    }
  },
  {
    id: 2,
    left: {
      badge: "MIDTERM SUCCESS",
      title: "From Cs to Straight As",
      quote: "Generating mock tests from my lecture slides is basically a cheat code for tests. I study the questions, check the explanations, and my scores went from C to straight As!",
      author: "Sarah Alabi",
      dept: "Biochemistry, Covenant Univ.",
      rating: "⭐⭐⭐⭐⭐"
    },
    right: {
      badge: "SCHEDULING WINS",
      title: "No More Midnight Panic",
      quote: "The smart scheduling is my favorite. I drop in my exam calendar, and StudyBuddy builds a perfectly paced revision schedule. It tells me exactly what to read every single day.",
      author: "Chioma Nze",
      dept: "Law, Univ. of Ibadan",
      rating: "⭐⭐⭐⭐⭐"
    }
  }
];

export default function Magazine() {
  const [activeSpread, setActiveSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play page flips (simulating the wind turning pages)
  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [activeSpread]);

  const handleNext = () => {
    if (isFlipping) return;
    setFlipDirection('next');
    setIsFlipping(true);
    
    setTimeout(() => {
      setActiveSpread((prev) => (prev + 1) % SPREADS.length);
      setIsFlipping(false);
    }, 800); // matches animation duration
  };

  const handlePrev = () => {
    if (isFlipping) return;
    setFlipDirection('prev');
    setIsFlipping(true);

    setTimeout(() => {
      setActiveSpread((prev) => (prev - 1 + SPREADS.length) % SPREADS.length);
      setIsFlipping(false);
    }, 800); // matches animation duration
  };

  const currentSpread = SPREADS[activeSpread];
  const nextSpread = SPREADS[(activeSpread + 1) % SPREADS.length];
  const prevSpread = SPREADS[(activeSpread - 1 + SPREADS.length) % SPREADS.length];

  const showPrevLeft = isFlipping && flipDirection === 'prev';
  const showNextRight = isFlipping && flipDirection === 'next';

  const leftContent = showPrevLeft ? prevSpread.left : currentSpread.left;
  const leftPageNum = showPrevLeft ? ((activeSpread - 1 + SPREADS.length) % SPREADS.length) * 2 + 1 : activeSpread * 2 + 1;

  const rightContent = showNextRight ? nextSpread.right : currentSpread.right;
  const rightPageNum = showNextRight ? ((activeSpread + 1) % SPREADS.length) * 2 + 2 : activeSpread * 2 + 2;

  return (
    <div className="magazine-table-container" onMouseEnter={stopAutoPlay} onMouseLeave={startAutoPlay}>
      
      {/* Wooden Table surface overlay shadow */}
      <div className="table-surface-effect"></div>

      {/* 3D Magazine Container sitting on the table */}
      <div className={`magazine-book ${isFlipping ? `flipping-${flipDirection}` : ''}`}>
        
        {/* Left Page (Fixed) */}
        <div className="magazine-side left-side">
          <div className="page-content">
            <span className="page-badge">{leftContent.badge}</span>
            <h3 className="page-title">{leftContent.title}</h3>
            {leftContent.text && <p className="page-text">{leftContent.text}</p>}
            {leftContent.quote && (
              <blockquote className="page-quote">
                "{leftContent.quote}"
              </blockquote>
            )}
            {leftContent.author && (
              <div className="page-author-details">
                <span className="rating">{leftContent.rating}</span>
                <span className="author-name">— {leftContent.author}</span>
                <span className="author-dept">{leftContent.dept}</span>
              </div>
            )}
            <span className="page-number">Page {leftPageNum}</span>
          </div>
        </div>

        {/* Right Page (Fixed) */}
        <div className="magazine-side right-side">
          <div className="page-content">
            <span className="page-badge">{rightContent.badge}</span>
            <h3 className="page-title">{rightContent.title}</h3>
            {rightContent.text && <p className="page-text">{rightContent.text}</p>}
            {rightContent.quote && (
              <blockquote className="page-quote">
                "{rightContent.quote}"
              </blockquote>
            )}
            {rightContent.author && (
              <div className="page-author-details">
                <span className="rating">{rightContent.rating}</span>
                <span className="author-name">— {rightContent.author}</span>
                <span className="author-dept">{rightContent.dept}</span>
              </div>
            )}
            <span className="page-number">Page {rightPageNum}</span>
          </div>
        </div>

        {/* Flipping Page (Animates in 3D space) */}
        <div className="magazine-page-flip">
          {/* Front of flipping page */}
          <div className="page-flip-face front-face">
            <div className="page-content">
              {flipDirection === 'next' ? (
                <>
                  <span className="page-badge">{currentSpread.right.badge}</span>
                  <h3 className="page-title">{currentSpread.right.title}</h3>
                  {currentSpread.right.quote && <blockquote className="page-quote">"{currentSpread.right.quote}"</blockquote>}
                  {currentSpread.right.author && (
                    <div className="page-author-details">
                      <span className="rating">{currentSpread.right.rating}</span>
                      <span className="author-name">— {currentSpread.right.author}</span>
                      <span className="author-dept">{currentSpread.right.dept}</span>
                    </div>
                  )}
                  <span className="page-number">Page {activeSpread * 2 + 2}</span>
                </>
              ) : (
                <>
                  <span className="page-badge">{currentSpread.left.badge}</span>
                  <h3 className="page-title">{currentSpread.left.title}</h3>
                  {currentSpread.left.quote && <blockquote className="page-quote">"{currentSpread.left.quote}"</blockquote>}
                  {currentSpread.left.author && (
                    <div className="page-author-details">
                      <span className="rating">{currentSpread.left.rating}</span>
                      <span className="author-name">— {currentSpread.left.author}</span>
                      <span className="author-dept">{currentSpread.left.dept}</span>
                    </div>
                  )}
                  <span className="page-number">Page {activeSpread * 2 + 1}</span>
                </>
              )}
            </div>
          </div>

          {/* Back of flipping page */}
          <div className="page-flip-face back-face">
            <div className="page-content">
              {flipDirection === 'next' ? (
                <>
                  <span className="page-badge">{nextSpread.left.badge}</span>
                  <h3 className="page-title">{nextSpread.left.title}</h3>
                  {nextSpread.left.text && <p className="page-text">{nextSpread.left.text}</p>}
                  {nextSpread.left.quote && <blockquote className="page-quote">"{nextSpread.left.quote}"</blockquote>}
                  {nextSpread.left.author && (
                    <div className="page-author-details">
                      <span className="rating">{nextSpread.left.rating}</span>
                      <span className="author-name">— {nextSpread.left.author}</span>
                      <span className="author-dept">{nextSpread.left.dept}</span>
                    </div>
                  )}
                  <span className="page-number">Page {((activeSpread + 1) % SPREADS.length) * 2 + 1}</span>
                </>
              ) : (
                <>
                  <span className="page-badge">{prevSpread.right.badge}</span>
                  <h3 className="page-title">{prevSpread.right.title}</h3>
                  {prevSpread.right.quote && <blockquote className="page-quote">"{prevSpread.right.quote}"</blockquote>}
                  {prevSpread.right.author && (
                    <div className="page-author-details">
                      <span className="rating">{prevSpread.right.rating}</span>
                      <span className="author-name">— {prevSpread.right.author}</span>
                      <span className="author-dept">{prevSpread.right.dept}</span>
                    </div>
                  )}
                  <span className="page-number">Page {((activeSpread - 1 + SPREADS.length) % SPREADS.length) * 2 + 2}</span>
                </>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Interactive controls sitting on the wooden tabletop */}
      <div className="table-controls">
        <button className="control-switch-btn prev" onClick={handlePrev} disabled={isFlipping}>
          <span>← Flip Back</span>
        </button>
        <div className="wind-indicator">
          <span className="wind-breeze-icon">🍃</span>
          <span className="wind-text">Page turns automatically (Auto-Play)</span>
        </div>
        <button className="control-switch-btn next" onClick={handleNext} disabled={isFlipping}>
          <span>Turn Page →</span>
        </button>
      </div>

    </div>
  );
}
