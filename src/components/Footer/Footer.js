'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaLinkedin, FaFacebook, FaChevronRight, FaCalendarAlt } from 'react-icons/fa';
import styles from './Footer.module.css';

const footerData = {
  info: {
    description: "Especialistas em PPCI, laudos técnicos e segurança contra incêndio, atendendo Porto Alegre e região com qualidade e compromisso.",
    social: [
      { name: "Instagram", icon: <FaInstagram />, url: "#" },
      { name: "LinkedIn", icon: <FaLinkedin />, url: "#" },
      { name: "Facebook", icon: <FaFacebook />, url: "#" }
    ]
  },
  navigation: [
    { label: "Início", targetId: "hero" },
    { label: "Sobre Nós", targetId: "sobre" },
    { label: "Serviços", targetId: "servicos" },
    { label: "Como Funciona", targetId: "processo" },
     { label: "Treinamentos", targetId: "https://treinamentos.defender.eng.br", external: true },
    { label: "FAQ", targetId: "faq" }, // Assumindo que o ID da seção FAQ será "faq"
    { label: "Contato", targetId: "contato" }
  ],
  services: [
    "PPCI / APPCI",
    "Laudos Técnicos (LTIP)",
    "Instalações",
    "Treinamentos",
    "Manutenção"
  ],
  contact: {
    phone: "(51) 92000-7893",
    email: "comercial@defender.eng.br",
    address: "Rua Liane Alves, 60, Porto Alegre/RS",
    cep: "CEP: 91.751-170"
  }
};

const Footer = () => {

  const handleScrollToSection = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const headerHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };
  
  const generateWhatsAppLink = (serviceName) => {
    const phone = '5551920007893';
    const text = encodeURIComponent(`Olá, gostaria de saber mais sobre o serviço de ${serviceName}.`);
    return `https://wa.me/${phone}?text=${text}`;
  };

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Coluna 1: Info */}
          <div className={styles.infoColumn}>
            <Link href="/" className={styles.logoWrapper}>
              <Image src="/logonova.png" alt="Defender Engenharia" width={180} height={100} className={styles.logoImage} />
            </Link>
            <p className={styles.description}>{footerData.info.description}</p>
            <div className={styles.socialIcons}>
              {footerData.info.social.map(s => <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>{s.icon}</a>)}
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Navegação Rápida</h3>
            <ul className={styles.navList}>
              {footerData.navigation.map(link => (
                <li key={link.targetId}>
                  <a href={`#${link.targetId}`} onClick={(e) => handleScrollToSection(e, link.targetId)}>
                    <FaChevronRight /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Serviços */}
          <div className={styles.linksColumn}>
            <h3 className={styles.columnTitle}>Serviços</h3>
            <ul className={styles.navList}>
              {footerData.services.map(service => (
                <li key={service}>
                  <a href={generateWhatsAppLink(service)} target="_blank" rel="noopener noreferrer">
                    <FaChevronRight /> {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Coluna 4: Contato */}
          <div className={styles.contactColumn}>
            <h3 className={styles.columnTitle}>Contato</h3>
            <ul className={styles.contactList}>
              <li><FaPhone /><a href={`tel:${footerData.contact.phone.replace(/\D/g, '')}`}>{footerData.contact.phone}</a></li>
              <li><FaEnvelope /><a href={`mailto:${footerData.contact.email}`}>{footerData.contact.email}</a></li>
              <li><FaMapMarkerAlt /><span>{footerData.contact.address}<br />{footerData.contact.cep}</span></li>
              <li><FaCalendarAlt /><a href="#contato" onClick={(e) => handleScrollToSection(e, 'contato')}>Agendar reunião</a></li>
            </ul>
          </div>

        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.bottomContent}>
          <p>© {new Date().getFullYear()} Defender Engenharia. Todos os direitos reservados.</p>
          <p>Desenvolvido por: <a href="https://codebypatrick.dev/" target="_blank" rel="noopener noreferrer">Patrick.Developer</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;