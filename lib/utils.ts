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

/** Purpose: Generate WhatsApp message with product details */
export function generateWhatsAppMessage(
  product: any,
  quantity: number = 1,
): string {
  const message = `Olá! Gostaria de solicitar ${quantity}x ${product.name} por R$ ${formatCurrency(product.price)} cada.`;
  return encodeURIComponent(message);
}

/** Purpose: Open WhatsApp with pre-filled message */
export function openWhatsApp(message: string): void {
  const phone = "+5511957937762";
  const url = `https://wa.me/${phone}?text=${message}`;
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
