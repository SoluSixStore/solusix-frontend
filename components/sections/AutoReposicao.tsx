import { motion } from "framer-motion";
import { RefreshCw, TrendingDown } from "lucide-react";
import { useState, useEffect } from "react";

/** Purpose: AutoReposicao banner with savings counter and parallax effect */
export function AutoReposicao() {
  const [savings, setSavings] = useState(0);

  // Animate savings counter
  useEffect(() => {
    const targetSavings = 4.99;
    const duration = 2000;
    const steps = 60;
    const increment = targetSavings / steps;
    const interval = duration / steps;

    let currentSavings = 0;
    const timer = setInterval(() => {
      currentSavings += increment;
      if (currentSavings >= targetSavings) {
        currentSavings = targetSavings;
        clearInterval(timer);
      }
      setSavings(Math.round(currentSavings * 100) / 100);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contato');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-lime rounded-full blur-3xl animate-float"></div>
          <div
            className="absolute bottom-20 right-20 w-40 h-40 bg-lime rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-lime rounded-full blur-2xl animate-float"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center text-navy"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="font-semibold">Programa AutoReposição</span>
          </motion.div>

          {/* Main Content */}
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Economia automática de <span className="text-lime inline-block w-24 text-center">{savings}%</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-8 leading-relaxed">
            Cadastre-se no programa AutoReposição e receba automaticamente seus
            produtos favoritos com desconto exclusivo
          </p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <motion.div 
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-300 shadow-xl cursor-pointer"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              <TrendingDown className="w-8 h-8 text-lime mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-navy">Desconto Garantido</h3>
              <p className="text-gray-700 text-sm">
                Economia de 4.99% em todos os pedidos automáticos
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-300 shadow-xl cursor-pointer"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              <RefreshCw className="w-8 h-8 text-lime mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-navy">
                Reposição Inteligente
              </h3>
              <p className="text-gray-700 text-sm">
                Receba produtos antes de acabar o estoque
              </p>
            </motion.div>

            <motion.div 
              className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-300 shadow-xl cursor-pointer"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
            >
              <div className="w-8 h-8 text-lime mx-auto mb-4 text-center text-2xl">
                🚚
              </div>
              <h3 className="text-lg font-semibold mb-2 text-navy">Frete Grátis</h3>
              <p className="text-gray-700 text-sm">
                Entrega gratuita em todos os pedidos do programa
              </p>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.button 
              onClick={scrollToContact}
              className="bg-lime text-navy px-8 py-4 rounded-lg font-semibold text-lg"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#0d9488"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25 
              }}
            >
              Cadastrar no Programa
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
