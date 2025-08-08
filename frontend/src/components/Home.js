import React, { useState, useEffect } from 'react';
import './Home.css';
import Layout from './Layout';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Layout>
    
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Document Similarity & Comparison</h1>
            <p className="hero-subtitle">
              Transforming complex data into insights with the power of AI-driven document analysis
            </p>
            <button 
              className="cta-button"
              onClick={() => scrollToSection('features')}
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="about-section" id="about">
        <div className="container">
          <h2 className="section-title">About Hexaware Technologies</h2>
          <div className="about-grid">
            <div 
              className={`about-card ${isVisible.about1 ? 'animate-in' : ''}`}
              id="about1"
              data-animate
            >
              <h3>Who We Are</h3>
              <p>
                Hexaware is a global technology and business process services company with 27,000+ 
                Hexawarians across 40+ offices in 19 countries. We're dedicated to creating smiles 
                through the power of great people and technology.
              </p>
            </div>
            <div 
              className={`about-card ${isVisible.about2 ? 'animate-in' : ''}`}
              id="about2"
              data-animate
            >
              <h3>Our Expertise</h3>
              <p>
                We leverage cutting-edge technology to solve complex IT and business process challenges, 
                delivering innovative solutions that our customers love. From AI-powered insights to 
                cloud migrations, we're your trusted technology partner.
              </p>
            </div>
            <div 
              className={`about-card ${isVisible.about3 ? 'animate-in' : ''}`}
              id="about3"
              data-animate
            >
              <h3>Innovation Focus</h3>
              <p>
                We empower clients with world-class technology products, services, and solutions. 
                Our commitment to innovation drives us to continuously exceed customer expectations 
                and deliver transformative results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At Hexaware, solving your IT and business process challenges is our mission. We transform 
              how IT services are delivered by being competitive and proactive in providing software 
              solutions, continuously striving to exceed customer expectations through the power of 
              great people and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Project Features */}
      <section className="features-section" id="features">
        <div className="container">
          <h2 className="section-title">Document Similarity & Comparison Platform</h2>
          <div className="features-grid">
            <div 
              className={`feature-card ${isVisible.feature1 ? 'animate-in' : ''}`}
              id="feature1"
              data-animate
            >
              <div className="feature-icon">📄</div>
              <h3>Smart Document Analysis</h3>
              <p>
                Advanced AI algorithms analyze document structure, content, and context to identify 
                similarities and differences with precision.
              </p>
            </div>
            <div 
              className={`feature-card ${isVisible.feature2 ? 'animate-in' : ''}`}
              id="feature2"
              data-animate
            >
              <div className="feature-icon">🔍</div>
              <h3>Deep Content Comparison</h3>
              <p>
                Go beyond surface-level matching with semantic analysis that understands meaning 
                and context within documents.
              </p>
            </div>
            <div 
              className={`feature-card ${isVisible.feature3 ? 'animate-in' : ''}`}
              id="feature3"
              data-animate
            >
              <div className="feature-icon">⚡</div>
              <h3>Real-time Processing</h3>
              <p>
                Lightning-fast processing capabilities ensure quick results even for large document 
                sets and complex comparisons.
              </p>
            </div>
            <div 
              className={`feature-card ${isVisible.feature4 ? 'animate-in' : ''}`}
              id="feature4"
              data-animate
            >
              <div className="feature-icon">📊</div>
              <h3>Detailed Reports</h3>
              <p>
                Comprehensive similarity reports with visual indicators, percentages, and highlighted 
                differences for easy review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div 
              className={`step ${isVisible.step1 ? 'animate-in' : ''}`}
              id="step1"
              data-animate
            >
              <div className="step-number">1</div>
              <h3>Upload Documents</h3>
              <p>Simply upload your documents in various formats (PDF, DOC, TXT) to our secure platform.</p>
            </div>
            <div 
              className={`step ${isVisible.step2 ? 'animate-in' : ''}`}
              id="step2"
              data-animate
            >
              <div className="step-number">2</div>
              <h3>AI Analysis</h3>
              <p>Our advanced AI engine processes and analyzes the content using natural language processing.</p>
            </div>
            <div 
              className={`step ${isVisible.step3 ? 'animate-in' : ''}`}
              id="step3"
              data-animate
            >
              <div className="step-number">3</div>
              <h3>Similarity Detection</h3>
              <p>The system identifies patterns, similarities, and differences across your document collection.</p>
            </div>
            <div 
              className={`step ${isVisible.step4 ? 'animate-in' : ''}`}
              id="step4"
              data-animate
            >
              <div className="step-number">4</div>
              <h3>Results & Insights</h3>
              <p>Receive detailed reports with actionable insights and visual representations of document relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Experience the power of AI-driven document analysis today.</p>
            <button className="cta-button-secondary">Start Your Analysis</button>
          </div>
        </div>
      </section>
    
    </Layout>
  );
};

export default Home;
