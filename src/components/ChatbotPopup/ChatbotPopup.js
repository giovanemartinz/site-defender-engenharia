'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoChatbubbles, IoClose, IoSend, IoCheckmarkDone } from 'react-icons/io5';
import styles from './ChatbotPopup.module.css';

const formScript = [
  // ... (seu formScript permanece o mesmo)
  { id: 'start', question: 'Para começar, qual é o seu nome?', key: 'nome', type: 'text' },
  { id: 'phone', question: 'Ótimo! E qual o seu celular com DDD para contato?', key: 'celular', type: 'text' },
  { id: 'email', question: 'Perfeito. Agora, qual seu melhor e-mail?', key: 'email', type: 'text' },
  { id: 'ppci_check', question: 'O imóvel já possui PPCI (Plano de Prevenção Contra Incêndio)?', key: 'possui_ppci', type: 'radio', options: ['Sim', 'Não', 'Não sei informar'] },
  { id: 'services', question: 'Quais destes serviços você tem interesse? (Pode marcar vários)', key: 'servicos', type: 'checkbox', options: ["PPCI novo", "Renovação de PPCI", "LTIP", "Laudos técnicos", "Instalações", "Treinamentos", "Manutenção"] },
  { id: 'final', question: 'Excelente! Recebemos suas informações. Nossa equipe de especialistas já está analisando e entrará em contato em breve. Muito obrigado!' }
];

const TypingIndicator = () => (
    <motion.div className={`${styles.message} ${styles.botMessage} ${styles.typingIndicator}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
        <span /> <span /> <span />
    </motion.div>
);

// ACEITA A NOVA PROP 'isExpanded'
const ChatbotPopup = ({ isExpanded }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    // ... (toda a sua lógica interna permanece a mesma)
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
        setLeadData(prev => ({ ...prev, [currentQuestion.key]: answer }));
        goToNextStep();
    };

    const handleCheckboxSubmit = () => {
        if (selectedCheckboxOptions.length === 0) return;
        handleUserInput(selectedCheckboxOptions.join(', '));
        setSelectedCheckboxOptions([]);
    };

    const goToNextStep = () => {
        setIsTyping(true);
        const nextStepIndex = currentStep + 1;
        setTimeout(() => {
            setIsTyping(false);
            if (nextStepIndex < formScript.length) {
                const nextQuestion = formScript[nextStepIndex];
                setMessages(prev => [...prev, { id: nextQuestion.id, sender: 'bot', text: nextQuestion.question }]);
                setCurrentStep(nextStepIndex);
                if (nextQuestion.id === 'final') {
                    setIsCompleted(true);
                }
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
    
    // Variantes para o texto do botão do chatbot
    const textVariants = {
        hidden: { width: 0, opacity: 0, marginLeft: 0 },
        visible: { width: 'auto', opacity: 1, marginLeft: '0.5rem' }
    };

    return (
        // O CONTAINER PRINCIPAL FOI REMOVIDO E A LÓGICA MOVIDA PARA DENTRO
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
                        {/* TEXTO ANIMADO ADICIONADO AQUI */}
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