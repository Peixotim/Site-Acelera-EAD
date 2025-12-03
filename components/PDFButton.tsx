"use client";

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFReport } from './PDFReport'; // Seu arquivo de template
import { Download } from 'lucide-react';

interface PDFButtonProps {
  data: {
    meta: string;
    cpl: string;
    taxa: number;
    vendas: number;
    leads: number;
    faturamento: string;
    investimento: string;
    lucro: string;
    roi: number;
    nivel: string;
    comissaoPct: number;
  };
}

const PDFButton = ({ data }: PDFButtonProps) => {
  return (
    <PDFDownloadLink
      document={<PDFReport data={data} />}
      fileName={`Projecao_Acelera_${new Date().toISOString().slice(0, 10)}.pdf`}
      className="flex-1 md:flex-none w-full"
    >
      {({ loading }) => (
        <button
          className={`w-full px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
            loading
              ? 'bg-zinc-700 text-zinc-400 cursor-wait'
              : 'bg-orange-600 hover:bg-orange-500 text-white hover:scale-105 shadow-lg shadow-orange-900/20'
          }`}
          disabled={loading}
        >
          {loading ? (
            <>Gerando...</>
          ) : (
            <>
              <Download size={18} />
              Baixar PDF
            </>
          )}
        </button>
      )}
    </PDFDownloadLink>
  );
};

export default PDFButton;