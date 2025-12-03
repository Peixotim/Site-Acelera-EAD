"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Plus, Minus, ChevronDown, Sparkles, 
  Copy, BarChart3, Wallet, HelpCircle, 
  X, CheckCircle2, AlertCircle, ArrowRight, Zap, Clock 
} from "lucide-react";
import dynamic from "next/dynamic";
import TutorialOverlay, { TutorialStep } from "./TutorialOverlay"; 
import { Toaster, toast } from 'sonner';

const TICKET_MEDIO = 899;
const MAX_FATURAMENTO_START = 10000;
const MAX_FATURAMENTO_ADVANCED = 20000;

const PDFButton = dynamic(() => import("./PDFButton"), {
  ssr: false,
  loading: () => (
    <button className="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-zinc-800 text-zinc-500 text-sm font-bold flex items-center justify-center gap-2 cursor-wait">
      Carregando PDF...
    </button>
  ),
});

type Nivel = "START" | "ADVANCED" | "MASTER" | "N/A";

const parseBRL = (v: string | number) => {
  if (v === null || v === undefined) return 0;
  if (typeof v === "number") return v;
  const s = String(v).replace(/\s/g, "");
  if (s === "") return 0;
  const only = s.replace(/\./g, "").replace(",", ".").replace("R$", "");
  const n = parseFloat(only);
  return isNaN(n) ? 0 : n;
};

const formatBRL = (n: number) =>
  n === 0 ? "0,00" : n.toLocaleString("pt-BR", { minimumFractionDigits: 2 });

const calcularNivelEComissao = (faturamento: number) => {
  if (faturamento > MAX_FATURAMENTO_ADVANCED) return { nivel: "MASTER", comissao: 0.5 };
  if (faturamento > MAX_FATURAMENTO_START) return { nivel: "ADVANCED", comissao: 0.4 };
  return { nivel: "START", comissao: 0.3 };
};

const calcularROI = (faturamento: number, investimento: number) =>
  investimento > 0 ? (faturamento - investimento) / investimento : 0;

// ==========================================
// 2. Sub-componentes Visuais (Bento & Inputs)
// ==========================================

const BentoCard = ({ title, children, className = "", highlight = false, dark = false, action }: any) => (
  <div 
    className={`
      relative overflow-hidden rounded-3xl p-6 transition-all duration-300 group
      ${dark 
        ? 'bg-zinc-900 text-white border border-zinc-800 shadow-xl' 
        : highlight 
          ? 'bg-gradient-to-br from-orange-50/80 to-white border border-orange-200/60 shadow-[0_8px_30px_rgba(249,115,22,0.06)]' 
          : 'bg-white border border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]'
      }
      ${className}
    `}
  >
    <div className="flex flex-col h-full justify-between relative z-10">
      <div className="flex justify-between items-start mb-3">
        <h3 className={`text-[10px] md:text-xs font-bold tracking-wider uppercase ${dark ? 'text-zinc-500' : 'text-zinc-400'}`}>
          {title}
        </h3>
        {action && <div>{action}</div>}
      </div>
      <div className="flex-1 flex flex-col justify-end">
        {children}
      </div>
    </div>
  </div>
);

