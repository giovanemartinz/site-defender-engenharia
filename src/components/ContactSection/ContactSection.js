'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './ContactSection.module.css';
// Garanta que o caminho para o seu serviço de API esteja correto
import { sendQuoteRequest } from '../../../services/api.service'; 

const formDataConfig = {
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
        { nome: "possui_ppci", label: "Já possui PPCI?", tipo: "radio", opcoes: ["Sim", "Não"], obrigatorio: true },
        { nome: "servicos_interesse", label: "Serviços de Interesse", tipo: "checkbox", opcoes: ["PPCI novo", "Renovação de PPCI", "LTIP", "Laudos técnicos", "Instalações", "Treinamentos", "Manutenção"], obrigatorio: true },
        { nome: "mensagem", label: "Detalhes do projeto ou mensagem adicional", tipo: "textarea", obrigatorio: false }
    ],
    botao: { texto: "Enviar e Receber Orçamento", acao: "submit" }
  },
  informacoes_contato: {
    telefone: "(51) 92000-7893",
    email: "comercial@defender.eng.br",
    endereco: "Av. Guido Mondim, 884 - São Geraldo, Porto Alegre - RS, 90230-260"
  }
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nome_completo: '',
    celular: '',
    email: '',
    endereco: '',
    metragem: '',
    responsavel_legal: '',
    possui_ppci: '',
    servicos_interesse: [],
    mensagem: ''
  });

  const [formStatus, setFormStatus] = useState({ status: 'idle', message: '' }); // idle | sending | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentServices = prev.servicos_interesse;
      if (checked) {
        return { ...prev, servicos_interesse: [...currentServices, value] };
      } else {
        return { ...prev, servicos_interesse: currentServices.filter(s => s !== value) };
      }
    });
  };
  
  // ESTA É A FUNÇÃO CORRETA QUE CHAMA A API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação para o campo de checkbox
    if (formData.servicos_interesse.length === 0) {
      setFormStatus({ status: 'error', message: 'Por favor, selecione ao menos um serviço de interesse.' });
      return;
    }
    
    setFormStatus({ status: 'sending', message: '' });

    const apiPayload = {
      nome_completo: formData.nome_completo,
      celular: formData.celular,
      email: formData.email,
      endereco_imovel: formData.endereco,
      metragem: formData.metragem,
      responsavel_legal: formData.responsavel_legal,
      possui_ppci: formData.possui_ppci,
      servicos_interesse: formData.servicos_interesse.join(', '),
      mensagem_adicional: formData.mensagem
    };

    try {
      await sendQuoteRequest(apiPayload);
      setFormStatus({ status: 'success', message: 'Obrigado! Sua solicitação foi enviada com sucesso.' });
      // Opcional: Limpar o formulário após o envio bem-sucedido
      // setFormData({ ...initialState }); 
    } catch (error) {
      setFormStatus({ status: 'error', message: error.message || 'Falha ao enviar. Tente novamente mais tarde.' });
    }
  };

  const info = formDataConfig.informacoes_contato;

  // Renderizador de campos (não precisa de alteração)
  const FieldRenderer = ({ field }) => {
    const isRequired = field.obrigatorio;
    const label = `${field.label}${isRequired ? '*' : ''}`;

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
            <input type={field.tipo === 'texto' ? 'text' : field.tipo} id={field.nome} name={field.nome} required={isRequired} value={formData[field.nome]} onChange={handleChange} />
          </div>
        );
      case 'textarea':
        return (
          <div className={`${styles.formGroup} ${getFieldClassName()}`}>
            <label htmlFor={field.nome}>{label}</label>
            <textarea id={field.nome} name={field.nome} rows="3" required={isRequired} value={formData[field.nome]} onChange={handleChange}></textarea>
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
                    <input type="radio" id={`${field.nome}_${option}`} name={field.nome} value={option} required={isRequired} checked={formData[field.nome] === option} onChange={handleChange} />
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
                    <input type="checkbox" id={`${field.nome}_${option}`} name="servicos_interesse" value={option} checked={formData.servicos_interesse.includes(option)} onChange={handleCheckboxChange} />
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

  return (
    <section id="contato" className={styles.contactSection}>
      <div className={styles.container}>
        <motion.div
          className={styles.mainPanel}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>
              Solicite um <span className={styles.titleHighlight}>Orçamento</span> Detalhado
            </h2>
            <p className={styles.description}>
              {formDataConfig.formulario_orcamento.descricao}
            </p>
            <div className={styles.formGrid}>
              {formDataConfig.formulario_orcamento.campos.map(field => (
                <FieldRenderer key={field.nome} field={field} />
              ))}
            </div>
             <button type="submit" className={styles.submitButton} disabled={formStatus.status === 'sending'}>
                {formStatus.status === 'sending' ? 'Enviando...' : formDataConfig.formulario_orcamento.botao.texto}
             </button>
             {formStatus.message && (
                <p className={`${styles.formMessage} ${formStatus.status === 'success' ? styles.success : styles.error}`}>
                    {formStatus.message}
                </p>
             )}
          </form>

          <aside className={styles.infoSidebar}>
             <h3 className={styles.sidebarTitle}>Contato Direto</h3>
             <ul className={styles.contactList}>
               <li><FaPhone className={styles.icon} /><div><span>Telefone</span><a href={`tel:${info.telefone.replace(/\D/g, '')}`}>{info.telefone}</a></div></li>
               <li><FaEnvelope className={styles.icon} /><div><span>E-mail</span><a href={`mailto:${info.email}`}>{info.email}</a></div></li>
               <li><FaMapMarkerAlt className={styles.icon} /><div><span>Endereço</span><p>{info.endereco}</p></div></li>
             </ul>
             <div className={styles.mapWrapper}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.8993296652566!2d-51.1968331!3d-30.011046899999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951979c1c4b322c3%3A0x40d2a220ccd96669!2sAv.%20Guido%20Mondim%2C%20884%20-%20S%C3%A3o%20Geraldo%2C%20Porto%20Alegre%20-%20RS%2C%2090230-260!5e0!3m2!1sen!2sbr!4v1761244950182!5m2!1sen!2sbr"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                </iframe>
             </div>
             <div className={styles.sidebarFooter}><p>Equipe Defender</p></div>
          </aside>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;