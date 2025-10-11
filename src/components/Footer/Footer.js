'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const contactInfo = {
    address: "Rua Ione Alves, 60 - Ipanema, Porto Alegre/RS",
    phone: "(51) 3407-4755",
    email: "comercial@defender.eng.br",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Ione+Alves,+60,+Porto+Alegre,+RS"
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.grid}>
            
            <div className={styles.infoColumn}>
              <Link href="/" className={styles.logoWrapper}>
                <Image
                  src="/logonova.png"
                  alt="Defender Engenharia"
                  width={180}
                  height={54}
                  className={styles.logoImage}
                />
              </Link>
              <p className={styles.address}>{contactInfo.address}</p>
              <a href={contactInfo.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={styles.linkWithArrow}>
                <span>Veja como chegar</span>
                <div className={styles.arrowIcon}><FaArrowRight /></div>
              </a>
            </div>

            <div className={styles.contactColumn}>
              <h4 className={styles.contactTitle}>Atendimento</h4>
              <a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`} className={styles.phoneNumber}>
                {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className={styles.emailLink}>
                {contactInfo.email}
              </a>
            </div>

            <div className={styles.socialColumn}>
               <h4 className={styles.contactTitle}>Siga-nos</h4>
               <div className={styles.socialIcons}>
                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
                 <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
               </div>
            </div>

          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.bottomContent}>
            <p className={styles.copyright}>© {new Date().getFullYear()} Defender Engenharia. Todos os direitos reservados.</p>
            <p className={styles.credits}>
              Desenvolvido por: <a href="https://codebypatrick.dev/" target="_blank" rel="noopener noreferrer">Patrick.Developer</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;