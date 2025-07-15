import { motion } from "framer-motion";
import { Search, CreditCard, Truck } from "lucide-react";

/** Purpose: How it works section with 3 simple steps */
export function HowItWorks() {
  const openWhatsApp = () => {
    const phone = "+5511957937762";
    const message = "Olá! Gostaria de saber mais sobre os produtos da SoluSix.";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const scrollToProducts = () => {
    const productsSection = document.getElementById("produtos");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const steps = [
    {
      icon: Search,
      title: "Escolher",
      description:
        "Navegue pelo catálogo curado e selecione os produtos que precisa para seu negócio",
    },
    {
      icon: CreditCard,
      title: "Pagar",
      description: "Escolha seu canal preferido: WhatsApp, Mercado Livre ou Shopee. Pagamento facilitado no método que preferir",
    },
    {
      icon: Truck,
      title: "Receber",
      description:
        "Receba conforme o canal escolhido: entrega expressa, retirada ou agendamento personalizado",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Como funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Processo simples e rápido para você focar no que realmente importa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-lime text-navy rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-20 h-20 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                <step.icon className="w-10 h-10 text-lime" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-navy mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-lime/30"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-lime/10 to-cyan-400/10 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-navy mb-4">
              Pronto para começar?
            </h3>
            <p className="text-gray-600 mb-6">
              Entre em contato conosco e descubra como podemos ajudar seu
              negócio
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={openWhatsApp}
                className="bg-lime text-navy px-8 py-3 rounded-lg font-semibold hover:bg-lime/90 transition-colors"
              >
                Falar conosco
              </button>
              <button 
                onClick={scrollToProducts}
                className="border-2 border-lime text-lime px-8 py-3 rounded-lg font-semibold hover:bg-lime hover:text-navy transition-colors"
              >
                Ver produtos
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
