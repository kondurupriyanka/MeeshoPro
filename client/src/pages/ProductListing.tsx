import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import MainLayout from "@/layouts/MainLayout";
import ProductCard from "@/components/ProductCard";
import { Product, Category } from "@shared/schema";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProductListing = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const categorySlug = location.split("/").pop() || "";
  
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    rating: "all", // all, 4, 3, 2
    category: categorySlug,
    sort: "recommended", // recommended, price_low, price_high, new, popular
  });

  // Fetch all categories
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  // Fetch products with filters
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [`/api/products`, filters],
  });

  // Find current category from categories
  const currentCategory = categories?.find(cat => cat.slug === categorySlug);

  // Apply client-side filtering and sorting
  const filteredProducts = products ? products.filter(product => {
    const price = Number(product.price);
    const productRating = Number(product.rating);
    
    // Price filter
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false;
    }
    
    // Rating filter
    if (filters.rating !== "all" && productRating < Number(filters.rating)) {
      return false;
    }
    
    return true;
  }) : [];

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sort) {
      case "price_low":
        return Number(a.price) - Number(b.price);
      case "price_high":
        return Number(b.price) - Number(a.price);
      case "popular":
        return Number(b.ratingCount) - Number(a.ratingCount);
      default:
        return 0; // recommended or default sorting
    }
  });

  const handlePriceChange = (value: number[]) => {
    setFilters({ ...filters, priceRange: value });
  };

  const handleRatingChange = (rating: string) => {
    if (rating === filters.rating) {
      setFilters({ ...filters, rating: "all" });
    } else {
      setFilters({ ...filters, rating: rating });
    }
  };

  const handleSortChange = (value: string) => {
    setFilters({ ...filters, sort: value });
  };

  const renderFilters = () => (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div>
        <h3 className="font-medium text-neutral-dark mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 5000]}
          min={0}
          max={5000}
          step={100}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h3 className="font-medium text-neutral-dark mb-4">Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2].map((rating) => (
            <div key={rating} className="flex items-center">
              <Checkbox
                id={`rating-${rating}`}
                checked={filters.rating === rating.toString()}
                onCheckedChange={() => handleRatingChange(rating.toString())}
              />
              <Label htmlFor={`rating-${rating}`} className="ml-2 flex items-center">
                {rating}+ <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Categories on mobile */}
      {isMobile && categories && categories.length > 0 && (
        <div>
          <h3 className="font-medium text-neutral-dark mb-4">Categories</h3>
          <Accordion type="single" collapsible>
            <AccordionItem value="categories">
              <AccordionTrigger>Browse Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={filters.category === category.slug}
                        onCheckedChange={() => {
                          window.location.href = `/category/${category.slug}`;
                        }}
                      />
                      <Label htmlFor={`category-${category.id}`} className="ml-2">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )}
    </div>
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="text-gray-500 hover:text-primary text-sm">
                  Home
                </a>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-3 h-3 text-gray-400 mx-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700 text-sm ml-1">
                    {currentCategory?.name || 'Products'}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0 pr-8">
            <h2 className="font-heading text-xl font-semibold text-neutral-dark mb-6">Filters</h2>
            {renderFilters()}
          </div>

          {/* Products with top filters */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-neutral-dark mb-4 lg:mb-0">
                {currentCategory?.name || 'All Products'}
              </h1>

              <div className="flex items-center w-full md:w-auto space-x-4">
                {/* Mobile filters button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                      {renderFilters()}
                    </div>
                    <SheetClose asChild>
                      <Button className="w-full mt-4">Apply Filters</Button>
                    </SheetClose>
                  </SheetContent>
                </Sheet>

                {/* Sort dropdown */}
                <div className="flex-1 md:flex-none">
                  <Select
                    value={filters.sort}
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="price_low">Price: Low to High</SelectItem>
                        <SelectItem value="price_high">Price: High to Low</SelectItem>
                        <SelectItem value="popular">Popularity</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Products grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse h-72" />
                ))}
              </div>
            ) : sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <h3 className="text-lg font-medium text-neutral-dark mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters or browse other categories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductListing;
