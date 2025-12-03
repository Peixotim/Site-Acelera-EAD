"use client";

import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, Zap, Sprout, Clock, 
  TrendingUp, AlertCircle, CheckCircle2, 
  HelpCircle, ArrowRight, Wallet 
} from "lucide-react";

// ==========================================
// 1. Componentes de UI Reutilizáveis (Apple Style)
// ==========================================

const Card = ({ children, className = "", active = false, theme = "gray" }: any) => {
  const borderColors: any = {
    gray: "border-zinc-200",
    orange: "border-orange-200 ring-4 ring-orange-500/5",
    green: "border-emerald-200 ring-4 ring-emerald-500/5",
  };

  return (
    <div className={`
      relative bg-white rounded-[2.5rem] p-8 transition-all duration-500 ease-out
      border ${active ? borderColors[theme] : 'border-zinc-100'}
      ${active ? 'shadow-2xl scale-[1.01]' : 'shadow-xl hover:shadow-2xl hover:scale-[1.005]'}
      ${className}
    `}>
      {children}
    </div>
  );
};

const BigNumber = ({ label, value, sub, color = "text-zinc-900" }: any) => (
  <div>
    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">{label}</p>
    <div className={`text-4xl md:text-5xl font-extrabold tracking-tighter ${color}`}>
      {value}
    </div>
    {sub && <p className="text-sm text-zinc-500 font-medium mt-1">{sub}</p>}
  </div>
);

