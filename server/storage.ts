import { db } from "@db";
import { eq, and, or, desc, gte, lte, inArray, like, sql } from "drizzle-orm";
import { 
  products, 
  categories, 
  sellers, 
  priceHistory, 
  userInteractions,
  Product,
  Category,
  Seller,
  PriceHistory,
  UserInteraction
} from "@shared/schema";

export const storage = {
  // Category methods
  async getAllCategories(): Promise<Category[]> {
    return db.query.categories.findMany({
      orderBy: categories.name
    });
  },

  async getCategoryById(id: number): Promise<Category | undefined> {
    return db.query.categories.findFirst({
      where: eq(categories.id, id)
    });
  },

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return db.query.categories.findFirst({
      where: eq(categories.slug, slug)
    });
  },

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return db.query.products.findMany({
      orderBy: desc(products.featured)
    });
  },

  async getProductById(id: number): Promise<Product | undefined> {
    return db.query.products.findFirst({
      where: eq(products.id, id)
    });
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return db.query.products.findFirst({
      where: eq(products.slug, slug)
    });
  },

  async getFilteredProducts(filters: any, sort: string = "recommended"): Promise<Product[]> {
    let query = db.select().from(products);
    
    // Apply filters
    if (filters.categoryId) {
      query = query.where(eq(products.categoryId, filters.categoryId));
    }
    
    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      query = query.where(and(
        gte(products.price, filters.minPrice.toString()),
        lte(products.price, filters.maxPrice.toString())
      ));
    } else if (filters.minPrice !== undefined) {
      query = query.where(gte(products.price, filters.minPrice.toString()));
    } else if (filters.maxPrice !== undefined) {
      query = query.where(lte(products.price, filters.maxPrice.toString()));
    }
    
    if (filters.minRating) {
      query = query.where(gte(products.rating, filters.minRating.toString()));
    }
    
    // Apply sorting
    switch (sort) {
      case "price_low":
        query = query.orderBy(products.price);
        break;
      case "price_high":
        query = query.orderBy(desc(products.price));
        break;
      case "popular":
        query = query.orderBy(desc(products.ratingCount));
        break;
      case "rating":
        query = query.orderBy(desc(products.rating));
        break;
      default:
        // Default sorting by featured status and then by id
        query = query.orderBy(desc(products.featured), desc(products.id));
        break;
    }
    
    return query;
  },

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return db.query.products.findMany({
      where: eq(products.categoryId, categoryId),
      orderBy: [desc(products.featured), desc(products.rating)]
    });
  },

  async getSimilarProducts(productId: number, categoryId: number): Promise<Product[]> {
    // Find products in the same category, excluding the current product
    return db.query.products.findMany({
      where: and(
        eq(products.categoryId, categoryId),
        sql`${products.id} != ${productId}`
      ),
      orderBy: [desc(products.rating), desc(products.ratingCount)],
      limit: 5
    });
  },

  async searchProducts(searchTerm: string): Promise<Product[]> {
    const likePattern = `%${searchTerm}%`;
    return db.query.products.findMany({
      where: or(
        like(products.name, likePattern),
        like(products.description, likePattern)
      ),
      orderBy: [desc(products.featured), desc(products.rating)]
    });
  },

  // Seller methods
  async getSellerById(id: number): Promise<Seller | undefined> {
    return db.query.sellers.findFirst({
      where: eq(sellers.id, id)
    });
  },

  // Price history methods
  async getProductPriceHistory(productId: number): Promise<PriceHistory[]> {
    return db.query.priceHistory.findMany({
      where: eq(priceHistory.productId, productId),
      orderBy: priceHistory.date
    });
  },

  // User interactions methods
  async recordUserInteraction(
    userId: number, 
    productId: number, 
    type: string
  ): Promise<UserInteraction> {
    // Check if the product exists
    const product = await this.getProductById(productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`);
    }
    
    // Insert interaction
    const [interaction] = await db.insert(userInteractions)
      .values({
        userId,
        productId,
        interactionType: type,
      })
      .returning();
    
    return interaction;
  },

  async getUserInteractions(userId: number): Promise<UserInteraction[]> {
    return db.query.userInteractions.findMany({
      where: eq(userInteractions.userId, userId),
      orderBy: desc(userInteractions.createdAt)
    });
  }
};
