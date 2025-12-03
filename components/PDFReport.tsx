/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingHorizontal: 40,
    paddingBottom: 80, // AUMENTEI AQUI: Espaço extra para o rodapé não sobrepor
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    color: '#18181b',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
    paddingBottom: 20,
  },
  brandTitle: {
    fontSize: 10,
    color: '#f97316', 
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  reportTitle: {
    fontSize: 22,
    fontWeight: 'bold', 
    color: '#09090b',
  },
  date: {
    fontSize: 9,
    color: '#71717a',
  },
  
  // Containers
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#09090b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#f97316', // Detalhe laranja na esquerda
    paddingLeft: 6,
  },
  
  // Grids
  grid: {
    flexDirection: 'row',
    gap: 12, // React-PDF moderno suporta gap
  },
  
  // Cards Pequenos
  card: {
    backgroundColor: '#fafafa',
    borderRadius: 6,
    padding: 12,
    flexGrow: 1,
    flexBasis: 0, // Garante larguras iguais
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  
  // Card Principal (Dark)
  cardDark: {
    backgroundColor: '#18181b',
    borderRadius: 8,
    padding: 24,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOpacity: 0.2, // Simulado
  },
  
  // Tipografia dos Cards
  cardLabel: {
    fontSize: 8,
    color: '#a1a1aa',
    textTransform: 'uppercase',
    marginBottom: 6,
    letterSpacing: 0.5,
    fontWeight: 'medium',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#18181b',
  },
  
  // Cores de Texto
  textWhite: { color: '#FFFFFF' },
  textOrange: { color: '#fb923c' },
  textGreen: { color: '#22c55e' },
  textBlue: { color: '#3b82f6' },
  textRed: { color: '#ef4444' },

  // Callout (Observações)
  callout: {
    backgroundColor: '#fff7ed', // Laranja bem claro
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: 6,
    padding: 15,
    marginTop: 10,
  },
  calloutText: {
    fontSize: 9,
    color: '#7c2d12',
    lineHeight: 1.6,
    textAlign: 'justify',
  },

  // Footer Absoluto
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f4f4f5',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#d4d4d8',
  }
});

interface PDFProps {
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
  }
}

export const PDFReport = ({ data }: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.brandTitle}>Acelera EAD</Text>
          <Text style={styles.reportTitle}>Relatório de Estratégia</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
           <Text style={styles.date}>{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</Text>
           <Text style={[styles.date, { fontSize: 8, marginTop: 4, color: '#a1a1aa' }]}>ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
        </View>
      </View>

      {/* HERO CARD (Dark) */}
      <View style={styles.cardDark}>
        <View>
          <Text style={styles.cardLabel}>Lucro Líquido Projetado</Text>
          <Text style={[styles.cardValue, styles.textWhite, { fontSize: 32 }]}>R$ {data.lucro}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.cardLabel}>ROI Estimado</Text>
          <Text style={[styles.cardValue, styles.textOrange, { fontSize: 28 }]}>{data.roi.toFixed(2)}x</Text>
        </View>
      </View>

      {/* BLOCO 1: FINANCEIRO */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Indicadores Financeiros</Text>
        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Faturamento Total</Text>
            <Text style={styles.cardValue}>R$ {data.faturamento}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Investimento Mídia</Text>
            <Text style={[styles.cardValue, styles.textRed]}>R$ {data.investimento}</Text>
          </View>
           <View style={styles.card}>
            <Text style={styles.cardLabel}>Sua Comissão</Text>
            <Text style={[styles.cardValue, styles.textGreen]}>{data.comissaoPct}%</Text>
          </View>
        </View>
      </View>

      {/* BLOCO 2: OPERACIONAL */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Operacional</Text>
        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Meta Definida</Text>
            <Text style={styles.cardValue}>R$ {data.meta}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Vendas Nec.</Text>
            <Text style={styles.cardValue}>{data.vendas}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Leads Nec.</Text>
            <Text style={[styles.cardValue, styles.textBlue]}>{data.leads}</Text>
          </View>
        </View>
      </View>

      {/* BLOCO 3: PREMISSAS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Premissas da Simulação</Text>
        <View style={styles.grid}>
           <View style={styles.card}>
            <Text style={styles.cardLabel}>Custo Lead (CPL)</Text>
            <Text style={styles.cardValue}>R$ {data.cpl}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Conversão</Text>
            <Text style={styles.cardValue}>{data.taxa}%</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Nível Parceria</Text>
            <Text style={styles.cardValue}>{data.nivel}</Text>
          </View>
        </View>
      </View>

      {/* BLOCO 4: OBSERVAÇÕES (CORRIGIDO) */}
      <View style={styles.section}>
         <Text style={styles.sectionTitle}>Análise de Viabilidade</Text>
         <View style={styles.callout}>
            <Text style={styles.calloutText}>
                Este relatório é uma projeção matemática baseada nas métricas inseridas. O resultado real pode variar de acordo com a qualidade do criativo, assertividade do público-alvo e sazonalidade do mercado. 
                {'\n\n'}
                <Text style={{ fontWeight: 'bold' }}>Recomendação:</Text> Para atingir o ROI de {data.roi.toFixed(2)}x com segurança, seu foco deve ser manter o CPL abaixo de R$ {data.cpl} e garantir que a taxa de conversão do time ou página não caia de {data.taxa}%.
            </Text>
         </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Gerado automaticamente via Calculadora Acelera EAD • Documento Interno • © {new Date().getFullYear()}
        </Text>
      </View>

    </Page>
  </Document>
);