'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
// MODIFICAÇÃO: AnimatePresence foi adicionado aqui
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaBars, FaTimes } from 'react-icons/fa';
import styles from './Header.module.css';

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { targetId: 'hero', label: 'Início' },
    { targetId: 'sobre', label: 'Sobre' },
    { targetId: 'servicos', label: 'Serviços' },
    { targetId: 'processo', label: 'Como Funciona' },
    { targetId: 'contato', label: 'Contato' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // O ideal é pegar a altura do header dinamicamente, mas 80 é um bom valor
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setNavOpen(false); // Fecha o menu mobile após o clique
  };

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 50 } },
  };

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.container}>
        <a href="#hero" onClick={(e) => handleScrollToSection(e, 'hero')} className={styles.logo}>
          <Image
            src="/logo-defender.png"
            alt="Defender - Proteção Contra Incêndio"
            width={300}
            height={30}
            priority
            className={styles.logoImage}
          />
        </a>

        {/* Navegação Desktop */}
        <nav className={styles.navDesktop}>
          {navLinks.map((link) => (
            <a key={link.targetId} href={`#${link.targetId}`} onClick={(e) => handleScrollToSection(e, link.targetId)} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTAs Desktop */}
        <div className={styles.ctaContainer}>
          <a href="#contato" onClick={(e) => handleScrollToSection(e, 'contato')} className={styles.ctaButton}>
            <FaWhatsapp className={styles.whatsappIcon} />
            Fale Conosco
          </a>
        </div>

        {/* Botão Mobile Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Abrir menu"
        >
          {navOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navegação Mobile (Dropdown) */}
      <AnimatePresence>
        {navOpen && (
          <motion.nav
            className={styles.navMobile}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link) => (
              <a
                key={link.targetId}
                href={`#${link.targetId}`}
                className={styles.navLinkMobile}
                onClick={(e) => handleScrollToSection(e, link.targetId)}
              >
                {link.label}
              </a>
            ))}
            <a href="#contato" onClick={(e) => handleScrollToSection(e, 'contato')} className={`${styles.ctaButton} ${styles.ctaButtonMobile}`}>
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