"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function PoliticaFreteModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
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
              <h1 className="text-xl font-bold text-lime">Política de Frete</h1>
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
                <h2 className="text-lg font-semibold mb-4 text-lime">1. Prazo de Entrega</h2>
                <p className="mb-6">
                  O prazo de entrega é informado no momento da compra e pode variar conforme a região e modalidade de frete escolhida.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">2. Modalidades de Frete</h2>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li>Entrega Expressa</li>
                  <li>Entrega Convencional</li>
                  <li>Retirada no local</li>
                </ul>
                <h2 className="text-lg font-semibold mb-4 text-lime">3. Valor do Frete</h2>
                <p className="mb-6">
                  O valor do frete é calculado automaticamente no checkout, de acordo com o endereço de entrega e o peso/volume dos produtos.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">4. Acompanhamento</h2>
                <p className="mb-6">
                  Após o envio, você receberá um código de rastreamento para acompanhar sua entrega.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">5. Problemas com a Entrega</h2>
                <p className="mb-6">
                  Caso haja qualquer problema com a entrega, entre em contato imediatamente para que possamos resolver o mais rápido possível.
                </p>
                <h2 className="text-lg font-semibold mb-4 text-lime">6. Contato</h2>
                <p className="mb-4">
                  Para dúvidas sobre frete, entre em contato:
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