import './page.css';

export default function Home() {
  return (
    <div className="container page-container">
      <section className="hero glass">
        <div className="hero-content">
          <h1 className="hero-title">Crush your exams, <span className="gradient-text">stress-free</span>.</h1>
          <p className="hero-subtitle">
            Whether it's impromptu tests, endless night classes, or confusing lecture notes, StudyBuddy is your AI copilot. Organize coursework, summarize those massive PDF slides, and keep your CGPA flying high.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Launch Web App</button>
            <button className="btn-secondary">Get Browser Extension</button>
          </div>
        </div>
      </section>

      <section className="features glass mt-40">
        <h2>Why StudyBuddy?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>AI Summaries</h3>
            <p>Turn 100-page lecture slides into concise, easy-to-read notes in seconds.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Scheduling</h3>
            <p>Automatically generate a study timetable that fits your chaotic schedule.</p>
          </div>
          <div className="feature-card">
            <h3>Browser Extension</h3>
            <p>Highlight text on any website and let StudyBuddy explain it to you instantly.</p>
          </div>
        </div>
      </section>
      <section className="how-it-works mt-40">
        <h2>How StudyBuddy Works</h2>
        <div className="steps-container">
          <div className="step glass">
            <div className="step-number">1</div>
            <h3>Upload Material</h3>
            <p>Drag and drop your messy PDF slides, past questions, or confusing notes.</p>
          </div>
          <div className="step glass">
            <div className="step-number">2</div>
            <h3>AI Magic</h3>
            <p>Our AI summarizes the content, extracts key points, and generates practice questions.</p>
          </div>
          <div className="step glass">
            <div className="step-number">3</div>
            <h3>Crush Exams</h3>
            <p>Follow your personalized schedule, review bite-sized notes, and ace that paper!</p>
          </div>
        </div>
      </section>

      <section className="testimonials glass mt-40">
        <h2>What Students Are Saying</h2>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p className="quote">"Omo, StudyBuddy saved my 400L CGPA. I didn't know anything two weeks to exams, but the AI summaries were a lifesaver."</p>
            <div className="author">- Tobi, Unilag</div>
          </div>
          <div className="testimonial-card">
            <p className="quote">"When ASUU called off the strike and we had 3 weeks to cover a whole semester, this app organized my life. Highly recommend!"</p>
            <div className="author">- Amaka, UNN</div>
          </div>
          <div className="testimonial-card">
            <p className="quote">"The browser extension is fire. I just highlight confusing Wikipedia articles and it breaks it down to my level."</p>
            <div className="author">- Emmanuel, OAU</div>
          </div>
        </div>
      </section>

      <section className="pricing mt-40">
        <h2>Simple Pricing</h2>
        <div className="pricing-grid">
          <div className="pricing-card glass">
            <h3>Sapa Tier</h3>
            <div className="price">Free</div>
            <ul>
              <li>Basic AI summaries</li>
              <li>Up to 5 PDFs per month</li>
              <li>Standard study schedules</li>
            </ul>
            <button className="btn-secondary mt-20">Get Started</button>
          </div>
          <div className="pricing-card glass popular">
            <div className="badge">Most Popular</div>
            <h3>Odogwu Tier</h3>
            <div className="price">₦1,500<span>/month</span></div>
            <ul>
              <li>Unlimited AI summaries</li>
              <li>Browser Extension access</li>
              <li>Advanced past question generation</li>
              <li>Priority support</li>
            </ul>
            <button className="btn-primary mt-20">Go Premium</button>
          </div>
        </div>
      </section>
    </div>
  );
}
