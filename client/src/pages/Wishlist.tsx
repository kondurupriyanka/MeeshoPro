import { useState, useEffect } from "react";
import { Link } from "wouter";
import MainLayout from "@/layouts/MainLayout";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useWishlistStore, useCartStore } from "@/lib/context";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { X, ShoppingCart, ChevronLeft, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SortOption = "recommended" | "price_low" | "price_high" | "discount" | "rating";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState<SortOption>("recommended");
  const [sortedItems, setSortedItems] = useState<Product[]>([]);

  // Apply sorting when items or sort option changes
  useEffect(() => {
    const sorted = [...items];
    
    switch (sortBy) {
      case "price_low":
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_high":
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "discount":
        sorted.sort((a, b) => {
          const discountA = a.originalPrice ? calculateDiscountPercentage(a.originalPrice, a.price) : 0;
          const discountB = b.originalPrice ? calculateDiscountPercentage(b.originalPrice, b.price) : 0;
          return discountB - discountA;
        });
        break;
      case "rating":
        sorted.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
      default:
        // No sorting for recommended (could implement more complex logic here)
        break;
    }
    
    setSortedItems(sorted);
  }, [items, sortBy]);

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your wishlist",
      duration: 2000,
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
      duration: 2000,
    });
  };

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your wishlist?")) {
      clearWishlist();
      toast({
        title: "Wishlist cleared",
        description: "All items have been removed from your wishlist",
        duration: 2000,
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/">
                  <a className="text-gray-500 hover:text-primary text-sm">Home</a>
                </Link>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm ml-1">Wishlist</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="font-heading text-2xl md:text-3xl font-semibold text-neutral-dark">
            My Wishlist
          </h1>
          <div className="flex items-center space-x-4">
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                  <SelectItem value="discount">Biggest Discount</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {items.length > 0 && (
              <Button 
                variant="outline" 
                className="text-red-500 hover:text-red-700"
                onClick={handleClearWishlist}
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {sortedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedItems.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="flex">
                  <div className="w-1/3">
                    <Link href={`/product/${product.slug}`}>
                      <a className="block h-full">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="w-2/3 p-4">
                    <div className="flex justify-between">
                      <Link href={`/product/${product.slug}`}>
                        <a className="font-medium text-neutral-dark hover:text-primary truncate mr-2">
                          {product.name}
                        </a>
                      </Link>
                      <button 
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-1 text-sm">
                      <div className="flex items-center text-yellow-500">
                        <span>{product.rating}</span>
                        <Star className="h-3 w-3 ml-1 fill-current" />
                      </div>
                      <span className="text-gray-500 ml-2">({product.ratingCount})</span>
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex items-center">
                        <span className="font-semibold">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <>
                            <span className="text-gray-400 line-through text-sm ml-2">
                              {formatPrice(product.originalPrice)}
                            </span>
                            <span className="text-green-600 text-sm ml-2">
                              {calculateDiscountPercentage(product.originalPrice, product.price)}% off
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      className="w-full mt-3 btn-secondary"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Save your favorite items to keep track of them easily</p>
            <Link href="/products">
              <Button className="btn-primary">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Wishlist;
