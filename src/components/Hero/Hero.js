'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero = () => {
  const heroData = {
    headline: "Engenharia de Ponta em Prevenção de Incêndios",
    subheadline: "Desenvolvemos soluções completas e personalizadas para garantir a máxima segurança do seu patrimônio, em conformidade com todas as normas técnicas.",
    cta_primary: "Solicitar Orçamento",
    cta_secondary: "Fale com um Especialista",
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenChat = () => {
    const chatBubble = document.getElementById('chatbot-toggle-button');
    if (chatBubble) {
      chatBubble.click();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.videoOverlay} />
      <video
        className={styles.videoBackground}
        autoPlay
        loop
        muted
        playsInline
        key="hero-video-immersive"
        src="/hero2.mp4"
      >
        Seu navegador não suporta o vídeo.
      </video>

      <motion.div 
        className={styles.contentContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className={styles.headline} variants={itemVariants}>
          {heroData.headline}
        </motion.h1>
        <motion.p className={styles.subheadline} variants={itemVariants}>
          {heroData.subheadline}
        </motion.p>
        <motion.div className={styles.ctaWrapper} variants={itemVariants}>
          <a href="#contato" onClick={handleScroll} className={styles.ctaPrimary}>
            {heroData.cta_primary}
          </a>
          <button onClick={handleOpenChat} className={styles.ctaSecondary}>
            {heroData.cta_secondary}
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;