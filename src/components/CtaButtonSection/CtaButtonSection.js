'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import styles from './HorizontalCtaSection.module.css';

const HorizontalCtaSection = () => {
  // Constrói o link do WhatsApp com uma mensagem padrão
  const whatsappUrl = "https://wa.me/5551920007893?text=" + encodeURIComponent("Olá! Gostaria de solicitar um orçamento.");

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
        <a 
          href={whatsappUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.ctaButton}
        >
          Solicitar Orçamento
        </a>
      </motion.div>
    </section>
  );
};

export default HorizontalCtaSection;