import { Button } from "@/components/ui/Button";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { openWhatsApp } from "@/lib/utils";

/** Purpose: Header component with navigation and contact options */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWhatsAppClick = () => {
    openWhatsApp("Olá! Gostaria de saber mais sobre os produtos SoluSix.");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-navy">SoluSix</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#produtos"
              className="text-gray-700 hover:text-lime transition-colors"
            >
              Produtos
            </a>
            <a
              href="#sobre"
              className="text-gray-700 hover:text-lime transition-colors"
            >
              Sobre
            </a>
            <a
              href="#contato"
              className="text-gray-700 hover:text-lime transition-colors"
            >
              Contato
            </a>
            <Button
              onClick={handleWhatsAppClick}
              variant="primary"
              size="sm"
              className="flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              WhatsApp
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#produtos"
                className="block px-3 py-2 text-gray-700 hover:text-lime transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Produtos
              </a>
              <a
                href="#sobre"
                className="block px-3 py-2 text-gray-700 hover:text-lime transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </a>
              <a
                href="#contato"
                className="block px-3 py-2 text-gray-700 hover:text-lime transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
              <Button
                onClick={handleWhatsAppClick}
                variant="primary"
                size="sm"
                className="w-full mt-2 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
