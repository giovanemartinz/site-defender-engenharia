'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './ContactSection.module.css';

// O JSON de dados permanece o mesmo
const formData = {
  formulario_orcamento: {
    titulo: "Solicite um Orçamento Detalhado",
    descricao: "Preencha o formulário e nossa equipe de engenheiros retornará o mais breve possível.",
    campos: [
      { nome: "nome_completo", label: "Nome Completo", tipo: "texto", obrigatorio: true },
      { nome: "celular", label: "Celular / WhatsApp", tipo: "telefone", obrigatorio: true },
      { nome: "email", label: "Seu Melhor E-mail", tipo: "email", obrigatorio: true },
      { nome: "endereco", label: "Endereço completo do imóvel", tipo: "texto", obrigatorio: true },
      { nome: "metragem", label: "Metragem (m²)", tipo: "numero", obrigatorio: false },
      { nome: "responsavel_legal", label: "Nome do responsável legal", tipo: "texto", obrigatorio: false },
      { nome: "possui_ppci", label: "Já possui PPCI?", tipo: "radio", opcoes: ["Sim", "Não"], obrigatorio: false },
      { nome: "servicos_interesse", label: "Serviços de Interesse", tipo: "checkbox", opcoes: ["PPCI novo", "Renovação de PPCI", "LTIP", "Laudos técnicos", "Instalações", "Treinamentos", "Manutenção"], obrigatorio: true },
      { nome: "mensagem", label: "Detalhes do projeto ou mensagem adicional", tipo: "textarea", obrigatorio: false }
    ],
    botao: { texto: "Enviar e Receber Orçamento", acao: "submit" }
  },
  informacoes_contato: {
    telefone: "(51) 92000-7893",
    email: "comercial@defender.eng.br",
    endereco: "Rua Liane Alves, 60, Porto Alegre/RS"
  }
};

const FieldRenderer = ({ field }) => {
  const isRequired = field.obrigatorio;
  const label = `${field.label}${isRequired ? '*' : ''}`;

  // Novo grid de 12 colunas para máxima compactação
  const getFieldClassName = () => {
    switch (field.nome) {
      case 'nome_completo': return styles.gridSpan4;
      case 'celular': return styles.gridSpan4;
      case 'email': return styles.gridSpan4;
      case 'endereco': return styles.gridSpan8;
      case 'metragem': return styles.gridSpan4;
      case 'responsavel_legal': return styles.gridSpan12;
      case 'possui_ppci': return styles.gridSpan12;
      case 'servicos_interesse': return styles.gridSpan12;
      case 'mensagem': return styles.gridSpan12;
      default: return '';
    }
  };

  switch (field.tipo) {
    case 'texto':
    case 'telefone':
    case 'email':
    case 'numero':
      return (
        <div className={`${styles.formGroup} ${getFieldClassName()}`}>
          <label htmlFor={field.nome}>{label}</label>
          <input type={field.tipo === 'texto' ? 'text' : field.tipo} id={field.nome} name={field.nome} required={isRequired} />
        </div>
      );
    case 'textarea':
      return (
        <div className={`${styles.formGroup} ${getFieldClassName()}`}>
          <label htmlFor={field.nome}>{label}</label>
          <textarea id={field.nome} name={field.nome} rows="3" required={isRequired}></textarea>
        </div>
      );
    case 'radio':
      return (
        <div className={`${styles.formGroup} ${getFieldClassName()}`}>
          <fieldset>
            <legend>{label}</legend>
            <div className={styles.optionsGroup}>
              {field.opcoes.map(option => (
                <div key={option} className={styles.optionItem}>
                  <input type="radio" id={`${field.nome}_${option}`} name={field.nome} value={option} required={isRequired} />
                  <label htmlFor={`${field.nome}_${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      );
    case 'checkbox':
      return (
        <div className={`${styles.formGroup} ${getFieldClassName()}`}>
          <fieldset>
            <legend>{label}</legend>
            <div className={styles.optionsGroupCheckbox}>
              {field.opcoes.map(option => (
                <div key={option} className={styles.optionItem}>
                  <input type="checkbox" id={`${field.nome}_${option}`} name="servicos_interesse[]" value={option} />
                  <label htmlFor={`${field.nome}_${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </fieldset>
        </div>
      );
    default:
      return null;
  }
};

const ContactSection = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Formulário enviado! (Demonstração)');
  };
  const info = formData.informacoes_contato;

  return (
    <section id="contato" className={styles.contactSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.mainPanel}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} // Curva de ease suave
        >
          {/* Formulário (Área Principal) */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>
              Solicite um <span className={styles.titleHighlight}>Orçamento</span> Detalhado
            </h2>
            <p className={styles.description}>
              {formData.formulario_orcamento.descricao}
            </p>
            <div className={styles.formGrid}>
              {formData.formulario_orcamento.campos.map(field => (
                <FieldRenderer key={field.nome} field={field} />
              ))}
            </div>
             <button type="submit" className={styles.submitButton}>{formData.formulario_orcamento.botao.texto}</button>
          </form>

          {/* Barra Lateral de Informações */}
          <aside className={styles.infoSidebar}>
             <h3 className={styles.sidebarTitle}>Contato Direto</h3>
             <ul className={styles.contactList}>
               <li>
                 <FaPhone className={styles.icon} />
                 <div>
                   <span>Telefone</span>
                   <a href={`tel:${info.telefone.replace(/\D/g, '')}`}>{info.telefone}</a>
                 </div>
               </li>
               <li>
                 <FaEnvelope className={styles.icon} />
                 <div>
                   <span>E-mail</span>
                   <a href={`mailto:${info.email}`}>{info.email}</a>
                 </div>
               </li>
                <li>
                 <FaMapMarkerAlt className={styles.icon} />
                 <div>
                   <span>Endereço</span>
                   <p>{info.endereco}</p>
                 </div>
               </li>
             </ul>
             <div className={styles.sidebarFooter}>
                <p>Equipe Defender</p>
             </div>
          </aside>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;