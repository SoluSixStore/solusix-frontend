import { motion } from "framer-motion";
import { Sparkles, Truck, DollarSign, Headphones } from "lucide-react";

/** Purpose: Benefits section highlighting key value propositions */
export function Benefits() {
  const benefits = [
    {
      icon: Sparkles,
      title: "Variedade curada",
      description: "Produtos selecionados tecnicamente para máxima eficiência",
    },
    {
      icon: Truck,
      title: "Entrega expressa",
      description: "48h nas capitais, 72h no resto do Brasil",
    },
    {
      icon: DollarSign,
      title: "Preço justo",
      description: "Melhor custo-benefício do mercado",
    },
    {
      icon: Headphones,
      title: "Suporte humano",
      description: "Atendimento personalizado via WhatsApp",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Por que escolher a SoluSix?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simplificamos a compra de suprimentos profissionais com qualidade e
            agilidade
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                <div className="w-16 h-16 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-lime/20 transition-colors">
                  <benefit.icon className="w-8 h-8 text-lime" />
                </div>
                <h3 className="text-xl font-semibold text-navy mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
