import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/context";
import { Star } from "lucide-react";

interface ProductComparisonProps {
  product: Product;
  categoryId: number;
}

const ProductComparison: React.FC<ProductComparisonProps> = ({ product, categoryId }) => {
  const { addToCart } = useCartStore();
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  
  // Fetch similar products for comparison
  const { data: similarProducts } = useQuery<Product[]>({
    queryKey: [`/api/categories/${categoryId}/products`],
  });

  useEffect(() => {
    if (similarProducts && similarProducts.length > 0) {
      // Filter out the current product and get 2 similar products
      const filtered = similarProducts
        .filter(p => p.id !== product.id)
        .slice(0, 2);
      
      // Set the current product as the first item
      setCompareProducts([product, ...filtered]);
    }
  }, [similarProducts, product]);

  if (compareProducts.length < 2) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-neutral-dark mb-8">
          Compare Similar Products
        </h2>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 border-b border-gray-200 font-medium text-neutral-dark w-1/4">
                    Product
                  </th>
                  {compareProducts.map((compareProduct) => (
                    <th key={compareProduct.id} className="py-4 px-4 border-b border-gray-200 font-medium text-neutral-dark w-1/4">
                      <div className="flex flex-col items-center">
                        <img 
                          src={compareProduct.images[0]} 
                          alt={compareProduct.name} 
                          className="w-20 h-20 object-cover rounded-md mb-2" 
                        />
                        <span className="text-center">{compareProduct.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-4 px-4 border-b border-gray-200 font-medium text-neutral-dark">
                    Price
                  </td>
                  {compareProducts.map((compareProduct) => (
                    <td key={`price-${compareProduct.id}`} className="py-4 px-4 border-b border-gray-200 text-center">
                      ₹{compareProduct.price}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 border-b border-gray-200 font-medium text-neutral-dark">
                    Rating
                  </td>
                  {compareProducts.map((compareProduct) => (
                    <td key={`rating-${compareProduct.id}`} className="py-4 px-4 border-b border-gray-200 text-center">
                      <div className="flex items-center justify-center">
                        <span>{compareProduct.rating}</span>
                        <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 border-b border-gray-200 font-medium text-neutral-dark">
                    Delivery
                  </td>
                  {compareProducts.map((compareProduct) => (
                    <td key={`delivery-${compareProduct.id}`} className="py-4 px-4 border-b border-gray-200 text-center">
                      {compareProduct.deliveryDays}-{compareProduct.deliveryDays + 1} Days
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 border-b border-gray-200 font-medium text-neutral-dark">
                    Return Policy
                  </td>
                  {compareProducts.map((compareProduct) => (
                    <td key={`return-${compareProduct.id}`} className="py-4 px-4 border-b border-gray-200 text-center">
                      {compareProduct.returnPolicy}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-neutral-dark"></td>
                  {compareProducts.map((compareProduct) => (
                    <td key={`action-${compareProduct.id}`} className="py-4 px-4 text-center">
                      <Button 
                        className="btn-secondary"
                        onClick={() => addToCart(compareProduct)}
                      >
                        Add to Cart
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductComparison;
