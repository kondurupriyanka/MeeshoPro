import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import PriceHistoryChart from "@/components/PriceHistoryChart";
import ProductComparison from "@/components/ProductComparison";
import TryOnPreview from "@/components/TryOnPreview";
import { Product, Category, Seller } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Truck, RotateCcw, Store, Star } from "lucide-react";
import { useCartStore, useWishlistStore, useUserStore } from "@/lib/context";
import { apiRequest } from "@/lib/queryClient";

// Import the ProductCard component
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const params = useParams<{ slug: string }>();
  const { slug } = params;
  
  const { addToCart } = useCartStore();
  const { addToWishlist, items: wishlistItems } = useWishlistStore();
  const { trackInteraction } = useUserStore();

  const [activeImage, setActiveImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const viewRecorded = useRef(false);

  // Fetch product details
  const { data: product, isLoading: productLoading } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });

  // Fetch category
  const { data: category } = useQuery<Category>({
    queryKey: [`/api/categories/${product?.categoryId}`],
    enabled: !!product?.categoryId,
  });

  // Fetch seller
  const { data: seller } = useQuery<Seller>({
    queryKey: [`/api/sellers/${product?.sellerId}`],
    enabled: !!product?.sellerId,
  });

  // Fetch similar products
  const { data: similarProducts } = useQuery<Product[]>({
    queryKey: [`/api/products/similar/${product?.id}`],
    enabled: !!product?.id,
  });

  // Track that the user viewed this product
  useEffect(() => {
    const recordProductView = async () => {
      if (product?.id && !viewRecorded.current) {
        // Set flag to prevent multiple recordings
        viewRecorded.current = true;
        
        // Record view interaction in local context
        trackInteraction({
          productId: product.id,
          type: 'view',
        });

        // Track API call
        try {
          await apiRequest('POST', '/api/interactions', {
            productId: product.id,
            type: 'view',
          });
        } catch (error) {
          console.error('Error recording view:', error);
        }
      }
    };

    recordProductView();
    
    // Only run this effect once when product ID is available
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]); // Only depend on product.id, not trackInteraction to avoid re-renders

  // Check if the product is in the wishlist
  useEffect(() => {
    if (product?.id && wishlistItems) {
      const inWishlist = wishlistItems.some(item => item.id === product.id);
      setIsWishlisted(inWishlist);
    }
  }, [product?.id, wishlistItems]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      trackInteraction({
        productId: product.id,
        type: 'cart',
      });
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      if (isWishlisted) {
        // Logic to remove from wishlist
        setIsWishlisted(false);
      } else {
        addToWishlist(product);
        trackInteraction({
          productId: product.id,
          type: 'wishlist',
        });
        setIsWishlisted(true);
      }
    }
  };

  if (productLoading || !product) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row animate-pulse">
            {/* Product Images Skeleton */}
            <div className="lg:w-2/5 mb-8 lg:mb-0">
              <div className="bg-gray-200 rounded-lg h-96 w-full mb-4"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-md h-24 w-full"></div>
                ))}
              </div>
            </div>
            
            {/* Product Details Skeleton */}
            <div className="lg:w-3/5 lg:pl-8">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-48 bg-gray-200 rounded w-full mb-6"></div>
              <div className="flex space-x-4">
                <div className="h-12 bg-gray-200 rounded w-full"></div>
                <div className="h-12 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Calculate discount percentage
  const discountPercentage = product.originalPrice
    ? Math.round(((Number(product.originalPrice) - Number(product.price)) / Number(product.originalPrice)) * 100)
    : 0;

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/">
                <a className="text-gray-500 hover:text-primary text-sm">Home</a>
              </Link>
            </li>
            {category && (
              <li>
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link href={`/category/${category.slug}`}>
                    <a className="text-gray-500 hover:text-primary text-sm ml-1">{category.name}</a>
                  </Link>
                </div>
              </li>
            )}
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700 text-sm ml-1">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>

      {/* Product Detail */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row">
          {/* Product Images */}
          <div className="lg:w-2/5 mb-8 lg:mb-0">
            <div className="grid grid-cols-1 gap-4">
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <img 
                  src={product.images[activeImage]} 
                  alt={product.name} 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`rounded-md overflow-hidden border border-gray-200 cursor-pointer ${activeImage === index ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} thumbnail ${index + 1}`} 
                      className="w-full h-24 object-cover" 
                    />
                  </div>
                ))}
              </div>
              
              {/* Try-On Preview Button */}
              {category && (
                <TryOnPreview 
                  productImages={product.images} 
                  productName={product.name} 
                  category={category.slug} 
                />
              )}
            </div>
          </div>
          
          {/* Product Details */}
          <div className="lg:w-3/5 lg:pl-8">
            <h1 className="font-heading text-2xl md:text-3xl font-semibold text-neutral-dark mb-2">
              {product.name}
            </h1>
            <div className="flex items-center mb-4">
              <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                <span className="text-green-700 font-medium">{product.rating}</span>
                <Star className="h-3 w-3 ml-1 fill-green-700 text-green-700" />
              </div>
              <span className="text-gray-500 text-sm ml-2">{product.ratingCount} Ratings</span>
            </div>
            
            <div className="flex items-center mb-4">
              <span className="text-neutral-dark text-2xl font-semibold">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-400 line-through text-lg ml-3">₹{product.originalPrice}</span>
                  <span className="text-green-600 ml-3">{discountPercentage}% OFF</span>
                </>
              )}
            </div>
            
            <Tabs defaultValue="details" className="mb-6">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="description">Description</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <ul className="text-gray-600 space-y-2">
                  <li><span className="font-medium">Category:</span> {category?.name}</li>
                  <li><span className="font-medium">Delivery Days:</span> {product.deliveryDays} days</li>
                  <li><span className="font-medium">Return Policy:</span> {product.returnPolicy}</li>
                  {product.tags && product.tags.length > 0 && (
                    <li>
                      <span className="font-medium">Tags:</span> {product.tags.join(", ")}
                    </li>
                  )}
                </ul>
              </TabsContent>
              <TabsContent value="description" className="mt-4">
                <p className="text-gray-600">{product.description}</p>
              </TabsContent>
            </Tabs>
            
            {/* Price History Graph */}
            <PriceHistoryChart productId={product.id} />
            
            <div className="mb-6">
              <h3 className="font-medium text-neutral-dark mb-2">Delivery & Returns</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Truck className="mr-2 h-4 w-4" />
                <span>Delivery in {product.deliveryDays} days</span>
              </div>
              <div className="flex items-center text-gray-600">
                <RotateCcw className="mr-2 h-4 w-4" />
                <span>{product.returnPolicy} Easy Returns</span>
              </div>
            </div>
            
            {seller && (
              <div className="mb-6">
                <h3 className="font-medium text-neutral-dark mb-2">Seller Information</h3>
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <Store className="text-neutral-dark h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-neutral-dark">{seller.name}</div>
                    <div className="flex items-center text-sm">
                      <div className="flex items-center text-green-700 mr-2">
                        <span>{seller.rating}</span>
                        <Star className="h-3 w-3 ml-1 fill-green-700 text-green-700" />
                      </div>
                      <span className="text-gray-500">{seller.followerCount} followers</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-4">
              <Button 
                className="flex-1 btn-secondary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button 
                className={`flex-1 ${isWishlisted ? 'bg-pink-100 text-primary hover:bg-pink-200 border border-primary' : 'btn-primary'}`}
                onClick={handleToggleWishlist}
              >
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Comparison */}
      {product && product.categoryId && (
        <ProductComparison product={product} categoryId={product.categoryId} />
      )}

      {/* Recommendations */}
      {similarProducts && similarProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-neutral-dark mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {similarProducts.slice(0, 5).map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} />
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ProductDetail;
