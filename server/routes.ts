import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Product, Category, Seller, PriceHistory } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes all prefixed with /api
  
  // Categories endpoints
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:id", async (req, res) => {
    try {
      const category = await storage.getCategoryById(Number(req.params.id));
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Products endpoints
  app.get("/api/products", async (req, res) => {
    try {
      const { 
        category, 
        minPrice, 
        maxPrice, 
        rating, 
        sort = "recommended" 
      } = req.query;
      
      const filters: any = {};

      if (category && category !== "all") {
        // Find category by slug
        const categoryObj = await storage.getCategoryBySlug(category as string);
        if (categoryObj) {
          filters.categoryId = categoryObj.id;
        }
      }
      
      if (minPrice) {
        filters.minPrice = Number(minPrice);
      }
      
      if (maxPrice) {
        filters.maxPrice = Number(maxPrice);
      }
      
      if (rating && rating !== "all") {
        filters.minRating = Number(rating);
      }
      
      const products = await storage.getFilteredProducts(filters, sort as string);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  // Bulk products endpoint for retrieving multiple products by IDs
  app.post("/api/products/bulk", async (req, res) => {
    try {
      const { productIds } = req.body;
      
      if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
        return res.status(400).json({ message: "Valid product IDs array is required" });
      }
      
      const products = await Promise.all(
        productIds.map(id => storage.getProductById(Number(id)))
      );
      
      // Filter out any null values (products not found)
      const validProducts = products.filter(product => product !== undefined);
      
      res.json(validProducts);
    } catch (error) {
      console.error("Error fetching bulk products:", error);
      res.status(500).json({ message: "Failed to fetch bulk products" });
    }
  });

  app.get("/api/products/similar/:id", async (req, res) => {
    try {
      const productId = Number(req.params.id);
      const product = await storage.getProductById(productId);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const similarProducts = await storage.getSimilarProducts(productId, product.categoryId);
      res.json(similarProducts);
    } catch (error) {
      console.error("Error fetching similar products:", error);
      res.status(500).json({ message: "Failed to fetch similar products" });
    }
  });

  app.get("/api/categories/:id/products", async (req, res) => {
    try {
      const categoryId = Number(req.params.id);
      const products = await storage.getProductsByCategory(categoryId);
      res.json(products);
    } catch (error) {
      console.error("Error fetching category products:", error);
      res.status(500).json({ message: "Failed to fetch category products" });
    }
  });

  // Price history endpoints
  app.get("/api/products/:id/price-history", async (req, res) => {
    try {
      const productId = Number(req.params.id);
      const priceHistory = await storage.getProductPriceHistory(productId);
      res.json(priceHistory);
    } catch (error) {
      console.error("Error fetching price history:", error);
      res.status(500).json({ message: "Failed to fetch price history" });
    }
  });

  // Sellers endpoints
  app.get("/api/sellers/:id", async (req, res) => {
    try {
      const seller = await storage.getSellerById(Number(req.params.id));
      if (!seller) {
        return res.status(404).json({ message: "Seller not found" });
      }
      res.json(seller);
    } catch (error) {
      console.error("Error fetching seller:", error);
      res.status(500).json({ message: "Failed to fetch seller" });
    }
  });

  // User interactions endpoints
  app.post("/api/interactions", async (req, res) => {
    try {
      const { productId, type } = req.body;
      
      if (!productId || !type) {
        return res.status(400).json({ message: "Product ID and interaction type are required" });
      }
      
      // For demo, we don't require authentication
      // In a real app, we would get the user ID from the authenticated session
      const userId = 1; // Demo user ID
      
      const interaction = await storage.recordUserInteraction(userId, productId, type);
      res.status(201).json(interaction);
    } catch (error) {
      console.error("Error recording interaction:", error);
      res.status(500).json({ message: "Failed to record interaction" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
