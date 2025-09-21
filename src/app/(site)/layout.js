import { Montserrat, Open_Sans } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import ChatbotPopup from '@/components/ChatbotPopup/ChatbotPopup'; // 1. Importar

// ... (configuração das fontes)
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700'],
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '600'],
});

export const metadata = {
  title: 'Defender - Proteção Contra Incêndio',
  description: 'Projetos e Obras de Detecção, Alarme e Combate de Incêndio.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${openSans.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatbotPopup /> {/* 2. Adicionar aqui, fora do main */}
      </body>
    </html>
  );
}