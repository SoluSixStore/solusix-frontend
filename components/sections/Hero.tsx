import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Truck, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { openWhatsApp, saveCoupon, trackEvent } from "@/lib/utils";

/** Purpose: Hero section with main value proposition and CTA */
export function Hero() {
  const handleCTAClick = () => {
    saveCoupon("FRETEGRATIS");
    trackEvent("hero_cta_click", { location: "hero" });
    openWhatsApp("Olá! Quero meu frete grátis no primeiro pedido!");
  };

  const handleWhatsAppHelp = () => {
    trackEvent("whatsapp_help_click", { location: "hero" });
    openWhatsApp("Olá! Precisa de ajuda? Estamos online.");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-bg overflow-hidden">
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
            Receba detergente e secante premium em 48h e acesse nosso catálogo
            em expansão.
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

            <Button
              onClick={handleWhatsAppHelp}
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar conosco
            </Button>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="text-gray-400 text-sm md:text-base"
          >
            <p className="font-semibold text-lime">
              Do inox ao detergente: clicou, chegou.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={handleWhatsAppHelp}
        className="fixed bottom-6 right-6 z-50 bg-lime text-navy p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </section>
  );
}
