import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Purpose: Merge Tailwind classes with proper conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Purpose: Format currency in Brazilian Real */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/** Purpose: Generate WhatsApp message with product details and discount calculation */
export function generateWhatsAppMessage(product: any, quantity: number) {
  // Cálculos conforme especificação
  const totalSemDesconto = quantity * product.price;
  const desconto = totalSemDesconto * 0.0499; // 4.99% de desconto
  const totalComDesconto = totalSemDesconto - desconto;
  const economia = totalSemDesconto - totalComDesconto;
  
  // Obter o nome completo do produto com litragem
  const nomeCompleto = product.specs?.volume 
    ? `${product.name} ${product.specs.volume}`
    : product.name;
  
  // Construir mensagem com todos os valores
  let message = `Olá! Quero fazer um pedido pela SoluSix

Produto: ${nomeCompleto}
Quantidade: ${quantity} ${quantity === 1 ? 'unidade' : 'unidades'}
Valor unitário: ${formatCurrency(product.price)}
Total sem desconto: ${formatCurrency(totalSemDesconto)}
Total com 4,99% de desconto por pedir via WhatsApp: ${formatCurrency(totalComDesconto)}`;

  // Adicionar linha de economia apenas se for maior que R$ 0,00
  if (economia > 0) {
    message += `\nEconomia: ${formatCurrency(economia)}`;
  }

  message += `

Já vou te enviar o meu endereço completo, só um momento.

Aguardo o link de pagamento. Obrigado!`;

  return message;
}

/** Purpose: Open WhatsApp with pre-filled message */
export function openWhatsApp(message: string, phone?: string): void {
  const defaultPhone = "+5511957937762";
  const phoneNumber = phone || defaultPhone;
  
  // Codificar a mensagem completa com emojis preservados
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(url, "_blank");
}

/** Purpose: Track analytics events */
export function trackEvent(
  eventName: string,
  properties?: Record<string, any>,
): void {
  // TODO: Replace with actual analytics ID
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, properties);
  }

  // Fallback to console for development
  console.log("Analytics Event:", eventName, properties);
}

/** Purpose: Save coupon to localStorage */
export function saveCoupon(couponCode: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("solusix_coupon", couponCode);
    localStorage.setItem(
      "solusix_coupon_expiry",
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    );
  }
}

/** Purpose: Get saved coupon from localStorage */
export function getSavedCoupon(): string | null {
  if (typeof window !== "undefined") {
    const coupon = localStorage.getItem("solusix_coupon");
    const expiry = localStorage.getItem("solusix_coupon_expiry");

    if (coupon && expiry && new Date(expiry) > new Date()) {
      return coupon;
    }

    // Clear expired coupon
    localStorage.removeItem("solusix_coupon");
    localStorage.removeItem("solusix_coupon_expiry");
  }

  return null;
}

// Viewport utilities for mobile responsiveness
export const getViewportInfo = () => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
      pixelRatio: 1,
      isHighDPI: false,
      isTablet: false,
      isMobile: false,
      orientation: 'portrait' as const
    }
  }

  const width = window.innerWidth
  const height = window.innerHeight
  const pixelRatio = window.devicePixelRatio || 1
  const isHighDPI = pixelRatio >= 2
  const isTablet = width >= 768 && width <= 1024
  const isMobile = width < 768
  const orientation = width > height ? 'landscape' : 'portrait'

  return {
    width,
    height,
    pixelRatio,
    isHighDPI,
    isTablet,
    isMobile,
    orientation
  }
}

// Calculate safe menu height considering various factors
export const calculateMenuHeight = (viewportHeight: number, headerHeight: number = 64) => {
  const safeMargin = 16
  const maxHeight = viewportHeight - headerHeight - safeMargin
  
  // Ensure minimum height for usability
  const minHeight = 200
  const calculatedHeight = Math.max(maxHeight, minHeight)
  
  return `min(${calculatedHeight}px, calc(100vh - ${headerHeight + safeMargin}px))`
}

// Detect if device supports visualViewport API
export const supportsVisualViewport = () => {
  return typeof window !== 'undefined' && 'visualViewport' in window
}

// Get current visual viewport height (accounts for keyboard on mobile)
export const getVisualViewportHeight = () => {
  if (typeof window === 'undefined') {
    return 0
  }
  
  if (supportsVisualViewport()) {
    return window.visualViewport?.height || window.innerHeight
  }
  return window.innerHeight
}

// Check if device is a high-resolution mobile device
export const isHighResMobile = () => {
  const info = getViewportInfo()
  return info.isMobile && info.isHighDPI && info.width >= 800 && info.width <= 1400
}

// Check if device is an ultra-high resolution device
export const isUltraHighRes = () => {
  const info = getViewportInfo()
  return info.width >= 1000 && info.height >= 2400 && info.isHighDPI
}
