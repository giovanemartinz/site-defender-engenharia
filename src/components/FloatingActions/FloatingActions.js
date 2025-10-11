'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import ChatbotPopup from '../ChatbotPopup/ChatbotPopup'; // Importar o chatbot
import styles from './FloatingActions.module.css';

const FloatingActions = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Considera "topo" os primeiros 100 pixels da página
      setIsAtTop(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verifica a posição inicial no carregamento

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const textVariants = {
    hidden: { width: 0, opacity: 0, marginLeft: 0 },
    visible: { width: 'auto', opacity: 1, marginLeft: '0.5rem' }
  };

  const isExpanded = (itemName) => {
    // Expande se estiver no topo OU se o mouse estiver sobre o item
    return isAtTop || hoveredItem === itemName;
  };

  return (
    <div className={styles.floatingContainer}>
      {/* Botão do WhatsApp */}
      <a
        href="https://wa.me/5551920007893" // Coloque seu número de WhatsApp aqui
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