import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUp,
} from "lucide-react";
import { openWhatsApp } from "@/lib/utils";

/** Purpose: Footer component with complete company information and links */
export function Footer({ onOpenPoliticaPrivacidade, onOpenTermosUso, onOpenPoliticaFrete, onOpenTrocasDevolucoes }: { onOpenPoliticaPrivacidade?: () => void, onOpenTermosUso?: () => void, onOpenPoliticaFrete?: () => void, onOpenTrocasDevolucoes?: () => void }) {
  const handleWhatsAppClick = () => {
    openWhatsApp("Olá! Gostaria de saber mais sobre a SoluSix.");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-navy text-white relative">
      {/* Back to Top Button - Left Side */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-8 left-8 w-11 h-11 bg-gray-800/80 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center z-10 hover:bg-gray-700"
        title="Voltar ao topo"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

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
                <button
                  onClick={() => openWhatsApp("Olá! Gostaria de saber mais sobre a SoluSix.", "+5511957937762")}
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  (11) 95793-7762
                </button>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-lime" />
                <button
                  onClick={() => openWhatsApp("Olá! Gostaria de saber mais sobre a SoluSix.", "+5511948286208")}
                  className="text-gray-300 hover:text-lime transition-colors"
                >
                  (11) 94828-6208
                </button>
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
                {onOpenPoliticaPrivacidade ? (
                  <button
                    type="button"
                    onClick={onOpenPoliticaPrivacidade}
                    className="text-gray-300 hover:text-lime transition-colors text-left w-full"
                  >
                    Política de Privacidade
                  </button>
                ) : (
                  <a
                    href="/politica-privacidade"
                    className="text-gray-300 hover:text-lime transition-colors"
                  >
                    Política de Privacidade
                  </a>
                )}
              </li>
              <li>
                {onOpenTermosUso ? (
                  <button
                    type="button"
                    onClick={onOpenTermosUso}
                    className="text-gray-300 hover:text-lime transition-colors text-left w-full"
                  >
                    Termos de Uso
                  </button>
                ) : (
                  <a
                    href="/termos-uso"
                    className="text-gray-300 hover:text-lime transition-colors"
                  >
                    Termos de Uso
                  </a>
                )}
              </li>
              <li>
                {onOpenPoliticaFrete ? (
                  <button
                    type="button"
                    onClick={onOpenPoliticaFrete}
                    className="text-gray-300 hover:text-lime transition-colors text-left w-full"
                  >
                    Política de Frete
                  </button>
                ) : (
                  <a
                    href="/politica-frete"
                    className="text-gray-300 hover:text-lime transition-colors"
                  >
                    Política de Frete
                  </a>
                )}
              </li>
              <li>
                {onOpenTrocasDevolucoes ? (
                  <button
                    type="button"
                    onClick={onOpenTrocasDevolucoes}
                    className="text-gray-300 hover:text-lime transition-colors text-left w-full"
                  >
                    Trocas e Devoluções
                  </button>
                ) : (
                  <a
                    href="/trocas-devolucoes"
                    className="text-gray-300 hover:text-lime transition-colors"
                  >
                    Trocas e Devoluções
                  </a>
                )}
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
