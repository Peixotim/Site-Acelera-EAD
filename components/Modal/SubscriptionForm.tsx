"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle,
  Loader2,
  MessageCircle,
} from "lucide-react";

// === 1. IMPORTS DA API ===
import { 
  submitSubscription, 
  buildSubscriptionFromForm 
} from "../lib/api"; // Certifique-se que o caminho está correto


interface SubscriptionFormProps {
  onClose: () => void;
}

type FormStatus = "form" | "loading" | "success";

export default function SubscriptionForm({ onClose }: SubscriptionFormProps) {
  const [status, setStatus] = useState<FormStatus>("form");
  const [whatsapp, setWhatsapp] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [showAcceptError, setShowAcceptError] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // === 2. NOVA VARIÁVEL DE ESTADO ===
  // Esta variável vai controlar o 'disabled' do botão
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Estilos da Marca (sem alteração) ---
  const brandColors = {
    text: "text-[#1b4965]",
    bg: "bg-[#1b4965]",
    hoverBg: "hover:bg-[#0f253a]",
    focusRing: "focus:ring-[#1b4965]/30",
    focusBorder: "focus:border-[#1b4965]",
  };
  const inputStyle = `w-full px-4 py-3 bg-slate-100 border-2 border-transparent rounded-lg placeholder:text-slate-400 focus:outline-none focus:bg-white ${brandColors.focusBorder} ${brandColors.focusRing} transition-all`;

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
      "https://api.whatsapp.com/send?phone=5531973271770&text=Ol%C3%A1%21%20Acabei%20de%20enviar%20meus%20dados%20pelo%20site%20e%20tenho%20interesse%20em%20ser%20um%20Parceiro%20AprovaMinas.";
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  // === 3. 'handleSubmit' ATUALIZADO ===
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    
    if (!accepted) {
      setShowAcceptError(true);
      return;
    }
    
    setShowAcceptError(false);
    setError(null); 
    setIsSubmitting(true); // Desabilita o botão
    setStatus("loading");  // Muda a tela para o "Spinner"

    try {
      const formData = buildSubscriptionFromForm(event.currentTarget);
      await submitSubscription(formData);
      setStatus("success"); // Muda a tela para "Sucesso"

    } catch (err) {
      console.error("Falha ao enviar o lead:", err);
      setError(err instanceof Error ? err.message : "Não foi possível enviar seus dados. Tente novamente.");
      setStatus("form"); // Volta para a tela do formulário
    
    } finally {
      // Independente de sucesso ou falha, reabilita o botão (caso volte ao form)
      setIsSubmitting(false); 
    }
  };

  // --- Telas de 'loading' e 'success' (sem alteração) ---
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center h-80 text-center">
        <Loader2 className={`h-12 w-12 ${brandColors.text} animate-spin`} />
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
          Obrigado! Para agilizar, clique no botão abaixo e fale com nossa
          equipe de expansão no WhatsApp.
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

  // --- Tela do Formulário (status === 'form') ---
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-slate-800">
        Inicie sua Parceria
      </h2>
      <p className="text-slate-500 mt-2 mb-6">
        Deixe seus dados e nossa equipe de expansão entrará em contato.
      </p>
      <form onSubmit={handleSubmit} className="text-left">
        <div className="space-y-5">
          {/* Campos do formulário */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-600 mb-1"
            >
              Nome Completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className={inputStyle}
              placeholder="Seu nome completo"
            />
          </div>
          <div>
            <label
              htmlFor="whatsapp"
              className="block text-sm font-medium text-slate-600 mb-1"
            >
              WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              required
              className={inputStyle}
              placeholder="(00) 00000-0000"
              value={whatsapp}
              onChange={handleWhatsappChange}
              maxLength={16}
            />
          </div>

          <input 
            type="hidden" 
            name="interestArea" 
            value="Ser Parceiro" 
          />

          {/* Checkbox de Privacidade */}
          <div
            className={`rounded-lg border p-4 ${
              showAcceptError && !accepted
                ? "border-red-300"
                : "border-slate-200"
            }`}
          >
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className={`mt-1 h-4 w-4 rounded border-slate-300 ${brandColors.text} ${brandColors.focusRing}`}
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span className="text-sm text-slate-700">
                Li e{" "}
                <Link
                  href="/politica-de-privacidade"
                  target="_blank"
                  className={`font-medium ${brandColors.text} underline underline-offset-2 hover:text-blue-500`}
                >
                  aceito a Política de Privacidade
                </Link>{" "}
                e autorizo o tratamento dos meus dados para contato.
              </span>
            </label>
            {showAcceptError && !accepted && (
              <p className="mt-2 text-xs text-red-600">
                Você precisa aceitar a Política de Privacidade para enviar.
              </p>
            )}
          </div>
        </div>
        
        {/* Mensagem de Erro */}
        {error && (
          <div className="mt-4 text-center text-sm text-red-600">
            <strong>Erro:</strong> {error}
          </div>
        )}

        {/* Botões de Ação */}
        <div className="flex items-center gap-4 pt-8">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 text-slate-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            // === 4. 'disabled' CORRIGIDO ===
            // Agora usa 'isSubmitting'
            disabled={!accepted || isSubmitting} 
            className={`w-full flex-1 px-6 py-3 flex items-center justify-center gap-2 rounded-lg font-bold shadow-lg transition-colors ${
              accepted
                ? `${brandColors.bg} text-white ${brandColors.hoverBg}`
                : "bg-slate-300 text-slate-500 cursor-not-allowed"
            }`}
          >
            {/* Muda o texto do botão se estiver enviando */}
            {isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send size={18} />
            )}
            <span>
              {isSubmitting ? "Enviando..." : "Enviar e Iniciar Conversa"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}