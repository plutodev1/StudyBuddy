"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import './Pricing.css';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'semester'>('monthly');

  const getPrice = (monthlyPrice: string, semesterPrice: string) => {
    return billingCycle === 'monthly' ? monthlyPrice : semesterPrice;
  };

  const getPriceSub = () => {
    return billingCycle === 'monthly' ? '/month' : '/semester';
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        
        <div className="section-header text-center">
          <span className="section-label">PRICING PLANS</span>
          <h2 className="section-title">Invest in your <span className="gradient-text">CGPA</span></h2>
          <p className="section-subtitle mx-auto">
            Choose a plan that matches your study pace. Upgrade, downgrade, or cancel anytime.
          </p>

          {/* Toggle Cycle */}
          <div className="toggle-container">
            <span className={`toggle-label ${billingCycle === 'monthly' ? 'active' : ''}`}>Monthly</span>
            <button 
              className="billing-toggle-btn" 
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'semester' : 'monthly')}
              aria-label="Toggle Billing Cycle"
            >
              <motion.div 
                className="toggle-handle"
                layout
                transition={{ type: "spring", stiffness: 700, damping: 30 }}
                style={{ 
                  marginLeft: billingCycle === 'monthly' ? '2px' : 'calc(100% - 26px)' 
                }}
              />
            </button>
            <span className={`toggle-label ${billingCycle === 'semester' ? 'active' : ''}`}>
              Semester Pack <span className="discount-badge">Save ~33%</span>
            </span>
          </div>
        </div>

        <div className="pricing-grid">
          
          {/* Card 1: Jambite */}
          <div className="pricing-card glass">
            <div className="card-header">
              <span className="plan-badge">Basic</span>
              <h3>Jambite</h3>
              <p className="plan-desc">For students testing the waters.</p>
              <div className="price-display">
                <span className="currency">₦</span>
                <span className="price-num">0</span>
                <span className="price-duration">/forever</span>
              </div>
            </div>
            
            <div className="card-body">
              <ul className="plan-features">
                <li><span>✓</span> 3 lecture slide summaries / month</li>
                <li><span>✓</span> Standard PDF document parsing</li>
                <li><span>✓</span> 5 AI flashcard questions / day</li>
                <li><span>✓</span> Web dashboard access</li>
                <li className="disabled"><span>×</span> Smart revision schedule sync</li>
                <li className="disabled"><span>×</span> WhatsApp bot Integration</li>
                <li className="disabled"><span>×</span> Collaborative study rooms</li>
              </ul>
            </div>
            
            <div className="card-footer">
              <a href="/login" className="btn-secondary w-full text-center">Start Free</a>
            </div>
          </div>

          {/* Card 2: Scholar (Popular) */}
          <div className="pricing-card glass popular glow-effect">
            <div className="popular-badge">MOST POPULAR</div>
            <div className="card-header">
              <span className="plan-badge gradient-bg">PRO</span>
              <h3>Scholar Plan</h3>
              <p className="plan-desc">Accelerate your study speed to securing an A.</p>
              <div className="price-display">
                <span className="currency">₦</span>
                <span className="price-num">
                  {getPrice('1,500', '4,000')}
                </span>
                <span className="price-duration">{getPriceSub()}</span>
              </div>
            </div>
            
            <div className="card-body">
              <ul className="plan-features">
                <li><span>✓</span> <strong>Unlimited</strong> summaries & notes</li>
                <li><span>✓</span> Priority high-speed AI parsing</li>
                <li><span>✓</span> <strong>Infinite</strong> flashcards & answers</li>
                <li><span>✓</span> Smart Study Calendar planner</li>
                <li><span>✓</span> Full Browser Extension features</li>
                <li><span>✓</span> <strong>WhatsApp Bot Sync</strong> (Upload & ask slides via WhatsApp)</li>
                <li className="disabled"><span>×</span> Collaborative study rooms</li>
              </ul>
            </div>
            
            <div className="card-footer">
              <a href="/login" className="btn-primary w-full text-center">Secure Your A</a>
            </div>
          </div>

          {/* Card 3: Study Group */}
          <div className="pricing-card glass">
            <div className="card-header">
              <span className="plan-badge">Team</span>
              <h3>Squad Pack</h3>
              <p className="plan-desc">For study groups and tutorial wings.</p>
              <div className="price-display">
                <span className="currency">₦</span>
                <span className="price-num">
                  {getPrice('3,500', '9,500')}
                </span>
                <span className="price-duration">{getPriceSub()}</span>
              </div>
              <span className="pack-sub">Up to 5 accounts included</span>
            </div>
            
            <div className="card-body">
              <ul className="plan-features">
                <li><span>✓</span> Everything in <strong>Scholar Plan</strong></li>
                <li><span>✓</span> Collaborative study rooms</li>
                <li><span>✓</span> Group revision calendars & deadlines</li>
                <li><span>✓</span> Share summaries and flashcard decks</li>
                <li><span>✓</span> Friendly study challenge leaderboards</li>
                <li><span>✓</span> Shared premium AI engine pool</li>
              </ul>
            </div>
            
            <div className="card-footer">
              <a href="/login" className="btn-secondary w-full text-center">Get Squad Access</a>
            </div>
          </div>

        </div>

        <div className="pricing-faq-hint text-center">
          <p>Have questions? Scroll down to check our FAQ or contact our support team. All plans have a 7-day money-back guarantee.</p>
        </div>

      </div>
    </section>
  );
}
