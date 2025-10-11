'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './ProjectsSection.module.css';

const certificationsData = [
  { 
    src: '/logos/cert-crea.png', 
    alt: 'CREA-RS',
    title: "Registro Profissional",
    description: "Empresa registrada e habilitada pelo CREA-RS para execução de projetos e obras de engenharia."
  },
  { 
    src: '/logos/cert-abnt.png', 
    alt: 'ABNT',
    title: "Normas Técnicas",
    description: "Projetos desenvolvidos em total conformidade com as normas ABNT, garantindo qualidade e segurança."
  },
  { 
    src: '/logos/cert-bombeiros.png', 
    alt: 'Corpo de Bombeiros',
    title: "Conformidade Legal",
    description: "Soluções aprovadas e em conformidade com as regulamentações do Corpo de Bombeiros."
  },
  { 
    src: '/logos/cert-garantia.png', 
    alt: 'Selo de Garantia',
    title: "Qualidade Assegurada",
    description: "Compromisso com a excelência e garantia de um ano em todos os serviços prestados."
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 120 } },
};

const ProjectsSection = () => {
  return (
    <section id="certificacoes" className={styles.certificationsSection}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.mainTitle}>Qualidade e Segurança Comprovadas</h2>
          <p className={styles.mainSubtitle}>
            Somos uma empresa certificada e comprometida com as mais rigorosas normas técnicas. Sua segurança é a nossa prioridade.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {certificationsData.map((cert, index) => (
            <motion.div key={index} className={styles.card} variants={itemVariants}>
              <div className={styles.logoWrapper}>
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={150}
                  height={70}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className={styles.cardTitle}>{cert.title}</h3>
              <p className={styles.cardDescription}>{cert.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;