"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function TermosUsoModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
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
              <h1 className="text-xl font-bold text-lime">Termos de Uso</h1>
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
                <h2 className="text-lg font-semibold mb-4 text-lime">1. Aceitação dos Termos</h2>
                <p className="mb-6">
                  Ao acessar e utilizar este site, você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deve utilizar nossos serviços.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">2. Uso do Site</h2>
                <p className="mb-4 text-gray-300">Você concorda em utilizar o site apenas para:</p>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Fins legais e legítimos</li>
                  <li>Navegação e compra de produtos</li>
                  <li>Contato com nossa equipe</li>
                  <li>Consulta de informações sobre produtos</li>
                </ul>
                <h2 className="text-lg font-semibold mb-4 text-lime">3. Pedidos e Pagamentos</h2>
                <p className="mb-6">
                  Todos os pedidos estão sujeitos à disponibilidade e aprovação. Reservamo-nos o direito de recusar qualquer pedido. Os preços podem ser alterados sem aviso prévio.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">4. Entrega</h2>
                <p className="mb-6">
                  As entregas são realizadas conforme disponibilidade e região. Prazos de entrega são estimativas e podem variar. Não nos responsabilizamos por atrasos causados por terceiros.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">5. Propriedade Intelectual</h2>
                <p className="mb-6">
                  Todo o conteúdo deste site, incluindo textos, imagens, logotipos e design, é propriedade da SoluSix e está protegido por direitos autorais.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">6. Limitação de Responsabilidade</h2>
                <p className="mb-6">
                  A SoluSix não se responsabiliza por danos indiretos, incidentais ou consequenciais decorrentes do uso de nossos produtos ou serviços.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">7. Modificações</h2>
                <p className="mb-6">
                  Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação no site.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">8. Lei Aplicável</h2>
                <p className="mb-6">
                  Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da comarca de São Paulo, SP.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">9. Contato</h2>
                <p className="mb-4">
                  Para dúvidas sobre estes termos, entre em contato:
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