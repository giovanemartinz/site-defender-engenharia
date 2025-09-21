'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaGavel, FaCheckCircle } from 'react-icons/fa'; // Troquei o ícone do check
import styles from './HowItWorksSection.module.css';

// Os dados permanecem os mesmos
const processSteps = [
  {
    stepNumber: "01", // Alterado para dois dígitos para estética
    title: "Regularização e Documentação",
    description: "Análise das necessidades, elaboração de projetos e protocolo no Corpo de Bombeiros, emissão de aprovação.",
    subItems: [ "Vistoria técnica inicial", "Levantamento das necessidades específicas", "Projeto personalizado conforme normas vigentes", "Tramitação com órgãos competentes", "Obtenção da aprovação inicial" ]
  },
  {
    stepNumber: "02",
    title: "Execução",
    description: "Implementação das medidas propostas, obras, instalações e ajustes conforme projeto aprovado.",
    subItems: [ "Instalação de equipamentos de segurança", "Implementação de sinalizações", "Execução de obras civis necessárias", "Testes de funcionamento", "Ajustes finais conforme projeto" ]
  },
  {
    stepNumber: "03",
    title: "Manutenção",
    description: "Vistorias, laudos e treinamentos contínuos para manter tudo regularizado.",
    subItems: [ "Visitas técnicas periódicas", "Manutenção preventiva dos equipamentos", "Atualização de documentação", "Renovação de laudos e certificados", "Treinamento contínuo da equipe" ]
  }
];

const legalInfo = {
  title: "Informação Legal Importante",
  content: [
    "No Rio Grande do Sul, a Lei Complementar 14.376/2013 (Lei Kiss) estabelece que é crime deixar de manter o PPCI atualizado. Síndicos, administradores e proprietários são legalmente responsáveis pela segurança contra incêndio nos imóveis.",
    "Laudos como o LTIP (Laudo Técnico de Inspeção Predial) são obrigatórios para edifícios comerciais e residenciais com marquises ou sacadas, conforme legislação vigente."
  ]
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

const HowItWorksSection = () => {
  return (
    <section id="processo" className={styles.howItWorksSection}>
      <div className={styles.container}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className={styles.mainTitle}>Como Funciona o Processo Defender</h2>
          <p className={styles.mainSubtitle}>
            Nosso método de trabalho é estruturado para garantir eficiência e resultados, desde o primeiro contato até a manutenção contínua.
          </p>
        </motion.div>

        <motion.div 
          className={styles.processGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {processSteps.map((step) => (
            <motion.div 
              key={step.stepNumber} 
              className={styles.stepCard}
              variants={itemVariants}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className={styles.cardContent}>
                <span className={styles.stepNumber}>{step.stepNumber}</span>
                <h3>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                <ul className={styles.subItemsList}>
                  {step.subItems.map((item, i) => (
                    <li key={i}><FaCheckCircle className={styles.checkIcon} /> {item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className={styles.legalInfoBox}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.legalIcon}><FaGavel /></div>
          <div className={styles.legalContent}>
            <h4>{legalInfo.title}</h4>
            {legalInfo.content.map((p, i) => ( <p key={i}>{p}</p> ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;