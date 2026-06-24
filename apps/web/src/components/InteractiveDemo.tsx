"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './InteractiveDemo.css';

interface CourseData {
  id: string;
  name: string;
  code: string;
  fileName: string;
  fileSize: string;
  steps: string[];
  summary: { title: string; desc: string }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  schedule: { day: string; topic: string; duration: string }[];
}

const COURSES: CourseData[] = [
  {
    id: 'csc201',
    name: 'Intro to Programming',
    code: 'CSC 201',
    fileName: 'csc201_recursion_and_stacks.pdf',
    fileSize: '5.2 MB',
    steps: [
      'Reading PDF file structure...',
      'Mapping execution call stack...',
      'Synthesizing base cases & recursion depth limits...',
      'Study Buddy Copilot Ready!'
    ],
    summary: [
      { title: 'Recursion Definition', desc: 'A programming design pattern where a function calls itself directly or indirectly to solve a smaller subproblem.' },
      { title: 'Base Case Importance', desc: 'The termination criteria that stops recursion. Without a base case, recursion results in an infinite call stack loop.' },
      { title: 'Stack Overflow Risk', desc: 'Each recursive call consumes stack memory. If recursion goes too deep without resolving, it crashes the program with a Stack Overflow.' }
    ],
    quiz: {
      question: 'What is the primary function of a base case in a recursive function?',
      options: [
        'To speed up calculations by using cache.',
        'To terminate the recursion and prevent stack overflow.',
        'To pass arguments back to the parent function.'
      ],
      correctIndex: 1,
      explanation: 'The base case provides a stopping condition that prevents the function from calling itself infinitely, which would exhaust system memory (Stack Overflow).'
    },
    schedule: [
      { day: 'Day 1', topic: 'Visualizing Recursion & Call Stacks', duration: '30 mins' },
      { day: 'Day 2', topic: 'Hands-on Exercises: Factorials & Fibonacci', duration: '45 mins' },
      { day: 'Day 3', topic: 'Mock Exams: Tail Recursion & Memory Limits', duration: '30 mins' }
    ]
  },
  {
    id: 'chm101',
    name: 'General Chemistry I',
    code: 'CHM 101',
    fileName: 'chemistry_atomic_theory_v2.pdf',
    fileSize: '8.7 MB',
    steps: [
      'Extracting molecular structures...',
      'Analyzing quantum mechanics & electron orbitals...',
      'Balancing stoichiometric equations...',
      'Study Buddy Copilot Ready!'
    ],
    summary: [
      { title: 'Bohr Model vs Modern Theory', desc: 'Bohr model proposes fixed circular orbits for electrons. Modern theory models electrons as probabilities within 3D orbital wave clouds.' },
      { title: 'Quantum Numbers', desc: 'Set of 4 numbers (n, l, ml, ms) describing energy levels, orbital shapes, orientations, and spin directions of electrons.' },
      { title: 'Stoichiometry Calculations', desc: 'Using balanced equations to calculate the relative quantities of reactants and products consumed and produced in a reaction.' }
    ],
    quiz: {
      question: 'Which quantum number determines the 3D shape of an atomic orbital?',
      options: [
        'Principal quantum number (n)',
        'Azimuthal / Angular momentum quantum number (l)',
        'Magnetic quantum number (m_l)'
      ],
      correctIndex: 1,
      explanation: 'The angular momentum quantum number (l) describes the shape of the orbital (s = sphere, p = dumbbell, d = cloverleaf, etc.).'
    },
    schedule: [
      { day: 'Day 1', topic: 'Electron Configurations & Orbital Shapes', duration: '40 mins' },
      { day: 'Day 2', topic: 'Balancing Redox & Acid-Base Equations', duration: '50 mins' },
      { day: 'Day 3', topic: 'Stoichiometry & Yield Problems Practice', duration: '60 mins' }
    ]
  },
  {
    id: 'gst111',
    name: 'Communication in English',
    code: 'GST 111',
    fileName: 'gst111_comprehension_and_grammar.docx',
    fileSize: '1.4 MB',
    steps: [
      'Scanning syntax patterns...',
      'Extracting active listening types...',
      'Outlining essay structures & punctuation rules...',
      'Study Buddy Copilot Ready!'
    ],
    summary: [
      { title: 'Active Listening Types', desc: 'Differentiating comprehensive (information gathering), critical (analytical evaluation), and empathetic (relational support) listening modes.' },
      { title: 'Cornell Note-Taking System', desc: 'Splitting notes into three strategic segments: Notes Column (during lecture), Cues (questions/keywords post-lecture), and Summary.' },
      { title: 'Grammar & Mechanics', desc: 'Avoiding major sentence structure errors such as comma splices, fragments, and run-on sentences.' }
    ],
    quiz: {
      question: 'Which note-taking method requires dividing a page into a right Column, a left Margin, and a bottom Summary section?',
      options: [
        'The Outlining Method',
        'The Cornell Note-Taking System',
        'The Mind Mapping Technique'
      ],
      correctIndex: 1,
      explanation: 'The Cornell Method reserves the right side for notes, the left margin for cues/keywords, and the bottom row for a paragraph summarizing the page.'
    },
    schedule: [
      { day: 'Day 1', topic: 'Active Listening & Comprehension Practice', duration: '30 mins' },
      { day: 'Day 2', topic: 'Applying Cornell Note-Taking to Lectures', duration: '30 mins' },
      { day: 'Day 3', topic: 'Editing Mechanics: Sentence Faults Review', duration: '45 mins' }
    ]
  }
];

export default function InteractiveDemo() {
  const [selectedCourse, setSelectedCourse] = useState<CourseData>(COURSES[0]);
  const [statusStep, setStatusStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'summary' | 'quiz' | 'schedule'>('summary');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Restart animation when a new course is selected
  useEffect(() => {
    setIsProcessing(true);
    setStatusStep(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setActiveTab('summary');

    const interval = setInterval(() => {
      setStatusStep((prev) => {
        if (prev >= selectedCourse.steps.length - 1) {
          clearInterval(interval);
          setIsProcessing(false);
          return prev + 1;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [selectedCourse]);

  const handleAnswerSelect = (index: number) => {
    if (selectedAnswer !== null) return; // Only allow one attempt in demo
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  return (
    <section className="demo-section" id="demo">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-label">INTERACTIVE DEMO</span>
          <h2 className="section-title">See StudyBuddy in <span className="gradient-text">Action</span></h2>
          <p className="section-subtitle mx-auto">Select one of our demo courses below to watch how StudyBuddy automates your exam prep.</p>
        </div>

        <div className="demo-grid-wrapper glass">
          
          {/* Left panel: Course selector */}
          <div className="demo-left-panel">
            <h4 className="panel-title">Choose a Course</h4>
            <div className="course-list">
              {COURSES.map((course) => (
                <button
                  key={course.id}
                  className={`course-btn ${selectedCourse.id === course.id ? 'active' : ''}`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="course-code-badge">{course.code}</div>
                  <div className="course-info">
                    <span className="course-name">{course.name}</span>
                    <span className="course-file">{course.fileName}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="file-info-badge">
              <span className="file-icon">📄</span>
              <div className="file-meta">
                <span>Selected: {selectedCourse.fileName}</span>
                <span>Size: {selectedCourse.fileSize}</span>
              </div>
            </div>
          </div>

          {/* Right panel: Processing or output visualization */}
          <div className="demo-right-panel">
            <AnimatePresence mode="wait">
              {isProcessing ? (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="processing-panel flex-center"
                >
                  <div className="processing-content text-center">
                    <div className="loader-ring">
                      <div className="loader-dot"></div>
                    </div>
                    <h3>AI Copilot analyzing notes...</h3>
                    
                    <div className="status-steps">
                      {selectedCourse.steps.map((step, idx) => (
                        <div 
                          key={idx} 
                          className={`status-step-item ${statusStep > idx ? 'completed' : statusStep === idx ? 'active' : 'upcoming'}`}
                        >
                          <span className="status-dot"></span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="results-panel"
                >
                  <div className="results-header">
                    <button 
                      className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
                      onClick={() => setActiveTab('summary')}
                    >
                      📄 AI Summary
                    </button>
                    <button 
                      className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
                      onClick={() => setActiveTab('quiz')}
                    >
                      ✏️ Practice Quiz
                    </button>
                    <button 
                      className={`tab-btn ${activeTab === 'schedule' ? 'active' : ''}`}
                      onClick={() => setActiveTab('schedule')}
                    >
                      📅 Revision Calendar
                    </button>
                  </div>

                  {/* Results Content */}
                  <div className="results-body">
                    
                    {/* Tab 1: AI Summary */}
                    {activeTab === 'summary' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="tab-content"
                      >
                        <h4 className="content-heading">Generated Study Notes ({selectedCourse.code})</h4>
                        <div className="notes-list">
                          {selectedCourse.summary.map((sum, idx) => (
                            <div key={idx} className="note-card glass">
                              <h5>{sum.title}</h5>
                              <p>{sum.desc}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 2: Practice Quiz */}
                    {activeTab === 'quiz' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="tab-content"
                      >
                        <h4 className="content-heading">Instant AI Flashcard Quiz</h4>
                        <div className="quiz-card glass">
                          <p className="quiz-question">{selectedCourse.quiz.question}</p>
                          
                          <div className="quiz-options">
                            {selectedCourse.quiz.options.map((option, idx) => {
                              let btnClass = 'quiz-option-btn';
                              if (selectedAnswer !== null) {
                                if (idx === selectedCourse.quiz.correctIndex) {
                                  btnClass += ' correct';
                                } else if (selectedAnswer === idx) {
                                  btnClass += ' incorrect';
                                } else {
                                  btnClass += ' disabled';
                                }
                              }
                              return (
                                <button
                                  key={idx}
                                  className={btnClass}
                                  onClick={() => handleAnswerSelect(idx)}
                                  disabled={selectedAnswer !== null}
                                >
                                  <span className="option-label">{String.fromCharCode(65 + idx)}.</span>
                                  <span>{option}</span>
                                </button>
                              );
                            })}
                          </div>

                          <AnimatePresence>
                            {showExplanation && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="quiz-explanation glass"
                              >
                                <strong>
                                  {selectedAnswer === selectedCourse.quiz.correctIndex 
                                    ? '🎉 Correct!' 
                                    : '❌ Incorrect. The correct answer was ' + String.fromCharCode(65 + selectedCourse.quiz.correctIndex)}
                                </strong>
                                <p>{selectedCourse.quiz.explanation}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}

                    {/* Tab 3: Study Timetable */}
                    {activeTab === 'schedule' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="tab-content"
                      >
                        <h4 className="content-heading">Generated Study Plan</h4>
                        <p className="schedule-meta">A personalized roadmap leading up to your exam.</p>
                        
                        <div className="schedule-timeline">
                          {selectedCourse.schedule.map((sch, idx) => (
                            <div key={idx} className="timeline-item glass">
                              <div className="timeline-day-badge">{sch.day}</div>
                              <div className="timeline-details">
                                <h5>{sch.topic}</h5>
                                <span>Recommended session: {sch.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Footer message */}
                  <div className="results-footer">
                    <span>💡 Accuracy fine-tuned for Nigerian university syllabus guidelines</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
