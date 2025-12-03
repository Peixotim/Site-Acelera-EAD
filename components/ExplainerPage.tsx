"use client";

import React from "react";
import { 
  Target, Zap, TrendingUp, Layers, 
  ArrowRight, ShieldCheck, MousePointerClick, 
  BarChart3, Smartphone 
} from "lucide-react";
import Link from "next/link";

// Componente de Seção (Bento Grid Item)
const FeatureCard = ({ icon: Icon, title, desc, className = "", delay = "0" }: any) => (
  <div className={`group relative overflow-hidden rounded-[2rem] bg-zinc-50 p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 border border-zinc-100 ${className}`}>
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
       <Icon size={120} />
    </div>
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-zinc-100 text-orange-600 group-hover:scale-110 transition-transform duration-300">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-900">{title}</h3>
        <p className="text-zinc-500 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  </div>
);

export default function ExplainerPage() {
  return (
    <div className="bg-white text-zinc-900 selection:bg-orange-100 selection:text-orange-900">
      
      {/* === HERO SECTION === */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Background Decorativo (Blur) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-orange-50/50 to-transparent rounded-full blur-3xl -z-10" />
        
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-white text-xs font-bold tracking-widest uppercase mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Nova Ferramenta Acelera EAD
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8 text-zinc-900 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-backwards">
            Domine seus números. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              Escale sua operação.
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-zinc-500 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200 fill-mode-backwards">
            Deixe de adivinhar. Nossa nova calculadora utiliza inteligência de dados para projetar faturamento, ROI e custos com precisão cirúrgica.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-backwards">
            <button 
              onClick={() => document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-zinc-900 rounded-full hover:bg-zinc-800 hover:scale-105 shadow-xl shadow-zinc-900/20"
            >
              Usar Calculadora
              <ArrowRight className="ml-2" size={18} />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-zinc-600 transition-all bg-zinc-100 rounded-full hover:bg-zinc-200">
              Ver Tutorial
            </button>
          </div>
        </div>
      </section>

      {/* === COMO FUNCIONA (BENTO GRID) === */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Poderoso. Simples.</h2>
            <p className="text-zinc-500 text-lg">Três passos para transformar sua estratégia de vendas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            <div className="md:col-span-2 rounded-[2.5rem] bg-zinc-900 p-10 text-white relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="space-y-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-orange-500 border border-zinc-700 shrink-0">1</div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Defina sua Ambição</h4>
                    <p className="text-zinc-400">Insira quanto você quer ganhar. O sistema faz a engenharia reversa automaticamente.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-orange-500 border border-zinc-700 shrink-0">2</div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">Ajuste os Custos</h4>
                    <p className="text-zinc-400">Configure seu CPL (Custo por Lead) e taxa de conversão para simular a realidade do mercado.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-zinc-900 shrink-0">3</div>
                  <div>
                    <h4 className="text-xl font-bold mb-1 text-orange-400">Descubra seu Nível</h4>
                    <p className="text-zinc-300">Veja se você é Start, Advanced ou Master e qual sua comissão real.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card - Visual 1 */}
            <FeatureCard 
              icon={Target}
              title="Engenharia Reversa"
              desc="Não sabe quantos leads precisa? Nós calculamos a quantidade exata baseada na sua meta financeira."
            />

            {/* Card - Visual 2 */}
            <FeatureCard 
              icon={Smartphone}
              title="100% Responsivo"
              desc="Simule seus ganhos direto do celular, tablet ou desktop com a mesma experiência fluida."
            />

            {/* Card Grande - Comparativo */}
            <div className="md:col-span-2 rounded-[2.5rem] bg-gradient-to-br from-orange-50 to-white border border-orange-100 p-10 relative overflow-hidden group">
               <div className="relative z-10 max-w-md">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase mb-4">
                    Novo Recurso
                 </div>
                 <h3 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">Comparador Inteligente</h3>
                 <p className="text-zinc-600 text-lg mb-6">
                   Dúvida entre investir em tráfego pago ou focar no orgânico? Nossa ferramenta compara os dois cenários lado a lado, mostrando onde seu esforço rende mais.
                 </p>
                 
                 <div className="flex items-center gap-2 font-bold text-orange-600 group-hover:gap-4 transition-all cursor-pointer">
   
                   <Link href={'/comparador'}> Simular Cenários</Link> <ArrowRight size={20} />
                 
                 </div>
               </div>
               {/* Decorative Abstract UI */}
               <div className="absolute -right-12 bottom-8 bg-white p-4 rounded-xl shadow-xl border border-zinc-100 w-64 rotate-[-6deg] opacity-80 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
                  <div className="h-2 w-1/2 bg-zinc-100 rounded mb-4" />
                  <div className="flex justify-between items-end">
                    <div className="h-8 w-8 bg-orange-100 rounded-lg" />
                    <div className="h-12 w-8 bg-orange-200 rounded-lg" />
                    <div className="h-16 w-8 bg-orange-500 rounded-lg" />
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* === VISUAL BREAKDOWN (A Estética Apple) === */}
      <section className="py-24 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Transparência Total</h2>
          <p className="text-zinc-500">Entenda cada métrica que compõe o seu sucesso.</p>
        </div>

        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
           <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center text-blue-500 mb-2">
                <MousePointerClick size={32} />
              </div>
              <h3 className="font-bold text-zinc-900">Leads</h3>
              <p className="text-sm text-zinc-500">Volume de interessados necessários para bater a meta.</p>
           </div>
           <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center text-rose-500 mb-2">
                <TrendingUp size={32} />
              </div>
              <h3 className="font-bold text-zinc-900">CPL</h3>
              <p className="text-sm text-zinc-500">Impacto direto do custo do lead no seu lucro final.</p>
           </div>
           <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center text-green-500 mb-2">
                <Zap size={32} />
              </div>
              <h3 className="font-bold text-zinc-900">Conversão</h3>
              <p className="text-sm text-zinc-500">A eficácia do seu time de vendas ou página de checkout.</p>
           </div>
           <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm border border-zinc-100 flex items-center justify-center text-orange-500 mb-2">
                <Layers size={32} />
              </div>
              <h3 className="font-bold text-zinc-900">ROI</h3>
              <p className="text-sm text-zinc-500">O retorno real sobre cada real investido em mídia.</p>
           </div>
        </div>
      </section>

      {/* === ID PARA ROLAGEM === */}
      <div id="calculadora" className="py-8 bg-zinc-50">
         <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Sua vez de simular</p>
            <div className="w-px h-12 bg-zinc-300 mx-auto" />
         </div>
      </div>
    </div>
  );
}