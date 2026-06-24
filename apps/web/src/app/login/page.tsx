import Link from 'next/link';

export default function Login() {
  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="glass" style={{ padding: '40px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Sign In to StudyBuddy</h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Student Email</label>
          <input 
            type="email" 
            placeholder="e.g. tobi@unilag.edu.ng"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(255,255,255,0.05)',
              color: 'white',
              outline: 'none'
            }}
          />
        </div>

        <button className="btn-primary" style={{ marginTop: '10px', width: '100%' }}>Sign In</button>
        
        <div style={{ textAlign: 'center', marginTop: '10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Don't have an account? <Link href="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
