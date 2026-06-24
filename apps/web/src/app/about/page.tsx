"use client";

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import MorphingScene from '../../components/MorphingScene';
import './about.css';

interface Scenario {
  id: string;
  tabLabel: string;
  problemTitle: string;
  problemText: string;
  solutionTitle: string;
  solutionText: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'strike',
    tabLabel: 'ASUU Strike Backlogs',
    problemTitle: 'Timeline Crunch After a Strike',
    problemText: 'Nigerian universities face frequent academic disruptions. When strikes end, departments squeeze a 15-week semester into a 3-week sprint. Students are bombarded with back-to-back exams, tests, and labs with zero breathing room.',
    solutionTitle: 'Automated Catch-up Roadmap',
    solutionText: 'StudyBuddy structures the backlog. Drop in your files and syllabus, and the AI builds a perfectly paced caught-up plan. It compiles critical summaries and daily quick mock quizzes to get you back on track rapidly.'
  },
  {
    id: 'crunch',
    tabLabel: '48-Hour Exam Crunch',
    problemTitle: 'Exam in 2 Days, 400 Slides Unread',
    problemText: 'You wake up realizing the exam is in 48 hours. You have multiple dense, complex slide decks containing academic terminology you have never seen. Reading all of it in detail is physically impossible.',
    solutionTitle: 'Cheat-Sheet Digests & Mock Tests',
    solutionText: 'Upload your slides. Our engine extracts the core concepts, creates a concise review sheet, and tests your understanding with practice questions styled exactly like the lecturer’s actual exam format.'
  },
  {
    id: 'slides',
    tabLabel: 'Messy Materials',
    problemTitle: 'Lecture Slides are Walls of Raw Text',
    problemText: 'A typical slide is a copy-paste of a textbook page with no structure, highlights, or explanation. It is mentally exhausting to study and isolate what is actually important.',
    solutionTitle: 'Structured Outline Reformatter',
    solutionText: 'Our engine rewrites chaotic lecturer content into clean outlines, highlights key definitions, and attaches straightforward explanations, making slides readable, searchable, and easy to study.'
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
} as const;

