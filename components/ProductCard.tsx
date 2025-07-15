import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

/** Purpose: Product card component for catalog display */
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isNew?: boolean;
    description: string;
    specs?: Record<string, string | undefined>;
  };
  onProductClick: (product: any) => void;
  onWhatsAppClick: (product: any) => void;
}

export function ProductCard({
  product,
  onProductClick,
  onWhatsAppClick,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover overflow-hidden group"
    >
      {/* Product Image - Clickable */}
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={() => onProductClick(product)}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          priority={false}
          unoptimized={false}
        />

        {/* WhatsApp Discount Badge - Better positioned */}
        <div className="absolute top-4 right-4">
          <Badge variant="off" className="text-xs bg-red-500 text-white">-10% WhatsApp</Badge>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-navy mb-2 group-hover:text-lime transition-colors">
          {product.name}
        </h3>

        {/* Volume Badge */}
        {product.specs?.volume && (
          <div className="mb-2">
            <Badge variant="default" className="bg-blue-100 text-blue-800 text-xs">
              {product.specs.volume}
            </Badge>
          </div>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-navy">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onProductClick(product)}
            className="flex-1 bg-gray-100 text-navy py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            Ver detalhes
          </button>

          <button
            onClick={() => onWhatsAppClick(product)}
            className="bg-lime text-navy p-2 rounded-lg hover:bg-lime/90 transition-colors"
            title="Pedir via WhatsApp"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
