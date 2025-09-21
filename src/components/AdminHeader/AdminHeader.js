'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaSignOutAlt } from 'react-icons/fa';
import styles from './AdminHeader.module.css';
import { useRouter } from 'next/navigation';

const AdminHeader = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Em uma aplicação real, aqui você limparia o token/sessão do usuário
    router.push('/admin/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Image src="/logo-defender.png" alt="Defender Logo" width={150} height={35} className={styles.logoImage} />
        <span className={styles.panelTitle}>Painel Administrativo</span>
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>
        <FaSignOutAlt />
        Sair
      </button>
    </header>
  );
};

export default AdminHeader;