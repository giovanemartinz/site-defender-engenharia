'use client';

import React, { useState, useMemo } from 'react';
import AdminHeader from '@/components/AdminHeader/AdminHeader';
import styles from './page.module.css';
import { FaUser, FaEnvelope, FaPhone, FaRegBuilding, FaWhatsapp, FaSearch } from 'react-icons/fa';

// --- DADOS MOCKADOS (MAIS DADOS PARA TESTAR A PAGINAÇÃO E PESQUISA) ---
const mockLeads = [
  { id: 1, nome: "João da Silva", celular: "11987654321", email: "joao.silva@example.com", endereco: "Rua das Flores, 123, São Paulo, SP", servicos: ["PPCI novo", "Instalações"], mensagem: "Preciso de um orçamento urgente para um novo galpão industrial.", data: "2025-09-18" },
  { id: 2, nome: "Maria Oliveira", celular: "21912345678", email: "maria.o@example.com", endereco: "Av. Copacabana, 456, Rio de Janeiro, RJ", servicos: ["Renovação de PPCI"], mensagem: "O alvará do meu condomínio está vencendo, preciso renovar.", data: "2025-09-17" },
  { id: 3, nome: "Carlos Pereira", celular: "51955554444", email: "carlos.pereira@empresa.com", endereco: "Rua da Indústria, 789, Canoas, RS", servicos: ["Manutenção", "Treinamentos"], mensagem: "", data: "2025-09-16" },
  { id: 4, nome: "Ana Costa", celular: "31999998888", email: "ana.costa@email.com", endereco: "Praça da Liberdade, 10, Belo Horizonte, MG", servicos: ["LTIP"], mensagem: "Laudo para prédio comercial antigo.", data: "2025-09-15" },
  { id: 5, nome: "Pedro Martins", celular: "71988887777", email: "pedro.m@email.com", endereco: "Largo do Pelourinho, 22, Salvador, BA", servicos: ["PPCI novo"], mensagem: "Orçamento para pousada.", data: "2025-09-14" },
  { id: 6, nome: "Juliana Santos", celular: "41977776666", email: "juliana.s@email.com", endereco: "Rua XV de Novembro, 500, Curitiba, PR", servicos: ["Instalações"], mensagem: "Instalação de sprinklers.", data: "2025-09-13" },
  { id: 7, nome: "Fernando Lima", celular: "81966665555", email: "fernando.lima@email.com", endereco: "Av. Boa Viagem, 1234, Recife, PE", servicos: ["Laudos técnicos"], mensagem: "", data: "2025-09-12" },
  { id: 8, nome: "Beatriz Almeida", celular: "92955554444", email: "beatriz.a@example.com", endereco: "Rua dos Barés, 33, Manaus, AM", servicos: ["Treinamentos"], mensagem: "Treinamento de brigada de incêndio.", data: "2025-09-11" },
  { id: 9, nome: "Ricardo Jorge", celular: "61944443333", email: "ricardo.jorge@gov.com", endereco: "Eixo Monumental, 1, Brasília, DF", servicos: ["Renovação de PPCI"], mensagem: "Renovação para prédio público.", data: "2025-09-10" },
  { id: 10, nome: "Sofia Ribeiro", celular: "85933332222", email: "sofia.ribeiro@email.com", endereco: "Av. Beira Mar, 2000, Fortaleza, CE", servicos: ["Manutenção"], mensagem: "", data: "2025-09-09" },
  { id: 11, nome: "Lucas Gomes", celular: "48922221111", email: "lucas.gomes@example.com", endereco: "Ponte Hercílio Luz, Florianópolis, SC", servicos: ["PPCI novo"], mensagem: "Projeto para restaurante.", data: "2025-09-08" },
  { id: 12, nome: "Isabela Ferreira", celular: "27911110000", email: "isabela.f@email.com", endereco: "Convento da Penha, Vila Velha, ES", servicos: ["LTIP"], mensagem: "", data: "2025-09-07" },
  { id: 13, nome: "Mateus Andrade", celular: "62999991234", email: "mateus.a@empresa.com", endereco: "Av. Anhanguera, 55, Goiânia, GO", servicos: ["Instalações"], mensagem: "Orçamento para instalação completa.", data: "2025-09-06" },
  { id: 14, nome: "Larissa Rocha", celular: "98988885678", email: "larissa.rocha@email.com", endereco: "Av. Litorânea, 100, São Luís, MA", servicos: ["Laudos técnicos"], mensagem: "Preciso de laudo elétrico.", data: "2025-09-05" },
  { id: 15, nome: "Guilherme Azevedo", celular: "65977779999", email: "guilherme.a@example.com", endereco: "Chapada dos Guimarães, MT", servicos: ["Renovação de PPCI"], mensagem: "", data: "2025-09-04" },
  { id: 16, nome: "Manuela Barbosa", celular: "67966668888", email: "manuela.b@email.com", endereco: "Rua 14 de Julho, 123, Campo Grande, MS", servicos: ["Manutenção"], mensagem: "Contrato de manutenção.", data: "2025-09-03" },
];
// --- FIM DOS DADOS MOCKADOS ---

