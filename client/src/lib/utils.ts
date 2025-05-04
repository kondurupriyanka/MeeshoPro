import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price with currency
export function formatPrice(price: number | string): string {
  if (typeof price === 'string') {
    price = parseFloat(price);
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(price);
}

// Calculate discount percentage
export function calculateDiscountPercentage(originalPrice: number | string, discountedPrice: number | string): number {
  const original = typeof originalPrice === 'string' ? parseFloat(originalPrice) : originalPrice;
  const discounted = typeof discountedPrice === 'string' ? parseFloat(discountedPrice) : discountedPrice;
  
  if (!original || !discounted || original <= 0) return 0;
  
  return Math.round(((original - discounted) / original) * 100);
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Convert date to formatted string
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

// Generate array of date strings for the last N days
export function getLastNDaysLabels(days: number): string[] {
  const result = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    result.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  
  return result;
}

// Generate a random price history array
export function generateMockPriceHistory(
  originalPrice: number,
  currentPrice: number,
  days: number = 30
): number[] {
  const result = [];
  
  // First 10 days at original price
  for (let i = 0; i < 10; i++) {
    result.push(originalPrice);
  }
  
  // Next 10 days gradual decrease
  const midPrice = originalPrice - ((originalPrice - currentPrice) * 0.4);
  for (let i = 0; i < 10; i++) {
    const variation = Math.random() * 20 - 10;
    result.push(Math.max(currentPrice, Math.round(midPrice + variation)));
  }
  
  // Final 10 days at current price
  for (let i = 0; i < 10; i++) {
    const variation = Math.random() * 20 - 10;
    result.push(Math.max(currentPrice, Math.round(currentPrice + variation)));
  }
  
  return result.slice(0, days);
}

// Sort products by different criteria
export function sortProducts<T extends { price: string | number, rating: string | number, ratingCount: number }>(
  products: T[],
  sortBy: 'price_low' | 'price_high' | 'rating' | 'popularity' | 'recommended'
): T[] {
  const productsCopy = [...products];
  
  switch (sortBy) {
    case 'price_low':
      return productsCopy.sort((a, b) => Number(a.price) - Number(b.price));
    case 'price_high':
      return productsCopy.sort((a, b) => Number(b.price) - Number(a.price));
    case 'rating':
      return productsCopy.sort((a, b) => Number(b.rating) - Number(a.rating));
    case 'popularity':
      return productsCopy.sort((a, b) => b.ratingCount - a.ratingCount);
    case 'recommended':
    default:
      // For recommended, we could implement more complex logic based on factors
      // like popularity, rating, and user interaction, but for now just return
      // as is or with a basic sort
      return productsCopy;
  }
}

// Filter products by price range and rating
export function filterProducts<T extends { price: string | number, rating: string | number }>(
  products: T[],
  priceRange: [number, number],
  minRating: number | null
): T[] {
  return products.filter(product => {
    const price = Number(product.price);
    const rating = Number(product.rating);
    
    const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
    const matchesRating = minRating === null || rating >= minRating;
    
    return matchesPrice && matchesRating;
  });
}
