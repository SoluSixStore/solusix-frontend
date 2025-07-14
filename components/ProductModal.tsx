import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  formatCurrency,
  generateWhatsAppMessage,
  openWhatsApp,
  trackEvent,
} from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Truck, Star } from "lucide-react";
import { useState } from "react";

/** Purpose: Modal component for detailed product view */
interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage(product, quantity);
    trackEvent("product_whatsapp_order", {
      product_id: product.id,
      quantity,
      price: product.price,
    });
    openWhatsApp(message);
    onClose();
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-navy">{product.name}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    {/* TODO: Replace with actual product image */}
                    <div className="text-gray-400 text-center">
                      <div className="text-2xl mb-2">📦</div>
                      <div className="text-sm">Imagem do produto</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2">
                    {product.isNew && <Badge variant="new">NEW</Badge>}
                    {discount > 0 && (
                      <Badge variant="off">-{discount}% OFF</Badge>
                    )}
                    <Badge variant="premium">Premium</Badge>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  {/* Price */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl font-bold text-navy">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xl text-gray-400 line-through">
                          {formatCurrency(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600">{product.description}</p>
                  </div>

                  {/* Features */}
                  {product.features && (
                    <div>
                      <h3 className="font-semibold text-navy mb-3">
                        Características
                      </h3>
                      <ul className="space-y-2">
                        {product.features.map(
                          (feature: string, index: number) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-gray-600"
                            >
                              <Star className="w-4 h-4 text-lime" />
                              {feature}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Specifications */}
                  {product.specs && (
                    <div>
                      <h3 className="font-semibold text-navy mb-3">
                        Especificações
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500 capitalize">
                              {key}
                            </div>
                            <div className="font-medium text-navy">
                              {value as string}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price per liter table */}
                  <div>
                    <h3 className="font-semibold text-navy mb-3">
                      Preço por litro
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">{product.name}</span>
                        <span className="font-bold text-navy">
                          {formatCurrency(product.pricePerLiter)}/L
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Order */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantidade
                      </label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-16 text-center font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <Button
                      onClick={handleWhatsAppOrder}
                      variant="primary"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Pedir via WhatsApp
                    </Button>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Truck className="w-4 h-4 text-lime" />
                      Entrega em 48h nas capitais
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
