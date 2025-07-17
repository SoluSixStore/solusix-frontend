import { motion } from "framer-motion";
import { Package, Shield, RefreshCw, Users, Truck, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/** Purpose: Benefits section highlighting key value propositions */
export function Benefits() {
  const benefits = [
    {
      icon: Package,
      title: "Tudo num só lugar",
      description: "Evite lidar com vários fornecedores. Aqui, você encontra itens de limpeza, utensílios e peças industriais em um só clique.",
    },
    {
      icon: Shield,
      title: "Estoque validado por especialistas",
      description: "Todos os produtos são usados ou testados por profissionais experientes, com garantia de desempenho no dia a dia.",
    },
    {
      icon: RefreshCw,
      title: "Reposição automática com desconto",
      description: "Cadastre itens de uso recorrente e receba com 5% off, sem precisar refazer pedidos todo mês.",
    },
    {
      icon: Users,
      title: "Atendimento direto com sócio",
      description: "Nada de chatbot que não resolve. Você fala com gente de verdade, que entende do produto e quer ver seu negócio prosperar.",
    },
    {
      icon: Truck,
      title: "Primeira compra com frete grátis",
      description: "Receba seu primeiro pedido sem pagar o frete e conheça nossa eficiência de perto.",
    },
    {
      icon: RotateCcw,
      title: "Reposição garantida ou seu dinheiro de volta",
      description: "Se algo vier errado ou com defeito, resolvemos rápido: troca gratuita ou reembolso direto. Sem burocracia, sem enrolação.",
    },
  ];

  return (
    <section id="beneficios" className="py-20 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-slate-800">Por que escolher a </span>
            <span className="relative inline-block">
              <span className="text-slate-800">Solu</span>
              <span className="text-green-500">Six</span>
              <div className="absolute -bottom-1 left-0 h-0.5 bg-green-500 origin-left" style={{ width: '100%' }}></div>
            </span>
            <span className="text-slate-800">?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simplificamos a compra de suprimentos profissionais com qualidade e
            agilidade
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 h-full flex flex-col">
                <div className="w-14 h-14 bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-lime/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-lime" />
                </div>
                <h3 className="text-lg font-semibold text-navy mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow text-sm">
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