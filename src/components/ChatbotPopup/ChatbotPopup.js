// Arquivo: /components/ChatbotPopup/ChatbotPopup.js

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChatbubbles, IoClose, IoSend, IoCheckmarkDone } from 'react-icons/io5';
import styles from './ChatbotPopup.module.css';
import { sendQuoteRequest } from '../../../services/api.service';

// ATUALIZAÇÃO: Script do formulário com um novo passo condicional
const formScript = [
  { id: 'start', question: 'Para começar, qual é o seu nome?', key: 'nome', type: 'text' },
  { id: 'phone', question: 'Ótimo! E qual o seu celular com DDD para contato?', key: 'celular', type: 'text' },
  { id: 'email', question: 'Perfeito. Agora, qual seu melhor e-mail?', key: 'email', type: 'text' },
  { id: 'ppci_check', question: 'O imóvel já possui PPCI (Plano de Prevenção Contra Incêndio)?', key: 'possui_ppci', type: 'radio', options: ['Sim', 'Não', 'Não sei informar'] },
  { id: 'services', question: 'Quais destes serviços você tem interesse? (Pode marcar vários)', key: 'servicos', type: 'checkbox', options: ["PPCI novo", "Renovação de PPCI", "LTIP", "Laudos técnicos", "Instalações", "Treinamentos", "Manutenção", "Outro"] },
  // NOVO PASSO: Este passo só será executado se "Outro" for selecionado
  { id: 'other_text', question: 'Você marcou "Outro". Por favor, especifique qual serviço você precisa:', key: 'outro_servico_texto', type: 'text' },
  { id: 'final', question: 'Excelente! Recebemos suas informações. Nossa equipe de especialistas já está analisando e entrará em contato em breve. Muito obrigado!' }
];

