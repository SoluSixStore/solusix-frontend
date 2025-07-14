import { motion } from "framer-motion";
import { Award, Calendar, TrendingUp } from "lucide-react";

/** Purpose: Experience section highlighting 30+ years of expertise */
export function Experience() {
  const timeline = [
    {
      year: "1990",
      title: "Início",
      description: "Fundação da empresa com foco em suprimentos industriais",
    },
    {
      year: "2019",
      title: "Especialização",
      description: "Expansão para mercado B2B com produtos premium",
    },
    {
      year: "2025",
      title: "Lançamento SoluSix",
      description: "Plataforma digital revolucionando o mercado",
    },
  ];

  return (
    <section className="py-20 bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-lime/10 text-lime px-4 py-2 rounded-full mb-6">
            <Award className="w-5 h-5" />
            <span className="font-semibold">30+ anos de expertise</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experiência que inspira confiança
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Mais de três décadas no mercado de suprimentos profissionais
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-lime/30"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-lime rounded-full border-4 border-navy"></div>

                {/* Content */}
                <div
                  className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                >
                  <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-lime" />
                      <span className="text-2xl font-bold text-lime">
                        {item.year}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="text-4xl font-bold text-lime mb-2">30+</div>
            <div className="text-gray-300">Anos de experiência</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-lime mb-2">1000+</div>
            <div className="text-gray-300">Clientes atendidos</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-lime mb-2">50+</div>
            <div className="text-gray-300">Produtos premium</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
