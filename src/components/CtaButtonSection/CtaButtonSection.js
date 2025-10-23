'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import styles from './HorizontalCtaSection.module.css';

const HorizontalCtaSection = () => {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.ctaSection}>
      <motion.div
        className={styles.ctaCard}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.textWrapper}>
          <h3>Pronto para Garantir sua Segurança?</h3>
          <p>Não espere por imprevistos. Regularize seu imóvel agora.</p>
        </div>
        <a href="#contato" onClick={handleScrollToContact} className={styles.ctaButton}>
          Solicitar Orçamento
        </a>
      </motion.div>
    </section>
  );
};

export default HorizontalCtaSection;