const TypingIndicator = () => (
    <motion.div className={`${styles.message} ${styles.botMessage} ${styles.typingIndicator}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
        <span /> <span /> <span />
    </motion.div>
);

const ChatbotPopup = ({ isExpanded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [leadData, setLeadData] = useState({});
    const [selectedCheckboxOptions, setSelectedCheckboxOptions] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);
    const messageAreaRef = useRef(null);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages([{ id: 'intro1', sender: 'bot', text: 'Olá! Bem-vindo à Defender Engenharia.' }]);
                setTimeout(() => {
                    setIsTyping(false);
                    setMessages(prev => [...prev, { id: 'intro2', sender: 'bot', text: formScript[0].question }]);
                }, 1200);
            }, 800);
        }
    }, [isOpen]);

    useEffect(() => {
        if (messageAreaRef.current) {
            messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
        }
    }, [messages, isTyping]);
    
    const handleUserInput = (answer) => {
        const currentQuestion = formScript[currentStep];
        const userMessage = { id: Date.now(), sender: 'user', text: answer };
        setMessages(prev => [...prev, userMessage]);
        const updatedLeadData = { ...leadData, [currentQuestion.key]: answer };
        setLeadData(updatedLeadData);
        goToNextStep(updatedLeadData);
    };

    const handleCheckboxSubmit = () => {
        if (selectedCheckboxOptions.length === 0) return;
        const answer = selectedCheckboxOptions.join(', ');
        handleUserInput(answer);
        setSelectedCheckboxOptions([]);
    };

    const goToNextStep = (updatedLeadData) => {
        setIsTyping(true);
        let nextStepIndex = currentStep + 1;

        // ATUALIZAÇÃO: Lógica para pular o passo "other_text" se "Outro" não foi selecionado
        if (formScript[nextStepIndex] && formScript[nextStepIndex].id === 'other_text') {
            const services = updatedLeadData.servicos || '';
            if (!services.includes('Outro')) {
                nextStepIndex++; // Pula o passo
            }
        }

        setTimeout(async () => {
            setIsTyping(false);

            if (nextStepIndex < formScript.length) {
                const nextQuestion = { ...formScript[nextStepIndex] };

                if (nextQuestion.id === 'final') {
                    // ATUALIZAÇÃO: Processa a lista de serviços para incluir o texto de "Outro"
                    const servicesList = (updatedLeadData.servicos || '').split(', ');
                    const finalServices = servicesList.map(s => {
                        if (s === 'Outro' && updatedLeadData.outro_servico_texto) {
                            return `Outro: ${updatedLeadData.outro_servico_texto}`;
                        }
                        return s;
                    }).filter(service => service !== 'Outro' || updatedLeadData.outro_servico_texto).join(', ');

                    const apiPayload = {
                        nome_completo: updatedLeadData.nome || 'Não informado',
                        celular: updatedLeadData.celular || 'Não informado',
                        email: updatedLeadData.email || 'Não informado',
                        possui_ppci: updatedLeadData.possui_ppci || 'Não informado',
                        servicos_interesse: finalServices,
                        endereco_imovel: 'Não coletado via chatbot',
                        metragem: 'Não coletado via chatbot',
                        responsavel_legal: 'Não coletado via chatbot',
                        mensagem_adicional: 'Lead capturado pelo Assistente Virtual do site.'
                    };
                    
                    try {
                        await sendQuoteRequest(apiPayload);
                    } catch (error) {
                        console.error('Falha ao enviar lead do chatbot:', error);
                        nextQuestion.question = "Tivemos um problema ao registrar seus dados. Por favor, tente usar nosso formulário de contato ou chame no WhatsApp.";
                    }
                    setIsCompleted(true);
                }

                setMessages(prev => [...prev, { id: nextQuestion.id, sender: 'bot', text: nextQuestion.question }]);
                setCurrentStep(nextStepIndex);
            }
        }, 1500);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping) return;
        handleUserInput(inputValue);
        setInputValue('');
    };

    const handleCheckboxChange = (option) => {
        setSelectedCheckboxOptions(prev => 
            prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
        );
    };

    const renderInputArea = () => {
        if (isCompleted) {
            return <div className={styles.completedMessage}><IoCheckmarkDone /> Conversa finalizada!</div>;
        }
        const currentQuestion = formScript[currentStep];
        if (!currentQuestion || isTyping) {
            return <div className={styles.inputAreaDisabled}></div>;
        }
        switch (currentQuestion.type) {
            case 'text':
                return (
                    <form onSubmit={handleFormSubmit} className={styles.inputArea}>
                        <input type="text" placeholder="Digite sua resposta..." value={inputValue} onChange={e => setInputValue(e.target.value)} className={styles.textInput} />
                        <button type="submit" className={styles.sendButton}><IoSend /></button>
                    </form>
                );
            case 'radio':
                return (
                    <div className={styles.optionsContainer}>
                        {currentQuestion.options.map(opt => <button key={opt} onClick={() => handleUserInput(opt)} className={styles.optionButton}>{opt}</button>)}
                    </div>
                );
            case 'checkbox':
                return (
                    <div className={styles.optionsContainerCheckbox}>
                        <div className={styles.checkboxGrid}>
                            {currentQuestion.options.map(opt => (
                                <div key={opt} className={styles.checkboxItem}>
                                    <input type="checkbox" id={`cb-${opt}`} checked={selectedCheckboxOptions.includes(opt)} onChange={() => handleCheckboxChange(opt)} />
                                    <label htmlFor={`cb-${opt}`}>{opt}</label>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleCheckboxSubmit} className={styles.confirmButton} disabled={selectedCheckboxOptions.length === 0}>Confirmar Seleção</button>
                    </div>
                );
            default:
                return null;
        }
    };
    
    const textVariants = {
        hidden: { width: 0, opacity: 0, marginLeft: 0 },
        visible: { width: 'auto', opacity: 1, marginLeft: '0.5rem' }
    };

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button 
                      id="chatbot-toggle-button"
                      key="bubble" 
                      className={styles.chatBubble} 
                      onClick={() => setIsOpen(true)} 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      exit={{ scale: 0 }}
                    >
                        <IoChatbubbles size={28} />
                        <motion.span
                            variants={textVariants}
                            initial="hidden"
                            animate={isExpanded ? 'visible' : 'hidden'}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className={styles.buttonText}
                        >
                          Fale com Especialista
                        </motion.span>
                    </motion.button>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isOpen && (
                    <motion.div key="window" className={styles.chatWindow} initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}>
                        <header className={styles.chatHeader}>
                            <h3>Assistente Virtual Defender</h3>
                            <button onClick={() => setIsOpen(false)} className={styles.closeButton}><IoClose /></button>
                        </header>
                        <div className={styles.messageArea} ref={messageAreaRef}>
                            {messages.map((msg, index) => (
                                <motion.div key={index} className={`${styles.message} ${msg.sender === 'bot' ? styles.botMessage : styles.userMessage}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    {msg.text}
                                </motion.div>
                            ))}
                            {isTyping && <TypingIndicator />}
                        </div>
                        {renderInputArea()}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatbotPopup;