"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Faq.css';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Can I upload handwritten study notes or whiteboard photos?",
    answer: "Absolutely! StudyBuddy supports advanced Optical Character Recognition (OCR). You can upload photos of your notebooks, whiteboard slides from class, or handwritten exam answers, and our engine will transcribe, organize, and summarize them."
  },
  {
    question: "How does the revision calendar handle sudden exam schedule shifts?",
    answer: "We know Nigerian university timelines can be unpredictable. If exam dates shift or there is an unscheduled disruption, simply update your calendar inputs or upload the new timetable file. StudyBuddy instantly shifts and recalibrates your prep milestones in one click."
  },
  {
    question: "Does it support course materials from my specific university?",
    answer: "Yes! While our AI is generalized to comprehend academic subjects globally, we have fine-tuned its parsing to align with format standards and course outlines common across popular Nigerian universities (UNILAG, UI, OAU, UNIBEN, Covenant, ABU, etc.)."
  },
  {
    question: "Can I review my generated summaries offline?",
    answer: "Yes, you can. Once your summaries, quizzes, and calendars are generated, they are cached locally in your web app dashboard. You can read notes and check your study calendar without consuming active mobile data. Active data is only needed for running new AI extractions."
  },
  {
    question: "How does the WhatsApp Bot integration work?",
    answer: "As a Scholar Plan user, you receive access to our private WhatsApp bot. You can forward lecture slides, PDFs, or lecture voice recordings directly to the bot. It will respond on-the-fly with bullet summaries, flashcards, and answers to your questions without you ever needing to open the web dashboard."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        
        <div className="section-header text-center">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Got <span className="gradient-text">Questions?</span></h2>
          <p className="section-subtitle mx-auto">
            Everything you need to know about StudyBuddy features, billing, and platform compatibility.
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`faq-item glass ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question-row">
                  <h3>{faq.question}</h3>
                  <span className="faq-toggle-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d={isOpen ? "M5 12h14" : "M12 5v14M5 12h14"} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="faq-answer-container"
                    >
                      <div className="faq-answer-text">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
