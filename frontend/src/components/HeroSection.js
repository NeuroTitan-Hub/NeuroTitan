import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: '#000000' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

      {/* Spline 3D Boxes - Interactive & Responsive */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ 
            width: '100%',
            height: '100%',
            maxWidth: '900px',
            maxHeight: '900px',
            filter: 'brightness(0.8) saturate(0.7)',
            position: 'relative'
          }}
        >
          <iframe 
            src='https://my.spline.design/boxeshover-yJ6IQoM9vPsJSmSBejlKsVUV/' 
            frameBorder='0' 
            width='100%' 
            height='100%'
            style={{ 
              border: 'none',
              pointerEvents: 'auto', // Restore mouse interaction
              display: 'block',
              position: 'relative',
              overflow: 'hidden'
            }}
            title="3D Boxes Animation"
            loading="eager"
            allowFullScreen
          />
          
          {/* Complete bottom overlay to hide all watermarks */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '120px',
            background: 'linear-gradient(to top, #000000 0%, #000000 60%, transparent 100%)',
            zIndex: 100,
            pointerEvents: 'none'
          }} />
          
          {/* Click blocker for bottom half to prevent LinkedIn redirect */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '100%',
            height: '50%',
            zIndex: 99,
            pointerEvents: 'auto',
            cursor: 'default'
          }} />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="mb-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="inline-block mb-6 px-6 py-2">
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: '#808080' }}>Advanced AI Research</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FFFFFF', letterSpacing: '-0.03em' }}>
            NeuroTitan
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', color: '#B8B8B8' }}>
            Building the future of artificial intelligence through open research, collaborative innovation, and cutting-edge technology
          </p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-wrap gap-6 justify-center items-center" style={{ pointerEvents: 'auto' }}>
            <a href="https://github.com/NeuroTitan-Hub" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 text-base font-medium rounded-sm transition-all duration-300" style={{ background: '#FFFFFF', color: '#000000', border: '1px solid #FFFFFF' }}>
              <span className="inline-flex items-center gap-2">
                Explore Projects
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            
            <a href="#research" className="group px-8 py-4 text-base font-medium rounded-sm transition-all duration-300" style={{ background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <span className="inline-flex items-center gap-2">
                Research Lab
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdbtblF3w5Nqnckn_gW1zs3ybf24725lcJaZOKR54gunskXcg/viewform?usp=publish-editor" className="group px-8 py-4 text-base font-medium rounded-sm transition-all duration-300 hover:scale-105" style={{ background: 'transparent', color: '#FFFFFF', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
              <span className="inline-flex items-center gap-2">
                Apply as Campus Ambassador
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="mt-20">
          <div className="flex flex-wrap gap-12 justify-center items-center" style={{ color: '#4A4A4A' }}>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FFFFFF' }}>50+</div>
              <div className="text-sm uppercase tracking-wider" style={{ color: '#808080' }}>Open Source Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FFFFFF' }}>30+</div>
              <div className="text-sm uppercase tracking-wider" style={{ color: '#808080' }}>Research Papers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FFFFFF' }}>500+</div>
              <div className="text-sm uppercase tracking-wider" style={{ color: '#808080' }}>Contributors</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="rgba(255, 255, 255, 0.3)" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
