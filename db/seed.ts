import { db } from "./index";
import * as schema from "@shared/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    console.log("Starting database seeding...");

    // Check if there are any categories already
    const existingCategories = await db.query.categories.findMany();
    if (existingCategories.length > 0) {
      console.log(`Found ${existingCategories.length} existing categories, skipping category seeding`);
    } else {
      // Seed categories
      console.log("Seeding categories...");
      const categories = [
        {
          name: "Sarees",
          slug: "sarees",
          description: "Beautiful traditional and modern sarees",
          image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Kurtis",
          slug: "kurtis",
          description: "Stylish and comfortable kurtis for all occasions",
          image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "T-Shirts",
          slug: "t-shirts",
          description: "Casual and comfortable t-shirts for men",
          image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Accessories",
          slug: "accessories",
          description: "Fashion accessories to complete your look",
          image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Dresses",
          slug: "dresses",
          description: "Elegant dresses for women",
          image: "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Footwear",
          slug: "footwear",
          description: "Comfortable and stylish footwear",
          image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        },
      ];

      const insertedCategories = await db.insert(schema.categories).values(categories).returning();
      console.log(`Inserted ${insertedCategories.length} categories`);
    }

    // Check if there are any sellers already
    const existingSellers = await db.query.sellers.findMany();
    if (existingSellers.length > 0) {
      console.log(`Found ${existingSellers.length} existing sellers, skipping seller seeding`);
    } else {
      // Seed sellers
      console.log("Seeding sellers...");
      const sellers = [
        {
          name: "Fashion Bazaar",
          description: "Top fashion seller with excellent quality",
          rating: "4.5",
          followerCount: 10238,
        },
        {
          name: "StyleHub",
          description: "Trendy fashion for all ages",
          rating: "4.2",
          followerCount: 7654,
        },
        {
          name: "Silk India",
          description: "Authentic silk products from all over India",
          rating: "4.7",
          followerCount: 8945,
        },
        {
          name: "Ethnic Warehouse",
          description: "Traditional ethnic wear for all occasions",
          rating: "4.3",
          followerCount: 6721,
        },
        {
          name: "Fashion Forward",
          description: "Latest fashion trends at affordable prices",
          rating: "4.1",
          followerCount: 5489,
        },
      ];

      const insertedSellers = await db.insert(schema.sellers).values(sellers).returning();
      console.log(`Inserted ${insertedSellers.length} sellers`);
    }

    // Get categories and sellers for product references
    const allCategories = await db.query.categories.findMany();
    const allSellers = await db.query.sellers.findMany();

    if (!allCategories.length || !allSellers.length) {
      throw new Error("Categories or sellers not found, cannot seed products");
    }

    // Function to find category ID by slug
    const getCategoryId = (slug: string) => {
      const category = allCategories.find(c => c.slug === slug);
      if (!category) throw new Error(`Category with slug ${slug} not found`);
      return category.id;
    };

    // Function to find seller ID by name
    const getSellerId = (name: string) => {
      const seller = allSellers.find(s => s.name === name);
      if (!seller) throw new Error(`Seller with name ${name} not found`);
      return seller.id;
    };

    // Check if there are any products already
    const existingProducts = await db.query.products.findMany();
    if (existingProducts.length > 0) {
      console.log(`Found ${existingProducts.length} existing products, skipping product seeding`);
    } else {
      // Seed products
      console.log("Seeding products...");
      const products = [
        {
          name: "Floral Print Saree",
          slug: "floral-print-saree",
          description: "Beautiful floral print saree with blouse piece. Made of high-quality Poly Georgette material.",
          price: "499",
          originalPrice: "799",
          images: [
            "https://images.unsplash.com/photo-1614251055880-ee96e4803393?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
            "https://images.unsplash.com/photo-1583391733981-8498e83cbe2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
            "https://images.unsplash.com/photo-1614251054968-9a8f5d2c8354?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
          ],
          categoryId: getCategoryId("sarees"),
          rating: "4.2",
          ratingCount: 1245,
          deliveryDays: 3,
          returnPolicy: "7 days",
          sellerId: getSellerId("Fashion Bazaar"),
          featured: true,
          tags: ["floral", "poly georgette", "saree", "traditional"],
        },
        {
          name: "Embroidered Kurti",
          slug: "embroidered-kurti",
          description: "Beautiful embroidered kurti for women. Perfect for casual and formal occasions.",
          price: "699",
          originalPrice: "899",
          images: [
            "https://images.unsplash.com/photo-1605763240000-7e93b172d754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          ],
          categoryId: getCategoryId("kurtis"),
          rating: "4.5",
          ratingCount: 879,
          deliveryDays: 2,
          returnPolicy: "10 days",
          sellerId: getSellerId("StyleHub"),
          featured: true,
          tags: ["embroidered", "kurti", "casual", "formal"],
        },
        {
          name: "Men's Casual Shirt",
          slug: "mens-casual-shirt",
          description: "Comfortable casual shirt for men. Made of 100% cotton for maximum comfort.",
          price: "599",
          originalPrice: "699",
          images: [
            "https://images.unsplash.com/photo-1529720317453-c8da503f2051?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          ],
          categoryId: getCategoryId("t-shirts"),
          rating: "4.0",
          ratingCount: 562,
          deliveryDays: 3,
          returnPolicy: "7 days",
          sellerId: getSellerId("Fashion Forward"),
          featured: true,
          tags: ["men", "casual", "shirt", "cotton"],
        },
        {
          name: "Pearl Jewelry Set",
          slug: "pearl-jewelry-set",
          description: "Elegant pearl jewelry set including necklace and earrings. Perfect for special occasions.",
          price: "399",
          originalPrice: "599",
          images: [
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          ],
          categoryId: getCategoryId("accessories"),
          rating: "4.8",
          ratingCount: 327,
          deliveryDays: 2,
          returnPolicy: "15 days",
          sellerId: getSellerId("Fashion Bazaar"),
          featured: true,
          tags: ["pearl", "jewelry", "necklace", "earrings"],
        },
        {
          name: "Printed Georgette Saree",
          slug: "printed-georgette-saree",
          description: "Beautiful printed georgette saree with matching blouse piece. Perfect for parties and functions.",
          price: "549",
          originalPrice: "799",
          images: [
            "https://images.unsplash.com/photo-1603487742131-4160ec999306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          ],
          categoryId: getCategoryId("sarees"),
          rating: "3.9",
          ratingCount: 421,
          deliveryDays: 2,
          returnPolicy: "7 days",
          sellerId: getSellerId("StyleHub"),
          featured: false,
          tags: ["printed", "georgette", "saree", "party"],
        },
        {
          name: "Embroidered Silk Saree",
          slug: "embroidered-silk-saree",
          description: "Luxurious embroidered silk saree with blouse piece. Perfect for weddings and special occasions.",
          price: "899",
          originalPrice: "1299",
          images: [
            "https://images.unsplash.com/photo-1583391733981-8498e83cbe2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          ],
          categoryId: getCategoryId("sarees"),
          rating: "4.7",
          ratingCount: 682,
          deliveryDays: 4,
          returnPolicy: "10 days",
          sellerId: getSellerId("Silk India"),
          featured: false,
          tags: ["embroidered", "silk", "saree", "wedding"],
        },
        {
          name: "Cotton Silk Saree",
          slug: "cotton-silk-saree",
          description: "Comfortable cotton silk saree with blouse piece. Perfect for daily wear and office wear.",
          price: "649",
          originalPrice: "899",
          images: [
            "https://images.unsplash.com/photo-1583391733981-8498e83cbe2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          ],
          categoryId: getCategoryId("sarees"),
          rating: "4.3",
          ratingCount: 359,
          deliveryDays: 3,
          returnPolicy: "7 days",
          sellerId: getSellerId("Ethnic Warehouse"),
          featured: false,
          tags: ["cotton", "silk", "saree", "daily wear"],
        },
        {
          name: "Red Wedding Saree",
          slug: "red-wedding-saree",
          description: "Beautiful red saree for weddings and special occasions. Comes with matching blouse piece.",
          price: "1299",
          originalPrice: "1999",
          images: [
            "https://images.unsplash.com/photo-1583931704300-364f5efddeaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          ],
          categoryId: getCategoryId("sarees"),
          rating: "4.8",
          ratingCount: 754,
          deliveryDays: 5,
          returnPolicy: "10 days",
          sellerId: getSellerId("Silk India"),
          featured: false,
          tags: ["red", "wedding", "saree", "special occasion"],
        },
        {
          name: "Traditional Banarasi Saree",
          slug: "traditional-banarasi-saree",
          description: "Traditional Banarasi saree with rich zari work. Perfect for weddings and festive occasions.",
          price: "1499",
          originalPrice: "2299",
          images: [
            "https://images.unsplash.com/photo-1585944158583-bb32c2ac4e92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          ],
          categoryId: getCategoryId("sarees"),
          rating: "4.6",
          ratingCount: 528,
          deliveryDays: 4,
          returnPolicy: "15 days",
          sellerId: getSellerId("Ethnic Warehouse"),
          featured: false,
          tags: ["banarasi", "zari", "saree", "traditional", "wedding"],
        },
        {
          name: "Casual Cotton Kurta",
          slug: "casual-cotton-kurta",
          description: "Comfortable casual cotton kurta for women. Perfect for daily wear.",
          price: "399",
          originalPrice: "599",
          images: [
            "https://images.unsplash.com/photo-1585944158583-bb32c2ac4e92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
          ],
          categoryId: getCategoryId("kurtis"),
          rating: "4.2",
          ratingCount: 421,
          deliveryDays: 2,
          returnPolicy: "7 days",
          sellerId: getSellerId("StyleHub"),
          featured: false,
          tags: ["casual", "cotton", "kurta", "daily wear"],
        }
      ];

      const insertedProducts = await db.insert(schema.products).values(products).returning();
      console.log(`Inserted ${insertedProducts.length} products`);

      // Seed price history for each product
      console.log("Seeding price history...");
      const now = new Date();
      
      for (const product of insertedProducts) {
        const originalPrice = Number(product.originalPrice);
        const currentPrice = Number(product.price);
        const priceHistoryRecords = [];

        // Create price history for the last 30 days
        for (let i = 29; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(now.getDate() - i);

          let price;
          if (i > 20) {
            // Original price for first 10 days
            price = originalPrice;
          } else if (i > 10) {
            // First price drop
            price = originalPrice - (originalPrice - currentPrice) * 0.4;
          } else {
            // Final price drop
            price = currentPrice;
          }

          // Add slight variation to make the graph more interesting
          const variation = Math.random() * 20 - 10;
          price = Math.max(currentPrice, Math.round(price + variation));

          priceHistoryRecords.push({
            productId: product.id,
            price: price.toString(),
            date,
          });
        }

        await db.insert(schema.priceHistory).values(priceHistoryRecords);
      }

      console.log("Price history created for all products");
    }

    console.log("Database seeding completed successfully");
  } catch (error) {
    console.error("Error during database seeding:", error);
  }
}

seed();
