"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronRight, Check } from "lucide-react";

export type TutorialStep = {
  targetId: string;
  title: string;
  description: string;
  position?: "top" | "bottom" | "left" | "right" | "center";
};

interface TutorialOverlayProps {
  steps: TutorialStep[];
  isOpen: boolean;
  onClose: () => void;
}

export default function TutorialOverlay({ steps, isOpen, onClose }: TutorialOverlayProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isReady, setIsReady] = useState(false);

  // 1. Função que calcula a posição e desenha o "buraco"
  const updateHighlight = useCallback(() => {
    const step = steps[currentStepIndex];
    if (!step) return;

    if (step.position === "center") {
      setTargetRect(null);
      return;
    }

    const element = document.getElementById(step.targetId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const padding = 16;
      setTargetRect({
        ...rect,
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + (padding * 2),
        height: rect.height + (padding * 2),
        bottom: rect.bottom + padding,
        right: rect.right + padding,
        x: rect.x - padding,
        y: rect.y - padding,
        toJSON: () => {}
      });
    }
  }, [steps, currentStepIndex]);

  // 2. EFEITO NOVO: Obriga a tela a seguir o elemento (Auto-Scroll)
  useEffect(() => {
    if (isOpen) {
      const step = steps[currentStepIndex];
      
      // Se for um passo central, apenas rola para o topo ou centro suavemente
      if (step.position === "center") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } 
      // Se for um elemento específico, foca nele
      else if (step.targetId) {
        const element = document.getElementById(step.targetId);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center', // Centraliza verticalmente
            inline: 'center' // Centraliza horizontalmente
          });
        }
      }
    }
  }, [currentStepIndex, isOpen, steps]);

  // 3. Listeners para recalcular posição se a tela mexer
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        updateHighlight();
        setIsReady(true);
      }, 100);
      
      window.addEventListener("resize", updateHighlight);
      window.addEventListener("scroll", updateHighlight);
    }
    return () => {
      window.removeEventListener("resize", updateHighlight);
      window.removeEventListener("scroll", updateHighlight);
    };
  }, [isOpen, currentStepIndex, updateHighlight]);

  // Bloquear scroll manual do usuário (Opcional - deixa a experiência mais rígida)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowX = "hidden"; // Evita scroll lateral indesejado
    } else {
      document.body.style.overflowX = "auto";
    }
  }, [isOpen]);

  if (!isOpen || !isReady) return null;

  const currentStep = steps[currentStepIndex];
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
      setCurrentStepIndex(0);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  // Estilo do Holofote (Spotlight)
  const highlightStyle: React.CSSProperties = targetRect
    ? {
        position: "fixed",
        top: targetRect.top,
        left: targetRect.left,
        width: targetRect.width,
        height: targetRect.height,
        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)", // Escurece o resto
        borderRadius: "24px",
        zIndex: 50,
        transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)", // Animação suave
        pointerEvents: "none", // Permite clicar no elemento destacado (mude para 'auto' se quiser bloquear clique)
      }
    : {
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "0px",
        height: "0px",
        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
        zIndex: 50,
        transition: "box-shadow 0.6s ease",
    };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* O Holofote */}
      <div style={highlightStyle} className="border-2 border-white/20 ring-4 ring-orange-500/30" />

      {/* O Card de Texto Flutuante */}
      <div 
        className="fixed z-[60] transition-all duration-500"
        style={{
          top: targetRect 
            ? targetRect.bottom + 24 > window.innerHeight - 220 
              ? targetRect.top - 220 // Se estiver muito embaixo, joga pra cima
              : targetRect.bottom + 24
            : "50%",
          left: targetRect 
            ? Math.min(Math.max(20, targetRect.left + (targetRect.width / 2) - 160), window.innerWidth - 340) // Lógica inteligente para não sair da tela horizontalmente
            : "50%",
          transform: targetRect ? "translateX(0)" : "translate(-50%, -50%)",
        }}
      >
        <div className="w-[320px] bg-white rounded-3xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative border border-zinc-100">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-300 hover:text-zinc-600 transition-colors p-1"
          >
            <X size={16} />
          </button>

          {/* Barra de Progresso */}
          <div className="flex gap-1.5 mb-5">
             {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === currentStepIndex ? 'w-8 bg-orange-500' : 'w-2 bg-zinc-100'}`} 
                />
             ))}
          </div>

          <h3 className="text-lg font-extrabold text-zinc-900 mb-2 tracking-tight">{currentStep.title}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed mb-6 font-medium">
            {currentStep.description}
          </p>

          <div className="flex justify-between items-center pt-2 border-t border-zinc-50">
            <button 
              onClick={onClose}
              className="text-xs font-bold text-zinc-400 hover:text-zinc-600 uppercase tracking-wider px-2 py-2"
            >
              Pular
            </button>
            
            <button 
              onClick={handleNext}
              className="group flex items-center gap-2 px-6 py-2.5 bg-zinc-900 text-white rounded-2xl text-sm font-bold hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-zinc-900/20"
            >
              {isLastStep ? "Concluir" : "Próximo"}
              {isLastStep ? <Check size={16} /> : <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}