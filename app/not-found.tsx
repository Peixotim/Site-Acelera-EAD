// Em app/not-found.tsx ou pages/404.tsx
"use client";

import { motion, useMotionValue, useTransform, Variants } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

// Variantes para a animação de entrada do conteúdo
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function NotFound() {
  // Hooks para o efeito Parallax 3D com o mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [-10, 10]);
  const rotateY = useTransform(mouseX, [-200, 200], [10, -10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left - width / 2;
    const y = clientY - top - height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-900 text-white"
    >
      {/* Fundo de estrelas */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 via-slate-900 to-slate-900">
        {/* Adicionar algumas estrelas para um efeito mais completo */}
        <div className="absolute top-[10%] left-[10%] w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-[20%] left-[80%] w-px h-px bg-white rounded-full animate-pulse animation-delay-1000" />
        <div className="absolute top-[50%] left-[50%] w-1.5 h-1.5 bg-white rounded-full animate-pulse animation-delay-500" />
        <div className="absolute top-[70%] left-[25%] w-0.5 h-0.5 bg-white rounded-full animate-pulse animation-delay-2000" />
        <div className="absolute top-[90%] left-[90%] w-1 h-1 bg-white rounded-full animate-pulse animation-delay-1500" />
      </div>

      {/* Container do conteúdo principal com perspectiva para o 3D */}
      <motion.div 
        style={{ perspective: "1000px" }}
        className="relative z-10 flex flex-col items-center text-center p-4"
      >
        {/* Texto 404 com efeito Parallax e Glitch */}
        <motion.div
          style={{ rotateX, rotateY, textShadow: "0 0 15px rgba(77, 144, 254, 0.5)" }}
          className="glitch text-8xl md:text-[200px] font-black tracking-tighter"
          data-text="404"
        >
          404
        </motion.div>

        {/* Conteúdo textual animado */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 flex flex-col items-center"
        >
          <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-slate-100">
            Página Não Encontrada
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-4 max-w-sm text-lg text-slate-400">
            Parece que você se perdeu na imensidão do espaço. Vamos te ajudar a encontrar o caminho de volta.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <Link href="/" passHref>
              <Button
                size="lg"
                className="group bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300"
              >
                <Rocket className="mr-3 h-6 w-6 transition-transform duration-500 group-hover:-rotate-45" />
                Voltar para o Início
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}