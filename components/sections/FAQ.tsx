import { motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

/** Purpose: FAQ section with expandable questions and answers */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "De onde vem a experiência da SoluSix?",
      answer:
        "A SoluSix nasceu de mais de 30 anos de experiência no mercado de suprimentos profissionais. Nossa equipe acumulou conhecimento técnico e prático em diversos setores, desde indústrias até pequenos comércios, sempre focando na qualidade e eficiência dos produtos.",
    },
    {
      question: "Como funciona a entrega?",
      answer:
        "Oferecemos entrega expressa em todo o Brasil: 48 horas nas capitais e principais cidades, 72 horas no resto do país. Todos os pedidos são rastreados e você recebe atualizações em tempo real.",
    },
    {
      question: "Qual a diferença entre B2B e B2C?",
      answer:
        "B2B (Business to Business) é para empresas e comércios que precisam de volumes maiores e preços especiais. B2C (Business to Consumer) é para uso pessoal ou pequenas quantidades. Ambos têm a mesma qualidade premium.",
    },
    {
      question: "Como funciona o frete grátis?",
      answer:
        "O frete grátis é válido para o primeiro pedido de cada CPF/CNPJ, limitado a 1 kit por pessoa/empresa. Após o primeiro pedido, oferecemos frete com desconto para clientes cadastrados.",
    },
    {
      question: "Os produtos são originais?",
      answer:
        "Sim, todos os nossos produtos são 100% originais e certificados. Trabalhamos diretamente com fabricantes autorizados e garantimos a procedência de todos os itens.",
    },
    {
      question: "Como funciona o programa AutoReposição?",
      answer:
        "O programa AutoReposição oferece 10% de desconto em pedidos automáticos. Você define a frequência e quantidade, e recebemos automaticamente antes de acabar o estoque, sempre com frete grátis.",
    },
    {
      question: "Posso cancelar ou alterar meu pedido?",
      answer:
        "Sim, você pode cancelar ou alterar seu pedido até 2 horas após a confirmação. Entre em contato via WhatsApp e nossa equipe fará os ajustes necessários.",
    },
    {
      question: "Vocês atendem todo o Brasil?",
      answer:
        "Sim, atendemos todo o território nacional. Nossa logística é otimizada para garantir entrega rápida e segura em qualquer região do país.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-lime/10 text-lime px-4 py-2 rounded-full mb-6">
            <HelpCircle className="w-5 h-5" />
            <span className="font-semibold">Perguntas Frequentes</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Dúvidas Comuns
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossos produtos e serviços
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-navy text-lg">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
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
          <p className="text-gray-600 mb-4">
            Ainda tem dúvidas? Entre em contato conosco!
          </p>
          <button className="bg-lime text-navy px-8 py-3 rounded-lg font-semibold hover:bg-lime/90 transition-colors">
            Falar conosco
          </button>
        </motion.div>
      </div>
    </section>
  );
}
