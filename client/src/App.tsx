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
import Profile from "@/pages/Profile";
import StaticPage from "@/pages/StaticPage";

import { CartProvider, WishlistProvider, UserInteractionProvider } from "./lib/context";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/category/:slug" component={ProductListing} />
      <Route path="/product/:slug" component={ProductDetail} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/cart" component={Cart} />
      <Route path="/profile" component={Profile} />
      
      {/* Static category pages */}
      <Route path="/women-ethnic">
        {() => <StaticPage pageType="category" />}
      </Route>
      <Route path="/women-western">
        {() => <StaticPage pageType="category" />}
      </Route>
      <Route path="/men">
        {() => <StaticPage pageType="category" />}
      </Route>
      <Route path="/kids">
        {() => <StaticPage pageType="category" />}
      </Route>
      <Route path="/home-kitchen">
        {() => <StaticPage pageType="category" />}
      </Route>
      
      {/* Policy pages */}
      <Route path="/return-policy">
        {() => <StaticPage pageType="policy" />}
      </Route>
      <Route path="/terms-of-use">
        {() => <StaticPage pageType="policy" />}
      </Route>
      <Route path="/privacy-policy">
        {() => <StaticPage pageType="policy" />}
      </Route>
      <Route path="/cancellation-policy">
        {() => <StaticPage pageType="policy" />}
      </Route>
      <Route path="/shipping-info">
        {() => <StaticPage pageType="policy" />}
      </Route>
      
      {/* Info pages */}
      <Route path="/about-us">
        {() => <StaticPage pageType="info" />}
      </Route>
      <Route path="/careers">
        {() => <StaticPage pageType="info" />}
      </Route>
      <Route path="/blog">
        {() => <StaticPage pageType="info" />}
      </Route>
      <Route path="/help-support">
        {() => <StaticPage pageType="info" />}
      </Route>
      <Route path="/become-seller">
        {() => <StaticPage pageType="info" />}
      </Route>
      
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
