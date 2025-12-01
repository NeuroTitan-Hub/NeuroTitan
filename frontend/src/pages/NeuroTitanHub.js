import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import EcosystemSection from '../components/EcosystemSection';
import ResearchLabSection from '../components/ResearchLabSection';
import ProductsSection from '../components/ProductsSection';
import CommunitySection from '../components/CommunitySection';
import ContactFooter from '../components/ContactFooter';
import MouseTracker from '../components/MouseTracker';
import ScrollProgress from '../components/ScrollProgress';
// import CustomCursor from '../components/CustomCursor'; // Uncomment for custom cursor

const NeuroTitanHub = () => {
  return (
    <div className="neurotitan-hub scroll-smooth" data-testid="neurotitan-hub" style={{ position: 'relative' }}>
      <ScrollProgress />
      {/* <CustomCursor /> */} {/* Uncomment for custom cursor effect */}
      <MouseTracker />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
      </motion.div>
      <AboutSection />
      <EcosystemSection />
      <ResearchLabSection />
      <ProductsSection />
      <CommunitySection />
      <ContactFooter />
    </div>
  );
};

export default NeuroTitanHub;