const RangeSlider = ({ label, value, min, max, onChange, unit, colorClass }: any) => (
  <div className="space-y-4">
    <div className="flex justify-between items-end">
      <label className="text-sm font-bold text-zinc-500 uppercase tracking-wide">{label}</label>
      <div className={`text-xl font-bold ${colorClass}`}>{value} <span className="text-sm text-zinc-400 font-normal">{unit}</span></div>
    </div>
    <input 
      type="range" min={min} max={max} value={value} onChange={onChange}
      className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-100 accent-${colorClass.split('-')[1]}-500`}
    />
  </div>
);

// ==========================================
// 2. Página Principal
// ==========================================

export default function ComparatorPage() {
  // --- Estado Global ---
  const [ticketMedio, setTicketMedio] = useState(899);

  // --- Estado: Tráfego Pago (Scalability) ---
  const [investimento, setInvestimento] = useState(2000);
  const [cpl, setCpl] = useState(7);
  const [conv, setConv] = useState(10); // %

  // --- Estado: Orgânico (Hustle) ---
  const [orgVendas, setOrgVendas] = useState(5);
  const [horasDia, setHorasDia] = useState(4);
  const [diasMes, setDiasMes] = useState(22);

  // --- Cálculos em Tempo Real ---
  
  // Pago
  const leadsPago = Math.floor(investimento / cpl);
  const vendasPago = Math.floor(leadsPago * (conv / 100));
  const fatPago = vendasPago * ticketMedio;
  // Comissão simples (ex: 40% média)
  const comissaoMedia = 0.40; 
  const ganhoBrutoPago = fatPago * comissaoMedia;
  const lucroLiquidoPago = ganhoBrutoPago - investimento;
  const roiPago = investimento > 0 ? fatPago / investimento : 0;
  // Estimativa de tempo pago (1h/dia gestão)
  const horasMensaisPago = 30; 
  const valorHoraPago = horasMensaisPago > 0 ? lucroLiquidoPago / horasMensaisPago : 0;

  // Orgânico
  const fatOrg = orgVendas * ticketMedio;
  // Comissão orgânica costuma ser menor ou igual, vamos manter igual para ser justo
  const ganhoBrutoOrg = fatOrg * comissaoMedia;
  // Custo financeiro é 0, custo é tempo
  const lucroLiquidoOrg = ganhoBrutoOrg; 
  const horasMensaisOrg = horasDia * diasMes;
  const valorHoraOrg = horasMensaisOrg > 0 ? lucroLiquidoOrg / horasMensaisOrg : 0;

  // Veredito
  const diferencaFinanceira = lucroLiquidoPago - lucroLiquidoOrg;
  const isPaidBetter = diferencaFinanceira > 0;

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-zinc-900 font-sans selection:bg-orange-100 selection:text-orange-900 pb-20">
      
      {/* === HEADER FLUTUANTE === */}
      <header className="sticky top-0 z-50 bg-[#F5F5F7]/80 backdrop-blur-xl border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={18} />
            Voltar para Calculadora
          </button>
          <div className="text-center">
            <h1 className="text-sm font-bold uppercase tracking-widest text-zinc-900">Comparador Inteligente</h1>
          </div>
          <div className="w-[140px]" /> {/* Spacer para centralizar */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* === INTRO === */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-zinc-900">
            Escala <span className="text-zinc-300">vs</span> Esforço.
          </h2>
          <p className="text-xl text-zinc-500 leading-relaxed font-medium">
            Descubra a verdade matemática sobre o seu negócio. Onde vale a pena colocar sua energia?
          </p>
        </div>

        {/* === GRID DE BATALHA === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative">
          
          {/* Badge VS Centralizado (Desktop) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white rounded-full shadow-xl items-center justify-center font-black text-zinc-200 text-xl border border-zinc-100">
            VS
          </div>

          {/* === CARD ESQUERDA: TRÁFEGO PAGO === */}
          <Card theme="orange" active={isPaidBetter} className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                <Zap size={24} fill="currentColor" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-900">Tráfego Pago</h3>
                <p className="text-sm text-zinc-500 font-medium">A máquina de vendas</p>
              </div>
            </div>

            {/* Inputs do Pago */}
            <div className="space-y-8 mb-12 flex-1">
              <div className="bg-zinc-50 rounded-2xl p-6 space-y-6">
                 <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase mb-2 block">Investimento Mensal</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">R$</span>
                      <input 
                        type="number" 
                        value={investimento} 
                        onChange={(e) => setInvestimento(Number(e.target.value))}
                        className="w-full bg-white border-0 rounded-xl py-4 pl-10 pr-4 font-bold text-2xl text-zinc-900 shadow-sm ring-1 ring-zinc-200 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      />
                    </div>
                 </div>
                 
                 <RangeSlider 
                    label="Custo por Lead (CPL)" 
                    value={cpl} min={1} max={20} unit="R$" colorClass="text-orange-600"
                    onChange={(e: any) => setCpl(Number(e.target.value))}
                 />
                 
                 <RangeSlider 
                    label="Taxa de Conversão" 
                    value={conv} min={1} max={30} unit="%" colorClass="text-zinc-900"
                    onChange={(e: any) => setConv(Number(e.target.value))}
                 />
              </div>

              {/* Métricas Pago */}
              <div className="grid grid-cols-2 gap-8 px-2">
                 <BigNumber label="Vendas Est." value={vendasPago} color="text-zinc-900" />
                 <BigNumber label="Faturamento" value={`R$ ${fatPago.toLocaleString('pt-BR')}`} color="text-zinc-900" />
              </div>
            </div>

            {/* Resultado Final Pago */}
            <div className="mt-auto bg-orange-50 rounded-3xl p-8 border border-orange-100">
               <div className="flex justify-between items-end mb-2">
                 <span className="text-orange-900 font-bold uppercase text-xs tracking-widest">Lucro Líquido Real</span>
                 <Wallet className="text-orange-300" size={20} />
               </div>
               <div className="text-5xl font-extrabold text-orange-600 tracking-tighter">
                 R$ {lucroLiquidoPago.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
               </div>
               <div className="mt-4 flex items-center gap-2 text-orange-700/60 text-sm font-medium">
                  <Clock size={14} />
                  <span>Sua hora vale: <strong>R$ {valorHoraPago.toFixed(2)}</strong> (Base: 30h/mês)</span>
               </div>
            </div>
          </Card>

          {/* === CARD DIREITA: ORGÂNICO === */}
          <Card theme="green" active={!isPaidBetter} className="flex flex-col h-full">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Sprout size={24} fill="currentColor" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-zinc-900">Venda Orgânica</h3>
                <p className="text-sm text-zinc-500 font-medium">O suor do dia-a-dia</p>
              </div>
            </div>

            {/* Inputs do Orgânico */}
            <div className="space-y-8 mb-12 flex-1">
              <div className="bg-zinc-50 rounded-2xl p-6 space-y-6">
                 <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase mb-2 block">Vendas Manuais (Meta)</label>
                    <input 
                      type="number" 
                      value={orgVendas} 
                      onChange={(e) => setOrgVendas(Number(e.target.value))}
                      className="w-full bg-white border-0 rounded-xl py-4 px-4 font-bold text-2xl text-zinc-900 shadow-sm ring-1 ring-zinc-200 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    />
                 </div>

                 <RangeSlider 
                    label="Horas por Dia" 
                    value={horasDia} min={1} max={14} unit="h" colorClass="text-emerald-600"
                    onChange={(e: any) => setHorasDia(Number(e.target.value))}
                 />

                 <RangeSlider 
                    label="Dias Trabalhados" 
                    value={diasMes} min={1} max={30} unit="dias" colorClass="text-zinc-900"
                    onChange={(e: any) => setDiasMes(Number(e.target.value))}
                 />
              </div>

               {/* Métricas Orgânico */}
               <div className="grid grid-cols-2 gap-8 px-2">
                 <BigNumber label="Custo Anúncio" value="R$ 0" color="text-emerald-500" />
                 <BigNumber label="Esforço" value={`${horasMensaisOrg}h`} sub="Horas totais/mês" color="text-zinc-900" />
              </div>
            </div>

            {/* Resultado Final Orgânico */}
            <div className="mt-auto bg-emerald-50 rounded-3xl p-8 border border-emerald-100">
               <div className="flex justify-between items-end mb-2">
                 <span className="text-emerald-900 font-bold uppercase text-xs tracking-widest">Lucro Líquido Real</span>
                 <Wallet className="text-emerald-300" size={20} />
               </div>
               <div className="text-5xl font-extrabold text-emerald-600 tracking-tighter">
                 R$ {lucroLiquidoOrg.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
               </div>
               <div className="mt-4 flex items-center gap-2 text-emerald-700/60 text-sm font-medium">
                  <Clock size={14} />
                  <span>Sua hora vale: <strong>R$ {valorHoraOrg.toFixed(2)}</strong></span>
               </div>
            </div>
          </Card>

        </div>

        {/* === O VEREDITO (FOOTER FIXO OU SEÇÃO FINAL) === */}
        <div className="mt-16 mb-24">
          <div className="bg-zinc-900 text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
             <div className={`absolute top-0 right-0 w-full h-full opacity-20 bg-gradient-to-l ${isPaidBetter ? 'from-orange-600' : 'from-emerald-600'} to-transparent`} />
             
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-2">
                  <div className="flex items-center gap-3 mb-4">
                     {isPaidBetter ? <CheckCircle2 className="text-orange-500" size={32} /> : <CheckCircle2 className="text-emerald-500" size={32} />}
                     <h2 className="text-3xl font-bold tracking-tight">O Veredito Matemático</h2>
                  </div>
                  <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                    {isPaidBetter ? (
                      <>
                        O <strong className="text-white">Tráfego Pago venceu</strong>. Você lucra <strong className="text-orange-400">R$ {diferencaFinanceira.toLocaleString('pt-BR')} a mais</strong> e trabalha infinitamente menos. Sua hora vale {(valorHoraPago / (valorHoraOrg || 1)).toFixed(1)}x mais no pago. É hora de escalar.
                      </>
                    ) : (
                      <>
                        O <strong className="text-white">Orgânico venceu</strong> (por enquanto). Como seu orçamento é baixo, seu tempo vale mais que seu dinheiro agora. Foque em vendas manuais até juntar caixa.
                      </>
                    )}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                   <button className={`w-full py-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-lg ${
                     isPaidBetter 
                      ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-orange-500/20' 
                      : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20'
                   }`}>
                     {isPaidBetter ? 'Criar Plano de Tráfego' : 'Iniciar Prospecção'}
                   </button>
                   <p className="text-center text-xs text-zinc-500 font-medium uppercase tracking-wide">Baseado nos dados inseridos</p>
                </div>
             </div>
          </div>
        </div>

      </main>
    </div>
  );
}