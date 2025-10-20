import React from 'react';

// Interface para definir os tipos das props
interface ModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

const ModalGeral = ({ title, content, onClose }: ModalProps) => {
  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border-2 border-orange-100">
        {/* Header com gradiente laranja */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg -m-6 mb-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
              <p className="text-orange-100 text-sm">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
            </div>
            <button
              className="text-white hover:text-orange-200 text-2xl font-bold transition-all duration-200 hover:scale-110 w-10 h-10 flex items-center justify-center rounded-full hover:bg-orange-700"
              onClick={onClose}
              aria-label="Fechar modal"
              title="Fechar"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Conteúdo expandido e otimizado para SEO */}
        <div className="text-gray-800 space-y-6">
          {/* Seção de introdução */}
          <section className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
            <h2 className="text-lg font-semibold text-orange-800 mb-2">Importância da Privacidade</h2>
            <p className="text-gray-700 leading-relaxed">
              Na nossa empresa, a transparência e a segurança dos dados são pilares fundamentais. 
              Esta política detalha como coletamos, utilizamos e protegemos suas informações, 
              garantindo conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </section>

          {/* Conteúdo principal */}
          <article className="prose prose-lg max-w-none">
            {content}
          </article>

          {/* Seções adicionais */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-orange-700 border-b border-orange-200 pb-2">
              Coleta e Uso de Dados
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-600 mb-2">✓ Dados Pessoais</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Nome e informações de contato</li>
                  <li>• Endereço de e-mail</li>
                  <li>• Dados de navegação</li>
                  <li>• Preferências de uso</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-600 mb-2">✓ Finalidades</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Melhoria de serviços</li>
                  <li>• Comunicação personalizada</li>
                  <li>• Análise estatística</li>
                  <li>• Conformidade legal</li>
                </ul>
              </div>
            </div>
          </section>

          

          {/* Seção de Direitos */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-orange-700 border-b border-orange-200 pb-2">
              Seus Direitos
            </h2>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">▶</span>
                  Acesso aos dados pessoais armazenados
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">▶</span>
                  Correção de informações inexatas
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">▶</span>
                  Exclusão de dados (direito ao esquecimento)
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">▶</span>
                  Portabilidade de dados para outros serviços
                </li>
              </ul>
            </div>
          </section>

          {/* Contato e Suporte */}
          <section className="bg-gray-100 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Dúvidas e Suporte</h2>
            <p className="text-sm text-gray-700 mb-3">
              Para questões sobre privacidade ou exercício de seus direitos, entre em contato:
            </p>
            <div className="text-xs text-gray-600 space-y-1">
              <p>📧 Email: privacidade@empresa.com</p>
              <p>📞 Telefone: (11) 9999-9999</p>
              <p>⏰ Horário: Segunda a Sexta, 9h às 18h</p>
            </div>
          </section>
        </div>

        {/* Footer com botões de ação */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 mt-6 border-t border-orange-100 gap-4">
          <div className="text-xs text-gray-500">
            <p>Política revisada e atualizada regularmente</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ModalGeral;