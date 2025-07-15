"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ShoppingCart, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SoluSixLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light' | 'dark';
  animated?: boolean;
  className?: string;
}

const SoluSixLogo: React.FC<SoluSixLogoProps> = ({
  size = 'md',
  variant = 'default',
  animated = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(!animated);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [animated]);

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl'
  };

  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const getColors = () => {
    switch (variant) {
      case 'light':
        return {
          primary: 'text-white',
          secondary: 'text-green-400',
          icon: 'text-white',
          iconBg: 'bg-white/10'
        };
      case 'dark':
        return {
          primary: 'text-slate-900',
          secondary: 'text-green-600',
          icon: 'text-slate-900',
          iconBg: 'bg-slate-900/10'
        };
      default:
        return {
          primary: 'text-slate-800',
          secondary: 'text-green-500',
          icon: 'text-slate-700',
          iconBg: 'bg-slate-100'
        };
    }
  };

  const colors = getColors();

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
        duration: 0.8
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
        delay: 0.3,
        duration: 0.7
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
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    hidden: { 
      opacity: 0,
      x: -100
    },
    visible: { 
      opacity: [0, 1, 0],
      x: 200,
      transition: {
        delay: 1.5,
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={cn("flex items-center gap-3", sizeClasses[size], className)}>
      {/* Icon Container */}
      <motion.div
        className={cn("relative", iconSizeClasses[size], "flex items-center justify-center rounded-xl", colors.iconBg, "backdrop-blur-sm")}
        variants={iconVariants}
        initial={animated ? "hidden" : "visible"}
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className={cn(iconSizeClasses[size], colors.icon, "opacity-30")} />
        </div>
        
        {/* Foreground Icon */}
        <motion.div
          className="relative z-10"
          animate={isVisible ? {
            rotate: [0, 360],
            transition: {
              delay: 0.5,
              duration: 1,
              ease: "easeInOut"
            }
          } : {}}
        >
          <ShoppingCart className={cn(
            size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : 'w-7 h-7',
            colors.icon
          )} />
        </motion.div>


      </motion.div>

      {/* Text Container */}
      <div className="relative">
        <motion.div
          className={cn("font-bold", textSizeClasses[size], colors.primary, "tracking-tight")}
          variants={textVariants}
          initial={animated ? "hidden" : "visible"}
          animate={isVisible ? "visible" : "hidden"}
          style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        >
          Solu
          <motion.span
            className={colors.secondary}
            animate={isVisible ? {
              scale: [1, 1.05, 1],
              transition: {
                delay: 1,
                duration: 0.5,
                ease: "easeInOut"
              }
            } : {}}
          >
            Six
          </motion.span>
        </motion.div>

        {/* Underline Animation */}
        <motion.div
          className={cn("absolute -bottom-1 left-0 h-0.5", colors.secondary.replace('text-', 'bg-'), "origin-left")}
          variants={underlineVariants}
          initial={animated ? "hidden" : "visible"}
          animate={isVisible ? "visible" : "hidden"}
          style={{ width: '100%' }}
        />

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent"
          variants={glowVariants}
          initial={animated ? "hidden" : "visible"}
          animate={isVisible ? "visible" : "hidden"}
          style={{ 
            filter: 'blur(8px)',
            pointerEvents: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default SoluSixLogo; 