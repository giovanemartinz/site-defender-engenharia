import { Montserrat, Open_Sans } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
// 1. IMPORTAR O NOVO COMPONENTE
import FloatingActions from '@/components/FloatingActions/FloatingActions';

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
  title: 'Defender Engenharia - Proteção Contra Incêndio',
  description: 'Projetos e Obras de Detecção, Alarme e Combate de Incêndio.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${openSans.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* 2. SUBSTITUIR O CHATBOT ANTIGO PELO NOVO COMPONENTE */}
        <FloatingActions />
      </body>
    </html>
  );
}