import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Truck, MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { openWhatsApp, saveCoupon, trackEvent } from "@/lib/utils";
import { useState, useEffect } from "react";

/** Purpose: Hero section with main value proposition and CTA */
export function Hero() {
  const handleCTAClick = () => {
    saveCoupon("FRETEGRATIS");
    trackEvent("hero_cta_click", { location: "hero" });
    openWhatsApp("Olá! Quero meu frete grátis no primeiro pedido!");
  };

  const handleWhatsAppHelp = () => {
    trackEvent("whatsapp_help_click", { location: "hero" });
    openWhatsApp("Olá! Gostaria de saber mais sobre os produtos SoluSix.");
  };

  const [showBubble, setShowBubble] = useState(true);

  const handleCloseBubble = () => {
    setShowBubble(false);
    sessionStorage.setItem("hideWhatsappBubble", "1");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if bubble was manually closed in this session
      if (sessionStorage.getItem("hideWhatsappBubble")) {
        setShowBubble(false);
        return;
      }

      // Set up auto-hide timer
      const timer = setTimeout(() => {
        setShowBubble(false);
        sessionStorage.setItem("hideWhatsappBubble", "1");
      }, 30000); // 30 seconds

      // Clear session storage on page refresh/reload
      const handleBeforeUnload = () => {
        sessionStorage.removeItem("hideWhatsappBubble");
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-lime rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-40 h-40 bg-lime rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-24 h-24 bg-lime rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Badge variant="new" className="text-sm px-4 py-2">
              <Truck className="w-4 h-4 mr-2" />
              Frete grátis 1.º pedido
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Suprimentos profissionais{" "}
            <span className="gradient-text">sem complicação.</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Não perca tempo com 5 fornecedores. Use 1 que entrega tudo.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={handleCTAClick}
              variant="primary"
              size="lg"
              className="text-lg px-8 py-4"
            >
              Quero meu frete grátis
            </Button>
            {/* Botão 'Falar conosco' removido */}
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-gray-400 text-sm md:text-base"
          >
            <p className="font-semibold text-lime">
              Do essencial ao inesperado.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating WhatsApp Button + Speech Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="fixed bottom-6 right-6 z-50 flex items-end gap-2"
      >
        {/* Speech Bubble */}
        {showBubble && (
          <div className="relative max-w-xs md:max-w-sm bg-white text-gray-800 rounded-2xl px-4 py-3 shadow-lg text-sm md:text-base leading-snug flex flex-col items-start"
               style={{
                 boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
               }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseBubble}
              className="absolute -top-2 -right-2 bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 rounded-full p-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Fechar balão"
            >
              <X className="w-4 h-4" />
            </button>
            
            <span className="font-semibold text-green-600 flex items-center gap-1 mb-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
              Online agora
            </span>
            <span>Olá! 👋</span>
            <span className="font-bold">Estamos online para te ajudar!</span>
            <span>Mande sua dúvida ou mensagem, respondemos rapidinho no WhatsApp.</span>
            {/* Bubble Arrow */}
            <span className="absolute right-[-10px] bottom-3 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></span>
          </div>
        )}
        {/* WhatsApp Icon Button */}
        <button
          onClick={handleWhatsAppHelp}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 animate-strong-pulse"
          aria-label="Fale conosco no WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.393L4 29l7.828-2.205C13.416 27.37 14.686 27.6 16 27.6c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22.6c-1.18 0-2.34-.17-3.44-.5l-.24-.07-4.65 1.31 1.24-4.47-.16-.23C6.6 19.1 5.6 17.12 5.6 15c0-5.73 4.67-10.4 10.4-10.4S26.4 9.27 26.4 15 21.73 25.6 16 25.6zm5.07-7.13c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.98 2.66 1.12 2.85c.14.18 1.93 2.95 4.68 4.02.65.28 1.16.45 1.56.58.65.21 1.24.18 1.7.11.52-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/>
          </svg>
        </button>
      </motion.div>
    </section>
  );
}
