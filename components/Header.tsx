﻿import { Menu, X, Sparkles, Settings, Package, Award, MessageSquare, HelpCircle, Phone } from "lucide-react";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuBar } from "@/components/ui/glow-menu";
import { HyperText } from "@/components/ui/hyper-text";
import SoluSixLogo from "@/components/ui/SoluSixLogoEnhanced";
import { getVisualViewportHeight, calculateMenuHeight, getViewportInfo } from "@/lib/utils";

/** Purpose: Header component with navigation and contact options */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("");
  const [viewportHeight, setViewportHeight] = useState<number>(0);
  const [viewportInfo, setViewportInfo] = useState(() => getViewportInfo());
  const isClickScrolling = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menu reorganizado seguindo o funil de vendas otimizado
  const menuItems = useMemo(() => [
    {
      icon: Package,
      label: "Produtos",
      href: "#produtos",
      sectionId: "produtos",
      gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
      iconColor: "text-orange-500",
    },
    {
      icon: Sparkles,
      label: "Benefícios",
      href: "#beneficios",
      sectionId: "beneficios",
      gradient: "radial-gradient(circle, rgba(16,242,127,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      iconColor: "text-green-500",
    },
    {
      icon: Award,
      label: "Experiência",
      href: "#experiencia",
      sectionId: "experiencia",
      gradient: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
      iconColor: "text-purple-500",
    },
    {
      icon: MessageSquare,
      label: "Depoimentos",
      href: "#depoimentos",
      sectionId: "depoimentos",
      gradient: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.06) 50%, rgba(190,24,93,0) 100%)",
      iconColor: "text-pink-500",
    },
    {
      icon: Settings,
      label: "Como Funciona",
      href: "#como-funciona",
      sectionId: "como-funciona",
      gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
      iconColor: "text-blue-500",
    },
    {
      icon: HelpCircle,
      label: "Dúvidas Frequentes",
      href: "#faq",
      sectionId: "faq",
      gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      iconColor: "text-green-500",
    },
    {
      icon: Phone,
      label: "Contato",
      href: "#contato",
      sectionId: "contato",
      gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
      iconColor: "text-red-500",
    },
  ], []);

  // Viewport height detection for mobile menu
  useEffect(() => {
    const updateViewport = () => {
      setViewportHeight(getVisualViewportHeight());
      setViewportInfo(getViewportInfo());
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);
    
    // Listen for visualViewport changes (keyboard open/close)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateViewport);
    }

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateViewport);
      }
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      const scrollPosition = window.scrollY + 80; // header offset
      let currentSection = "";
      for (const item of menuItems) {
        const section = document.getElementById(item.sectionId);
        if (section) {
          const { top, height } = section.getBoundingClientRect();
          const sectionTop = window.scrollY + top;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + height) {
            currentSection = item.label;
            break;
          }
        }
      }
      setActiveItem(currentSection);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuItems]);

  // Smooth scroll and highlight on click
  const handleItemClick = (label: string) => {
    setActiveItem(label);
    const item = menuItems.find(item => item.label === label);
    if (item) {
      const element = document.getElementById(item.sectionId);
      if (element) {
        isClickScrolling.current = true;
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Após scroll suave, liberar para scrollspy reassumir
        const onScroll = () => {
          isClickScrolling.current = false;
          window.removeEventListener('scroll', onScroll);
        };
        window.addEventListener('scroll', onScroll);
      }
    }
  };

  // Função para scroll suave para o topo
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Calculate max height for mobile menu
  const getMobileMenuMaxHeight = () => {
    if (viewportHeight === 0) return 'calc(100vh - 4rem)'; // fallback
    return calculateMenuHeight(viewportHeight, 64);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-0 sm:px-2 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <a href="#" onClick={handleLogoClick} className="pr-4">
              <SoluSixLogo size="md" animated={true} />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 justify-center min-w-0 w-full">
            <MenuBar
              items={menuItems}
              activeItem={activeItem}
              onItemClick={handleItemClick}
              className="bg-transparent border-none shadow-none p-0 m-0"
            />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 touch-manipulation"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              className={`md:hidden mobile-menu-container mobile-menu-scroll ${
                viewportInfo.isTablet ? 'tablet-menu' : ''
              } ${viewportInfo.orientation === 'landscape' ? 'landscape-menu' : ''}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{
                maxHeight: getMobileMenuMaxHeight(),
                overflowY: 'auto',
              }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 safe-area-inset-bottom">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`mobile-menu-item touch-target ${
                      viewportInfo.isHighDPI ? 'mobile-menu-high-res' : ''
                    } ${
                      viewportInfo.width >= 1000 && viewportInfo.height >= 2400 ? 'mobile-menu-ultra-high-res' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.2, 
                      delay: index * 0.05,
                      ease: "easeOut"
                    }}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(16, 242, 127, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
