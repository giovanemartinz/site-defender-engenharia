'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import styles from './FaqSection.module.css';

const faqData = {
  title: "Perguntas Frequentes",
  subtitle: "Tire suas dúvidas sobre PPCI, laudos técnicos e os serviços da Defender Engenharia.",
  questions: [
    {
      question: "O que é PPCI e quem precisa ter?",
      answer: "O PPCI (Plano de Prevenção e Proteção Contra Incêndio) é um conjunto de medidas estruturais, técnicas e organizacionais que visam evitar o surgimento de incêndio, limitar sua propagação, possibilitar sua extinção e proporcionar a proteção à vida, ao meio ambiente e ao patrimônio. Todas as edificações, exceto residências unifamiliares, precisam ter PPCI, incluindo empresas, comércios, indústrias, condomínios residenciais, escritórios, etc."
    },
    {
      question: "Qual a diferença entre PPCI, APPCI e AVCB?",
      answer: "PPCI é o plano/projeto técnico. APPCI (Alvará de Prevenção e Proteção Contra Incêndio) no RS, ou AVCB (Auto de Vistoria do Corpo de Bombeiros) em outros estados, é o documento final emitido pelos Bombeiros que certifica que a edificação está em conformidade com as normas de segurança."
    },
    {
      question: "Qual o prazo para obter um PPCI aprovado?",
      answer: "O prazo varia conforme a complexidade do projeto e a demanda do Corpo de Bombeiros local. Nosso processo é otimizado para garantir a máxima agilidade, cuidando de toda a tramitação para acelerar a aprovação."
    },
    {
      question: "O que é o LTIP e quem precisa ter?",
      answer: "O LTIP (Laudo Técnico de Inspeção Predial) é uma avaliação completa da estrutura e sistemas de uma edificação. É obrigatório para edifícios comerciais e residenciais com marquises ou sacadas, visando garantir a estabilidade e segurança estrutural."
    },
    {
      question: "Quais são as penalidades para quem não regulariza o PPCI?",
      answer: "A falta de um PPCI válido pode resultar em multas, interdição do imóvel e, em caso de sinistro, a responsabilização civil e criminal dos proprietários e administradores, conforme estipulado pela Lei Kiss (Lei Complementar 14.376/2013 no RS)."
    },
    {
      question: "O que é necessário para solicitar um orçamento?",
      answer: "Para um orçamento preciso, precisamos de informações básicas como o endereço do imóvel, a área total construída (m²), o tipo de ocupação (comercial, residencial, industrial) e, se possível, o número de pavimentos. Entre em contato e nossa equipe o guiará."
    }
  ],
  cta: {
    title: "Ainda tem dúvidas?",
    text: "Entre em contato conosco para obter informações específicas sobre o seu caso. Nossa equipe técnica está pronta para ajudar.",
    buttons: [
      { text: "Falar com um especialista", type: "primary" },
      { text: "Agendar uma consulta", type: "secondary" }
    ]
  }
};

const FaqItem = ({ item, isOpen, onClick }) => {
  return (
    <div className={styles.faqItem}>
      <button className={styles.question} onClick={onClick}>
        <span>{item.question}</span>
        <div className={styles.icon}>{isOpen ? <FaMinus /> : <FaPlus />}</div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.answer}
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: '1rem' }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p>{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>{faqData.title}</h2>
        <p className={styles.mainSubtitle}>{faqData.subtitle}</p>

        <div className={styles.faqList}>
          {faqData.questions.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className={styles.ctaBox}>
          <h3>{faqData.cta.title}</h3>
          <p>{faqData.cta.text}</p>
          <div className={styles.buttonGroup}>
            <a href="#contato" onClick={handleScrollToContact} className={styles.ctaPrimary}>
              {faqData.cta.buttons[0].text}
            </a>
            <a href="#contato" onClick={handleScrollToContact} className={styles.ctaSecondary}>
              {faqData.cta.buttons[1].text}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;