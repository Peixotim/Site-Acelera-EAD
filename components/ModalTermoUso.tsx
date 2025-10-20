import React, { useRef } from 'react';

interface TermosDeUsoProps {
    onClose: () => void;
}

const ModalTermosDeUso = ({ onClose }: TermosDeUsoProps) => {
    const contentRef = useRef<HTMLDivElement>(null);

    // Função para impressão simples (fallback)
    const handlePrint = () => {
        const printContent = contentRef.current;
        if (!printContent) return;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Termos de Uso - ${new Date().toLocaleDateString('pt-BR')}</title>
            <meta charset="UTF-8">
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 2cm; 
                line-height: 1.6;
                color: #333;
                font-size: 14px;
              }
              .header { 
                background: #f97316; 
                color: white; 
                padding: 20px; 
                text-align: center;
                margin-bottom: 30px;
                border-radius: 8px;
              }
              h1 { 
                margin: 0; 
                font-size: 24px; 
                font-weight: bold;
              }
              h2 { 
                color: #f97316; 
                border-bottom: 2px solid #f97316; 
                padding-bottom: 5px;
                margin-top: 25px;
                font-size: 18px;
              }
              h3 {
                color: #ea580c;
                font-size: 16px;
                margin-top: 15px;
              }
              section { 
                margin-bottom: 25px; 
              }
              ul { 
                padding-left: 20px; 
              }
              li { 
                margin-bottom: 8px; 
              }
              .footer { 
                margin-top: 50px; 
                text-align: center; 
                font-size: 12px; 
                color: #666;
                border-top: 1px solid #ddd;
                padding-top: 20px;
              }
              @media print {
                body { margin: 1cm; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Termos de Uso</h1>
              <p>Documento impresso em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
            </div>
            
            <div class="content">
              <section>
                <h2>1. Aceitação dos Termos</h2>
                <p>Ao acessar e utilizar nossa plataforma, você concorda integralmente com estes Termos de Uso. Estes termos regulam o uso dos nossos serviços e estabelecem os direitos e responsabilidades de todas as partes envolvidas.</p>
              </section>

              <section>
                <h2>2. Definições e Interpretação</h2>
                <h3>Plataforma</h3>
                <p>Refere-se ao website, aplicativos e todos os serviços oferecidos pela nossa empresa.</p>
                <h3>Usuário</h3>
                <p>Qualquer pessoa que acesse ou utilize nossa plataforma, registrada ou não.</p>
              </section>

              <section>
                <h2>3. Direitos e Responsabilidades</h2>
                <h3>Direitos do Usuário</h3>
                <ul>
                  <li>Acesso aos serviços de acordo com estes termos</li>
                  <li>Suporte técnico dentro dos limites estabelecidos</li>
                  <li>Respeito à privacidade e proteção de dados</li>
                </ul>
                
                <h3>Responsabilidades do Usuário</h3>
                <ul>
                  <li>Fornecer informações verídicas e atualizadas</li>
                  <li>Não praticar atividades ilegais ou fraudulentas</li>
                  <li>Respeitar os direitos de propriedade intelectual</li>
                  <li>Manter a confidencialidade de sua conta</li>
                </ul>
              </section>

              </div>
            
            <div class="footer">
              <p>Documento impresso através do site - Válido conforme versão online</p>
              <p>Página 1 de 1</p>
            </div>

            <script>
              window.onload = function() {
                window.print();
                setTimeout(() => {
                  window.close();
                }, 500);
              }
            </script>
          </body>
        </html>
      `);

            printWindow.document.close();
        }
    };

    return (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center p-4 z-50">
            <div ref={contentRef} className="bg-white p-6 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border-2 border-orange-100">

                {/* Header com gradiente laranja */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg -m-6 mb-6 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-2">Termos de Uso</h1>
                            <p className="text-orange-100 text-sm">Versão vigente: {new Date().toLocaleDateString('pt-BR')}</p>
                        </div>
                        <button
                            className="text-white hover:text-orange-200 text-2xl font-bold transition-all duration-200 hover:scale-110 w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-700"
                            onClick={onClose}
                            aria-label="Fechar modal de termos de uso"
                            title="Fechar"
                        >
                            &times;
                        </button>
                    </div>
                </div>

                {/* Conteúdo do modal */}
                <div className="text-gray-800 space-y-6">
                    {/* Seção de Introdução */}
                    <section className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                        <h2 className="text-lg font-semibold text-orange-800 mb-2">Aceitação dos Termos</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Ao acessar e utilizar nossa plataforma, você concorda integralmente com estes Termos de Uso.
                            Estes termos regulam o uso dos nossos serviços e estabelecem os direitos e responsabilidades de todas as partes envolvidas.
                        </p>
                        <p className="text-gray-700 leading-relaxed mt-2">
                            Recomendamos que você leia atentamente todas as cláusulas antes de utilizar nossos serviços.
                            Caso não concorde com qualquer disposição deste documento, solicitamos que não utilize nossa plataforma.
                        </p>
                    </section>

                    {/* Seção de Definições */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-orange-700 border-b border-orange-200 pb-2">
                            1. Definições e Âmbito de Aplicação
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white border border-orange-200 rounded-lg p-4">
                                <h3 className="font-semibold text-orange-600 mb-2 flex items-center">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                    Plataforma
                                </h3>
                                <p className="text-sm text-gray-700">
                                    Compreende o website, aplicativos móveis, APIs, serviços web e quaisquer outros canais
                                    de interação disponibilizados pela nossa empresa.
                                </p>
                            </div>

                            <div className="bg-white border border-orange-200 rounded-lg p-4">
                                <h3 className="font-semibold text-orange-600 mb-2 flex items-center">
                                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                                    Usuário
                                </h3>
                                <p className="text-sm text-gray-700">
                                    Pessoa física ou jurídica que acessa, navega ou utiliza de qualquer forma os serviços
                                    oferecidos através da nossa plataforma.
                                </p>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-blue-700 mb-2">Âmbito Territorial</h3>
                            <p className="text-sm text-blue-800">
                                Estes termos são regidos pelas leis da República Federativa do Brasil e aplicam-se a todos
                                os usuários, independentemente de sua localização geográfica.
                            </p>
                        </div>
                    </section>

                    {/* Seção de Cadastro e Conta */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-orange-700 border-b border-orange-200 pb-2">
                            2. Cadastro e Gestão de Conta
                        </h2>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <h3 className="font-semibold text-green-700 mb-3">Requisitos para Cadastro</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span><strong>Capacidade legal:</strong> Maioridade civil (18 anos) ou representação legal</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span><strong>Informações verídicas:</strong> Dados completos e atualizados</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-600 mr-2">✓</span>
                                    <span><strong>E-mail válido:</strong> Para confirmação e comunicação</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <h3 className="font-semibold text-yellow-700 mb-3">Responsabilidades do Usuário</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-yellow-600 mr-2">•</span>
                                    <span>Manter a confidencialidade de login e senha</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-600 mr-2">•</span>
                                    <span>Notificar imediatamente em caso de uso não autorizado</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-yellow-600 mr-2">•</span>
                                    <span>Atualizar dados cadastrais quando necessário</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Seção de Condutas Proibidas */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-orange-700 border-b border-orange-200 pb-2">
                            3. Condutas Expressamente Proibidas
                        </h2>

                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                            <h3 className="font-semibold text-red-700 mb-3">Atividades Vedadas</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚫</span>
                                        Violação de direitos autorais
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚫</span>
                                        Prática de spam ou phishing
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚫</span>
                                        Distribuição de malware
                                    </li>
                                </ul>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚫</span>
                                        Conteúdo discriminatório
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚫</span>
                                        Fraude ou falsidade ideológica
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-red-500 mr-2">🚫</span>
                                        Ataques à infraestrutura
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-purple-700 mb-2">Consequências</h3>
                            <p className="text-sm text-purple-800">
                                A violação destas condições poderá resultar em suspensão imediata da conta,
                                sem prejuízo de medidas legais cabíveis, incluindo indenizações por danos materiais e morais.
                            </p>
                        </div>
                    </section>

                    {/* Seção de Propriedade Intelectual */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-orange-700 border-b border-orange-200 pb-2">
                            4. Propriedade Intelectual e Licenças
                        </h2>

                        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                            <h3 className="font-semibold text-indigo-700 mb-3">Direitos Autorais</h3>
                            <p className="text-sm text-indigo-800 mb-3">
                                Todo o conteúdo, incluindo textos, imagens, logos, software e demais elementos
                                da plataforma são protegidos pela Lei de Direitos Autorais (Lei 9.610/98) e
                                legislação internacional correlata.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 text-xs">
                                <div>
                                    <h4 className="font-semibold text-indigo-600 mb-1">Licença Concedida</h4>
                                    <ul className="text-indigo-700 space-y-1">
                                        <li>• Uso pessoal e não comercial</li>
                                        <li>• Acesso aos serviços contratados</li>
                                        <li>• Download para uso próprio</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-indigo-600 mb-1">Restrições</h4>
                                    <ul className="text-indigo-700 space-y-1">
                                        <li>• Reprodução sem autorização</li>
                                        <li>• Modificação ou engenharia reversa</li>
                                        <li>• Uso comercial não autorizado</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Seção de Limitação de Responsabilidade */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-orange-700 border-b border-orange-200 pb-2">
                            5. Limitação de Responsabilidade
                        </h2>

                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-3">Força Maior e Caso Fortuito</h3>
                            <p className="text-sm text-gray-700 mb-3">
                                Não nos responsabilizamos por interrupções decorrentes de eventos fora de nosso
                                controle razoável, incluindo falhas de energia, conexão à internet, ataques
                                cibernéticos ou eventos naturais.
                            </p>

                            <div className="bg-white p-3 rounded border">
                                <h4 className="font-semibold text-gray-600 mb-2">Exclusões Expressas</h4>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• Danos indiretos e lucros cessantes</li>
                                    <li>• Conteúdo gerado por terceiros</li>
                                    <li>• Uso indevido pelo usuário</li>
                                    <li>• Ações de autoridades governamentais</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Seção de Privacidade e Dados */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-orange-700 border-b border-orange-200 pb-2">
                            6. Privacidade e Proteção de Dados
                        </h2>

                        <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                            <h3 className="font-semibold text-teal-700 mb-3">Conformidade com a LGPD</h3>
                            <p className="text-sm text-teal-800 mb-3">
                                O tratamento de dados pessoais segue as diretrizes da Lei Geral de Proteção de Dados
                                (Lei 13.709/18), garantindo transparência, segurança e respeito à privacidade dos usuários.
                            </p>

                            <div className="grid md:grid-cols-2 gap-4 text-xs">
                                <div>
                                    <h4 className="font-semibold text-teal-600 mb-1">Direitos do Titular</h4>
                                    <ul className="text-teal-700 space-y-1">
                                        <li>• Acesso e confirmação</li>
                                        <li>• Correção e atualização</li>
                                        <li>• Anonimização ou eliminação</li>
                                        <li>• Portabilidade de dados</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-teal-600 mb-1">Bases Legais</h4>
                                    <ul className="text-teal-700 space-y-1">
                                        <li>• Consentimento expresso</li>
                                        <li>• Cumprimento de obrigação legal</li>
                                        <li>• Execução de contrato</li>
                                        <li>• Interesse legítimo</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Seção de Disposições Finais */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold text-orange-700 border-b border-orange-200 pb-2">
                            7. Disposições Finais
                        </h2>

                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <h3 className="font-semibold text-orange-700 mb-3">Alterações Contratuais</h3>
                            <p className="text-sm text-orange-800 mb-3">
                                Reservamo-nos o direito de modificar estes Termos a qualquer momento,
                                comunicando as alterações através dos canais oficiais com antecedência mínima de 30 dias.
                            </p>

                            <div className="grid md:grid-cols-3 gap-3 text-xs">
                                <div className="text-center">
                                    <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">
                                        <span className="text-orange-600 font-bold">1</span>
                                    </div>
                                    <p className="text-orange-700">Comunicação prévia</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">
                                        <span className="text-orange-600 font-bold">2</span>
                                    </div>
                                    <p className="text-orange-700">Aceitação tácita</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">
                                        <span className="text-orange-600 font-bold">3</span>
                                    </div>
                                    <p className="text-orange-700">Vigência imediata</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-gray-700 mb-2">Foro Eleito</h3>
                            <p className="text-sm text-gray-700">
                                Fica eleito o foro da comarca onde está situada a sede da empresa para dirimir
                                quaisquer questões decorrentes destes Termos, com renúncia expressa a qualquer outro.
                            </p>
                        </div>
                    </section>

                    {/* Aviso Final */}
                    <section className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-4 text-white">
                        <h2 className="text-lg font-bold mb-2">⚠️ Aviso Importante</h2>
                        <p className="text-sm opacity-90">
                            Estes Termos de Uso constituem instrumento contratual vinculante. Recomendamos que
                            você conserve este documento impresso ou salvo em local seguro para futura referência.
                            Em caso de dúvidas, consulte nosso suporte jurídico antes da aceitação.
                        </p>
                    </section>
                </div>

                {/* MOVIDO PARA CÁ: Footer com botões de ação */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 mt-6 border-t border-orange-100 gap-4">
                    <div className="text-xs text-gray-500">
                        <p>Documento juridicamente válido - Conservar para referência futura</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrint}
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Imprimir Termos
                        </button>

                        <button
                            onClick={onClose}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
                        >
                            Concordo com os Termos
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalTermosDeUso;