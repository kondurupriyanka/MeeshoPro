import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/layouts/MainLayout";
import { UserInteraction, Product } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { Link } from "wouter";
import { useCartStore, useWishlistStore, useUserStore } from "@/lib/context";

const Profile = () => {
  const { interactions } = useUserStore();
  const [recentProductIds, setRecentProductIds] = useState<number[]>([]);
  
  // Get unique, recent product IDs from view interactions, limited to last 10
  useEffect(() => {
    const viewInteractions = interactions
      .filter(interaction => interaction.type === 'view')
      .sort((a, b) => {
        const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
        const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
        return dateB - dateA; // Most recent first
      });
      
    const uniqueIds = Array.from(new Set(
      viewInteractions.map(interaction => interaction.productId)
    )).slice(0, 10); // Get only first 10 unique products
    
    setRecentProductIds(uniqueIds);
  }, [interactions]);
  
  // Fetch recently viewed products
  const { data: recentProducts, isLoading: recentProductsLoading } = useQuery<Product[]>({
    queryKey: ['/api/products/bulk', recentProductIds],
    queryFn: async () => {
      if (recentProductIds.length === 0) return [];
      try {
        return await apiRequest('POST', '/api/products/bulk', { productIds: recentProductIds });
      } catch (error) {
        console.error('Error fetching recent products:', error);
        return [];
      }
    },
    enabled: recentProductIds.length > 0,
  });
  
  const { items: wishlistItems } = useWishlistStore();
  const { items: cartItems } = useCartStore();
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="recently-viewed">Recently Viewed</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-2">Account Information</h2>
                <p className="text-gray-600 mb-4">Demo User</p>
                <p className="text-gray-600 mb-4">demo@example.com</p>
                <Button className="w-full">Edit Profile</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-2">Wishlist</h2>
                <p className="text-gray-600 mb-4">{wishlistItems.length} items in your wishlist</p>
                <Link href="/wishlist">
                  <Button className="w-full">View Wishlist</Button>
                </Link>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-2">Cart</h2>
                <p className="text-gray-600 mb-4">{cartItems.length} items in your cart</p>
                <Link href="/cart">
                  <Button className="w-full">View Cart</Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>
              {recentProductsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 h-40 rounded-md mb-2"></div>
                      <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                      <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : recentProducts && recentProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {recentProducts.slice(0, 5).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recently viewed products</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">My Orders</h2>
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="recently-viewed">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Recently Viewed Products</h2>
              {recentProductsLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, index) => (
                    <div key={index} className="animate-pulse">
                      <div className="bg-gray-200 h-60 rounded-md mb-2"></div>
                      <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                      <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : recentProducts && recentProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {recentProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recently viewed products</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="interactions">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Recent Interactions</h2>
              {interactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
                        <th className="py-2 px-4 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {interactions.slice(0, 50).map((interaction, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 text-sm text-gray-800">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold 
                              ${interaction.type === 'view' ? 'bg-blue-100 text-blue-800' : 
                                interaction.type === 'wishlist' ? 'bg-pink-100 text-pink-800' :
                                interaction.type === 'cart' ? 'bg-green-100 text-green-800' : 
                                'bg-purple-100 text-purple-800'}`}>
                              {interaction.type}
                            </span>
                          </td>
                          <td className="py-2 px-4 text-sm text-gray-600">{interaction.productId}</td>
                          <td className="py-2 px-4 text-sm text-gray-600">
                            {interaction.timestamp ? formatDate(interaction.timestamp) : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">No interactions recorded yet.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;