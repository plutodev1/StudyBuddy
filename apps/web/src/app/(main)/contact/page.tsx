export default function Contact() {
  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <div className="glass" style={{ padding: '60px 40px', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px', textAlign: 'center' }}>Contact Us</h1>
        
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '40px' }}>
          Got questions, feature requests, or just want to say hi? Reach out to the StudyBuddy team.
        </p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Name</label>
            <input 
              type="text" 
              placeholder="Your name"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                padding: '12px 16px',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Email</label>
            <input 
              type="email" 
              placeholder="you@student.edu.ng"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                padding: '12px 16px',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: 'var(--text-primary)', fontWeight: '500' }}>Message</label>
            <textarea 
              rows={5}
              placeholder="How can we help you crush your exams?"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                padding: '12px 16px',
                borderRadius: '8px',
                color: 'white',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <button type="button" className="btn-primary" style={{ marginTop: '10px' }}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
