import { pgTable, text, serial, integer, boolean, json, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users, {
  username: (schema) => schema.min(3, "Username must be at least 3 characters"),
  password: (schema) => schema.min(6, "Password must be at least 6 characters"),
  email: (schema) => schema.email("Email must be valid"),
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCategorySchema = createInsertSchema(categories, {
  name: (schema) => schema.min(2, "Category name must be at least 2 characters"),
  slug: (schema) => schema.min(2, "Slug must be at least 2 characters"),
});

// Products table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: decimal("original_price", { precision: 10, scale: 2 }),
  images: json("images").$type<string[]>().notNull(),
  categoryId: integer("category_id").references(() => categories.id).notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  ratingCount: integer("rating_count").default(0),
  deliveryDays: integer("delivery_days").default(4),
  returnPolicy: text("return_policy").default("7 days"),
  sellerId: integer("seller_id").references(() => sellers.id).notNull(),
  featured: boolean("featured").default(false),
  inStock: boolean("in_stock").default(true),
  tags: json("tags").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProductSchema = createInsertSchema(products, {
  name: (schema) => schema.min(3, "Product name must be at least 3 characters"),
  description: (schema) => schema.min(10, "Description must be at least 10 characters"),
  price: (schema) => schema.refine((val) => parseFloat(val) > 0, "Price must be a positive number"),
});

// Price history table for tracking price changes
export const priceHistory = pgTable("price_history", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date").defaultNow().notNull(),
});

export const insertPriceHistorySchema = createInsertSchema(priceHistory);

// Sellers table
export const sellers = pgTable("sellers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  description: text("description"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  followerCount: integer("follower_count").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertSellerSchema = createInsertSchema(sellers, {
  name: (schema) => schema.min(2, "Seller name must be at least 2 characters"),
});

// Wishlist table
export const wishlists = pgTable("wishlists", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const insertWishlistSchema = createInsertSchema(wishlists);

// Cart table
export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCartSchema = createInsertSchema(carts);

// Cart items table
export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id").references(() => carts.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertCartItemSchema = createInsertSchema(cartItems, {
  quantity: (schema) => schema.refine((val) => val > 0, "Quantity must be a positive number"),
});

// User interactions history for personalized recommendations
export const userInteractions = pgTable("user_interactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  interactionType: text("interaction_type").notNull(), // view, wishlist, cart, purchase
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserInteractionSchema = createInsertSchema(userInteractions);

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  wishlists: many(wishlists),
  interactions: many(userInteractions),
  carts: many(carts),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  seller: one(sellers, { fields: [products.sellerId], references: [sellers.id] }),
  priceHistory: many(priceHistory),
  wishlists: many(wishlists),
  cartItems: many(cartItems),
  interactions: many(userInteractions),
}));

export const sellersRelations = relations(sellers, ({ many }) => ({
  products: many(products),
}));

export const wishlistsRelations = relations(wishlists, ({ one }) => ({
  user: one(users, { fields: [wishlists.userId], references: [users.id] }),
  product: one(products, { fields: [wishlists.productId], references: [products.id] }),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  user: one(users, { fields: [carts.userId], references: [users.id] }),
  items: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, { fields: [cartItems.cartId], references: [carts.id] }),
  product: one(products, { fields: [cartItems.productId], references: [products.id] }),
}));

export const userInteractionsRelations = relations(userInteractions, ({ one }) => ({
  user: one(users, { fields: [userInteractions.userId], references: [users.id] }),
  product: one(products, { fields: [userInteractions.productId], references: [products.id] }),
}));

export const priceHistoryRelations = relations(priceHistory, ({ one }) => ({
  product: one(products, { fields: [priceHistory.productId], references: [products.id] }),
}));

// Export type definitions
export type User = typeof users.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type PriceHistory = typeof priceHistory.$inferSelect;
export type Seller = typeof sellers.$inferSelect;
export type Wishlist = typeof wishlists.$inferSelect;
export type Cart = typeof carts.$inferSelect;
export type CartItem = typeof cartItems.$inferSelect;
export type UserInteraction = typeof userInteractions.$inferSelect;

// Export schemas for validation
export const categoriesSelectSchema = createSelectSchema(categories);
export const productsSelectSchema = createSelectSchema(products);
export const sellersSelectSchema = createSelectSchema(sellers);
export const priceHistorySelectSchema = createSelectSchema(priceHistory);
export const wishlistsSelectSchema = createSelectSchema(wishlists);
export const cartsSelectSchema = createSelectSchema(carts);
export const cartItemsSelectSchema = createSelectSchema(cartItems);
export const userInteractionsSelectSchema = createSelectSchema(userInteractions);
