'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import styles from './Header.module.css';

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const navLinks = [
    { targetId: 'hero', label: 'Início' },
    { targetId: 'sobre', label: 'Sobre' },
    { targetId: 'servicos', label: 'Serviços' },
    { targetId: 'processo', label: 'Como Funciona' },
    { label: 'Treinamentos', href: 'https://treinamentos.defender.eng.br', type: 'external' },
    { targetId: 'contato', label: 'Contato' },
  ];

  const handleScrollToSection = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setNavOpen(false);
  };

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 50 }}
    >
      <div className={styles.container}>
        <a href="#hero" onClick={(e) => handleScrollToSection(e, 'hero')} className={styles.logo}>
          <Image
            src="/logonova.png"
            alt="Defender - Proteção Contra Incêndio"
            width={300}
            height={54}
            priority
            className={styles.logoImage}
          />
        </a>

        <nav className={styles.navDesktop}>
          {navLinks.map((link) =>
            link.type === 'external' ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navLink}
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.targetId}
                href={`#${link.targetId}`}
                onClick={(e) => handleScrollToSection(e, link.targetId)}
                className={styles.navLink}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className={styles.ctaContainer}>
          <a
            href="#contato"
            onClick={(e) => handleScrollToSection(e, 'contato')}
            className={styles.ctaButton}
          >
            <FaWhatsapp className={styles.whatsappIcon} />
            Solicitar Orçamento
          </a>
        </div>

        <button
          className={styles.mobileToggle}
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Abrir menu"
        >
          {navOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <AnimatePresence>
        {navOpen && (
          <motion.nav
            className={styles.navMobile}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link) =>
              link.type === 'external' ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.navLinkMobile}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.targetId}
                  href={`#${link.targetId}`}
                  className={styles.navLinkMobile}
                  onClick={(e) => handleScrollToSection(e, link.targetId)}
                >
                  {link.label}
                </a>
              )
            )}
            <a
              href="#contato"
              onClick={(e) => handleScrollToSection(e, 'contato')}
              className={`${styles.ctaButton} ${styles.ctaButtonMobile}`}
            >
              <FaWhatsapp className={styles.whatsappIcon} />
              Fale Conosco
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;