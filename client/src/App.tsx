import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";

// Page imports
import Home from "@/pages/Home";
import ProductListing from "@/pages/ProductListing";
import ProductDetail from "@/pages/ProductDetail";
import Wishlist from "@/pages/Wishlist";
import Cart from "@/pages/Cart";

import { CartProvider, WishlistProvider, UserInteractionProvider } from "./lib/context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={ProductListing} />
      <Route path="/product/:slug" component={ProductDetail} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/cart" component={Cart} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserInteractionProvider>
        <WishlistProvider>
          <CartProvider>
            <Router />
            <Toaster />
          </CartProvider>
        </WishlistProvider>
      </UserInteractionProvider>
    </QueryClientProvider>
  );
}

export default App;
