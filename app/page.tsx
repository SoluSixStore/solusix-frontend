"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { Benefits } from "@/components/sections/Benefits";
import { Experience } from "@/components/sections/Experience";
import { Testimonials } from "@/components/sections/Testimonials";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { AutoReposicao } from "@/components/sections/AutoReposicao";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/Footer";
// import { LeadMagnetForm } from "@/components/LeadMagnetForm";
import TestToolbar from "./test-toolbar";

/**
 * FUNIL DE VENDAS OTIMIZADO - SoluSix Landing Page
 * 
 * Estrutura reorganizada para maximizar conversões seguindo as melhores práticas:
 * 
 * 1. HERO - Proposta de valor impactante e clara
 *    - Primeira impressão forte
 *    - Proposta de valor clara
 *    - CTA principal visível
 * 
 * 2. PRODUTOS - Catálogo com preços e CTAs de compra
 *    - Produtos em destaque logo após a proposta
 *    - Preços visíveis
 *    - Botões de compra direta via WhatsApp
 *    - Filtros e busca para facilitar a escolha
 * 
 * 3. BENEFÍCIOS - Benefícios e garantias para confiança
 *    - Justificativa da escolha
 *    - Garantias e diferenciais
 *    - Redução de objeções
 * 
 * 4. EXPERIÊNCIA - Quem somos e credibilidade
 *    - Prova de credibilidade
 *    - Experiência dos sócios
 *    - Timeline de evolução
 * 
 * 5. DEPOIMENTOS - Prova social e avaliações
 *    - Validação social
 *    - Estatísticas de satisfação
 *    - Histórico de sucesso
 * 
 * 6. COMO FUNCIONA - Processo de compra
 *    - Simplificação do processo
 *    - Redução de fricção
 *    - CTAs secundários
 * 
 * 7. AUTO REPOSIÇÃO - Diferencial competitivo
 *    - Valor agregado
 *    - Programa de fidelidade
 *    - Economia automática
 * 
 * 8. FAQ - Resolução de objeções
 *    - Resposta a dúvidas comuns
 *    - Redução de objeções finais
 *    - Confiança adicional
 * 
 * 9. CONTATO - Chamada final para ação
 *    - Formulário de contato
 *    - CTA final
 *    - Fácil acesso ao WhatsApp
 * 
 * Esta sequência segue o princípio AIDA (Atenção, Interesse, Desejo, Ação)
 * e maximiza a probabilidade de conversão em cada etapa do funil.
 */
export default function Home() {
  // const [showLeadMagnet, setShowLeadMagnet] = useState(false);

  // // Exit-intent detection for lead magnet
  // useEffect(() => {
  //   const handleMouseLeave = (e: MouseEvent) => {
  //     if (e.clientY <= 0) {
  //       setShowLeadMagnet(true);
  //     }
  //   };

  //   const handleKeyDown = (e: KeyboardEvent) => {
  //     if (e.key === "Escape") {
  //       setShowLeadMagnet(false);
  //     }
  //   };

  //   document.addEventListener("mouseleave", handleMouseLeave);
  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => {
  //     document.removeEventListener("mouseleave", handleMouseLeave);
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  return (
    <main className="min-h-screen">
      <Header />

      {/* 1. HERO - Proposta de valor impactante */}
      <Hero />
      
      {/* 2. PRODUTOS - Catálogo com preços e CTAs de compra */}
      <ProductCatalog />
      
      {/* 3. BENEFÍCIOS - Benefícios e garantias para confiança */}
      <Benefits />
      
      {/* 4. EXPERIÊNCIA - Quem somos e credibilidade */}
      <Experience />
      
      {/* 5. DEPOIMENTOS - Prova social e avaliações */}
      <Testimonials />
      
      {/* 6. COMO FUNCIONA - Processo de compra */}
      <HowItWorks />
      
      {/* 7. AUTO REPOSIÇÃO - Diferencial competitivo */}
      <AutoReposicao />
      
      {/* 8. FAQ - Resolução de objeções */}
      <FAQ />

      {/* 9. CONTATO - Chamada final para ação */}
      <ContatoSection />

      <Footer />

      {/* Lead Magnet Form */}
      {/* <LeadMagnetForm
        isOpen={showLeadMagnet}
        onClose={() => setShowLeadMagnet(false)}
      /> */}

      {/* Debug Toolbar */}
      {process.env.NODE_ENV === "development" && <TestToolbar />}
    </main>
  );
}

function ContatoSection() {
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>("idle");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Refs para scroll automático
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return "Por favor insira seu nome";
        if (value.trim().length < 2) return "O nome deve ter pelo menos 2 caracteres";
        return "";
      
      case 'email':
        if (!value.trim()) return "Por favor insira seu e-mail";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Por favor insira um e-mail válido";
        return "";
      
      case 'message':
        if (!value.trim()) return "Por favor insira sua mensagem";
        if (value.trim().length < 10) return "A mensagem deve ter pelo menos 10 caracteres";
        return "";
      
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validar campo em tempo real e limpar erro
    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
    
    // Limpar status de erro geral quando o usuário corrige
    if (status === 'error' && !fieldError) {
      setStatus('idle');
    }
  };

  const scrollToFirstError = () => {
    if (errors.name && nameRef.current) {
      nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      nameRef.current.focus();
    } else if (errors.email && emailRef.current) {
      emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emailRef.current.focus();
    } else if (errors.message && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      messageRef.current.focus();
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrors({});

    // Validação completa de todos os campos
    const newErrors: {[key: string]: string} = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("error");
      // Scroll para o primeiro erro após um pequeno delay para garantir que o DOM foi atualizado
      setTimeout(scrollToFirstError, 100);
      return;
    }

    try {
      console.log('📧 Sending contact form data:', formData);
      
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log('📧 Response status:', res.status);

      const data = await res.json();
      console.log('📧 Contact API response:', data);

      if (res.ok && data.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        setStatus("error");
        // Não limpar os dados do formulário em caso de erro
      }
    } catch (err) {
      console.error('❌ Contact form error:', err);
      setStatus("error");
      // Não limpar os dados do formulário em caso de erro
    }
  }

  const getFieldClassName = (fieldName: string) => {
    const baseClasses = "w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime transition-all";
    const errorClasses = "border-red-300 focus:ring-red-500 focus:border-red-500";
    const normalClasses = "border-gray-300 focus:ring-lime focus:border-lime";
    
    // Use a stable class name to prevent hydration mismatch
    return `${baseClasses} ${normalClasses}`;
  };

  return (
    <section id="contato" className="py-24 bg-gray-200 border-t border-gray-100">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-navy mb-4">Contato</h2>
        <p className="text-gray-600 mb-8">Vamos bater um papo? Conte pra gente como podemos te ajudar! 😊</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              ref={nameRef}
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Seu nome" 
              className={`${getFieldClassName('name')} ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              disabled={status === "loading"}
              required
            />
            {errors.name && (
              <div className="mt-1 flex items-center text-red-600 text-sm">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name}
              </div>
            )}
          </div>
          
          <div>
            <input 
              ref={emailRef}
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Seu e-mail" 
              className={`${getFieldClassName('email')} ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              disabled={status === "loading"}
              autoComplete="email"
              required
            />
            {errors.email && (
              <div className="mt-1 flex items-center text-red-600 text-sm">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email}
              </div>
            )}
          </div>
          
          <div>
            <textarea 
              ref={messageRef}
              name="message" 
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Sua mensagem" 
              rows={5} 
              className={`${getFieldClassName('message')} resize-none ${errors.message ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
              disabled={status === "loading"}
              required
            />
            {errors.message && (
              <div className="mt-1 flex items-center text-red-600 text-sm">
                <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.message}
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className={`w-full font-bold px-6 py-3 rounded-lg transition-all duration-200 ${
              status === "loading" 
                ? "bg-gray-400 text-white cursor-not-allowed" 
                : "bg-lime text-navy hover:bg-lime/90 transform hover:scale-105 focus:ring-2 focus:ring-lime focus:ring-offset-2"
            }`}
            disabled={status === "loading"}
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enviando...
              </span>
            ) : (
              "Enviar Mensagem"
            )}
          </button>
        </form>

        {/* Success Message - Centralizada e com auto-hide */}
        {status === "success" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25,
              duration: 0.6 
            }}
            className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg text-center shadow-lg"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-green-800 font-semibold text-lg mb-2">Mensagem enviada com sucesso!</p>
              <p className="text-green-600">Entraremos em contato em breve.</p>
            </motion.div>
          </motion.div>
        )}
        
        {/* Error Message - Apenas para erros de servidor */}
        {status === "error" && !Object.keys(errors).length && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-800 font-medium">Erro ao enviar mensagem</p>
            </div>
            <p className="text-red-600 text-sm mt-1">Tente novamente em alguns instantes.</p>
          </div>
        )}
      </div>
    </section>
  );
}
