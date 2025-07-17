import { motion } from "framer-motion";
import { Award, Calendar, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

/** Purpose: Experience section highlighting partners' expertise and SoluSix foundation */
export function Experience() {
  const [years, setYears] = useState(0);
  const [partners, setPartners] = useState(0);
  const [areas, setAreas] = useState(0);
  const [yearsComplete, setYearsComplete] = useState(false);
  const [partnersComplete, setPartnersComplete] = useState(false);
  const [areasComplete, setAreasComplete] = useState(false);

  // Animate counters
  useEffect(() => {
    const animateCounters = () => {
      // Animate years (30+)
      const yearsTimer = setInterval(() => {
        setYears(prev => {
          if (prev >= 30) {
            clearInterval(yearsTimer);
            setYearsComplete(true);
            return 30;
          }
          return prev + 1;
        });
      }, 150);

      // Animate partners (6)
      const partnersTimer = setInterval(() => {
        setPartners(prev => {
          if (prev >= 6) {
            clearInterval(partnersTimer);
            setPartnersComplete(true);
            return 6;
          }
          return prev + 1;
        });
      }, 300);

      // Animate areas (4)
      const areasTimer = setInterval(() => {
        setAreas(prev => {
          if (prev >= 4) {
            clearInterval(areasTimer);
            setAreasComplete(true);
            return 4;
          }
          return prev + 1;
        });
      }, 450);
    };

    // Start animation when component mounts
    const timer = setTimeout(animateCounters, 1000);
    return () => clearTimeout(timer);
  }, []);

  const timeline = [
    {
      year: "1990",
      title: "Início da Jornada",
      description: "Parte do time inicia carreira em assistência técnica para grandes empresas de cozinhas industriais",
    },
    {
      year: "2019",
      title: "Fundação da Editec",
      description: "Parte do time funda a Editec, especializada em cozinhas profissionais",
    },
    {
      year: "2025",
      title: "Nascimento da SoluSix",
      description: "Seis sócios unem forças para criar a SoluSix com experiência consolidada",
    },
  ];

  return (
    <section id="experiencia" className="py-20 bg-navy text-white">
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
            <span className="font-semibold">Experiência consolidada</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Credibilidade que vem da experiência real
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Criada em 2025, a SoluSix é fruto da união de seis sócios com mais de 30 anos de vivência prática em comércio, logística, tecnologia e eventos. Parte do time fundou a Editec, especializada em soluções técnicas desde 2019.
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

        {/* Additional context */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Essa bagagem nos permite selecionar produtos testados em campo, negociar com quem entende do assunto e garantir uma operação confiável desde o primeiro pedido. A SoluSix nasce nova, mas já carrega experiência de sobra para entregar o que importa: qualidade, preço justo e compromisso com o cliente.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div 
            className="text-center"
            animate={yearsComplete ? {
              scale: [1, 1.1, 1],
              transition: { duration: 0.5, ease: "easeInOut" }
            } : {}}
          >
            <motion.div 
              className="text-4xl font-bold text-lime mb-2"
              animate={yearsComplete ? {
                textShadow: ["0 0 0px #10b981", "0 0 20px #10b981", "0 0 0px #10b981"],
                transition: { duration: 1, ease: "easeInOut" }
              } : {}}
            >
              {years}+
            </motion.div>
            <div className="text-gray-300">Anos de experiência dos sócios</div>
          </motion.div>
          
          <motion.div 
            className="text-center"
            animate={partnersComplete ? {
              scale: [1, 1.1, 1],
              transition: { duration: 0.5, ease: "easeInOut" }
            } : {}}
          >
            <motion.div 
              className="text-4xl font-bold text-lime mb-2"
              animate={partnersComplete ? {
                textShadow: ["0 0 0px #10b981", "0 0 20px #10b981", "0 0 0px #10b981"],
                transition: { duration: 1, ease: "easeInOut" }
              } : {}}
            >
              {partners}
            </motion.div>
            <div className="text-gray-300">Sócios especialistas</div>
          </motion.div>
          
          <motion.div 
            className="text-center"
            animate={areasComplete ? {
              scale: [1, 1.1, 1],
              transition: { duration: 0.5, ease: "easeInOut" }
            } : {}}
          >
            <motion.div 
              className="text-4xl font-bold text-lime mb-2"
              animate={areasComplete ? {
                textShadow: ["0 0 0px #10b981", "0 0 20px #10b981", "0 0 0px #10b981"],
                transition: { duration: 1, ease: "easeInOut" }
              } : {}}
            >
              {areas}
            </motion.div>
            <div className="text-gray-300">Áreas de expertise</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
