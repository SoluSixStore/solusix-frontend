import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

/** Purpose: Testimonials section with customer reviews and social proof */
export function Testimonials() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Gerente de Compras",
      company: "Restaurante Sabor & Arte",
      rating: 5,
      text: "A SoluSix revolucionou nossa gestão de suprimentos. Entrega rápida e produtos de qualidade superior.",
      avatar: "/assets/avatar-1.jpg",
    },
    {
      name: "João Santos",
      role: "Proprietário",
      company: "Hotel Vista Mar",
      rating: 5,
      text: "Excelente atendimento e produtos premium. Economizamos tempo e dinheiro com a SoluSix.",
      avatar: "/assets/avatar-2.jpg",
    },
    {
      name: "Ana Costa",
      role: "Diretora Administrativa",
      company: "Escola Futuro Brilhante",
      rating: 5,
      text: "Produtos de qualidade e preço justo. A entrega sempre no prazo prometido.",
      avatar: "/assets/avatar-3.jpg",
    },
    {
      name: "Carlos Oliveira",
      role: "Gerente de Operações",
      company: "Indústria Metalúrgica",
      rating: 5,
      text: "A SoluSix é nossa parceira de confiança há anos. Produtos técnicos de excelência.",
      avatar: "/assets/avatar-4.jpg",
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
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Confiança e satisfação garantidas pelos nossos clientes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="mb-4">
                <Quote className="w-8 h-8 text-lime mb-2" />
                <p className="text-gray-600 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-lime to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-navy">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role} • {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-lg text-gray-600 mb-4">
            Junte-se aos nossos clientes satisfeitos
          </p>
          <div className="flex justify-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-lime">500+</div>
              <div className="text-sm text-gray-500">Clientes ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime">4.9/5</div>
              <div className="text-sm text-gray-500">Avaliação média</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime">98%</div>
              <div className="text-sm text-gray-500">Satisfação</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
