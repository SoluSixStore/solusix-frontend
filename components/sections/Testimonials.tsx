import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { GlowCard } from "@/components/ui/spotlight-card";
import { useState, useEffect, useRef, useCallback } from "react";

/** Purpose: Testimonials section with customer reviews and social proof */
export function Testimonials() {
  const [clients, setClients] = useState(0);
  const [rating, setRating] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);
  const [clientsComplete, setClientsComplete] = useState(false);
  const [ratingComplete, setRatingComplete] = useState(false);
  const [satisfactionComplete, setSatisfactionComplete] = useState(false);
  
  // Navigation state
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate counters sequentially
  useEffect(() => {
    const animateCountersSequentially = async () => {
      // Step 1: Animate rating first (4.9)
      await new Promise<void>((resolve) => {
        const ratingTimer = setInterval(() => {
          setRating(prev => {
            if (prev >= 4.9) {
              clearInterval(ratingTimer);
              setRatingComplete(true);
              resolve();
              return 4.9;
            }
            return Math.round((prev + 0.1) * 10) / 10;
          });
        }, 50);
      });

      // Step 2: After rating completes, animate clients (50+)
      await new Promise<void>((resolve) => {
        const clientsTimer = setInterval(() => {
          setClients(prev => {
            if (prev >= 50) {
              clearInterval(clientsTimer);
              setClientsComplete(true);
              resolve();
              return 50;
            }
            return prev + 1;
          });
        }, 37);
      });

      // Step 3: After clients completes, animate satisfaction (98)
      await new Promise<void>((resolve) => {
        const satisfactionTimer = setInterval(() => {
          setSatisfaction(prev => {
            if (prev >= 98) {
              clearInterval(satisfactionTimer);
              setSatisfactionComplete(true);
              resolve();
              return 98;
            }
            return prev + 1;
          });
        }, 25);
      });
    };

    // Start sequential animation when component mounts
    const timer = setTimeout(animateCountersSequentially, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 20 testimonials data
  const testimonials = [
    {
      name: "João Freitas",
      role: "Coordenador de Hotelaria",
      company: "Rede de hotéis premium",
      rating: 5,
      text: "Já confiávamos na Editec desde 2019, e a SoluSix segue o mesmo padrão de excelência. Produtos de qualidade superior.",
      avatar: "/assets/avatar-1.jpg",
    },
    {
      name: "Carlos Mendes",
      role: "Diretor Administrativo",
      company: "Escola Particular",
      rating: 5,
      text: "Nova no mercado, mas com a mesma qualidade de quem já atua há anos na área técnica. Recomendo fortemente.",
      avatar: "/assets/avatar-2.jpg",
    },
    {
      name: "Fernanda Lima",
      role: "Supervisora de Manutenção",
      company: "Shopping Center",
      rating: 5,
      text: "Produtos que realmente funcionam e atendimento excepcional. Resolvemos problemas rapidamente.",
      avatar: "/assets/avatar-3.jpg",
    },
    {
      name: "Roberto Almeida",
      role: "Diretor Comercial",
      company: "Empresa de Limpeza",
      rating: 5,
      text: "A SoluSix nos ajudou a otimizar custos e melhorar a qualidade dos nossos serviços desde o primeiro contato.",
      avatar: "/assets/avatar-4.jpg",
    },
    {
      name: "Patrícia Souza",
      role: "Gerente de Facilities",
      company: "Escritório Corporativo",
      rating: 5,
      text: "Produtos de primeira linha e suporte técnico impecável. Parceiro confiável para nossa operação.",
      avatar: "/assets/avatar-5.jpg",
    },
    {
      name: "Marcelo Ferreira",
      role: "Proprietário",
      company: "Lavanderia Industrial",
      rating: 5,
      text: "Economia real e produtos que duram. A SoluSix entende as necessidades do nosso negócio perfeitamente.",
      avatar: "/assets/avatar-6.jpg",
    },
    {
      name: "Lucia Mendes",
      role: "Coordenadora Administrativa",
      company: "Clínica Médica",
      rating: 5,
      text: "Higiene e qualidade são essenciais para nós. A SoluSix nunca nos decepcionou em nenhuma entrega.",
      avatar: "/assets/avatar-7.jpg",
    },
    {
      name: "Rafaela Prado",
      role: "Compradora Técnica",
      company: "Indústria de Cosméticos",
      rating: 5,
      text: "Conhecemos a credibilidade da Editec, por isso escolhemos a SoluSix com confiança. Atendimento impecável.",
      avatar: "/assets/avatar-8.jpg",
    },
    {
      name: "Ricardo Costa",
      role: "Gerente de Produção",
      company: "Indústria Alimentícia",
      rating: 5,
      text: "Produtos certificados e entrega pontual. Parceiro confiável para nossa operação desde o início.",
      avatar: "/assets/avatar-9.jpg",
    },
    {
      name: "Camila Rodrigues",
      role: "Supervisora de Qualidade",
      company: "Laboratório",
      rating: 5,
      text: "Excelência em todos os aspectos. Produtos que atendem aos mais altos padrões da nossa área.",
      avatar: "/assets/avatar-10.jpg",
    },
    {
      name: "André Pereira",
      role: "Gerente de Operações",
      company: "Centro de Distribuição",
      rating: 5,
      text: "Logística eficiente e produtos de qualidade. A SoluSix é nossa escolha certa para suprimentos.",
      avatar: "/assets/avatar-11.jpg",
    },
    {
      name: "Juliana Santos",
      role: "Diretora de Compras",
      company: "Rede de Farmácias",
      rating: 5,
      text: "Atendimento personalizado e produtos que realmente funcionam. Parceiro de confiança desde o primeiro pedido.",
      avatar: "/assets/avatar-12.jpg",
    },
    {
      name: "Thiago Martins",
      role: "Proprietário",
      company: "Academia",
      rating: 5,
      text: "Produtos de limpeza que mantêm nosso ambiente sempre impecável. Recomendo para qualquer academia!",
      avatar: "/assets/avatar-13.jpg",
    },
    {
      name: "Vanessa Oliveira",
      role: "Gerente de Hotelaria",
      company: "Pousada",
      rating: 5,
      text: "Qualidade premium e preço justo. Nossos hóspedes sempre elogiam a limpeza dos ambientes.",
      avatar: "/assets/avatar-14.jpg",
    },
    {
      name: "Diego Silva",
      role: "Supervisor de Manutenção",
      company: "Condomínio",
      rating: 5,
      text: "Produtos duráveis e atendimento eficiente. A SoluSix resolve nossos problemas rapidamente.",
      avatar: "/assets/avatar-15.jpg",
    },
    {
      name: "Amanda Costa",
      role: "Coordenadora de Eventos",
      company: "Casa de Eventos",
      rating: 5,
      text: "Produtos que garantem a limpeza perfeita para nossos eventos. Parceiro essencial para nosso sucesso.",
      avatar: "/assets/avatar-16.jpg",
    },
    {
      name: "Felipe Alves",
      role: "Gerente de Operações",
      company: "Empresa de Transporte",
      rating: 5,
      text: "Manutenção eficiente com produtos de qualidade. A SoluSix entende nossas necessidades específicas.",
      avatar: "/assets/avatar-17.jpg",
    },
    {
      name: "Carolina Lima",
      role: "Diretora Administrativa",
      company: "Escola Particular",
      rating: 5,
      text: "Ambiente limpo e seguro para nossos alunos. A SoluSix é nossa parceira de confiança desde o início.",
      avatar: "/assets/avatar-18.jpg",
    },
    {
      name: "Gabriel Santos",
      role: "Proprietário",
      company: "Restaurante Fast Food",
      rating: 5,
      text: "Produtos que mantêm nossa cozinha sempre impecável. Atendimento excepcional e preços competitivos!",
      avatar: "/assets/avatar-19.jpg",
    },
    {
      name: "Mariana Costa",
      role: "Supervisora de Limpeza",
      company: "Hospital",
      rating: 5,
      text: "Produtos hospitalares de qualidade e entrega pontual. A SoluSix entende a importância da higiene em nosso setor.",
      avatar: "/assets/avatar-20.jpg",
    },
  ];

  // Get visible testimonials based on screen size
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 4;
    const width = window.innerWidth;
    if (width >= 1920) return 6;
    if (width >= 1366) return 4;
    if (width >= 1024) return 3;
    if (width >= 768) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(4);

  // Navigation functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev + visibleCount;
      return next >= testimonials.length ? 0 : next;
    });
  }, [visibleCount, testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - visibleCount;
      return prevIndex < 0 ? Math.max(0, testimonials.length - visibleCount) : prevIndex;
    });
  }, [visibleCount, testimonials.length]);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(getVisibleCount());
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  // Get testimonials to display
  const getVisibleTestimonials = () => {
    const result = [];
    const startIndex = currentIndex;
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % testimonials.length;
      result.push({ ...testimonials[index], originalIndex: index });
    }
    return result;
  };

  // Auto-advance removed - manual navigation only

  // Touch/swipe support for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startX = 0;
    let endX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          nextSlide(); // Swipe left
        } else {
          prevSlide(); // Swipe right
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide]);

  return (
    <section id="depoimentos" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Confiança e satisfação garantidas pelos nossos clientes
          </p>
        </motion.div>

        {/* Testimonials Container */}
        <div className="relative">

          {/* Testimonials Grid */}
          <div 
            ref={containerRef}
            className="grid gap-6 transition-all duration-600 ease-in-out"
            style={{
              gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
            }}
          >
            {getVisibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={`${testimonial.originalIndex}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-full"
              >
                <GlowCard 
                  glowColor="green"
                  customSize={true}
                  className="bg-white p-6 hover:shadow-xl transition-all duration-300 min-h-[320px] w-full grid grid-rows-[auto_1fr_auto] gap-4"
                >
                  {/* Cabeçalho - Rating e Quote */}
                  <div className="space-y-3">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    {/* Quote */}
                    <Quote className="w-8 h-8 text-lime" />
                  </div>

                  {/* Depoimento - Texto com altura controlada */}
                  <div className="overflow-hidden">
                    <p className="text-gray-600 leading-relaxed text-sm overflow-hidden text-ellipsis" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      "{testimonial.text}"
                    </p>
                  </div>

                  {/* Rodapé fixo - Avatar, nome, cargo, empresa */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-lime to-cyan-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-navy text-sm leading-tight">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-gray-500 leading-tight break-words">
                        {testimonial.role} • {testimonial.company}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex justify-center gap-2">
              {Array.from({ length: Math.ceil(testimonials.length / visibleCount) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i * visibleCount)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    Math.floor(currentIndex / visibleCount) === i
                      ? 'bg-lime scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir para grupo ${i + 1}`}
                />
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <div className="flex justify-center gap-6 mt-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                aria-label="Depoimento anterior"
              >
                <ChevronLeft className="w-6 h-6 text-navy" />
              </button>

              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
                aria-label="Próximo depoimento"
              >
                <ChevronRight className="w-6 h-6 text-navy" />
              </button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-xl text-navy font-semibold mb-8">
            Junte-se aos nossos clientes satisfeitos
          </p>
          <div className="flex justify-center gap-12">
            <motion.div 
              className="text-center"
              animate={ratingComplete ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.5, ease: "easeInOut" }
              } : {}}
            >
              <motion.div 
                className="text-5xl font-black mb-3 font-['Poppins'] bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 bg-clip-text text-transparent"
                animate={ratingComplete ? {
                  textShadow: ["0 0 0px #10b981", "0 0 25px #10b981", "0 0 0px #10b981"],
                  transition: { duration: 1, ease: "easeInOut" }
                } : {}}
              >
                {rating}/5
              </motion.div>
              <div className="text-sm text-emerald-700 font-semibold uppercase tracking-widest font-['Inter']">Avaliação média</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              animate={clientsComplete ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.5, ease: "easeInOut" }
              } : {}}
            >
              <motion.div 
                className="text-5xl font-black mb-3 font-['Poppins'] bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
                animate={clientsComplete ? {
                  textShadow: ["0 0 0px #7c3aed", "0 0 25px #7c3aed", "0 0 0px #7c3aed"],
                  transition: { duration: 1, ease: "easeInOut" }
                } : {}}
              >
                {clients}+
              </motion.div>
              <div className="text-sm text-purple-700 font-semibold uppercase tracking-widest font-['Inter']">Clientes ativos</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              animate={satisfactionComplete ? {
                scale: [1, 1.1, 1],
                transition: { duration: 0.5, ease: "easeInOut" }
              } : {}}
            >
              <motion.div 
                className="text-5xl font-black mb-3 font-['Poppins'] bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
                animate={satisfactionComplete ? {
                  textShadow: ["0 0 0px #f43f5e", "0 0 25px #f43f5e", "0 0 0px #f43f5e"],
                  transition: { duration: 1, ease: "easeInOut" }
                } : {}}
              >
                {satisfaction}%
              </motion.div>
              <div className="text-sm text-rose-700 font-semibold uppercase tracking-widest font-['Inter']">Satisfação</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
