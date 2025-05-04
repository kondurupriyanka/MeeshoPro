import { useState } from "react";
import { Link } from "wouter";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/context";
import { formatPrice } from "@/lib/utils";
import { 
  Trash2, 
  Minus, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, cartTotal } = useCartStore();
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const deliveryCharge = cartTotal > 499 ? 0 : 49;
  const totalAmount = cartTotal + deliveryCharge - couponDiscount;

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
      duration: 2000,
    });
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
        duration: 2000,
      });
    }
  };

  const handleApplyCoupon = () => {
    // Simulate coupon validation
    if (couponCode.toUpperCase() === "DISCOUNT20") {
      const discount = cartTotal * 0.2; // 20% discount
      setCouponDiscount(discount);
      setCouponApplied(true);
      toast({
        title: "Coupon applied",
        description: "You got 20% discount on your order!",
        duration: 2000,
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is invalid or expired",
        variant: "destructive",
        duration: 2000,
      });
    }
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "This is a demo checkout process. In a real implementation, you would be redirected to a payment gateway.",
      duration: 3000,
    });
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
                  <span className="text-gray-700 text-sm ml-1">Shopping Cart</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-neutral-dark mb-6">
          Your Shopping Cart
        </h1>

        {items.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="lg:w-8/12">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="font-semibold text-lg">Cart Items ({items.length})</h2>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700"
                    onClick={handleClearCart}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Clear All
                  </Button>
                </div>

                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.id} className="flex p-4">
                      <div className="w-24 h-24">
                        <Link href={`/product/${item.slug}`}>
                          <a>
                            <img 
                              src={item.images[0]} 
                              alt={item.name} 
                              className="w-full h-full object-cover rounded"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <Link href={`/product/${item.slug}`}>
                            <a className="font-medium text-neutral-dark hover:text-primary">
                              {item.name}
                            </a>
                          </Link>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Seller: {item.sellerId}
                        </div>
                        <div className="flex justify-between items-end mt-2">
                          <div className="font-semibold">
                            {formatPrice(Number(item.price) * item.quantity)}
                            {item.originalPrice && (
                              <span className="text-gray-400 line-through text-sm ml-2">
                                {formatPrice(Number(item.originalPrice) * item.quantity)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center border border-gray-200 rounded">
                            <button 
                              className="px-2 py-1 border-r border-gray-200 text-gray-500 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button 
                              className="px-2 py-1 border-l border-gray-200 text-gray-500 hover:bg-gray-100"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Link href="/category/women-ethnic">
                  <Button variant="outline" className="flex items-center">
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-4/12">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-lg">Order Summary</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>{formatPrice(cartTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Charge</span>
                      <span>
                        {deliveryCharge === 0 
                          ? <span className="text-green-600">Free</span> 
                          : formatPrice(deliveryCharge)
                        }
                      </span>
                    </div>
                    
                    {couponApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span>-{formatPrice(couponDiscount)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>{formatPrice(totalAmount)}</span>
                      </div>
                    </div>
                    
                    {!couponApplied && (
                      <div className="pt-3">
                        <div className="text-sm font-medium mb-2">Apply Coupon</div>
                        <div className="flex">
                          <Input
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter coupon code"
                            className="rounded-r-none"
                          />
                          <Button 
                            onClick={handleApplyCoupon}
                            className="rounded-l-none"
                            disabled={!couponCode}
                          >
                            Apply
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Try using code "DISCOUNT20" for 20% off
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      className="w-full btn-primary mt-4"
                      onClick={handleCheckout}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="mb-4">
              <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet</p>
            <Link href="/">
              <Button className="btn-primary">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
