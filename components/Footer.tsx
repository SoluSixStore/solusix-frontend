import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Clock,
  ArrowUp,
} from "lucide-react";
import { openWhatsApp } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

/** Purpose: Footer component with complete company information and links */
export function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleWhatsAppClick = () => {
    openWhatsApp("Olá! Gostaria de saber mais sobre a SoluSix.");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show/hide back to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button when user has scrolled more than 50% of the page
      const shouldShow = scrollY > (documentHeight - windowHeight) * 0.5;
      setShowBackToTop(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="bg-navy text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">SoluSix</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Suprimentos profissionais sem complicação. Do inox ao detergente:
              clicou, chegou.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-lime" />
                <a
                  href="https://wa.me/5511957937762"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  (11) 95793-7762
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-lime" />
                <a
                  href="https://wa.me/5511948286208"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  (11) 94828-6208
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-lime" />
                <a
                  href="mailto:contato@solusix.com.br"
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  contato@solusix.com.br
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-lime" />
                <span className="text-gray-300">São Paulo, SP - Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-lime" />
                <span className="text-gray-300">Atendimento: Segunda a Sexta, 08:00 às 18:00</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#produtos"
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  Produtos
                </a>
              </li>
              <li>
                <a
                  href="#sobre"
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  Sobre Nós
                </a>
              </li>
              <li>
                <a
                  href="#contato"
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  Contato
                </a>
              </li>
              <li>
                <button
                  onClick={handleWhatsAppClick}
                  className="text-gray-300 hover:text-lime transition-colors text-left"
                >
                  WhatsApp
                </button>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Políticas</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/politica-privacidade"
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
              <li>
                <a
                  href="/termos-uso"
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="/politica-frete"
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  Política de Frete
                </a>
              </li>
              <li>
                <a
                  href="/trocas-devolucoes"
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  Trocas e Devoluções
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 SoluSix. Todos os direitos reservados.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/solusix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-lime transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/solusix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-lime transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/solusix"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-lime transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Analytics Script Placeholder */}
          <div className="mt-4 text-xs text-gray-500">
            {/* TODO: Add Google Analytics ID */}
            <div className="hidden">Google Analytics: GA_ID_PLACEHOLDER</div>
          </div>
        </div>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              onClick={scrollToTop}
              className="absolute bottom-8 right-8 w-11 h-11 bg-gray-800/80 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center z-10"
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </footer>
  );
}
