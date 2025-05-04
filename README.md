# Meesho Clone – Modernized E-commerce Platform (Hackathon Project)

This project is a modernized clone of the Meesho e-commerce platform, built as part of a hackathon submission. It includes a sleek, user-friendly interface and a variety of new features aimed at enhancing the shopping experience, offering users more control, transparency, and convenience while shopping.

## Key Features Added (Compared to Original Meesho)

### 1. Modern UI Overhaul
- Redesigned from the ground up with a clean, intuitive, and responsive interface.
- Tailwind CSS used for consistent design system and mobile responsiveness.

### 2. Product Comparison Tool
- Allows users to compare multiple products side-by-side (price, ratings, reviews, seller info, delivery time, etc.).
- Useful for making smarter buying decisions.

### 3. Price History Graph
- Shows historical pricing trends of a product.
- Helps users identify the right time to buy based on past discounts.

### 4. Price Drop Notifier
- Users can subscribe to a product to get notified when its price drops.
- Real-time email or in-app alerts available (basic implementation).

### 5. AI-Powered Recommendations
- Recommends similar products or “frequently bought together” items.
- Tailored based on user interaction data.

### 6. Personalized Feed
- Homepage dynamically adjusts to user behavior, past purchases, and interests.

### 7. AI Chatbot for Customer Support
- Smart chatbot integrated for resolving user queries and helping with order-related questions.

### 8. Profile Page
- Displays user-specific data including saved items, past views, and personalized suggestions.

## Tech Stack

- **Frontend**: React + Tailwind CSS + TypeScript
- **Backend**: Node.js (Express) + Drizzle ORM
- **Database**: SQLite/PostgreSQL (via Drizzle)
- **State Management**: React Context API
- **Routing**: Wouter (React lightweight router)
- **Build Tool**: Vite
- **Deployment Environment**: Replit

## Sample Data

- A seeded database includes sample users and products (women's ethnic wear, home decor, electronics, etc.).
- Supports basic interaction tracking (views, wishlist actions, etc.).

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/kondurupriyanka/MeeshoPro.git

2. Install dependencies:
   ```bash
   npm install
   
3. Initialize the database:
   ```bash
   npm run db:push
   npm run db:seed

4. Start the app:
   ```bash 
   npm run dev

## License
This project is licensed under the MIT License – see the LICENSE file for details.

## Contributing
If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. Please ensure that you follow the code style and contribute with a clear explanation of your changes.

## Acknowledgements
- **React**: JavaScript library for building user interfaces.

- **Tailwind CSS**: A utility-first CSS framework for building modern websites.

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.

- **Drizzle ORM**: A lightweight ORM for interacting with databases.
