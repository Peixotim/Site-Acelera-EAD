// src/components/Hero.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import hero from "@/public/assets/hero.png";
import Modal from "./Modal/modal";
import SubscriptionForm from "./Modal/SubscriptionForm";
import { motion, useScroll, useTransform, Variants } from "framer-motion"; // Importações do Framer Motion

// Variantes para animar o container do texto (efeito cascata)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Atraso entre a animação de cada filho
    },
  },
};

// Variantes para animar cada item de texto/botão individualmente
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  const [showModal, setShowModal] = useState(false);

  // Hooks do Framer Motion para o efeito Parallax
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // A imagem se moverá 50% mais devagar que a rolagem

  return (
    <>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image com Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${hero.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            y: backgroundY, // Aplica o movimento parallax no eixo Y
          }}
        />

        {/* Overlay de Gradiente Refinado */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

        {/* Content com Animações */}
        <motion.div
          className="relative z-20 container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible" // Anima assim que o componente é montado
        >
          <div className="max-w-4xl mx-auto">
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ textShadow: "0px 4px 15px rgba(0,0,0,0.5)" }} // Sombra para legibilidade
            >
              Seu Novo Negócio Pode
              <span className="block bg-gradient-to-r text-amber-600 bg-clip-text ">
                Começar com um Polo EAD
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/90"
              style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.5)" }}
            >
              Abra um polo parceiro de cursos técnicos e comece a empreender com
              a força do nosso setor de parceria comercial.
            </motion.p>

            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }} // Efeito de zoom no hover
              whileTap={{ scale: 0.95 }} // Efeito de clique
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="inline-block" // Necessário para o hover funcionar corretamente
            >
              <Button
                size="lg"
                className="px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-primary/30 transition-shadow duration-300"
                onClick={() => setShowModal(true)}
              >
                Solicitar Proposta
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* A chamada do Modal (sem alterações) */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <SubscriptionForm onClose={() => setShowModal(false)} />
      </Modal>

      {/* Adiciona um espaço extra abaixo do Hero para que o efeito de parallax seja visível */}
    </>
  );
};

export default Hero;
