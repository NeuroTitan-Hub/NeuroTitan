import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { FaQuora, FaPinterest } from 'react-icons/fa';

// Get current year for copyright
const getCurrentYear = () => {
  return new Date().getFullYear();
};

const ContactFooter = () => {
  const socialLinks = [
    { name: 'GitHub', icon: '🔗', url: 'https://github.com/NeuroTitan-Hub' },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://linkedin.com' },
    { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://instagram.com' },
    { name: 'Quora', icon: <FaQuora size={20} />, url: 'https://quora.com' },
    { name: 'Pinterest', icon: <FaPinterest size={20} />, url: 'https://pinterest.com' }
  ];

  return (
    <footer className="relative py-20 px-6 overflow-hidden" style={{ background: '#000000', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FFFFFF', letterSpacing: '-0.02em' }}>Get In Touch</motion.h2>
          
          <motion.a initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }} href="mailto:neurotitancontact@gmail.com" className="inline-flex items-center gap-3 text-lg md:text-xl font-medium transition-all duration-300 group" style={{ color: '#B8B8B8' }}>
            <Mail size={24} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            <span className="group-hover:text-white transition-colors">neurotitancontact@gmail.com</span>
          </motion.a>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-6 mb-16">
          {socialLinks.map((social, index) => (
            <motion.a key={index} href={social.url} target="_blank" rel="noopener noreferrer" whileHover={{ y: -4 }} className="flex items-center gap-3 px-6 py-3 rounded-sm transition-all duration-300 group" style={{ border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.02)' }}>
              <span className="opacity-70 group-hover:opacity-100 transition-opacity" style={{ color: '#FFFFFF' }}>{social.icon}</span>
              <span className="text-sm font-medium" style={{ color: '#B8B8B8' }}>{social.name}</span>
            </motion.a>
          ))}
        </motion.div>

        <div className="pt-12" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#FFFFFF' }}>NeuroTitan</h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif', color: '#808080' }}>Building the future of artificial intelligence through open research and innovation</p>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: '#B8B8B8' }}>Quick Links</h4>
              <ul className="space-y-2">
                {['About', 'Research', 'Products', 'Community'].map((link, idx) => (
                  <li key={idx}>
                    <a href={`#${link.toLowerCase()}`} className="text-sm transition-colors duration-300 hover:text-white" style={{ color: '#808080' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-4 uppercase tracking-wider" style={{ color: '#B8B8B8' }}>Resources</h4>
              <ul className="space-y-2">
                {['Documentation', 'Blog', 'GitHub', 'Discord'].map((link, idx) => (
                  <li key={idx}>
                    <a href="#" className="text-sm transition-colors duration-300 hover:text-white" style={{ color: '#808080' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center pt-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <p className="text-sm" style={{ fontFamily: 'Montserrat, sans-serif', color: '#4A4A4A' }}>© {getCurrentYear()} NeuroTitan. All rights reserved. Built with precision.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
