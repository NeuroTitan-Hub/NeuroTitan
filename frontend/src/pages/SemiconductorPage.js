import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initChipScene } from '../hooks/useChipScene';
import '../styles/Semiconductor.css';

gsap.registerPlugin(ScrollTrigger);

/* ========================
   UTILITY FUNCTIONS
======================== */

// Get current year for copyright
const getCurrentYear = () => {
  return new Date().getFullYear();
};

const SemiconductorPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Three.js scene
    const cleanupThree = initChipScene();

    const ctx = gsap.context(() => {

      // Typography expansion
      gsap.to('.hero-title', {
        letterSpacing: '0.15em',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: '+=100%',
          scrub: true
        }
      });

      // 3D INTERACTIVE SECTION: Model & Cards Animation
      gsap.timeline({
        scrollTrigger: {
          trigger: '.interactive-3d-section',
          start: 'top 70%',
          end: '+=100%',
          scrub: 1.2
        }
      })
      .from('.model-container', {
        opacity: 0,
        scale: 0.9,
        y: 40,
        duration: 1
      }, 0)
      .from('.subsection-card', {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8
      }, 0.2);

      // Interactive 3D Section Title Animation
      gsap.from('.interactive-3d-section .section-title', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: {
          trigger: '.interactive-3d-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      // Subsection Cards Hover Animations (with mouse tracking)
      const cards = gsap.utils.toArray('.subsection-card');
      cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -10,
            duration: 0.4,
            overwrite: 'auto'
          });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.4,
            overwrite: 'auto'
          });
        });
      });

      // Model Container Hover Effect with Rotation
      const modelContainer = document.querySelector('.model-container');
      if (modelContainer) {
        modelContainer.addEventListener('mouseenter', () => {
          gsap.to(modelContainer, {
            boxShadow: '0 16px 48px rgba(193, 18, 31, 0.3)',
            duration: 0.4
          });
        });
        
        modelContainer.addEventListener('mouseleave', () => {
          gsap.to(modelContainer, {
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            duration: 0.4
          });
        });
      }

      // Parallax effect for subsection cards on scroll
      gsap.to('.subsection-card', {
        y: (i) => i * -10,
        scrollTrigger: {
          trigger: '.interactive-3d-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5
        }
      });

      // ARDUINO MODEL SECTION: Fade & Scale Animation
      gsap.from('.arduino-model-section .model-container', {
        opacity: 0,
        scale: 0.9,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: '.arduino-model-section',
          start: 'top 70%',
          scrub: 1
        }
      });

      // Arduino Section Title Animation
      gsap.from('.arduino-model-section .section-title', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.arduino-model-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      });

      // Arduino Model Container Hover Effect
      const arduinoModelContainer = document.querySelector('.arduino-model-section .model-container');
      if (arduinoModelContainer) {
        arduinoModelContainer.addEventListener('mouseenter', () => {
          gsap.to(arduinoModelContainer, {
            boxShadow: '0 16px 48px rgba(193, 18, 31, 0.3)',
            duration: 0.4
          });
        });
        
        arduinoModelContainer.addEventListener('mouseleave', () => {
          gsap.to(arduinoModelContainer, {
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            duration: 0.4
          });
        });
      }

      // WAFER SECTION: Parallax, Not Entrance
      gsap.timeline({
        scrollTrigger: {
          trigger: '.wafer-section',
          start: 'top center',
          end: '+=150%',
          scrub: true
        }
      })
      .from('.wafer-svg circle', {
        rotation: -5,
        transformOrigin: '50% 50%'
      })
      .from('.wafer-svg rect', {
        opacity: 0,
        stagger: 0.01
      }, '<')
      .from('.wafer-section .section-description', {
        opacity: 0
      });

      // TRANSISTOR SECTION: Educational Zoom
      gsap.timeline({
        scrollTrigger: {
          trigger: '.transistor-section',
          start: 'top center',
          end: '+=120%',
          scrub: true
        }
      })
      .from('.transistor-visual svg', {
        scale: 0.85,
        transformOrigin: '50% 60%'
      })
      .from(
        '.transistor-visual text',
        { opacity: 0, stagger: 0.1 },
        '-=0.2'
      );

      // CIRCUIT LAYERS: Real Semiconductor Motion (Z-separation)
      gsap.to('.circuit-layer', {
        scrollTrigger: {
          trigger: '.layers-section',
          start: 'top center',
          end: '+=120%',
          scrub: true
        },
        y: (i) => i * -30,
        opacity: 1,
        stagger: 0.1
      });

      // DATA CARDS: Make visible immediately
      gsap.set('.data-card', {
        opacity: 1,
        scale: 1
      });

      // Make sections initially visible (except hero children)
      gsap.set(['.wafer-section', '.transistor-section', '.layers-section', '.data-section', '.footer-section'], {
        opacity: 1
      });

    }, containerRef);

    return () => {
      cleanupThree?.();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="semiconductor-container">
      {/* Hero Section */}
      <section className="semiconductor-section hero-section">
        <canvas id="chip-canvas" />
        <h1 className="hero-title">
          SEMICONDUCTOR
          <span>ARCHITECTURE</span>
        </h1>
      </section>

      {/* 3D Interactive Feature Section */}
      <section className="semiconductor-section interactive-3d-section">
        <div className="section-content">
          <h2 className="section-title">3D INTERACTIVE FEATURE</h2>
          <p className="section-subtitle">Embedded Sketchfab 3D Model (Rotatable, Zoomable)</p>
          
          <div className="model-container">
            <iframe
              title="Arduino Uno Board"
              className="sketchfab-embed-3d"
              src="https://sketchfab.com/models/5e4c4717393e4431890a0e40d0482aa3/embed?autostart=1&ui_controls=1&ui_infos=0&ui_stop=0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          </div>
          
          <p className="section-description">
            An example of how semiconductors power real electronic systems. Explore this Arduino board to see how multiple semiconductor components work together: microcontrollers, voltage regulators, memory ICs, and discrete transistors.
          </p>
        </div>

        {/* Subsections: What, Why, Research, Trends */}
        <div className="subsections-grid">
          
          {/* What Are Semiconductors */}
          <div className="subsection-card">
            <h3 className="subsection-title">What Are Semiconductors?</h3>
            <p className="subsection-text">
              Semiconductors are materials whose electrical conductivity can be precisely controlled, enabling logic, memory, sensing, and power regulation in electronic devices.
            </p>
          </div>

          {/* Why Semiconductors Matter */}
          <div className="subsection-card">
            <h3 className="subsection-title">Why Semiconductors Matter</h3>
            <p className="subsection-text">
              Every modern system—computing, communication, energy—relies on semiconductor devices operating at nanometer scales to process information and control power.
            </p>
          </div>

          {/* Core Research Areas */}
          <div className="subsection-card">
            <h3 className="subsection-title">Core Research Areas</h3>
            <ul className="subsection-list">
              <li>Advanced transistor architectures</li>
              <li>Sub-5nm fabrication processes</li>
              <li>Novel semiconductor materials</li>
              <li>Energy-efficient computing</li>
            </ul>
          </div>

          {/* Current Trends & Innovation */}
          <div className="subsection-card">
            <h3 className="subsection-title">Current Trends & Innovation</h3>
            <ul className="subsection-list">
              <li>Chiplet-based design strategies</li>
              <li>AI and ML accelerators</li>
              <li>Heterogeneous integration</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Alternative Arduino Model Section */}
      <section className="semiconductor-section arduino-model-section">
        <div className="section-content">
          <h2 className="section-title">ARDUINO ECOSYSTEM</h2>
          <p className="section-subtitle">Alternative Board Configuration (Rotatable, Zoomable)</p>
          
          <div className="model-container">
            <iframe
              title="Arduino Uno Board Alternative"
              className="sketchfab-embed-3d"
              src="https://sketchfab.com/models/f31feafc5e9743abbdf33c54f9d92669/embed?autostart=1&ui_controls=1&ui_infos=0&ui_stop=0"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
            />
          </div>
          
          <p className="section-description">
            The Arduino UNO Q is the latest innovation in the Arduino platform, developed in partnership with Qualcomm, bringing a new level of performance and connectivity. Unlike the traditional Arduino Uno, which uses only one microcontroller, the UNO Q combines two processors: an STM32 microcontroller for control and sensor tasks, and a Qualcomm QRB2210 processor, capable of running Linux, Artificial Intelligence and computer vision.
            <br /><br />
            This fusion of simplicity and processing power transforms the Arduino UNO Q into a versatile tool for advanced robotics, the Internet of Things (IoT), and innovative educational projects, while maintaining compatibility with the classic ecosystem of shields and sensors. With 5 GHz Wi-Fi connectivity, Bluetooth 5.1, and Python and C/C++ support, the UNO Q inaugurates a new generation of smarter, connected and future-proof Arduino boards for automation and technology education.
          </p>
        </div>
      </section>

      {/* Wafer Section */}
      <section className="semiconductor-section wafer-section">
        <div className="section-content">
          <h2 className="section-title">SILICON WAFER FABRICATION</h2>
          <div className="wafer-visual">
            <svg viewBox="0 0 500 500" className="wafer-svg">
              <defs>
                <pattern id="waferGrid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="15" cy="15" r="1" fill="rgba(107, 107, 111, 0.4)" />
                  <line x1="0" y1="15" x2="30" y2="15" stroke="rgba(42, 42, 46, 0.2)" strokeWidth="0.5" />
                  <line x1="15" y1="0" x2="15" y2="30" stroke="rgba(42, 42, 46, 0.2)" strokeWidth="0.5" />
                </pattern>
              </defs>
              
              <circle cx="250" cy="250" r="200" 
                      fill="url(#waferGrid)" 
                      stroke="rgba(42, 42, 46, 0.5)" 
                      strokeWidth="2" />
              
              {/* Die regions */}
              {[...Array(6)].map((_, row) => 
                [...Array(6)].map((_, col) => (
                  <rect 
                    key={`${row}-${col}`}
                    x={80 + col * 60} 
                    y={80 + row * 60} 
                    width="50" 
                    height="50"
                    fill="rgba(11, 12, 16, 0.3)"
                    stroke="rgba(193, 18, 31, 0.2)"
                    strokeWidth="1"
                  />
                ))
              )}
            </svg>
          </div>
          <p className="section-description">
            300mm silicon wafers containing hundreds of individual dies,
            each with billions of transistors operating in perfect synchronicity.
          </p>
        </div>
      </section>

      {/* Transistor Section */}
      <section className="semiconductor-section transistor-section">
        <div className="section-content">
          <h2 className="section-title">TRANSISTOR ARCHITECTURE</h2>
          <div className="transistor-visual">
            <svg viewBox="0 0 400 300">
              {/* Substrate */}
              <rect x="50" y="200" width="300" height="60" 
                    fill="rgba(5, 5, 7, 0.8)" 
                    stroke="rgba(42, 42, 46, 0.6)" 
                    strokeWidth="2" />
              
              {/* Gate oxide */}
              <rect x="170" y="180" width="60" height="20" 
                    fill="rgba(11, 12, 16, 0.5)" 
                    stroke="rgba(107, 107, 111, 0.7)" 
                    strokeWidth="1.5" />
              
              {/* Gate */}
              <rect x="180" y="140" width="40" height="40" 
                    fill="rgba(139, 0, 0, 0.4)" 
                    stroke="rgba(193, 18, 31, 0.8)" 
                    strokeWidth="2" />
              
              {/* Source and Drain */}
              <rect x="80" y="190" width="60" height="30" 
                    fill="rgba(11, 12, 16, 0.5)" 
                    stroke="rgba(42, 42, 46, 0.7)" 
                    strokeWidth="1.5" />
              <rect x="260" y="190" width="60" height="30" 
                    fill="rgba(11, 12, 16, 0.5)" 
                    stroke="rgba(42, 42, 46, 0.7)" 
                    strokeWidth="1.5" />
              
              {/* Connection lines */}
              <line x1="200" y1="140" x2="200" y2="100" 
                    stroke="rgba(107, 107, 111, 0.8)" strokeWidth="3" />
              <line x1="110" y1="190" x2="110" y2="160" 
                    stroke="rgba(107, 107, 111, 0.8)" strokeWidth="3" />
              <line x1="290" y1="190" x2="290" y2="160" 
                    stroke="rgba(107, 107, 111, 0.8)" strokeWidth="3" />
              
              {/* Labels */}
              <text x="200" y="90" textAnchor="middle" fill="rgba(230, 230, 235, 0.9)" 
                    fontSize="14" fontFamily="monospace">GATE</text>
              <text x="110" y="150" textAnchor="middle" fill="rgba(230, 230, 235, 0.9)" 
                    fontSize="14" fontFamily="monospace">SOURCE</text>
              <text x="290" y="150" textAnchor="middle" fill="rgba(230, 230, 235, 0.9)" 
                    fontSize="14" fontFamily="monospace">DRAIN</text>
            </svg>
          </div>
          <div className="transistor-specs">
            <div className="spec-row">
              <span className="spec-name">Gate Length:</span>
              <span className="spec-data">5 nanometers</span>
            </div>
            <div className="spec-row">
              <span className="spec-name">Voltage:</span>
              <span className="spec-data">0.7V - 1.2V</span>
            </div>
            <div className="spec-row">
              <span className="spec-name">Switching Speed:</span>
              <span className="spec-data">~1 picosecond</span>
            </div>
          </div>
        </div>
      </section>

      {/* Circuit Layers Section */}
      <section className="semiconductor-section layers-section">
        <div className="section-content">
          <h2 className="section-title">MULTI-LAYER INTERCONNECTS</h2>
          <div className="layers-visual">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="circuit-layer" style={{ '--layer-index': i }}>
                <svg viewBox="0 0 600 80">
                  <line x1="50" y1="40" x2="550" y2="40" 
                        stroke={i % 2 === 0 ? "rgba(42, 42, 46, 0.6)" : "rgba(193, 18, 31, 0.4)"} 
                        strokeWidth="2" />
                  {[...Array(10)].map((_, j) => (
                    <circle key={j} cx={70 + j * 50} cy="40" r="3" 
                            fill={i % 2 === 0 ? "rgba(107, 107, 111, 0.8)" : "rgba(193, 18, 31, 0.6)"} />
                  ))}
                </svg>
                <span className="layer-label">LAYER {i + 1}</span>
              </div>
            ))}
          </div>
          <p className="section-description">
            Up to 15 metal interconnect layers route signals between billions of transistors,
            with line widths as small as 7 nanometers.
          </p>
        </div>
      </section>

      {/* Data Section */}
      <section className="semiconductor-section data-section">
        <div className="section-content">
          <h2 className="section-title">TECHNICAL SPECIFICATIONS</h2>
          <div className="spec-table">
            <div className="spec-row">
              <span className="spec-key">CLOCK FREQUENCY</span>
              <span className="spec-value">2.5 <em>GHz</em></span>
            </div>
            <div className="spec-row">
              <span className="spec-key">THERMAL DESIGN POWER</span>
              <span className="spec-value">350 <em>W</em></span>
            </div>
            <div className="spec-row">
              <span className="spec-key">ENERGY EFFICIENCY</span>
              <span className="spec-value">2.1 <em>GFLOPS/W</em></span>
            </div>
            <div className="spec-row">
              <span className="spec-key">FABRICATION YIELD</span>
              <span className="spec-value">99.9 <em>%</em></span>
            </div>
            <div className="spec-row">
              <span className="spec-key">PROCESS NODE</span>
              <span className="spec-value">5 <em>nm</em></span>
            </div>
            <div className="spec-row">
              <span className="spec-key">TRANSISTOR COUNT</span>
              <span className="spec-value">16.7 <em>billion</em></span>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Footer */}
      <section className="semiconductor-section footer-section">
        <div className="footer-content">
          
          {/* Site Purpose */}
          <div className="footer-section-block">
            <h3 className="footer-title">NEUROTITAN SEMICONDUCTOR HUB</h3>
            <p className="footer-description">
              An educational platform dedicated to exploring semiconductor technology, microarchitecture, and embedded systems. We bridge the gap between complex semiconductor concepts and practical applications through interactive 3D models and comprehensive documentation.
            </p>
          </div>

          {/* Reference Links */}
          <div className="footer-section-block">
            <h4 className="footer-heading">REFERENCE LINKS</h4>
            <ul className="footer-links">
              <li><a href="https://sketchfab.com" target="_blank" rel="noopener noreferrer">Sketchfab 3D Models</a></li>
              <li><a href="https://www.arduino.cc" target="_blank" rel="noopener noreferrer">Arduino Official</a></li>
              <li><a href="https://www.qualcomm.com" target="_blank" rel="noopener noreferrer">Qualcomm Technologies</a></li>
              <li><a href="https://gsap.com" target="_blank" rel="noopener noreferrer">GSAP Animation Library</a></li>
            </ul>
          </div>

          {/* Credits & Sources */}
          <div className="footer-section-block">
            <h4 className="footer-heading">CREDITS & SOURCES</h4>
            <ul className="footer-credits">
              <li><strong>3D Models:</strong> Sketchfab Community (Arduino UNO Board)</li>
              <li><strong>Framework:</strong> React.js, GSAP, Three.js</li>
              <li><strong>Design Inspiration:</strong> Apple Silicon, NVIDIA Architecture</li>
              <li><strong>Partner Technology:</strong> Qualcomm QRB2210 Processor</li>
            </ul>
          </div>

          {/* Contact & Feedback */}
          <div className="footer-section-block">
            <h4 className="footer-heading">FEEDBACK & CONTACT</h4>
            <p className="footer-contact-text">
              Have questions or suggestions? We'd love to hear from you.
            </p>
            <div className="footer-buttons">
              <a href="mailto:feedback@neurotitan.dev" className="footer-btn feedback-btn">
                📧 Send Feedback
              </a>
              <a href="https://github.com/AkshitTiwarii/NeuroTitan" target="_blank" rel="noopener noreferrer" className="footer-btn github-btn">
                🔗 GitHub Repository
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider"></div>

          {/* Bottom Info */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {getCurrentYear()} NeuroTitan. All rights reserved.
            </p>
            <p className="footer-tagline">
              PRECISION ENGINEERING · SILICON INNOVATION · NANOSCALE ARCHITECTURE
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default SemiconductorPage;
