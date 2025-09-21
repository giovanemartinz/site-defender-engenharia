'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importa os ícones
import styles from './page.module.css';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // NOVO: Estado para visibilidade da senha
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email === 'admin@defender.eng.br' && password === 'admin123') {
      router.push('/admin/dashboard');
    } else {
      setError('E-mail ou senha inválidos.');
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.loginPage}>
      <motion.div
        className={styles.loginCard}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.logoWrapper}>
          <Image 
            src="/logo-defender.png" 
            alt="Defender Logo" 
            width={200} 
            height={50} 
            className={styles.logoImage} 
          />
        </div>
        
        <h2 className={styles.title}>Acesso Administrativo</h2>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={`${styles.inputGroup} ${styles.passwordWrapper}`}>
            <label htmlFor="password">Senha</label>
            <input
              type={showPassword ? 'text' : 'password'} // Alterna o tipo do input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* NOVO: Ícone para mostrar/ocultar senha */}
            <span 
              onClick={() => setShowPassword(!showPassword)} 
              className={styles.eyeIcon}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          
          {error && <p className={styles.errorMessage}>{error}</p>}
          
          <button type="submit" className={styles.loginButton} disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;