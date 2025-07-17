"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function PoliticaPrivacidadeModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-navy text-white rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden border border-gray-700"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-900/50">
              <h1 className="text-xl font-bold text-lime">Política de Privacidade</h1>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-300 hover:text-white"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
              <div className="prose prose-invert max-w-none">
                <p className="text-sm text-gray-300 mb-6">
                  <strong>Última atualização:</strong> Janeiro de 2025
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">1. Informações que Coletamos</h2>
                <p className="mb-4">
                  Coletamos informações que você nos fornece diretamente, como quando:
                </p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Preenche formulários em nosso site</li>
                  <li>Entra em contato conosco por telefone, email ou WhatsApp</li>
                  <li>Faz pedidos ou solicita orçamentos</li>
                  <li>Se inscreve em nossa newsletter</li>
                </ul>
                <h2 className="text-lg font-semibold mb-4 text-lime">2. Como Usamos Suas Informações</h2>
                <p className="mb-4 text-gray-300">Utilizamos suas informações para:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Processar e entregar seus pedidos</li>
                  <li>Responder suas dúvidas e solicitações</li>
                  <li>Enviar informações sobre produtos e promoções</li>
                  <li>Melhorar nossos serviços e experiência do cliente</li>
                  <li>Cumprir obrigações legais</li>
                </ul>
                <h2 className="text-lg font-semibold mb-4 text-lime">3. Compartilhamento de Informações</h2>
                <p className="mb-6">
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
                  exceto quando necessário para processar pedidos (empresas de entrega) ou quando 
                  exigido por lei.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">4. Segurança dos Dados</h2>
                <p className="mb-6">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger 
                  suas informações pessoais contra acesso não autorizado, alteração, divulgação 
                  ou destruição.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">5. Seus Direitos</h2>
                <p className="mb-4 text-gray-300">Você tem o direito de:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Acessar suas informações pessoais</li>
                  <li>Corrigir informações incorretas</li>
                  <li>Solicitar a exclusão de seus dados</li>
                  <li>Revogar consentimento para marketing</li>
                  <li>Portabilidade dos dados</li>
                </ul>
                <h2 className="text-lg font-semibold mb-4 text-lime">6. Cookies e Tecnologias Similares</h2>
                <p className="mb-6">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência 
                  em nosso site, analisar o tráfego e personalizar conteúdo. Você pode 
                  controlar o uso de cookies através das configurações do seu navegador.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">7. Retenção de Dados</h2>
                <p className="mb-6">
                  Mantemos suas informações pessoais apenas pelo tempo necessário para 
                  cumprir os propósitos descritos nesta política, a menos que a retenção 
                  seja necessária para cumprir obrigações legais.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">8. Alterações na Política</h2>
                <p className="mb-6">
                  Podemos atualizar esta política periodicamente. Notificaremos sobre 
                  mudanças significativas através de nosso site ou por email.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">9. Contato</h2>
                <p className="mb-4">
                  Para dúvidas sobre esta política ou exercer seus direitos, entre em contato:
                </p>
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
                  <p className="mb-2 text-gray-300"><strong className="text-lime">Email:</strong> contato@solusix.com.br</p>
                  <p className="mb-2 text-gray-300"><strong className="text-lime">Telefone:</strong> (11) 95793-7762</p>
                  <p className="text-gray-300"><strong className="text-lime">Endereço:</strong> São Paulo, SP - Brasil</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 