import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  formatCurrency,
  generateWhatsAppMessage,
  openWhatsApp,
  trackEvent,
} from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Truck, Star, MessageCircle, ExternalLink } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

/** Purpose: Modal component for detailed product view */
interface DetailedInfo {
  embalagem: string;
  diluicao: {
    dosadorVelocidade: string;
    dosadorConcentracao: string;
  };
  rendimento: string;
  destinatarios: string[];
  composicao: string;
  cuidados: string[];
  regulamentacoes: string[];
  armazenamento: string[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  features?: string[];
  specs?: Record<string, string | undefined>;
  pricePerLiter?: number;
  isNew?: boolean;
  detailedInfo?: DetailedInfo;
}

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);

  const handleWhatsAppOrder = () => {
    const discountedPrice = product.price * 0.9; // 10% desconto
    const message = generateWhatsAppMessage(product, quantity, discountedPrice);
    trackEvent("product_whatsapp_order", {
      product_id: product.id,
      quantity,
      price: discountedPrice,
      discount: 10,
    });
    openWhatsApp(message);
    onClose();
  };

  const handleMercadoLivreOrder = () => {
    trackEvent("product_mercadolivre_order", {
      product_id: product.id,
      quantity,
      price: product.price,
    });
    // Redirecionar para Mercado Livre (você precisará criar o anúncio)
    window.open(`https://www.mercadolivre.com.br/...`, "_blank");
    onClose();
  };

  const handleShopeeOrder = () => {
    trackEvent("product_shopee_order", {
      product_id: product.id,
      quantity,
      price: product.price,
    });
    // Redirecionar para Shopee (você precisará criar o anúncio)
    window.open(`https://www.shopee.com.br/...`, "_blank");
    onClose();
  };

  const whatsappPrice = product.price * 0.9; // 10% desconto

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
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={false}
                      unoptimized={false}
                    />
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
                    
                    {/* Volume Badge */}
                    {product.specs?.volume && (
                      <div className="mb-3">
                        <Badge variant="default" className="bg-blue-100 text-blue-800 text-sm">
                          Volume: {product.specs.volume}
                        </Badge>
                      </div>
                    )}
                    
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

                  {/* Detailed Information */}
                  {product.detailedInfo && (
                    <div className="space-y-6">
                      {/* Embalagem */}
                      <div>
                        <h3 className="font-semibold text-navy mb-2">Embalagem</h3>
                        <p className="text-gray-600">{product.detailedInfo.embalagem}</p>
                      </div>

                      {/* Diluição */}
                      <div>
                        <h3 className="font-semibold text-navy mb-2">Diluição</h3>
                        <div className="space-y-2">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Dosador de velocidade</div>
                            <div className="font-medium text-navy">{product.detailedInfo.diluicao.dosadorVelocidade}</div>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <div className="text-sm text-gray-500">Dosador de concentração</div>
                            <div className="font-medium text-navy">{product.detailedInfo.diluicao.dosadorConcentracao}</div>
                          </div>
                        </div>
                      </div>

                      {/* Rendimento */}
                      <div>
                        <h3 className="font-semibold text-navy mb-2">Rendimento</h3>
                        <p className="text-gray-600">{product.detailedInfo.rendimento}</p>
                      </div>

                      {/* A Quem se Destina */}
                      <div>
                        <h3 className="font-semibold text-navy mb-2">A Quem se Destina</h3>
                        <div className="flex flex-wrap gap-2">
                          {product.detailedInfo.destinatarios.map((destinatario, index) => (
                            <span key={index} className="bg-lime/20 text-navy px-2 py-1 rounded-full text-sm">
                              {destinatario}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Composição Química */}
                      <div>
                        <h3 className="font-semibold text-navy mb-2">Composição Química</h3>
                        <p className="text-gray-600">{product.detailedInfo.composicao}</p>
                      </div>

                      {/* Cuidados */}
                      <div>
                        <h3 className="font-semibold text-navy mb-2">Cuidados</h3>
                        <ul className="space-y-1">
                          {product.detailedInfo.cuidados.map((cuidado, index) => (
                            <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                              <span className="text-red-500 mt-1">⚠</span>
                              {cuidado}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Regulamentações */}
                      <div>
                        <h3 className="font-semibold text-navy mb-2">Regulamentações</h3>
                        <ul className="space-y-1">
                          {product.detailedInfo.regulamentacoes.map((regulamentacao, index) => (
                            <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                              <span className="text-green-500 mt-1">✓</span>
                              {regulamentacao}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Armazenamento */}
                      <div>
                        <h3 className="font-semibold text-navy mb-2">Armazenamento</h3>
                        <ul className="space-y-1">
                          {product.detailedInfo.armazenamento.map((item, index) => (
                            <li key={index} className="text-gray-600 text-sm flex items-start gap-2">
                              <span className="text-blue-500 mt-1">📦</span>
                              {item}
                            </li>
                          ))}
                        </ul>
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
                          {product.pricePerLiter ? formatCurrency(product.pricePerLiter) : 'N/A'}/L
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

                    {/* WhatsApp Order - Com desconto */}
                    <div className="space-y-2">
                      <Button
                        onClick={handleWhatsAppOrder}
                        variant="primary"
                        size="lg"
                        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Pedir via WhatsApp
                      </Button>
                      <div className="text-center">
                        <span className="text-sm text-gray-600 line-through">
                          {formatCurrency(product.price * quantity)}
                        </span>
                        <span className="text-sm font-bold text-green-600 ml-2">
                          {formatCurrency(whatsappPrice * quantity)} (10% OFF)
                        </span>
                      </div>
                    </div>

                    {/* Mercado Livre */}
                    <Button
                      onClick={handleMercadoLivreOrder}
                      variant="outline"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Comprar no Mercado Livre
                    </Button>

                    {/* Shopee */}
                    <Button
                      onClick={handleShopeeOrder}
                      variant="outline"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2 border-orange-400 text-orange-600 hover:bg-orange-50"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Comprar na Shopee
                    </Button>

                    {/* Entrega Info */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      <Truck className="w-4 h-4 text-lime" />
                      <div>
                        <div className="font-medium">Entrega via:</div>
                        <div className="text-xs">• WhatsApp: Retirada em domicílio ou envio pelos Correios</div>
                        <div className="text-xs">• Mercado Livre: Entrega da plataforma</div>
                        <div className="text-xs">• Shopee: Entrega da plataforma</div>
                      </div>
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
