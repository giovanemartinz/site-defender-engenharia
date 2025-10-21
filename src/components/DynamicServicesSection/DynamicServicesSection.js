'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileContract, FaCertificate, FaHardHat, FaUsers, FaSyncAlt, FaArrowRight } from 'react-icons/fa';
import styles from './DynamicServicesSection.module.css';

// ESTRUTURA DE DADOS (sem a propriedade 'image')
const servicesData = {
  servicos: [
    { 
      categoria: "Projetos e Regularização", 
      icon: <FaFileContract />, 
      itens: [ "PPCI – Plano de Prevenção e Proteção Contra Incêndio", "APPCI / AVCB – Alvará de Prevenção e Proteção Contra Incêndio", "PRPCI – Projeto Executivo de Prevenção", "Regularização para eventos temporários (shows, feiras)", "Licenciamento de Central de Gás (GLP, natural)", "Compartimentação vertical e horizontal" ] 
    },
    { 
      categoria: "Laudos e Certificações", 
      icon: <FaCertificate />, 
      itens: [ "LTIP – Laudo Técnico de Inspeção Predial", "Laudo SPDA (Para-raio)", "Laudo de controle de material de acabamento", "Laudo de segurança estrutural", "Laudo elétrico", "Laudo populacional" ] 
    },
    { 
      categoria: "Execução e Instalações", 
      icon: <FaHardHat />, 
      itens: [ "Instalação de guarda-corpo e corrimão", "Sinalização e iluminação de emergência", "Alarmes, detecção e extração de fumaça", "Sistemas de hidrantes e sprinklers", "Sistemas de proteção de coifa", "Aplicação de produtos anti-chamas (ignifugação)", "Obras e manutenções diversas" ] 
    },
    { 
      categoria: "Treinamentos e Planos", 
      icon: <FaUsers />, 
      itens: [ "Formação de brigada de emergência", "Treinamentos em prevenção e combate a incêndios", "Prestação de serviço de bombeiro civil", "Certificados de brigadistas", "Planos de emergência", "Mapas de evacuação" ] 
    },
    { 
      categoria: "Manutenção", 
      icon: <FaSyncAlt />, 
      itens: [ "Contratos de manutenção preventiva", "Manutenção corretiva", "Acompanhamento periódico legal", "Renovação de documentações", "Vistorias regulares", "Atualização conforme novas normas" ] 
    }
  ]
};

const generateWhatsAppLink = (serviceName) => {
  const phone = '5551920007893';
  const baseText = 'Olá, gostaria de consultar o serviço de';
  const encodedText = encodeURIComponent(`${baseText} ${serviceName}.`);
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
};

const DynamicServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentCategory = servicesData.servicos[activeIndex];

  return (
    <section id="servicos" className={styles.servicesSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nossos Serviços</h2>
        <p className={styles.subtitle}>Oferecemos um conjunto completo de soluções em prevenção e proteção contra incêndio para todos os tipos de edificações.</p>

        <div className={styles.categoryTabs}>
          {servicesData.servicos.map((service, index) => (
            <button
              key={index}
              className={`${styles.categoryButton} ${index === activeIndex ? styles.active : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              {service.icon}
              <span>{service.categoria}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className={styles.contentDisplay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <motion.div
              className={styles.serviceGrid}
              variants={{
                visible: { transition: { staggerChildren: 0.07 } }
              }}
              initial="hidden"
              animate="visible"
            >
              {currentCategory.itens.map((item, index) => (
                <motion.a
                  key={index}
                  href={generateWhatsAppLink(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.serviceCard}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <h3 className={styles.serviceTitle}>{item}</h3>
                  <div className={styles.consultLink}>
                    Consultar este serviço <FaArrowRight />
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DynamicServicesSection;