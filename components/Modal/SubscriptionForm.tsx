// src/components/SubscriptionForm.tsx
"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { Send, ChevronDown, CheckCircle, Loader2, MessageCircle } from "lucide-react";

// Definição das props do componente
interface SubscriptionFormProps {
  onClose: () => void;
}

type FormStatus = "form" | "loading" | "success";

const areasDeInteresse = [
  "Ser Parceiro","Saber Sobre Os Cursos"
];

export default function SubscriptionForm({ onClose }: SubscriptionFormProps) {
  const [status, setStatus] = useState<FormStatus>("form");
  const [whatsapp, setWhatsapp] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [showAcceptError, setShowAcceptError] = useState(false);

  // --- FUNÇÃO CORRIGIDA E MELHORADA ---
  const handleWhatsappChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 11); // Limpa e limita

    // Aplica a máscara dinamicamente
    let formattedValue = value.replace(/^(\d{2})/, "($1) ");
    if (value.length > 6) {
      formattedValue = formattedValue.replace(/(\d{5})(\d)/, "$1-$2");
    } else if (value.length > 2) {
      formattedValue = formattedValue.replace(/(\d{4})(\d)/, "$1-$2");
    }
    
    setWhatsapp(formattedValue);
  };

  const onSuccessRedirect = () => {
    const whatsappUrl = "https://api.whatsapp.com/send?phone=SEUNUMERO&text=Olá!%20Acabei%20de%20enviar%20meus%20dados%20pelo%20site%20e%20gostaria%20de%20conversar.";
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

    // Lógica de envio para API
    console.log("Enviando dados do formulário...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Dados enviados com sucesso!");
    
    setStatus("success");
  };

  // Renderização condicional dos estados
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="mt-4 text-lg font-medium text-slate-600">Enviando seus dados...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-center">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h2 className="mt-4 text-3xl font-bold text-slate-800">Dados Enviados!</h2>
        <p className="mt-2 text-slate-600">Obrigado! Para agilizar seu atendimento, clique no botão abaixo para nos chamar no WhatsApp.</p>
        <div className="mt-8 w-full flex flex-col sm:flex-row gap-3">
          <button onClick={onClose} className="w-full sm:w-auto px-6 py-3 text-slate-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
            Fechar
          </button>
          <button onClick={onSuccessRedirect} className="w-full flex-1 px-6 py-3 flex items-center justify-center gap-2 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all">
            <MessageCircle size={18} />
            <span>Conversar no WhatsApp</span>
          </button>
        </div>
      </div>
    );
  }

  const inputStyle = "w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all";

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-800">Fale Conosco</h2>
      <p className="text-slate-500 mt-2 mb-6">Preencha seus dados para iniciar uma conversa.</p>
      <form onSubmit={handleSubmit} className="text-left">
        <div className="space-y-5">
          {/* Campos do formulário */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-1">Nome Completo <span className="text-red-500">*</span></label>
            <input type="text" id="name" name="name" required className={inputStyle} placeholder="Seu nome completo" />
          </div>
          <div>
            <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-600 mb-1">WhatsApp <span className="text-red-500">*</span></label>
            <input type="tel" id="whatsapp" name="whatsapp" required className={inputStyle} placeholder="(00) 00000-0000" value={whatsapp} onChange={handleWhatsappChange} maxLength={16} />
          </div>
          <div>
            <label htmlFor="interestArea" className="block text-sm font-medium text-slate-600 mb-1">Interesse <span className="text-red-500">*</span></label>
            <div className="relative">
              <select id="interestArea" name="interestArea" required defaultValue="" className={`w-full appearance-none ${inputStyle}`}>
                <option value="" disabled>Selecione seu Interesse</option>
                {areasDeInteresse.map((area) => (<option key={area} value={area}>{area}</option>))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none"><ChevronDown className="h-5 w-5 text-slate-400" /></div>
            </div>
          </div>
          {/* Checkbox de Privacidade */}
          <div className={`rounded-lg border p-4 ${showAcceptError && !accepted ? "border-red-300" : "border-slate-200"}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />
              <span className="text-sm text-slate-700">Li e <Link href="/politica-de-privacidade" target="_blank" className="font-medium text-primary underline underline-offset-2 hover:text-primary/80">aceito a Política de Privacidade</Link> e autorizo o tratamento dos meus dados para contato.</span>
            </label>
            {showAcceptError && !accepted && <p className="mt-2 text-xs text-red-600">Você precisa aceitar a Política de Privacidade para enviar.</p>}
          </div>
        </div>
        {/* Botões de Ação */}
        <div className="flex items-center gap-4 pt-8">
          <button type="button" onClick={onClose} className="w-full sm:w-auto px-6 py-3 text-slate-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">Cancelar</button>
          <button type="submit" disabled={!accepted} className={`w-full flex-1 px-6 py-3 flex items-center justify-center gap-2 rounded-lg font-bold shadow-lg transition-colors ${accepted ? "bg-primary text-white hover:bg-primary/90" : "bg-slate-300 text-slate-500 cursor-not-allowed"}`}>
            <Send size={18} />
            <span>Enviar e ir para WhatsApp</span>
          </button>
        </div>
      </form>
    </div>
  );
}