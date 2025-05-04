import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useMobile } from "@/hooks/use-mobile";
import { 
  Search,
  Download,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore, useWishlistStore } from "@/lib/context";

const Header = () => {
  const [location] = useLocation();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { items: cartItems } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();

  // Track scrolling for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { name: "Women Ethnic", path: "/category/women-ethnic" },
    { name: "Women Western", path: "/category/women-western" },
    { name: "Men", path: "/category/men" },
    { name: "Kids", path: "/category/kids" },
    { name: "Home & Kitchen", path: "/category/home-kitchen" },
    { name: "Beauty & Health", path: "/category/beauty-health" },
    { name: "Jewellery", path: "/category/jewellery" },
    { name: "Footwear", path: "/category/footwear" },
  ];

  return (
    <header className={`bg-white sticky top-0 z-50 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <a className="text-primary font-heading font-bold text-2xl">ModernMeesho</a>
            </Link>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 mx-12">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, categories, and more..."
                className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300"
              />
              <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/app-download">
              <a className="text-neutral-dark hover:text-primary transition duration-200 flex items-center">
                <Download className="mr-1 h-4 w-4" />
                <span>App</span>
              </a>
            </Link>
            <Link href="/profile">
              <a className="text-neutral-dark hover:text-primary transition duration-200 flex items-center">
                <User className="mr-1 h-4 w-4" />
                <span>Profile</span>
              </a>
            </Link>
            <Link href="/wishlist">
              <a className="text-neutral-dark hover:text-primary transition duration-200 flex items-center relative">
                <Heart className="mr-1 h-4 w-4" />
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {wishlistItems.length}
                  </span>
                )}
              </a>
            </Link>
            <Link href="/cart">
              <a className="text-neutral-dark hover:text-primary transition duration-200 flex items-center relative">
                <ShoppingCart className="mr-1 h-4 w-4" />
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </span>
                )}
              </a>
            </Link>
          </nav>
          
          {/* Mobile Nav Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        
        {/* Search Bar - Mobile */}
        <div className="md:hidden py-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for products..."
              className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300"
            />
            <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <nav className="flex flex-col space-y-4 py-4">
              <Link href="/app-download">
                <a className="text-neutral-dark hover:text-primary transition duration-200 px-4 py-2">
                  <Download className="inline-block mr-2 h-5 w-5" /> 
                  <span>Download App</span>
                </a>
              </Link>
              <Link href="/profile">
                <a className="text-neutral-dark hover:text-primary transition duration-200 px-4 py-2">
                  <User className="inline-block mr-2 h-5 w-5" /> 
                  <span>Profile</span>
                </a>
              </Link>
              <Link href="/wishlist">
                <a className="text-neutral-dark hover:text-primary transition duration-200 px-4 py-2">
                  <Heart className="inline-block mr-2 h-5 w-5" /> 
                  <span>Wishlist</span>
                </a>
              </Link>
              <Link href="/cart">
                <a className="text-neutral-dark hover:text-primary transition duration-200 px-4 py-2">
                  <ShoppingCart className="inline-block mr-2 h-5 w-5" /> 
                  <span>Cart</span>
                </a>
              </Link>
            </nav>
          </div>
        )}
      </div>
      
      {/* Categories Navigation */}
      <div className="bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 overflow-x-auto scrollbar-hide py-3">
            {categories.map((category, index) => (
              <Link key={index} href={category.path}>
                <a className={`text-neutral-dark hover:text-primary whitespace-nowrap font-medium text-sm ${location === category.path ? 'text-primary' : ''}`}>
                  {category.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
