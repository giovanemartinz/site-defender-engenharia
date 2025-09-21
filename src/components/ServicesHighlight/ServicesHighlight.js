'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FaFileContract, FaTools, FaShieldAlt, FaBriefcase } from 'react-icons/fa';
import styles from './ServicesHighlight.module.css';

// Usando o JSON que você forneceu
const servicesData = {
  title: "Nossos Serviços",
  items: [
    {
      name: "Projetos de Prevenção e Combate a Incêndio",
      description: "Elaboração de projetos técnicos aprovados pelos órgãos competentes, garantindo a segurança e a conformidade com a legislação vigente.",
      icon: <FaFileContract />
    },
    {
      name: "Instalação de Sistemas",
      description: "Execução de obras e instalação de sistemas completos: hidrantes, sprinklers, alarmes, iluminação de emergência e mais.",
      icon: <FaTools />
    },
    {
      name: "Manutenção e Inspeção",
      description: "Serviços de manutenção preventiva e corretiva para assegurar o pleno funcionamento dos equipamentos de segurança.",
      icon: <FaShieldAlt />
    },
    {
      name: "Consultoria e Assessoria",
      description: "Orientação especializada para empresas que precisam se adequar às normas do Corpo de Bombeiros e obter o AVCB.",
      icon: <FaBriefcase />
    }
  ]
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const ServicesHighlight = () => {
  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>{servicesData.title}</h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // O gatilho dispara quando 20% estiver visível
        >
          {servicesData.items.map((service, index) => (
            <motion.div key={index} className={styles.card} variants={itemVariants}>
              {/* Div para a animação de flutuação do ícone */}
              <motion.div
                className={styles.iconWrapper}
                // ANIMAÇÃO DE FLUTUAÇÃO CONTÍNUA
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: index * 0.4 // Delay diferente para cada card
                }}
              >
                {service.icon}
              </motion.div>
              <h3 className={styles.cardTitle}>{service.name}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHighlight;