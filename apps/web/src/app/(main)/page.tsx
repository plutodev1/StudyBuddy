"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import MorphingScene from '../../components/MorphingScene';
import InteractiveDemo from '../../components/InteractiveDemo';
import Pricing from '../../components/Pricing';
import Faq from '../../components/Faq';
import Magazine from '../../components/Magazine';
import './page.css';

const fadeInOnly = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
} as const;

export default function Home() {
  const cinematicZoneRef = useRef<HTMLDivElement>(null);
  
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const solutionSectionRef = useRef<HTMLDivElement>(null);
  const whyUsSectionRef = useRef<HTMLDivElement>(null);
  const testimonialSectionRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the entire cinematic story-telling wrapper
  const { scrollYProgress: mainScroll } = useScroll({
    target: cinematicZoneRef,
    offset: ["start start", "end end"]
  });

  // Track individual section scroll progresses for text parallax offsets
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: solutionScroll } = useScroll({
    target: solutionSectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: whyUsScroll } = useScroll({
    target: whyUsSectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: testimonialScroll } = useScroll({
    target: testimonialSectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax translation transforms (adjust offset ranges for speed differences)
  const heroTitleY = useTransform(heroScroll, [0, 1], [0, -140]);
  
  const solutionCardY = useTransform(solutionScroll, [0, 1], [220, -220]);
  const whyUsCardY = useTransform(whyUsScroll, [0, 1], [220, -220]);
  const testimonialCardY = useTransform(testimonialScroll, [0, 1], [220, -220]);

  return (
    <div className="app-wrapper">
      
      {/* Cinematic scroll zone holding the single WebGL background and the 4 chapters */}
      <div ref={cinematicZoneRef} style={{ position: 'relative' }}>
        
        {/* Persistent, morphing 3D scene */}
        <div className="bg-3d-sticky-global">
          <MorphingScene scrollProgress={mainScroll} />
          <div className="vignette-mask"></div>
        </div>

        {/* Chapter 1: Hero */}
        <section ref={heroSectionRef} className="cinematic-section hero-cinematic">
          <div className="cinematic-content container flex-center">
            <motion.div className="hero-content text-center" style={{ y: heroTitleY }}>
              <motion.div
                className="hero-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <span className="badge-dot"></span> StudyBuddy v2.0 is live
              </motion.div>
              <motion.h1 
                className="hero-title"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Crush your exams, <br/>
                <span className="gradient-text">stress-free</span>.
              </motion.h1>
              <motion.p 
                className="hero-subtitle mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.8 }}
              >
                Your ultimate AI copilot for university. Turn messy lectures into bite-sized summaries, generate practice tests, and automate your study schedule.
              </motion.p>
              <motion.div 
                className="hero-actions justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <Link href="/auth/signup" className="btn-primary btn-large glow-effect">Get Started Free</Link>
                <a href="#demo" className="btn-secondary btn-large">See How It Works</a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Chapter 2: The Solution */}
        <section ref={solutionSectionRef} className="cinematic-section">
          <div className="cinematic-content container align-left">
            <motion.div 
              className="cinematic-text-block" 
              style={{ y: solutionCardY }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInOnly}
            >
              <div className="section-label">THE SOLUTION</div>
              <h2>From absolute <span className="gradient-text">chaos</span> to perfect order.</h2>
              <p>We know the feeling: you have three 150-page slide decks, your exam is in 48 hours, and none of it makes sense.</p>
              <p>StudyBuddy ingests all that disorganized noise and instantly structures it into clean, prioritized concepts. We don't just give you an AI chat; we give you a tailored academic roadmap.</p>
            </motion.div>
          </div>
        </section>

        {/* Chapter 3: Why Us */}
        <section ref={whyUsSectionRef} className="cinematic-section">
          <div className="cinematic-content container align-right">
            <motion.div 
              className="cinematic-text-block" 
              style={{ y: whyUsCardY }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={fadeInOnly}
            >
              <div className="section-label">WHY STUDYBUDDY</div>
              <h2>An AI built <span className="gradient-text">specifically</span> for you.</h2>
              <p>Unlike generic AI models that give you broad Wikipedia summaries, our engine is fine-tuned to understand how your specific university formats its materials.</p>
              <p>We connect the dots between your syllabus, past questions, and lecture notes to predict exactly what you need to know to secure an A.</p>
            </motion.div>
          </div>
        </section>

        {/* Chapter 4: The Stories (Testimonials) */}
        <section ref={testimonialSectionRef} className="cinematic-section">
          <div className="cinematic-content container flex-center" style={{ overflow: 'visible' }}>
            <motion.div 
              className="w-full" 
              style={{ y: testimonialCardY }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={fadeInOnly}
            >
              <div className="text-center" style={{ marginBottom: '40px' }}>
                <div className="section-label">THE STORIES</div>
                <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800 }}>Inside the <span className="gradient-text">StudyBuddy</span> Diary</h2>
              </div>
              <Magazine />
            </motion.div>
          </div>
        </section>
      </div>

      {/* Interactive Demo Section */}
      <InteractiveDemo />

      {/* Pricing Section */}
      <Pricing />

      {/* FAQ Section */}
      <Faq />

      {/* Final Action CTA */}
      <div className="solid-bg-wrapper">
        <div className="container">
          <div className="final-cta text-center" style={{ padding: '100px 0 120px' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '24px' }}>Ready to crush your studies?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
              Join thousands of students who are studying smarter and saving hours of stress every week.
            </p>
            <Link href="/auth/signup" className="btn-primary btn-large glow-effect">Get Started for Free</Link>
          </div>
        </div>
      </div>
    </div>
  );
}


