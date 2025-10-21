"use client";

import {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowRight,
  Send,
  ChevronDown,
  CheckCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================================================
// 1. COMPONENTE MODAL (Lógica de exibição)
// ============================================================================
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscKeyDown);
    return () => document.removeEventListener("keydown", handleEscKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            ref={modalContentRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// 2. COMPONENTE DO FORMULÁRIO (Conteúdo do modal)
// ============================================================================
interface SubscriptionFormProps {
  onClose: () => void;
}

type FormStatus = "form" | "loading" | "success";

const areasDeInteresse = [
  "Arte, Moda e Música", "Ciências Agrárias e Veterinária", "Ciências Contábeis",
  "Ciências Religiosas", "Ciências Sociais", "Coaching", "Comunicação Social",
  "Educação Física", "Educação", "Empresarial", "Engenharia e Arquitetura",
  "Esportes", "Estética", "Farmácia", "Fisioterapia", "Gastronomia",
  "Gestão, Economia e Finanças", "Jurídico", "Logística", "Marketing", "MBA",
  "Meio Ambiente", "Nutrição", "Psicologia", "Saúde e Bem-Estar",
  "Segurança Pública", "Serviço Social", "T.I",
];

function SubscriptionForm({ onClose }: SubscriptionFormProps) {
  const [status, setStatus] = useState<FormStatus>("form");
  const [whatsapp, setWhatsapp] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [showAcceptError, setShowAcceptError] = useState(false);

  const handleWhatsappChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 11);
    let formattedValue = value.replace(/^(\d{2})/, "($1) ");
    if (value.length > 6) {
      formattedValue = formattedValue.replace(/(\d{5})(\d)/, "$1-$2");
    } else if (value.length > 2) {
      formattedValue = formattedValue.replace(/(\d{4})(\d)/, "$1-$2");
    }
    setWhatsapp(formattedValue);
  };

  const onSuccessRedirect = () => {
    const whatsappUrl =
      "https://api.whatsapp.com/send?phone=SEUNUMERO&text=Olá!%20Acabei%20de%20enviar%20meus%20dados%20pelo%20site%20e%20gostaria%20de%20conversar.";
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!accepted) {
      setShowAcceptError(true);
      return;
    }
    setShowAcceptError(false);
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  };

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-600">
          Enviando seus dados...
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-3xl font-bold text-slate-800">
          Dados Enviados!
        </h2>
        <p className="mt-2 text-slate-600">
          Obrigado! Para agilizar seu atendimento, clique no botão abaixo para
          nos chamar no WhatsApp.
        </p>
        <div className="mt-8 w-full flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 text-slate-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={onSuccessRedirect}
            className="w-full flex-1 px-6 py-3 flex items-center justify-center gap-2 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all"
          >
            <MessageCircle size={18} />
            <span>Conversar no WhatsApp</span>
          </button>
        </div>
      </div>
    );
  }

  const inputStyle =
    "w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all";
  const primaryColor = "text-blue-600"; // Ex: text-primary

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-800">Fale Conosco</h2>
      <p className="text-slate-500 mt-2 mb-6">
        Preencha seus dados para iniciar uma conversa.
      </p>
      <form onSubmit={handleSubmit} className="text-left">
        {/* Conteúdo do formulário aqui... */}
        <div className="space-y-5">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Nome Completo <span className="text-red-500">*</span></label>
                <input type="text" id="name" name="name" required className={inputStyle} placeholder="Seu nome completo" />
            </div>
            <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-600 mb-1">WhatsApp <span className="text-red-500">*</span></label>
                <input type="tel" id="whatsapp" name="whatsapp" required className={inputStyle} placeholder="(00) 00000-0000" value={whatsapp} onChange={handleWhatsappChange} maxLength={16} />
            </div>
            <div>
                <label htmlFor="interestArea" className="block text-sm font-medium text-slate-600 mb-1">Área de Interesse <span className="text-red-500">*</span></label>
                <div className="relative">
                    <select id="interestArea" name="interestArea" required defaultValue="" className={`w-full appearance-none ${inputStyle}`}>
                        <option value="" disabled>Selecione uma área</option>
                        {areasDeInteresse.map((area) => (<option key={area} value={area}>{area}</option>))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"><ChevronDown className="h-5 w-5 text-slate-400" /></div>
                </div>
            </div>
            <div className={`rounded-lg border p-4 ${showAcceptError && !accepted ? "border-red-300" : "border-slate-200"}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" className={`mt-1 h-4 w-4 rounded border-slate-300 ${primaryColor} focus:ring-blue-500`} checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
                    <span className="text-sm text-slate-700">Li e <a href="/politica-de-privacidade" target="_blank" className={`font-medium ${primaryColor} underline underline-offset-2 hover:text-blue-500`}>aceito a Política de Privacidade</a> e autorizo o tratamento dos meus dados para contato.</span>
                </label>
                {showAcceptError && !accepted && <p className="mt-2 text-xs text-red-600">Você precisa aceitar a Política de Privacidade para enviar.</p>}
            </div>
        </div>
        <div className="flex items-center gap-4 pt-8">
            <button type="button" onClick={onClose} className="w-full sm:w-auto px-6 py-3 text-slate-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">Cancelar</button>
            <button type="submit" disabled={!accepted} className={`w-full flex-1 px-6 py-3 flex items-center justify-center gap-2 rounded-lg font-bold shadow-lg transition-colors ${accepted ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-slate-300 text-slate-500 cursor-not-allowed"}`}>
                <Send size={18} />
                <span>Enviar e ir para WhatsApp</span>
            </button>
        </div>
      </form>
    </div>
  );
}

const bannerContent = {
  image: "/banner.png", // Imagem de exemplo
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2, // Adicionado para animar os itens em sequência
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

export function Banner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="p-4 md:p-10">
        <div className="relative w-full h-[600px] overflow-hidden rounded-2xl group">
          {/* Imagem de Fundo com Animação de Zoom */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${bannerContent.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            whileInView={{ scale: 1.05 }}
            transition={{ duration: 8, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.5 }}
          />

          {/* Overlay de Gradiente */}
    

          {/* Conteúdo Animado */}
          <motion.div
            className="relative z-20 flex flex-col items-center justify-end h-full text-center text-white p-6 md:p-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
    
            <motion.div variants={itemVariants} className="mt-8">
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="px-8 py-6 text-lg rounded-full shadow-lg transition-transform duration-300 transform group-hover:scale-105 bg-orange-600 text-black-900 hover:bg-blue-600"
              >
                Inscreva-se
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* O Modal que será renderizado */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SubscriptionForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
