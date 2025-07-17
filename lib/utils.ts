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