const SmartInput = ({ 
  label, value, onChange, onBlur, onFocus, onIncrement, onDecrement, prefix, type = "text", placeholder = "0" 
}: any) => (
  <div className="group space-y-2">
    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide group-focus-within:text-orange-600 transition-colors duration-300">
      {label}
    </label>
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-4 text-zinc-400 font-medium pointer-events-none z-10 select-none">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        className={`
          w-full bg-zinc-50/50 border-0 rounded-2xl py-4 
          ${prefix ? 'pl-11' : 'pl-4'} pr-24 
          text-zinc-900 font-bold text-xl ring-1 ring-zinc-200/80 
          focus:ring-2 focus:ring-orange-500/10 focus:bg-white transition-all outline-none
          placeholder:text-zinc-300
        `}
        placeholder={placeholder}
      />
      
      {/* Controles Flutuantes */}
      <div className="absolute right-2 flex gap-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 bg-white shadow-sm border border-zinc-100 p-1 rounded-xl transform translate-x-2 group-hover:translate-x-0">
        <button 
          onClick={onDecrement}
          className="p-1.5 hover:bg-zinc-100 text-zinc-400 hover:text-orange-600 rounded-lg transition-colors active:scale-90"
          type="button"
        >
          <Minus size={14} strokeWidth={3} />
        </button>
        <div className="w-px h-4 bg-zinc-200 self-center" />
        <button 
          onClick={onIncrement}
          className="p-1.5 hover:bg-zinc-100 text-zinc-400 hover:text-orange-600 rounded-lg transition-colors active:scale-90"
          type="button"
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>
    </div>
  </div>
);

// ==========================================
// 3. Componente Principal
// ==========================================

export default function CalculadoraPage() {
  // --- States de Inputs ---
  const [inputMetaGanho, setInputMetaGanho] = useState<string>("5.000,00");
  const [inputCPL, setInputCPL] = useState<string>("7,00");
  const [inputTaxa, setInputTaxa] = useState<number>(10);
  
  // Inputs Manuais
  const [inputVendas, setInputVendas] = useState<number | "">("");
  const [inputLeads, setInputLeads] = useState<number | "">("");
  const [inputInvestimento, setInputInvestimento] = useState<string>("");

  // Controla quem manda no cálculo ('META' | 'VENDAS' | 'LEADS' | 'INVESTIMENTO')
  const [activeMode, setActiveMode] = useState<string>("META");

  // --- States de Resultados ---
  const [ganhosProjetados, setGanhosProjetados] = useState<number>(0);
  const [faturamentoProj, setFaturamentoProj] = useState<number>(0);
  const [vendasNec, setVendasNec] = useState<number>(0);
  const [leadsNec, setLeadsNec] = useState<number>(0);
  const [investimentoNec, setInvestimentoNec] = useState<number>(0);
  const [nivel, setNivel] = useState<Nivel>("N/A");
  const [comissaoPct, setComissaoPct] = useState<number>(0);
  const [roi, setRoi] = useState<number>(0);

  // --- States de Modals e Tutorial ---
  const [organicOpen, setOrganicOpen] = useState(false); // Modal antigo (simples)
  const [isComparatorOpen, setIsComparatorOpen] = useState(false); // Modal novo (Apple style)
  const [isTutorialOpen, setIsTutorialOpen] = useState(false); // Tutorial

  // --- Passos do Tutorial ---
  const tutorialSteps: TutorialStep[] = [
    {
      targetId: "tour-welcome",
      title: "Bem-vindo a Acelera EAD",
      description: "Esta é sua central de inteligência. Vamos configurar suas metas e descobrir o caminho mais rápido para a escala.",
      position: "center"
    },
    {
      targetId: "tour-inputs",
      title: "Calibre a Máquina",
      description: "Comece definindo quanto quer ganhar (Meta) ou ajuste os custos (CPL). O sistema fará a engenharia reversa automaticamente.",
      position: "bottom"
    },
    {
      targetId: "tour-results",
      title: "Seus Indicadores",
      description: "Acompanhe em tempo real seu Nível de Parceria, Faturamento Projetado e o ROI estimado da operação.",
      position: "top"
    },
       {
      targetId: "tour-copy",
      title: "Resumo Executivo",
      description: "Copie ou gere o PDF de todas suas metricas com apenas um click",
      position: "top"
    },
  ];

  // --- Helpers de Formatação/Incremento ---
  const handleBlurFormat = (setter: (s: string) => void, value: string) => {
    const n = parseBRL(value);
    setter(formatBRL(n));
  };
  const handleFocusUnformat = (setter: (s: string) => void, value: string) => {
    const n = parseBRL(value);
    setter(n === 0 ? "" : String(n));
  };
  const incrementMonetary = (getter: string, setter: (s: string) => void, step = 100) => {
    const current = parseBRL(getter);
    setter(formatBRL(current + step));
  };
  const decrementMonetary = (getter: string, setter: (s: string) => void, step = 100) => {
    const current = parseBRL(getter);
    setter(formatBRL(Math.max(0, current - step)));
  };
  const incrementNumber = (getter: number | "", setter: (n: number | "") => void, step = 1) => {
    const current = typeof getter === "number" ? getter : 0;
    setter(current + step);
  };
  const decrementNumber = (getter: number | "", setter: (n: number | "") => void, step = 1) => {
    const current = typeof getter === "number" ? getter : 0;
    setter(Math.max(0, current - step));
  };

  // --- Lógica de Cálculo (Effect) ---
  useEffect(() => {
    const meta = parseBRL(inputMetaGanho);
    const cpl = parseBRL(inputCPL);
    const taxa = inputTaxa;
    const determinarNivel = (fat: number) => calcularNivelEComissao(fat);
    
    const limparCamposResultado = () => {
      setGanhosProjetados(0); setFaturamentoProj(0); setVendasNec(0);
      setLeadsNec(0); setInvestimentoNec(0); setNivel("N/A");
      setComissaoPct(0); setRoi(0);
    };

    const updateStates = (fat: number, vendas: number, leads: number, invest: number, ganhos: number, roiCalc: number, nivelInfo: any) => {
       setGanhosProjetados(ganhos); setFaturamentoProj(fat);
       setVendasNec(vendas); setLeadsNec(leads);
       setInvestimentoNec(invest); setNivel(nivelInfo.nivel as Nivel);
       setComissaoPct(nivelInfo.comissao * 100); setRoi(roiCalc);
    };

    const calcularPorMeta = () => {
      if (meta <= 0) { limparCamposResultado(); return; }
      let faturamento = 0;
      const faturamentoMaster = meta / 0.5;
      if (faturamentoMaster > MAX_FATURAMENTO_ADVANCED) faturamento = faturamentoMaster;
      else {
        const faturamentoAdvanced = meta / 0.4;
        if (faturamentoAdvanced > MAX_FATURAMENTO_START && faturamentoAdvanced <= MAX_FATURAMENTO_ADVANCED) faturamento = faturamentoAdvanced;
        else faturamento = meta / 0.3;
      }
      const vendasCalc = Math.ceil(faturamento / TICKET_MEDIO);
      const faturamentoAjustado = vendasCalc * TICKET_MEDIO;
      const nivelInfo = determinarNivel(faturamentoAjustado);
      const ganhos = faturamentoAjustado * nivelInfo.comissao;
      const leadsCalc = taxa > 0 ? Math.ceil(vendasCalc / (taxa / 100)) : 0;
      const investimentoCalc = leadsCalc * cpl;
      const roiCalc = calcularROI(faturamentoAjustado, investimentoCalc);
      updateStates(faturamentoAjustado, vendasCalc, leadsCalc, investimentoCalc, ganhos, roiCalc, nivelInfo);
    };

    const calcularPorVendas = (vendas: number) => {
      if (vendas <= 0) return limparCamposResultado();
      const faturamento = vendas * TICKET_MEDIO;
      const nivelInfo = determinarNivel(faturamento);
      const ganhos = faturamento * nivelInfo.comissao;
      const leadsCalc = taxa > 0 ? Math.ceil(vendas / (taxa / 100)) : 0;
      const investimentoCalc = leadsCalc * cpl;
      const roiCalc = calcularROI(faturamento, investimentoCalc);
      updateStates(faturamento, vendas, leadsCalc, investimentoCalc, ganhos, roiCalc, nivelInfo);
    };

    const calcularPorLeads = (leads: number) => {
      if (leads <= 0 || taxa <= 0) return limparCamposResultado();
      const vendasCalc = Math.floor(leads * (taxa / 100));
      const faturamento = vendasCalc * TICKET_MEDIO;
      const nivelInfo = determinarNivel(faturamento);
      const ganhos = faturamento * nivelInfo.comissao;
      const investimentoCalc = leads * cpl;
      const roiCalc = calcularROI(faturamento, investimentoCalc);
      updateStates(faturamento, vendasCalc, leads, investimentoCalc, ganhos, roiCalc, nivelInfo);
    };

    const calcularPorInvestimento = (invest: number) => {
      if (invest <= 0 || cpl <= 0 || taxa <= 0) return limparCamposResultado();
      const leadsCalc = Math.floor(invest / cpl);
      const vendasCalc = Math.floor(leadsCalc * (taxa / 100));
      const faturamento = vendasCalc * TICKET_MEDIO;
      const nivelInfo = determinarNivel(faturamento);
      const ganhos = faturamento * nivelInfo.comissao;
      const roiCalc = calcularROI(faturamento, invest);
      updateStates(faturamento, vendasCalc, leadsCalc, invest, ganhos, roiCalc, nivelInfo);
    };

    // SWITCH BASEADO NO MODO ATIVO
    switch (activeMode) {
      case "VENDAS": calcularPorVendas(Number(inputVendas)); break;
      case "LEADS": calcularPorLeads(Number(inputLeads)); break;
      case "INVESTIMENTO": calcularPorInvestimento(parseBRL(inputInvestimento)); break;
      case "META": default: calcularPorMeta(); break;
    }
  }, [inputMetaGanho, inputCPL, inputTaxa, inputVendas, inputLeads, inputInvestimento, activeMode]);

  const lucroLiquido = ganhosProjetados - investimentoNec;

  // Lógica Orgânica (Simples para modal antigo)
  const organicDefaults = useMemo(() => ({ alunos: 10, ticket: 899, periodo: 1 }), []);
  const [orgAlunos, setOrgAlunos] = useState<number>(organicDefaults.alunos);
  const [orgTicket, setOrgTicket] = useState<string>(formatBRL(organicDefaults.ticket));
  const [orgPeriodo, setOrgPeriodo] = useState<number>(organicDefaults.periodo);
  const [orgResult, setOrgResult] = useState<{ faturamentoTotal: number; mensal: number; ganhos: number; nivel: Nivel } | null>(null);

  useEffect(() => {
    const alunos = orgAlunos;
    const ticket = parseBRL(orgTicket);
    const periodo = Math.max(1, orgPeriodo);
    const faturamentoTotal = alunos * ticket;
    const mensal = faturamentoTotal / periodo;
    const nivelInfo = calcularNivelEComissao(mensal);
    const ganhos = mensal * nivelInfo.comissao;
    setOrgResult({ faturamentoTotal, mensal, ganhos, nivel: nivelInfo.nivel as Nivel });
  }, [orgAlunos, orgTicket, orgPeriodo]);


  // ==========================================
  // 4. Renderização
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FBFBFD] text-zinc-900 font-sans selection:bg-orange-100 selection:text-orange-900 pb-20 relative">
      
      {/* Botão Flutuante de Ajuda (Tutorial) */}
      <button 
        onClick={() => setIsTutorialOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-zinc-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform hover:bg-orange-600 group"
        title="Iniciar Tutorial"
      >
         <HelpCircle size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[11px] font-bold tracking-widest uppercase mb-4 shadow-sm">
            Simulador de Negócios
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
            Calculadora de <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">Parceria</span>
          </h1>
          <p className="text-zinc-500 max-w-xl mx-auto text-lg leading-relaxed font-medium">
            Projete faturamento, custos e ROI com precisão para escalar sua operação Acelera EAD.
          </p>
        </header>


        <section id="tour-inputs" className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.04)] border border-zinc-100 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">

            <div className="lg:col-span-5">
              <SmartInput
                label="Qual sua meta de ganho?"
                prefix="R$"
                value={inputMetaGanho}
                onChange={(e: any) => { setInputMetaGanho(e.target.value); if(activeMode !== "META") { setActiveMode("META"); setInputVendas(""); setInputLeads(""); setInputInvestimento(""); } }}
                onBlur={() => handleBlurFormat(setInputMetaGanho, inputMetaGanho)}
                onFocus={() => { handleFocusUnformat(setInputMetaGanho, inputMetaGanho); setActiveMode("META"); setInputVendas(""); setInputLeads(""); setInputInvestimento(""); }}
                onIncrement={() => { incrementMonetary(inputMetaGanho, setInputMetaGanho, 500); setActiveMode("META"); setInputVendas(""); setInputLeads(""); setInputInvestimento(""); }}
                onDecrement={() => { decrementMonetary(inputMetaGanho, setInputMetaGanho, 500); setActiveMode("META"); setInputVendas(""); setInputLeads(""); setInputInvestimento(""); }}
              />
            </div>

            <div className="lg:col-span-4">
              <SmartInput
                label="Custo por Lead (CPL)"
                prefix="R$"
                value={inputCPL}
                onChange={(e: any) => setInputCPL(e.target.value)}
                onBlur={() => handleBlurFormat(setInputCPL, inputCPL)}
                onFocus={() => handleFocusUnformat(setInputCPL, inputCPL)}
                onIncrement={() => incrementMonetary(inputCPL, setInputCPL, 0.5)}
                onDecrement={() => decrementMonetary(inputCPL, setInputCPL, 0.5)}
              />
            </div>

            <div className="lg:col-span-3 space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wide">Conversão de Lead</label>
              <div className="relative group">
                <select
                  value={String(inputTaxa)}
                  onChange={(e) => setInputTaxa(Number(e.target.value))}
                  className="w-full appearance-none bg-zinc-50/50 border-0 rounded-2xl py-4 pl-4 pr-10 text-zinc-900 font-bold text-xl ring-1 ring-zinc-200/80 focus:ring-2 focus:ring-orange-500/10 outline-none cursor-pointer transition-all hover:bg-zinc-50"
                >
                  {[2, 4, 6, 8, 10, 12, 15].map((t) => <option key={t} value={t}>{t}%</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-hover:text-orange-500 transition-colors" size={20} />
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-100 to-transparent my-8" />

          {/* INPUTS MANUAIS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SmartInput
              label="Vendas (Manual)"
              type="number"
              value={inputVendas}
              onChange={(e: any) => { const val = e.target.value === "" ? "" : Number(e.target.value); setInputVendas(val); if (val !== "") { setActiveMode("VENDAS"); setInputLeads(""); setInputInvestimento(""); } else { setActiveMode("META"); } }}
              onIncrement={() => { incrementNumber(inputVendas, setInputVendas); setActiveMode("VENDAS"); setInputLeads(""); setInputInvestimento(""); }}
              onDecrement={() => { decrementNumber(inputVendas, setInputVendas); setActiveMode("VENDAS"); setInputLeads(""); setInputInvestimento(""); }}
              placeholder="Auto"
            />
            <SmartInput
              label="Leads (Manual)"
              type="number"
              value={inputLeads}
              onChange={(e: any) => { const val = e.target.value === "" ? "" : Number(e.target.value); setInputLeads(val); if (val !== "") { setActiveMode("LEADS"); setInputVendas(""); setInputInvestimento(""); } else { setActiveMode("META"); } }}
              onIncrement={() => { incrementNumber(inputLeads, setInputLeads, 10); setActiveMode("LEADS"); setInputVendas(""); setInputInvestimento(""); }}
              onDecrement={() => { decrementNumber(inputLeads, setInputLeads, 10); setActiveMode("LEADS"); setInputVendas(""); setInputInvestimento(""); }}
              placeholder="Auto"
            />
            <SmartInput
              label="Investimento (Manual)"
              prefix="R$"
              value={inputInvestimento}
              onChange={(e: any) => { setInputInvestimento(e.target.value); if (parseBRL(e.target.value) > 0) { setActiveMode("INVESTIMENTO"); setInputVendas(""); setInputLeads(""); } }}
              onBlur={() => { handleBlurFormat(setInputInvestimento, inputInvestimento); if (parseBRL(inputInvestimento) === 0) setActiveMode("META"); }}
              onFocus={() => { handleFocusUnformat(setInputInvestimento, inputInvestimento); setActiveMode("INVESTIMENTO"); setInputVendas(""); setInputLeads(""); }}
              onIncrement={() => { incrementMonetary(inputInvestimento, setInputInvestimento, 100); setActiveMode("INVESTIMENTO"); setInputVendas(""); setInputLeads(""); }}
              onDecrement={() => { decrementMonetary(inputInvestimento, setInputInvestimento, 100); setActiveMode("INVESTIMENTO"); setInputVendas(""); setInputLeads(""); }}
              placeholder="Auto"
            />
          </div>
        </section>

        <div id="tour-results" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 py-2">
          
          <BentoCard title="Ganhos Projetados" className="md:col-span-2 lg:row-span-2" highlight>
            <div className="text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 mb-2">
              <span className="text-lg text-zinc-400 font-normal mr-1">R$</span>
              {formatBRL(ganhosProjetados)}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-green-100/80 text-green-700 text-xs font-bold border border-green-200">
                +{comissaoPct.toFixed(0)}% Comissão
              </span>
              <span className="text-zinc-400 text-xs font-medium">Baseado em: {activeMode}</span>
            </div>
          </BentoCard>

          <BentoCard title="Nível de Parceria" className="md:col-span-2 bg-zinc-900 text-white !border-zinc-800" dark>
             <div className="flex justify-between items-end">
                <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                  nivel === "MASTER" ? "from-yellow-300 to-amber-500" : 
                  nivel === "ADVANCED" ? "from-blue-300 to-cyan-500" : "from-zinc-400 to-zinc-200"
                }`}>
                  {nivel}
                </div>
                <div className="p-3 bg-white/5 rounded-full border border-white/10">
                  <Sparkles className="text-white/80" size={20} />
                </div>
             </div>
          </BentoCard>

          <BentoCard title="Faturamento">
            <div className="text-2xl font-bold text-zinc-800">R$ {formatBRL(faturamentoProj)}</div>
            <div className="text-[10px] text-zinc-400 mt-1">Ticket: R$ {formatBRL(TICKET_MEDIO)}</div>
          </BentoCard>

          <BentoCard title="ROI Estimado">
             <div className="text-2xl font-bold text-orange-600">{roi.toFixed(2)}x</div>
             <div className="text-[10px] text-zinc-400 mt-1">Retorno s/ Investimento</div>
          </BentoCard>

           <BentoCard title="Vendas Necessárias">
            <div className="flex justify-between items-end">
                <div className="text-2xl font-bold text-zinc-900">{vendasNec}</div>
                <Wallet size={18} className="text-zinc-300 mb-1" />
            </div>
          </BentoCard>

          <BentoCard title="Leads Necessários">
             <div className="text-2xl font-bold text-blue-600">{leadsNec}</div>
             <div className="text-[10px] text-zinc-400 mt-1">Conv: {inputTaxa}%</div>
          </BentoCard>
          
          <BentoCard title="Investimento Mídia">
             <div className="text-2xl font-bold text-rose-600">R$ {formatBRL(investimentoNec)}</div>
          </BentoCard>
          <BentoCard title="Lucro Líquido Estimado">
             <div className={`text-2xl font-bold ${lucroLiquido >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
               R$ {formatBRL(lucroLiquido)}
             </div>
             <div className="flex justify-between items-center mt-1">
               <div className="text-[10px] text-zinc-400">(Comissão - Tráfego)</div>
               <Wallet size={16} className={lucroLiquido >= 0 ? 'text-emerald-200' : 'text-red-200'} />
             </div>
          </BentoCard>
        </div>


<div id="tour-copy" className="rounded-3xl bg-zinc-900 p-2 pl-6 pr-2 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col py-2">
                 <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">Estratégia</span>
                 <span className="text-white font-semibold text-sm">Resumo Executivo</span>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
                {/* BOTÃO 1: Orgânico (Simulação Antiga) */}
                <button 
                  onClick={() => setOrganicOpen(true)}
                  className="hidden md:flex px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors text-sm items-center justify-center gap-2"
                >
                  <BarChart3 size={16} className="text-zinc-400" />
                  <span className="hidden lg:inline">Orgânico</span>
                </button>

                {/* BOTÃO 2: GERAR PDF (Componente Dinâmico Isolado) */}
                <div className="flex-1 md:flex-none min-w-[180px]">
                   <PDFButton 
                      data={{
                        meta: inputMetaGanho,
                        cpl: inputCPL,
                        taxa: inputTaxa,
                        vendas: vendasNec,
                        leads: leadsNec,
                        faturamento: formatBRL(faturamentoProj),
                        investimento: formatBRL(investimentoNec),
                        lucro: formatBRL(lucroLiquido),
                        roi: roi,
                        nivel: nivel,
                        comissaoPct: comissaoPct
                      }}
                   />
                </div>

                {/* BOTÃO 3: Copiar Texto (Compacto) */}
                <button 
                  onClick={() => {
                      const text = [
                        `🚀 *Simulação Acelera EAD*`,
                        `💰 Meta: R$ ${inputMetaGanho}`,
                        `🎯 CPL: R$ ${inputCPL}`,
                        `----------------`,
                        `💵 Faturamento: R$ ${formatBRL(faturamentoProj)}`,
                        `📉 Lucro Líq: R$ ${formatBRL(lucroLiquido)}`,
                        `📈 *ROI: ${roi.toFixed(2)}x*`,
                      ].join("\n");
                      navigator.clipboard?.writeText(text);
                      toast.success("Métricas copiadas!", {
                        description: "Resumo pronto para colar no WhatsApp.",
                        duration: 3000, // 3 segundos
                        icon: <Copy size={16} />,
                      });
                  }}
                  className="p-3 rounded-2xl bg-white text-zinc-900 hover:bg-zinc-200 transition-colors flex items-center justify-center min-w-[48px]"
                  title="Copiar Texto Rápido"
                >
                  <Copy size={18} />
                </button>
            </div>
        </div>
        <footer className="text-center mt-16 pb-8 border-t border-zinc-100 pt-8">
          <p className="text-zinc-400 text-sm">Ticket médio base: R$ {formatBRL(TICKET_MEDIO)}</p>
        </footer>
      </div>

      {organicOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md transition-opacity" onClick={() => setOrganicOpen(false)} />
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-zinc-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
                    <div><h3 className="text-lg font-bold text-zinc-900">Simulador Orgânico</h3><p className="text-sm text-zinc-500">Projeção sem investimento</p></div>
                    <button onClick={() => setOrganicOpen(false)} className="p-2 rounded-full hover:bg-zinc-200 text-zinc-400 transition-colors"><X size={20} /></button>
                </div>
                <div className="p-6 md:p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div><label className="text-xs font-bold text-zinc-400 uppercase mb-2 block">Alunos</label><input type="number" value={orgAlunos} onChange={(e) => setOrgAlunos(Number(e.target.value))} className="w-full bg-zinc-50 border-0 rounded-xl p-3 font-bold text-zinc-900 ring-1 ring-zinc-200 outline-none" /></div>
                        <div><label className="text-xs font-bold text-zinc-400 uppercase mb-2 block">Ticket</label><input value={orgTicket} onChange={(e) => setOrgTicket(e.target.value)} onBlur={() => handleBlurFormat(setOrgTicket, orgTicket)} className="w-full bg-zinc-50 border-0 rounded-xl p-3 font-bold text-zinc-900 ring-1 ring-zinc-200 outline-none" /></div>
                        <div><label className="text-xs font-bold text-zinc-400 uppercase mb-2 block">Meses</label><input type="number" min={1} value={orgPeriodo} onChange={(e) => setOrgPeriodo(Math.max(1, Number(e.target.value)))} className="w-full bg-zinc-50 border-0 rounded-xl p-3 font-bold text-zinc-900 ring-1 ring-zinc-200 outline-none" /></div>
                    </div>
                    <div className="bg-zinc-900 rounded-2xl p-6 text-white grid grid-cols-1 md:grid-cols-3 gap-6 shadow-lg">
                        <div><div className="text-zinc-500 text-xs font-bold uppercase mb-1">Faturamento</div><div className="text-xl font-bold">R$ {formatBRL(orgResult?.faturamentoTotal ?? 0)}</div></div>
                        <div><div className="text-zinc-500 text-xs font-bold uppercase mb-1">Mensal</div><div className="text-xl font-bold text-blue-300">R$ {formatBRL(orgResult?.mensal ?? 0)}</div></div>
                        <div><div className="text-zinc-500 text-xs font-bold uppercase mb-1">Ganhos</div><div className="text-xl font-bold text-green-400">R$ {formatBRL(orgResult?.ganhos ?? 0)}</div></div>
                    </div>
                </div>
                <div className="p-4 bg-zinc-50 border-t border-zinc-100 flex justify-end gap-3">
                    <button onClick={() => setOrganicOpen(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-zinc-500 hover:bg-zinc-200">Fechar</button>
                    <button onClick={() => setOrganicOpen(false)} className="px-6 py-3 rounded-xl bg-zinc-900 text-white text-sm font-bold shadow-lg">Confirmar</button>
                </div>
            </div>
        </div>
      )}

      <TutorialOverlay 
        steps={tutorialSteps} 
        isOpen={isTutorialOpen} 
        onClose={() => setIsTutorialOpen(false)} 
      />
      <Toaster position="bottom-right"  expand={true} />
    </div>
  );
}