const LEADS_PER_PAGE = 15;

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra os leads com base no termo de pesquisa
  const filteredLeads = useMemo(() => {
    if (!searchTerm) return mockLeads;

    const lowercasedFilter = searchTerm.toLowerCase();
    return mockLeads.filter(lead =>
      lead.nome.toLowerCase().includes(lowercasedFilter) ||
      lead.email.toLowerCase().includes(lowercasedFilter) ||
      lead.celular.includes(lowercasedFilter)
    );
  }, [searchTerm]);

  // Calcula a paginação com base nos leads filtrados
  const totalPages = Math.ceil(filteredLeads.length / LEADS_PER_PAGE);
  const startIndex = (currentPage - 1) * LEADS_PER_PAGE;
  const endIndex = startIndex + LEADS_PER_PAGE;
  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Reseta para a página 1 sempre que o filtro mudar
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getGoogleMapsLink = (address) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className={styles.dashboardLayout}>
      <AdminHeader />
      <main className={styles.mainContent}>
        <div className={styles.headerRow}>
          <h1 className={styles.pageTitle}>Leads Capturados</h1>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Pesquisar por nome, e-mail ou telefone..."
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.searchInput}
            />
          </div>
        </div>
        
        <div className={styles.leadsTableWrapper}>
          <table className={styles.leadsTable}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Contato</th>
                <th>Serviços de Interesse</th>
                <th>Mensagem</th>
              </tr>
            </thead>
            <tbody>
              {currentLeads.length > 0 ? (
                currentLeads.map(lead => (
                  <tr key={lead.id}>
                    <td data-label="Data">{new Date(lead.data).toLocaleDateString('pt-BR')}</td>
                    <td data-label="Contato">
                      <div className={styles.contactInfo}>
                        <p><FaUser /> {lead.nome}</p>
                        <p className={styles.linkRow}>
                          <a href={`tel:${lead.celular}`}><FaPhone /> {lead.celular}</a>
                          <a href={`https://wa.me/55${lead.celular}`} target="_blank" rel="noopener noreferrer"><FaWhatsapp className={styles.whatsappIcon}/></a>
                        </p>
                        <p><a href={`mailto:${lead.email}`}><FaEnvelope /> {lead.email}</a></p>
                        <p><a href={getGoogleMapsLink(lead.endereco)} target="_blank" rel="noopener noreferrer"><FaRegBuilding /> {lead.endereco}</a></p>
                      </div>
                    </td>
                    <td data-label="Serviços">
                      <div className={styles.servicesList}>
                        {lead.servicos.map(servico => <span key={servico}>{servico}</span>)}
                      </div>
                    </td>
                    <td data-label="Mensagem">
                      <p className={styles.messageCell}>
                        {lead.mensagem || <span className={styles.noMessage}>Nenhuma mensagem</span>}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={styles.noResults}>Nenhum lead encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
            <span>Página {currentPage} de {totalPages}</span>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Próxima</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;