'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import ChatbotPopup from '../ChatbotPopup/ChatbotPopup';
import styles from './FloatingActions.module.css';

const FloatingActions = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);
  // NOVO ESTADO PARA DETECTAR TELA MOBILE
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Função para verificar o tamanho da tela
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Verifica no carregamento inicial
    checkIsMobile();

    // Adiciona listener para redimensionamento da tela
    window.addEventListener('resize', checkIsMobile);

    const handleScroll = () => {
      setIsAtTop(window.scrollY < 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Limpeza dos listeners
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const textVariants = {
    hidden: { width: 0, opacity: 0, marginLeft: 0 },
    visible: { width: 'auto', opacity: 1, marginLeft: '0.5rem' }
  };

  // LÓGICA ATUALIZADA: Só expande se NÃO for mobile E (estiver no topo OU com hover)
  const isExpanded = (itemName) => {
    if (isMobile) {
      return false; // Força a ficar fechado no mobile
    }
    return isAtTop || hoveredItem === itemName;
  };

  return (
    <div className={styles.floatingContainer}>
      {/* Botão do WhatsApp */}
      <a
        href="https://wa.me/5551920007893"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.actionButton} ${styles.whatsappBg}`}
        onMouseEnter={() => setHoveredItem('whatsapp')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <FaWhatsapp size={26} />
        <AnimatePresence>
          <motion.span
            variants={textVariants}
            initial="hidden"
            animate={isExpanded('whatsapp') ? 'visible' : 'hidden'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={styles.buttonText}
          >
            Chamar no WhatsApp
          </motion.span>
        </AnimatePresence>
      </a>

      {/* Componente do Chatbot */}
      <div 
        onMouseEnter={() => setHoveredItem('chatbot')}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <ChatbotPopup isExpanded={isExpanded('chatbot')} />
      </div>
    </div>
  );
};

export default FloatingActions;