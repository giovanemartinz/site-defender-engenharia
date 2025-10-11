'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styles from './Hero.module.css';

const slidesData = [
  {
    id: 1,
    backgroundImage: '/images/processo-01.jpg',
    headline: "Engenharia de Ponta em Prevenção de Incêndios",
    subheadline: "Desenvolvemos soluções completas e personalizadas para garantir a máxima segurança do seu patrimônio.",
  },
  {
    id: 2,
    backgroundImage: '/images/processo-02.jpg',
    headline: "Regularize seu Imóvel sem Complicações",
    subheadline: "Nossa equipe cuida de todo o processo de aprovação do PPCI junto ao Corpo de Bombeiros, garantindo agilidade e conformidade legal.",
  },
  {
    id: 3,
    backgroundImage: '/images/processo-03.jpg',
    headline: "Tecnologia e Inovação a Serviço da Segurança",
    subheadline: "Utilizamos as mais modernas tecnologias em sistemas de detecção, alarme e combate a incêndios.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slidesData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slidesData.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 7000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    exit: { y: -20, opacity: 0, transition: { duration: 0.4 } }
  };
  
  // Variantes de animação para a imagem de fundo (crossfade)
  const backgroundVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.5, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 1.5, ease: 'easeIn' } }
  };

  return (
    <section className={styles.heroSection}>
      {/* 1. Container para as imagens de fundo, que permitirá o efeito de sobreposição */}
      <div className={styles.backgroundImageContainer}>
        <AnimatePresence>
          <motion.div
            key={currentSlide} // A key é crucial para o AnimatePresence funcionar
            className={styles.backgroundImage}
            style={{ backgroundImage: `url(${slidesData[currentSlide].backgroundImage})` }}
            variants={backgroundVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        </AnimatePresence>
      </div>
      
      <div className={styles.overlay} />

      <div className={styles.contentContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.h1 className={styles.headline} variants={textVariants}>
              {slidesData[currentSlide].headline}
            </motion.h1>
            <motion.p className={styles.subheadline} variants={textVariants}>
              {slidesData[currentSlide].subheadline}
            </motion.p>
            <motion.div className={styles.ctaWrapper} variants={textVariants}>
              <a href="#contato" onClick={handleScroll} className={styles.ctaPrimary}>
                Solicitar Orçamento
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.carouselControls}>
        <button onClick={prevSlide} className={styles.controlButton} aria-label="Slide anterior">
          <FaChevronLeft />
        </button>
        <span className={styles.slideNumber}>{currentSlide + 1}</span>
        <div className={styles.progressContainer}>
          {slidesData.map((_, index) => (
            <div
              key={index}
              className={`${styles.progressBar} ${currentSlide === index ? styles.active : ''}`}
            />
          ))}
        </div>
        <span className={styles.slideNumber}>{slidesData.length}</span>
        <button onClick={nextSlide} className={styles.controlButton} aria-label="Próximo slide">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Hero;