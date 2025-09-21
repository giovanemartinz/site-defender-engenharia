'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  // Função de rolagem suave para os links da landing page
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // -80px para compensar a altura do Header fixo
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Coluna 1: Logo e Descrição */}
          <div className={styles.column}>
            <Link href="/" className={styles.logoWrapper}>
              <Image
                src="/logo-defender.png"
                alt="Defender Engenharia"
                width={180}
                height={45}
                className={styles.logoImage}
              />
            </Link>
            <p className={styles.description}>
              Soluções completas em segurança, prevenção e combate a incêndios para todo o Brasil.
            </p>
          </div>

          {/* Coluna 2: Links Rápidos (agora para a Landing Page) */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Navegação</h3>
            <ul className={styles.linkList}>
              <li><a href="#sobre" onClick={(e) => handleScroll(e, 'sobre')}>Sobre Nós</a></li>
              <li><a href="#servicos" onClick={(e) => handleScroll(e, 'servicos')}>Serviços</a></li>
              <li><a href="#processo" onClick={(e) => handleScroll(e, 'processo')}>Como Funciona</a></li>
              <li><a href="#projetos" onClick={(e) => handleScroll(e, 'projetos')}>Projetos</a></li>
              <li><a href="#contato" onClick={(e) => handleScroll(e, 'contato')}>Contato</a></li>
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contato</h3>
            <ul className={styles.contactList}>
              <li><FaPhone /><a href="tel:5134074755">(51) 3407-4755</a></li>
              <li><FaEnvelope /><a href="mailto:comercial@defender.eng.br">comercial@defender.eng.br</a></li>
              <li><FaMapMarkerAlt />Rua Ione Alves, 60 - Ipanema, Porto Alegre/RS</li>
            </ul>
          </div>
        </div>

        {/* Barra Inferior com Direitos Autorais e Créditos */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>© {new Date().getFullYear()} Defender Engenharia. Todos os direitos reservados.</p>
          <div className={styles.socialIcons}>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
          </div>
          <p className={styles.credits}>
            Desenvolvido por: <a href="https://codebypatrick.dev/" target="_blank" rel="noopener noreferrer">Patrick.Developer</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;