export default function About() {
  return (
    <div className="container" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
      <div className="glass" style={{ padding: '60px 40px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>About <span className="gradient-text">StudyBuddy</span></h1>
        
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.1rem' }}>
          <p style={{ marginBottom: '20px' }}>
            StudyBuddy was born out of the struggle of navigating Nigerian university life. We know how tough it is to juggle intense lectures, endless practicals, and confusing lecture materials, all while trying to keep your CGPA flying high.
          </p>
          
          <p style={{ marginBottom: '20px' }}>
            Whether you're prepping for a sudden test or organizing notes from a long semester disrupted by ASUU strikes, StudyBuddy is designed to be your ultimate academic copilot.
          </p>

          <p>
            Our AI engine analyzes your coursework, simplifies complex topics, and builds personalized study schedules so you can study smarter, not harder. From a browser extension that explains concepts on the fly, to a full web app that manages your entire curriculum, we've got you covered.
          </p>
        </div>
      </div>
    </div>
  );
}
