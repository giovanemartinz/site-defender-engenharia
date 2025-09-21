'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import styles from './TestimonialsSection.module.css';

// Dados extraídos da sua imagem
const testimonialsData = [
  {
    image: '/testimonials/man1.jpg',
    name: 'Carlos Mendes',
    role: 'Síndico de Condomínio',
    rating: 5,
    quote: '"A Defender Engenharia foi fundamental para regularizarmos o PPCI do nosso condomínio. Processo transparente e sem complicações, com prazos respeitados e preço justo."'
  },
  {
    image: '/testimonials/woman.jpg',
    name: 'Maria Oliveira',
    role: 'Gerente Administrativo',
    rating: 5,
    quote: '"Estávamos com dificuldades para regularizar nosso PPCI há anos. A Defender encontrou soluções que outros não conseguiram, e agora estamos 100% regularizados."'
  },
  {
    image: '/testimonials/man2.jpg',
    name: 'Ricardo Almeida',
    role: 'Proprietário de Loja',
    rating: 5,
    quote: '"Excelente atendimento e eficiência na execução. Consegui meu APPCI em tempo recorde e com um processo muito tranquilo. Recomendo fortemente."'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
};

const TestimonialsSection = () => {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <h2 className={styles.mainTitle}>O Que Nossos Clientes Dizem</h2>
        <p className={styles.mainSubtitle}>
          A satisfação dos nossos clientes é o melhor indicador da qualidade do nosso trabalho.
        </p>

        <motion.div 
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {testimonialsData.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className={styles.card} 
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.03, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={testimonial.image}
                  alt={`Foto de ${testimonial.name}`}
                  width={90}
                  height={90}
                  className={styles.profileImage}
                />
              </div>
              <FaQuoteLeft className={styles.quoteIcon} />
              <p className={styles.quote}>{testimonial.quote}</p>
              <div className={styles.rating}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <h3 className={styles.name}>{testimonial.name}</h3>
              <p className={styles.role}>{testimonial.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;