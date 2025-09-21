'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileContract, FaCertificate, FaHardHat, FaUsers, FaSyncAlt } from 'react-icons/fa';
import styles from './DynamicServicesSection.module.css';

// ESTRUTURA DE DADOS COM ÍCONES
const servicesData = {
  servicos: [
    { categoria: "Projetos e Regularização", icon: <FaFileContract />, itens: [ "PPCI – Plano de Prevenção e Proteção Contra Incêndio", "APPCI / AVCB – Alvará de Prevenção e Proteção Contra Incêndio", "PRPCI – Projeto Executivo de Prevenção", "Regularização para eventos temporários (shows, feiras)", "Licenciamento de Central de Gás (GLP, natural)", "Compartimentação vertical e horizontal" ] },
    { categoria: "Laudos e Certificações", icon: <FaCertificate />, itens: [ "LTIP – Laudo Técnico de Inspeção Predial", "Laudo SPDA (Para-raio)", "Laudo de controle de material de acabamento", "Laudo de segurança estrutural", "Laudo elétrico", "Laudo populacional" ] },
    { categoria: "Execução e Instalações", icon: <FaHardHat />, itens: [ "Instalação de guarda-corpo e corrimão", "Sinalização e iluminação de emergência", "Alarmes, detecção e extração de fumaça", "Sistemas de hidrantes e sprinklers", "Sistemas de proteção de coifa", "Aplicação de produtos anti-chamas (ignifugação)", "Obras e manutenções diversas" ] },
    { categoria: "Treinamentos e Planos", icon: <FaUsers />, itens: [ "Formação de brigada de emergência", "Treinamentos em prevenção e combate a incêndios", "Prestação de serviço de bombeiro civil", "Certificados de brigadistas", "Planos de emergência", "Mapas de evacuação" ] },
    { categoria: "Manutenção", icon: <FaSyncAlt />, itens: [ "Contratos de manutenção preventiva", "Manutenção corretiva", "Acompanhamento periódico legal", "Renovação de documentações", "Vistorias regulares", "Atualização conforme novas normas" ] }
  ]
};

const generateWhatsAppLink = (serviceName) => {
  const phone = '5551920007893';
  const baseText = 'Olá, gostaria de saber mais sobre o serviço de';
  const encodedText = encodeURIComponent(`${baseText} ${serviceName}.`);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
};

const extendedCategories = [...servicesData.servicos, ...servicesData.servicos];

const DynamicServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentCategory = servicesData.servicos[activeIndex];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nossas Especialidades</h2>
        <p className={styles.subtitle}>Selecione uma categoria para explorar nossos serviços detalhados.</p>

        <div className={styles.categoryScroller}>
          <div className={styles.categorySlider}>
            {extendedCategories.map((service, index) => (
              <button
                key={index}
                className={`${styles.categoryButton} ${index % servicesData.servicos.length === activeIndex ? styles.active : ''}`}
                onClick={() => setActiveIndex(index % servicesData.servicos.length)}
              >
                {service.categoria}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className={styles.serviceGrid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { staggerChildren: 0.05 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentCategory.itens.map((item, index) => (
              <motion.a
                key={index}
                href={generateWhatsAppLink(item)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.serviceCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8, scale: 1.03, zIndex: 2, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)' }}
              >
                <div className={styles.serviceCardIcon}>
                  {currentCategory.icon}
                </div>
                <h4 className={styles.serviceText}>{item}</h4>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DynamicServicesSection;