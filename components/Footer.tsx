"use client";
import React from "react";
import { useState } from "react";
import {
  Instagram,
  Music2,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

// Importe seus componentes de modal
import ModalGeral from "./ModalGeral";
import ModalTermosDeUso from "./ModalTermoUso";

// --- Framer Motion Variants ---
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      staggerChildren: 0.2,
    },
  },
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Footer = () => {
  const [modalAberto, setModalAberto] = useState<string | null>(null);

  const quickLinks = [
    { text: "Sobre Nós", href: "/about" },
    { text: "Cursos", href: "/cursos" },
    { text: "Parcerias", href: "#parcerias" },
  ];

  const socialLinks = [
    {
      icon: Instagram,
      href: "https://instagram.com/aceleraeadparceiros",
      name: "Instagram",
    },
    { icon: Music2, href: "https://www.tiktok.com/", name: "TikTok" },
    { icon: Youtube, href: "https://youtube.com/", name: "YouTube" },
  ];

  // Refatorado para ser interativo
  const contactItems = [
    {
      icon: MapPin,
      lines: [
        "Luiz Rodrigues dos Santos, 44",
        "Todos os Santos - Coronel Fabriciano/MG",
        "CEP: 35170-061",
      ],
      href: "http://googleusercontent.com/maps.google.com/2",
    },
    { icon: Phone, lines: ["(31) 97329-6330"], href: "tel:+5531973296330" },
    {
      icon: Mail,
      lines: ["gerencial@colegioaceleraead.com.br"],
      href: "mailto:gerencial@colegioaceleraead.com.br",
    },
    { icon: Clock, lines: ["Seg-Sex: 8h às 18h", "Sáb: 8h às 12h"], href: "#" },
  ];

  const handleOpenModal = (modalType: string) => setModalAberto(modalType);
  const handleCloseModal = () => setModalAberto(null);

  return (
    <motion.footer
      className="bg-gradient-to-t from-[#0B093F] to-[#121054] text-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={footerVariants}
    >
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Seção Principal com Animação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {/* Coluna 1: Logo e Social */}
          <motion.div variants={columnVariants}>
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg">
                <Image
                  src="/Acelera EAD.png"
                  alt="Faculdade Marinho Logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-2xl font-bold">Acelera EAD</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transformando vidas através da educação de qualidade há mais de 18
              anos.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/10 hover:scale-110 transition-all duration-300"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Coluna 2: Links Rápidos */}
          <motion.div variants={columnVariants} className="md:mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Coluna 3: Contato Interativo */}
          <motion.div variants={columnVariants} id="contato">
            <h3 className="text-lg font-semibold mb-4 text-gray-200">
              Contato
            </h3>
            <ul className="space-y-4">
              {contactItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <div className="mt-1">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {item.lines.map((line, i) => (
                        <span key={i} className="block">
                          {line}
                        </span>
                      ))}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Rodapé inferior (sem alterações na lógica) */}
        <div className="border-t border-white/10 mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Acelera EAD. Todos os direitos
              reservados.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href={"/politica-de-privacidade"}>
                <button className="hover:text-primary transition-colors">
                  Política de Privacidade
                </button>
              </Link>
              <button
                onClick={() => handleOpenModal("termos")}
                className="hover:text-primary transition-colors"
              >
                Termos de Uso
              </button>
              <button
                onClick={() => handleOpenModal("cookies")}
                className="hover:text-primary transition-colors"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Renderização condicional dos modais */}
      {modalAberto === "termos" && (
        <ModalTermosDeUso onClose={handleCloseModal} />
      )}
    </motion.footer>
  );
};

export default Footer;
