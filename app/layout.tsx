import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";


import "@/styles/globals.css";

import { Toaster } from "@/components/ui/toaster";


const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {

  title: {
    default: "Acelera EAD | Cursos Online para o Topo do Sucesso",
    template: "%s | Acelera EAD",
  },


  description: "A Acelera EAD oferece cursos tecnológicos e especializações focados em acelerar sua carreira. Estude online e alcance seus objetivos profissionais conosco.",


  openGraph: {
    title: "Acelera EAD | Impulsione Sua Carreira",
    description: "Cursos 100% online na Acelera EAD para você que busca crescimento e sucesso profissional.",
    url: 'https://aceleraead.com.br', // Sugestão de URL
    siteName: 'Acelera EAD',
    images: [
      {
        url: 'https://aceleraead.com.br/images/og-image-default.jpg', // Lembre-se de criar e hospedar esta imagem
        width: 1200,
        height: 630,
        alt: 'Logo da Acelera EAD e Símbolo de Aceleração Profissional',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },


  twitter: {
    card: 'summary_large_image',
    title: 'Acelera EAD: Sua Carreira em Alta Velocidade',
    description: 'Descubra como os cursos da Acelera EAD podem impulsionar sua jornada profissional.',
  },


  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="pt-br">
      <body

        className={`${poppins.variable} antialiased scroll-smooth`}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}