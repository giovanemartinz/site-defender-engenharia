'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './AboutSummary.module.css';
import { FaBullseye, FaEye, FaGem } from 'react-icons/fa';

const aboutData = {
  title: "Quem Somos",
  content: "A Defender Engenharia é uma empresa especializada em projetos, instalações e manutenção de sistemas de prevenção e combate a incêndios. Atuamos com foco em segurança, inovação e conformidade com as normas técnicas e legais.",
  mission: "Garantir a segurança de pessoas e patrimônios por meio de soluções eficazes em prevenção e combate a incêndio.",
  vision: "Ser referência nacional em engenharia de segurança contra incêndio, reconhecida pela excelência técnica e compromisso com a vida.",
  values: [ "Compromisso com a segurança", "Excelência técnica", "Ética e transparência", "Inovação constante" ]
};

const AboutSummary = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        {/* O vídeo agora é o fundo */}
        <video
          className={styles.backgroundVideo}
          autoPlay
          loop
          muted
          playsInline
          key="about-video-fullscreen"
        >
          <source src="/sobre2.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos.
        </video>
        <div className={styles.overlay} />

        {/* Card de conteúdo sobreposto */}
        <motion.div
          className={styles.contentCard}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className={styles.title}>{aboutData.title}</h2>
          <p className={styles.content}>{aboutData.content}</p>

          <div className={styles.coreValues}>
            {/* Missão */}
            <motion.div className={styles.valueItem} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <div className={styles.valueIcon}><FaBullseye /></div>
              <div>
                <h4>Missão</h4>
                <p>{aboutData.mission}</p>
              </div>
            </motion.div>

            {/* Visão */}
            <motion.div className={styles.valueItem} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}>
              <div className={styles.valueIcon}><FaEye /></div>
              <div>
                <h4>Visão</h4>
                <p>{aboutData.vision}</p>
              </div>
            </motion.div>

            {/* Valores */}
            <motion.div className={styles.valueItem} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>
              <div className={styles.valueIcon}><FaGem /></div>
              <div>
                <h4>Valores</h4>
                <p>{aboutData.values.join(' • ')}</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSummary;