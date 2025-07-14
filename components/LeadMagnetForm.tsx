import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, BookOpen, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Purpose: Lead magnet form with exit-intent popup for e-book download */
interface LeadMagnetFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadMagnetForm({ isOpen, onClose }: LeadMagnetFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSuccess(true);
    setIsSubmitting(false);

    // Close after 3 seconds
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setEmail("");
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {!isSuccess ? (
              <>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-lime" />
                  </div>
                  <h2 className="text-2xl font-bold text-navy mb-2">
                    E-book Gratuito
                  </h2>
                  <p className="text-gray-600">
                    "Checklist de Economia & Limpeza"
                  </p>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-navy mb-3">
                    Descubra como economizar até 40% em suprimentos
                  </h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-lime rounded-full"></div>
                      Dicas práticas de economia
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-lime rounded-full"></div>
                      Checklist de produtos essenciais
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-lime rounded-full"></div>
                      Guia de escolha de fornecedores
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-lime rounded-full"></div>
                      Planilha de controle de estoque
                    </li>
                  </ul>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seu e-mail
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime focus:border-transparent"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        Baixar E-book Gratuito
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Não enviaremos spam. Você pode cancelar a inscrição a
                    qualquer momento.
                  </p>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-navy mb-2">
                  E-book enviado!
                </h2>
                <p className="text-gray-600">
                  Verifique sua caixa de entrada e pasta de spam.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