export default function About() {
  const [selectedTab, setSelectedTab] = useState('strike');
  const activeScenario = SCENARIOS.find(s => s.id === selectedTab) || SCENARIOS[0];

  const aboutZoneRef = useRef<HTMLDivElement>(null);
  
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const genesisSectionRef = useRef<HTMLDivElement>(null);
  const value1SectionRef = useRef<HTMLDivElement>(null);
  const value2SectionRef = useRef<HTMLDivElement>(null);
  const value3SectionRef = useRef<HTMLDivElement>(null);
  const simulatorSectionRef = useRef<HTMLDivElement>(null);

  // Track page scroll progress for WebGL background morphing
  const { scrollYProgress: mainScroll } = useScroll({
    target: aboutZoneRef,
    offset: ["start start", "end end"]
  });

  // Track section progress for parallax slide transforms
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: genesisScroll } = useScroll({
    target: genesisSectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: val1Scroll } = useScroll({
    target: value1SectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: val2Scroll } = useScroll({
    target: value2SectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: val3Scroll } = useScroll({
    target: value3SectionRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: simScroll } = useScroll({
    target: simulatorSectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms
  const heroY = useTransform(heroScroll, [0, 1], [0, -100]);
  const genesisY = useTransform(genesisScroll, [0, 1], [150, -150]);
  const val1Y = useTransform(val1Scroll, [0, 1], [150, -150]);
  const val2Y = useTransform(val2Scroll, [0, 1], [150, -150]);
  const val3Y = useTransform(val3Scroll, [0, 1], [150, -150]);
  const simY = useTransform(simScroll, [0, 1], [150, -150]);

  return (
    <div ref={aboutZoneRef} className="about-wrapper">
      
      {/* Persistent, morphing 3D scene background */}
      <div className="bg-3d-sticky-global">
        <MorphingScene scrollProgress={mainScroll} />
        <div className="vignette-mask"></div>
      </div>

      {/* Chapter 1: Hero */}
      <section ref={heroSectionRef} className="about-section about-hero-section">
        <div className="about-content container">
          <motion.div className="about-hero-content" style={{ y: heroY }}>
            <motion.div
              className="hero-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="badge-dot"></span> OUR VISION
            </motion.div>
            <h1 className="about-hero-title">
              Built for the <br/>
              <span className="gradient-text">academic hustle</span>.
            </h1>
            <p className="about-hero-subtitle">
              We are on a mission to simplify university study workflows, making academic preparation structured, predictable, and stress-free.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2: The Genesis */}
      <section ref={genesisSectionRef} className="about-section">
        <div className="about-content container align-left">
          <motion.div 
            className="about-text-block" 
            style={{ y: genesisY }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="section-label">THE GENESIS</div>
            <h2>Born from real university <span className="gradient-text">struggles</span>.</h2>
            <p>
              StudyBuddy was born out of the raw experience of navigating university life. We know the stress: weeks of lectures lost to disruptions, followed by compressed academic schedules and overnight slide-cramming.
            </p>
            <p>
              We realized students don't need another generic AI search box. They need a tailored academic copilot that understands their syllabus, reorganizes messy notes, and runs realistic prep mock exams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 3: Value 1 - Academic Precision */}
      <section ref={value1SectionRef} className="about-section">
        <div className="about-content container align-right">
          <motion.div 
            className="about-glass-card" 
            style={{ y: val1Y }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <span className="value-icon">🎯</span>
            <h3>Academic Precision</h3>
            <p>
              Generic AIs give you generic answers. Our parsing engine is optimized to connect the dots between your exact syllabus, past questions, and lecture slides to build guides that actually reflect your upcoming test.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 3: Value 2 - Strike Resilience */}
      <section ref={value2SectionRef} className="about-section">
        <div className="about-content container align-left">
          <motion.div 
            className="about-glass-card" 
            style={{ y: val2Y }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <span className="value-icon">⚡</span>
            <h3>Strike Resilience</h3>
            <p>
              Never fall behind during academic disruptions. Use StudyBuddy to structure your study habits independently, digest textbook material on your own schedule, and walk back onto campus completely prepared for whatever comes next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 3: Value 3 - Smart Automation */}
      <section ref={value3SectionRef} className="about-section">
        <div className="about-content container align-right">
          <motion.div 
            className="about-glass-card" 
            style={{ y: val3Y }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeInUp}
          >
            <span className="value-icon">📅</span>
            <h3>Smart Automation</h3>
            <p>
              Stop manually planning. Drop in your exam calendar and syllabus, and watch StudyBuddy compile daily review checklists. Focus purely on studying; let us handle the scheduling.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 4: Interactive Scenario Simulator */}
      <section ref={simulatorSectionRef} className="about-section" style={{ height: '140vh' }}>
        <div className="about-content container flex-center">
          <motion.div 
            className="about-simulator-container" 
            style={{ y: simY }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={fadeInUp}
          >
            <div className="simulator-title-area text-center">
              <span className="section-label">INTERACTIVE SIMULATOR</span>
              <h2 className="about-simulator-title">How StudyBuddy saves your <span className="gradient-text">semester</span></h2>
              <p style={{ color: 'var(--text-secondary)' }}>Select a situation to see the AI copilot in action</p>
            </div>

            {/* Selector Tabs */}
            <div className="simulator-tabs">
              {SCENARIOS.map(s => (
                <button 
                  key={s.id}
                  className={`simulator-tab-btn ${selectedTab === s.id ? 'active' : ''}`}
                  onClick={() => setSelectedTab(s.id)}
                >
                  {s.tabLabel}
                </button>
              ))}
            </div>

            {/* Display Case */}
            <motion.div 
              key={selectedTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="simulator-content-box"
            >
              {/* Problem */}
              <div className="simulator-problem-side">
                <span className="scenario-tag tag-problem">The Nightmare</span>
                <h4>{activeScenario.problemTitle}</h4>
                <p>{activeScenario.problemText}</p>
              </div>

              {/* Solution */}
              <div className="simulator-solution-side">
                <span className="scenario-tag tag-solution">The Buddy Solution</span>
                <h4 className="gradient-text">{activeScenario.solutionTitle}</h4>
                <p>{activeScenario.solutionText}</p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* Chapter 5: Call to Action */}
      <div className="solid-bg-wrapper">
        <div className="container">
          <div className="about-cta-section" style={{ padding: '100px 0 120px' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '24px' }}>Ready to crush your studies?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
              Join thousands of students who are studying smarter and saving hours of stress every week.
            </p>
            <Link href="/login" className="btn-primary btn-large glow-effect">Get Started for Free</Link>
          </div>
        </div>
      </div>

    </div>
  );
}
