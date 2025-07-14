import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

/** Purpose: Footer component with complete company information and links */
export function Footer() {
  const handleWhatsAppClick = () => {
    openWhatsApp("Olá! Gostaria de saber mais sobre a SoluSix.");
  };

  return (
    <footer className="bg-navy text-white">
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
                  +55 11 95793-7762
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
      </div>
    </footer>
  );
}
