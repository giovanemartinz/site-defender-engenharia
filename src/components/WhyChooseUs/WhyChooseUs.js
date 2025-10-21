'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaClipboardCheck, FaShieldAlt, FaAward, FaCertificate, FaTags, FaBuilding } from 'react-icons/fa';
import styles from './WhyChooseUs.module.css';

const featuresData = {
  title: "Por que escolher a Defender Engenharia?",
  subtitle: "Somos referência em PPCI e proteção contra incêndio, oferecendo soluções completas para sua segurança e tranquilidade.",
  features: [
    {
      icon: <FaClipboardCheck />,
      title: "Regularização Completa",
      description: "Da documentação à aprovação no Corpo de Bombeiros com agilidade e segurança."
    },
    {
      icon: <FaShieldAlt />,
      title: "Consultoria Total",
      description: "Todas as etapas do processo — projeto, execução, laudos, treinamento e manutenção."
    },
    {
      icon: <FaAward />,
      title: "Ética e Transparência",
      description: "Compromisso com responsabilidade e transparência em cada projeto que executamos."
    },
    {
      icon: <FaCertificate />,
      title: "Equipe Certificada",
      description: "Profissionais com CREA e certificações específicas para garantir qualidade e conformidade."
    },
    {
      icon: <FaTags />,
      title: "Preço Justo",
      description: "Orçamentos transparentes e sem surpresas, com excelente custo-benefício."
    },
    {
      icon: <FaBuilding />,
      title: "Especialistas em Imóveis",
      description: "Experiência em regularização de empresas, condomínios e empreendimentos comerciais."
    }
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const WhyChooseUs = () => {
  return (
    <section className={styles.whyChooseUsSection}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.mainTitle}>{featuresData.title}</h2>
          <p className={styles.mainSubtitle}>{featuresData.subtitle}</p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuresData.features.map((feature, index) => (
            <motion.div
              key={index}
              className={styles.card}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)' }}
            >
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;