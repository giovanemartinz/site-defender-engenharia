'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './AboutSummary.module.css';
import { FaBullseye, FaTasks, FaGem } from 'react-icons/fa';

const aboutData = {
  about: {
    title: "Sobre a Defender Engenharia",
    items: [
      { 
        icon: <FaBullseye />, 
        title: "Nossa Missão", 
        text: "Prestar serviços de engenharia com alto padrão, atendendo as exigências do PPCI, com foco em qualidade, custo justo, segurança de vidas e patrimônio." 
      },
      { 
        icon: <FaTasks />, 
        title: "Nossa Experiência", 
        text: "Acumulamos anos de experiência em projetos de PPCI para diversos setores, regularizando empresas, condomínios, edifícios comerciais e industriais. Nossa equipe tem sólida formação técnica e está em constante atualização sobre normas e legislações." 
      },
      { 
        icon: <FaGem />, 
        title: "Nossos Valores", 
        list: [
          "Ética e transparência em todas as nossas ações",
          "Compromisso com resultados efetivos",
          "Respeito à vida e segurança acima de tudo",
          "Capacitação constante da nossa equipe",
          "Relacionamento honesto com nossos clientes"
        ] 
      }
    ]
  },
  ppci: {
    title: "Por que o PPCI é importante?",
    image: "/images/PPCI.png",
    paragraphs: [
      "O Plano de Prevenção e Proteção Contra Incêndio (PPCI) não é apenas uma obrigação legal, mas uma ferramenta essencial para a segurança das pessoas e do patrimônio.",
      "No Rio Grande do Sul, a Lei Complementar 14.376/2013 (Lei Kiss) tornou obrigatória a regularização de edifícios, estabelecendo severas penalidades para responsáveis legais que não mantenham suas edificações em conformidade."
    ],
    commitment: {
      title: "Compromisso Defender",
      text: "Nossa equipe está comprometida não apenas com a regularização documental, mas principalmente com a segurança efetiva de cada projeto que realizamos. Trabalhamos para que você tenha tranquilidade e proteção real, não apenas documentos para cumprir exigências."
    }
  }
};

const AboutSummary = () => {
  return (
    <section id="sobre" className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Coluna da Esquerda: Sobre a Defender */}
          <motion.div 
            className={styles.aboutContent}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className={styles.mainTitle}>{aboutData.about.title}</h2>
            
            {aboutData.about.items.map((item, index) => (
              <div key={index} className={styles.infoBlock}>
                <div className={styles.infoIcon}>{item.icon}</div>
                <div>
                  <h3 className={styles.infoTitle}>{item.title}</h3>
                  {item.text && <p className={styles.infoText}>{item.text}</p>}
                  {item.list && (
                    <ul className={styles.valuesList}>
                      {item.list.map((value, i) => <li key={i}>{value}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Coluna da Direita: Importância do PPCI */}
          <motion.div 
            className={styles.ppciContent}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className={styles.ppciCard}>
              <h3 className={styles.ppciTitle}>{aboutData.ppci.title}</h3>
              <div className={styles.imageWrapper}>
                <Image 
                  src={aboutData.ppci.image} 
                  alt="Extintores de incêndio" 
                  width={500} 
                  height={250} 
                  className={styles.ppciImage}
                />
              </div>
              {aboutData.ppci.paragraphs.map((p, i) => <p key={i} className={styles.ppciText}>{p}</p>)}
              
              <div className={styles.commitmentBox}>
                <h4>{aboutData.ppci.commitment.title}</h4>
                <p>{aboutData.ppci.commitment.text}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSummary;