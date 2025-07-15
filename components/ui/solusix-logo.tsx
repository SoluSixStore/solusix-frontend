"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Droplet, ShoppingCart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface SoluSixLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const SoluSixLogo: React.FC<SoluSixLogoProps> = ({ 
  className = "", 
  size = "md", 
  animated = true 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animated]);

  const sizeClasses = {
    sm: "h-8",
    md: "h-14",
    lg: "h-18"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const iconSizeClasses = {
    sm: 20,
    md: 32,
    lg: 40
  };

  const iconSize = iconSizeClasses[size];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      opacity: 0,
      rotate: -180
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.6
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const textVariants = {
    hidden: { 
      x: 50,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
        duration: 0.8
      }
    }
  };

  const underlineVariants = {
    hidden: { 
      scaleX: 0,
      opacity: 0
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        delay: 1.2,
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const IconComponent = () => (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1EDD88]/20 to-[#007B8A]/20 rounded-lg blur-sm" />
      <div className="relative bg-gradient-to-br from-[#0F1F2D] to-[#1A1A1A] p-2.5 rounded-lg border border-[#007B8A]/30 shadow-lg">
        <div className="grid grid-cols-2 gap-1.5">
          <Box size={iconSize * 0.4} className="text-[#1EDD88]" />
          <Droplet size={iconSize * 0.4} className="text-[#007B8A]" />
          <ShoppingCart size={iconSize * 0.4} className="text-[#FF6B35]" />
          <Zap size={iconSize * 0.4} className="text-[#1EDD88]" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-lg" />
      </div>
    </div>
  );

  return (
    <motion.div
      className={cn("flex items-center gap-2 -ml-2", sizeClasses[size], className)}
      variants={containerVariants}
      initial={animated ? "hidden" : "visible"}
      animate={isVisible ? "visible" : "hidden"}
    >
      <motion.div 
        variants={iconVariants}
        whileHover="hover"
      >
        <IconComponent />
      </motion.div>
      
      <motion.div 
        className="relative"
        variants={textVariants}
      >
        <div className={cn(
          "font-bold tracking-tight",
          textSizeClasses[size]
        )}>
          <span className="text-navy hover:text-lime transition-colors duration-300">Solu</span>
          <span className="text-[#007B8A] hover:text-[#1EDD88] transition-colors duration-300">Six</span>
        </div>
        
        <div className={cn(
          "text-xs text-gray-600 mt-0.5 font-medium tracking-wide",
          size === "sm" && "text-[10px]",
          size === "lg" && "text-sm"
        )}>
          Do essencial ao inesperado
        </div>
        
        <motion.div
          className="h-0.5 bg-gradient-to-r from-[#1EDD88] via-[#007B8A] to-[#FF6B35] rounded-full origin-left mt-0.5"
          variants={underlineVariants}
        />
      </motion.div>
    </motion.div>
  );
};

export default SoluSixLogo; 