import { useState } from "react";
import { Link } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, useWishlistStore } from "@/lib/context";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist } = useWishlistStore();

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    
    setIsWishlisted(!isWishlisted);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice && product.price
    ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)
    : 0;

  return (
    <Link href={`/product/${product.slug}`}>
      <a className={`product-card ${className}`}>
        <div className="relative">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-64 object-cover"
          />
          <button 
            className={`absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center ${isWishlisted ? 'text-primary' : 'text-neutral-dark hover:text-primary'} transition duration-200`}
            onClick={handleToggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
          {discountPercentage > 0 && (
            <div className="badge-sale">
              {discountPercentage}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-neutral-dark truncate">{product.name}</h3>
            <div className="rating-badge">
              <span>{product.rating}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3 w-3 ml-1 text-green-700" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <span className="text-neutral-dark font-semibold">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through text-sm ml-2">₹{product.originalPrice}</span>
            )}
          </div>
          <div className="text-xs text-gray-500 mb-2">
            Free delivery
          </div>
          <Button 
            className="w-full btn-secondary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
