import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Category, Product } from "@shared/schema";
import MainLayout from "@/layouts/MainLayout";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/context";

const Home = () => {
  const { trackInteraction, interactions } = useUserStore();
  const [personalized, setPersonalized] = useState<Product[]>([]);

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch products
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  // Sort products based on user interactions
  useEffect(() => {
    if (products) {
      // Create a copy of products to avoid mutating the query cache
      const productsCopy = [...products];
      
      // If there are user interactions, sort products based on them
      if (interactions.length > 0) {
        // Count interactions by category
        const categoryInteractions: Record<number, number> = {};
        
        interactions.forEach(interaction => {
          const product = products.find(p => p.id === interaction.productId);
          if (product) {
            categoryInteractions[product.categoryId] = 
              (categoryInteractions[product.categoryId] || 0) + 1;
          }
        });
        
        // Sort products by category interaction count
        productsCopy.sort((a, b) => {
          const aCount = categoryInteractions[a.categoryId] || 0;
          const bCount = categoryInteractions[b.categoryId] || 0;
          return bCount - aCount;
        });
      }
      
      // Take the first 8 products
      setPersonalized(productsCopy.slice(0, 8));
    }
  }, [products, interactions]);

  // Featured categories display
  const renderCategories = () => {
    if (categoriesLoading) {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse h-32" />
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories?.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    );
  };

  // Products display
  const renderProducts = () => {
    if (productsLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse h-72" />
          ))}
        </div>
      );
    }

    const displayProducts = personalized.length > 0 ? personalized : products?.slice(0, 8);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayProducts?.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
          />
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-50 to-blue-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark leading-tight mb-4">
                Lowest Prices on <span className="text-primary">Fashion & Lifestyle</span>
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                Discover the latest trends at unbeatable prices with free delivery on your first order!
              </p>
              <div className="flex space-x-4">
                <Link href="/category/women-ethnic">
                  <Button className="btn-primary px-6 py-3">Shop Now</Button>
                </Link>
                <Link href="/app-download">
                  <Button variant="outline" className="px-6 py-3">Download App</Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                alt="Fashion models showcasing trendy outfits" 
                className="rounded-lg shadow-lg w-full h-auto object-cover" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-neutral-dark mb-8">
            Top Categories
          </h2>
          {renderCategories()}
        </div>
      </section>

      {/* Personalized Products Feed */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-neutral-dark">
              {personalized.length > 0 ? "Personalized For You" : "Featured Products"}
            </h2>
            <Link href="/products">
              <a className="text-primary font-medium hover:underline">View All</a>
            </Link>
          </div>
          {renderProducts()}
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
