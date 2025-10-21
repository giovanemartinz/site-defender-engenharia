'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'; // Importado ícone de aviso
import styles from './HowItWorksSection.module.css';

// ALTERAÇÃO: Adicionamos a propriedade 'backgroundImage' a cada passo
const processSteps = [
  {
    stepNumber: "01",
    title: "Regularização e Documentação",
    description: "Análise das necessidades, elaboração de projetos e protocolo no Corpo de Bombeiros, emissão de aprovação.",
    subItems: [ "Vistoria técnica inicial", "Levantamento das necessidades", "Projeto personalizado", "Tramitação com órgãos competentes", "Obtenção da aprovação" ],
    backgroundImage: '/images/processo-01.jpg'
  },
  {
    stepNumber: "02",
    title: "Execução",
    description: "Implementação das medidas propostas, obras, instalações e ajustes conforme projeto aprovado.",
    subItems: [ "Instalação de equipamentos", "Implementação de sinalizações", "Execução de obras civis", "Testes de funcionamento", "Ajustes finais" ],
    backgroundImage: '/images/processo-02.jpg'
  },
  {
    stepNumber: "03",
    title: "Manutenção",
    description: "Vistorias, laudos e treinamentos contínuos para manter tudo regularizado.",
    subItems: [ "Visitas técnicas periódicas", "Manutenção preventiva", "Atualização de documentação", "Renovação de laudos", "Treinamento contínuo" ],
    backgroundImage: '/images/processo-03.jpg'
  }
];

// O bloco de informação legal foi movido para cá
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
        transition: { staggerChildren: 0.2 }
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
            Nosso método de trabalho é estruturado para garantir eficiência e resultados, do primeiro contato à manutenção contínua.
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
            // O CARD AGORA É UM CONTAINER PARA A ANIMAÇÃO
            <motion.div 
              key={step.stepNumber} 
              className={styles.stepCardContainer}
              variants={itemVariants}
            >
              <div className={styles.cardFlipper}>
                {/* FACE DA FRENTE (IMAGEM E ÍCONE) */}
                <div 
                  className={styles.cardFront} 
                  style={{ backgroundImage: `url(${step.backgroundImage})` }}
                >
                  <div className={styles.frontOverlay}></div>
                  <span className={styles.stepNumberIcon}>{step.stepNumber}</span>
                </div>
                
                {/* FACE DE TRÁS (TEXTO) */}
                <div className={styles.cardBack}>
                  <div className={styles.cardContent}>
                    <h3>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                    <ul className={styles.subItemsList}>
                      {step.subItems.map((item, i) => (
                        <li key={i}><FaCheckCircle className={styles.checkIcon} /> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- NOVO BLOCO DE INFORMAÇÃO LEGAL --- */}
        <motion.div
          className={styles.legalInfoBox}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={styles.legalTitle}>
            <FaExclamationTriangle />
            {legalInfo.title}
          </h3>
          {legalInfo.content.map((paragraph, index) => (
            <p key={index} className={styles.legalText}>{paragraph}</p>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorksSection;