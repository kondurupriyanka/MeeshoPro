import React from "react";
import MainLayout from "@/layouts/MainLayout";
import { useLocation } from "wouter";

interface StaticPageProps {
  pageType: 'category' | 'policy' | 'info';
}

interface PageData {
  title: string;
  content: React.ReactNode;
}

const StaticPage: React.FC<StaticPageProps> = ({ pageType }) => {
  const [location] = useLocation();
  // Extract the slug from the URL path (everything after the last /)
  const slug = location.substring(1); // Remove the leading slash
  
  // Define all page content by type and slug
  const pageData: Record<string, Record<string, PageData>> = {
    category: {
      'women-ethnic': {
        title: 'Women Ethnic Wear',
        content: (
          <div>
            <p className="mb-4">
              Discover our extensive collection of traditional and contemporary ethnic wear for women. From
              elegant sarees to comfortable salwar suits, we offer a diverse range of ethnic clothing
              that celebrates India's rich cultural heritage.
            </p>
            <h3 className="text-xl font-semibold mb-2">Our Collection Includes:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Sarees - Traditional, Designer, Party wear</li>
              <li>Salwar Suits - Anarkali, Palazzo, Patiala</li>
              <li>Kurtas & Kurtis - Casual, Formal, Festive</li>
              <li>Lehengas - Bridal, Party wear, Festival</li>
              <li>Blouses - Designer, Ready-to-wear</li>
              <li>Dupattas - Embroidered, Printed, Traditional</li>
            </ul>
            <p>
              We source directly from artisans and manufacturers to bring you authentic designs at
              affordable prices. Our ethnic wear combines traditional craftsmanship with modern styling
              to suit every occasion and preference.
            </p>
          </div>
        ),
      },
      'women-western': {
        title: 'Women Western Wear',
        content: (
          <div>
            <p className="mb-4">
              Explore our trendy collection of western wear for women. We offer contemporary styles that
              are perfect for everyday wear, special occasions, or professional settings.
            </p>
            <h3 className="text-xl font-semibold mb-2">Our Collection Includes:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Tops & T-shirts - Casual, Formal, Graphic</li>
              <li>Dresses - Maxi, Midi, Bodycon, A-line</li>
              <li>Jeans & Pants - Skinny, Bootcut, High-waisted</li>
              <li>Skirts - Mini, Midi, Maxi, Pleated</li>
              <li>Jumpsuits & Rompers - Casual, Party wear</li>
              <li>Blazers & Jackets - Formal, Casual</li>
            </ul>
            <p>
              Our western wear collection features the latest trends and timeless classics to help you
              create versatile outfits for any occasion. With attention to fit, comfort, and style,
              our pieces are designed to make you look and feel your best.
            </p>
          </div>
        ),
      },
      'men': {
        title: 'Men\'s Fashion',
        content: (
          <div>
            <p className="mb-4">
              Browse our comprehensive collection of men's fashion that combines style, comfort, and
              affordability. From casual wear to formal attire, we have everything to upgrade your wardrobe.
            </p>
            <h3 className="text-xl font-semibold mb-2">Our Collection Includes:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>T-shirts & Casual Shirts - Basic, Printed, Graphic</li>
              <li>Formal Shirts - Solid, Striped, Checkered</li>
              <li>Jeans & Trousers - Slim, Regular, Relaxed fit</li>
              <li>Ethnic Wear - Kurtas, Sherwanis, Nehru Jackets</li>
              <li>Winterwear - Sweaters, Jackets, Sweatshirts</li>
              <li>Activewear - T-shirts, Tracks, Shorts</li>
            </ul>
            <p>
              We offer a curated selection of men's clothing that balances quality, style, and value.
              Whether you're dressing for work, weekend outings, or special occasions, our collection
              has options to suit your lifestyle and preferences.
            </p>
          </div>
        ),
      },
      'kids': {
        title: 'Kids Fashion',
        content: (
          <div>
            <p className="mb-4">
              Discover adorable and comfortable clothing for children of all ages. Our kids' collection
              focuses on fun designs, comfortable fabrics, and durable construction.
            </p>
            <h3 className="text-xl font-semibold mb-2">Our Collection Includes:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Boys Clothing - T-shirts, Shirts, Pants, Jeans</li>
              <li>Girls Clothing - Dresses, Tops, Skirts, Leggings</li>
              <li>Ethnic Wear - Kurta sets, Lehengas, Sherwanis</li>
              <li>Infants & Toddlers - Bodysuits, Rompers, Sets</li>
              <li>Winterwear - Sweaters, Jackets, Sweatshirts</li>
              <li>Sleepwear - Pajamas, Nightgowns</li>
            </ul>
            <p>
              Our kids' fashion combines playful designs with practical features, ensuring your children
              look adorable while feeling comfortable. We prioritize safe materials and age-appropriate
              styles to make shopping for your little ones easy and enjoyable.
            </p>
          </div>
        ),
      },
      'home-kitchen': {
        title: 'Home & Kitchen',
        content: (
          <div>
            <p className="mb-4">
              Transform your living space with our extensive range of home decor, kitchen essentials,
              and household items. Find everything you need to create a comfortable and stylish home.
            </p>
            <h3 className="text-xl font-semibold mb-2">Our Collection Includes:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Bedding - Bed sheets, Comforters, Pillows</li>
              <li>Bath - Towels, Shower curtains, Bath accessories</li>
              <li>Kitchen & Dining - Cookware, Serveware, Utensils</li>
              <li>Home Decor - Cushions, Curtains, Wall art</li>
              <li>Storage & Organization - Baskets, Containers, Organizers</li>
              <li>Cleaning Supplies - Mops, Brushes, Cleaners</li>
            </ul>
            <p>
              Our home and kitchen collection offers practical solutions and decorative touches to
              enhance every room in your home. We curate products that combine functionality, durability,
              and aesthetic appeal to help you create a space that reflects your personal style.
            </p>
          </div>
        ),
      }
    },
    policy: {
      'return-policy': {
        title: 'Return Policy',
        content: (
          <div>
            <p className="mb-4">
              We want you to be completely satisfied with your purchase. If you're not happy with your
              order for any reason, we make returns easy.
            </p>
            <h3 className="text-xl font-semibold mb-2">Return Guidelines:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Returns are accepted within 30 days of delivery</li>
              <li>Products must be unused, unwashed, and in original packaging</li>
              <li>Original tags must be attached</li>
              <li>Provide your order number and reason for return</li>
              <li>Refunds will be processed within 7-10 business days after we receive the returned item</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Non-Returnable Items:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Intimate apparel and swimwear</li>
              <li>Personal care items</li>
              <li>Items marked as final sale</li>
              <li>Gift cards</li>
            </ul>
            <p>
              If you received a damaged or defective product, please contact our customer service team
              within 48 hours of delivery for immediate assistance.
            </p>
          </div>
        ),
      },
      'terms-of-use': {
        title: 'Terms of Use',
        content: (
          <div>
            <p className="mb-4">
              Welcome to Meesho! These Terms of Use govern your use of our website and services.
              By accessing or using our platform, you agree to comply with and be bound by these terms.
            </p>
            <h3 className="text-xl font-semibold mb-2">Account Registration:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
              <li>We reserve the right to suspend or terminate accounts that violate our policies</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Product Information:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>We strive to provide accurate product descriptions and images</li>
              <li>Colors may vary slightly due to photography and display settings</li>
              <li>Product availability is subject to change without notice</li>
              <li>Prices are subject to change without notice</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Intellectual Property:</h3>
            <p className="mb-4">
              All content on our website, including text, graphics, logos, images, and software, is the
              property of Meesho and is protected by copyright and other intellectual property laws.
              You may not reproduce, distribute, or create derivative works without our express permission.
            </p>
            <h3 className="text-xl font-semibold mb-2">Limitation of Liability:</h3>
            <p>
              To the fullest extent permitted by law, we disclaim all warranties and will not be liable
              for any damages arising from the use of our website or services. This includes direct,
              indirect, incidental, punitive, and consequential damages.
            </p>
          </div>
        ),
      },
      'privacy-policy': {
        title: 'Privacy Policy',
        content: (
          <div>
            <p className="mb-4">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our website or services.
            </p>
            <h3 className="text-xl font-semibold mb-2">Information We Collect:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Personal information (name, email address, phone number, shipping address)</li>
              <li>Payment information (processed through secure payment gateways)</li>
              <li>Account information (username, password)</li>
              <li>Usage data (browsing history, product preferences)</li>
              <li>Device information (IP address, browser type, operating system)</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">How We Use Your Information:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support</li>
              <li>Send transactional emails and order updates</li>
              <li>Improve our website and services</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Prevent fraud and enforce our policies</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Cookies and Tracking Technologies:</h3>
            <p className="mb-4">
              We use cookies and similar tracking technologies to track activity on our website and store
              certain information. You can instruct your browser to refuse all cookies or to indicate when
              a cookie is being sent. However, some features of our website may not function properly
              without cookies.
            </p>
            <h3 className="text-xl font-semibold mb-2">Data Security:</h3>
            <p>
              We implement appropriate security measures to protect your personal information. However,
              no method of transmission over the Internet or electronic storage is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </div>
        ),
      },
      'cancellation-policy': {
        title: 'Cancellation Policy',
        content: (
          <div>
            <p className="mb-4">
              We understand that circumstances may change, and you may need to cancel an order.
              Here's our policy regarding order cancellations.
            </p>
            <h3 className="text-xl font-semibold mb-2">Order Cancellation Guidelines:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Orders can be cancelled before they are shipped</li>
              <li>To cancel an order, go to your account's Order History and select the Cancel option</li>
              <li>For orders that have already been shipped, you'll need to follow our Return Policy</li>
              <li>Cancellation requests are processed within 24 hours</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Refunds for Cancelled Orders:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>For prepaid orders, refunds will be processed within 5-7 business days</li>
              <li>Refunds will be credited to the original payment method</li>
              <li>Bank processing times may vary depending on your financial institution</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Non-Cancellable Items:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Customized or personalized products</li>
              <li>Items marked as non-cancellable</li>
              <li>Flash sale or limited-time offer products</li>
            </ul>
            <p>
              If you need assistance with cancelling an order, please contact our customer support team
              as soon as possible.
            </p>
          </div>
        ),
      },
      'shipping-info': {
        title: 'Shipping Information',
        content: (
          <div>
            <p className="mb-4">
              We aim to deliver your orders promptly and securely. Here's important information about
              our shipping process and policies.
            </p>
            <h3 className="text-xl font-semibold mb-2">Shipping Timeframes:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Order processing takes 1-2 business days</li>
              <li>Standard shipping: 4-7 business days</li>
              <li>Express shipping: 2-3 business days (where available)</li>
              <li>Delivery timeframes may vary based on your location</li>
              <li>Shipping timeframes exclude weekends and holidays</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Shipping Costs:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Free standard shipping on orders above ₹499</li>
              <li>Standard shipping fee: ₹70 for orders below ₹499</li>
              <li>Express shipping: Additional ₹100 charge</li>
              <li>Remote areas may incur additional delivery charges</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Order Tracking:</h3>
            <p className="mb-4">
              Once your order is shipped, you'll receive a confirmation email with tracking information.
              You can also track your order status by logging into your account and viewing your Order History.
            </p>
            <h3 className="text-xl font-semibold mb-2">International Shipping:</h3>
            <p>
              Currently, we only ship within India. We plan to expand our shipping services to
              international destinations in the future.
            </p>
          </div>
        ),
      },
    },
    info: {
      'about-us': {
        title: 'About Us',
        content: (
          <div>
            <p className="mb-4">
              Welcome to Meesho, India's leading online marketplace connecting millions of customers
              with a wide range of products at affordable prices. Our platform empowers small businesses
              and individual entrepreneurs to reach customers across the country.
            </p>
            <h3 className="text-xl font-semibold mb-2">Our Story:</h3>
            <p className="mb-4">
              Founded in 2015, Meesho started with a vision to democratize e-commerce and make it accessible
              to everyone. We began by enabling women to become entrepreneurs by reselling products through
              social channels like WhatsApp and Facebook. Today, we've grown into a comprehensive marketplace
              serving customers directly while continuing to support our community of resellers.
            </p>
            <h3 className="text-xl font-semibold mb-2">Our Mission:</h3>
            <p className="mb-4">
              To make online shopping accessible and affordable for all Indians, while empowering small
              businesses and entrepreneurs to thrive in the digital economy.
            </p>
            <h3 className="text-xl font-semibold mb-2">What Sets Us Apart:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Affordable prices across a wide range of products</li>
              <li>Quality assurance and strict vendor selection</li>
              <li>Seamless shopping experience</li>
              <li>Reliable delivery network reaching even remote areas</li>
              <li>Strong community of resellers and entrepreneurs</li>
            </ul>
            <p>
              Today, Meesho connects millions of customers with hundreds of thousands of sellers across
              India. We're proud to be building a platform that democratizes e-commerce and contributes
              to the economic empowerment of individuals and small businesses.
            </p>
          </div>
        ),
      },
      'careers': {
        title: 'Careers',
        content: (
          <div>
            <p className="mb-4">
              Join our dynamic team and be part of India's fastest-growing e-commerce platform.
              At Meesho, we're building innovative solutions to democratize online shopping and
              empower entrepreneurs across the country.
            </p>
            <h3 className="text-xl font-semibold mb-2">Why Work With Us:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Impactful work that reaches millions of users</li>
              <li>Fast-paced learning environment</li>
              <li>Collaborative and inclusive culture</li>
              <li>Competitive compensation and benefits</li>
              <li>Career growth opportunities</li>
              <li>Work-life balance</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Our Values:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Customer First: We obsess over providing the best experience to our users</li>
              <li>Bias for Action: We move quickly and make decisions with appropriate urgency</li>
              <li>Integrity: We're honest, transparent, and committed to doing what's right</li>
              <li>Innovation: We constantly seek new and better ways to solve problems</li>
              <li>Inclusion: We value diverse perspectives and treat everyone with respect</li>
            </ul>
            <h3 className="text-xl font-semibold mb-2">Open Positions:</h3>
            <p className="mb-4">
              We're hiring across multiple departments including Engineering, Product, Design, Marketing,
              Operations, and Customer Support. Visit our careers page for current openings.
            </p>
            <div className="bg-primary-50 p-4 rounded-md border border-primary-100">
              <p className="font-medium text-primary">
                Interested in joining our team? Send your resume to careers@meesho.com with the position
                you're interested in as the subject line.
              </p>
            </div>
          </div>
        ),
      },
      'blog': {
        title: 'Blog',
        content: (
          <div>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-xl font-semibold mb-2">Latest Fashion Trends for Summer 2023</h3>
                <p className="text-sm text-gray-500 mb-2">June 15, 2023 | Fashion</p>
                <p className="mb-3">
                  As temperatures rise, it's time to refresh your wardrobe with the season's hottest trends.
                  From vibrant colors to breezy fabrics, here's what's trending this summer.
                </p>
                <a href="#" className="text-primary font-medium">Read More →</a>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-xl font-semibold mb-2">How to Start Your Reselling Business with Meesho</h3>
                <p className="text-sm text-gray-500 mb-2">May 28, 2023 | Entrepreneurship</p>
                <p className="mb-3">
                  Turn your social network into a source of income by becoming a Meesho reseller.
                  This step-by-step guide covers everything you need to know to start and grow your
                  online business.
                </p>
                <a href="#" className="text-primary font-medium">Read More →</a>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-xl font-semibold mb-2">5 Home Decor Ideas to Transform Your Space</h3>
                <p className="text-sm text-gray-500 mb-2">May 10, 2023 | Home & Living</p>
                <p className="mb-3">
                  Looking to refresh your living space? These affordable decor ideas can help you create
                  a stylish and comfortable home without breaking the bank. From statement pieces to
                  small accents, discover simple ways to elevate your home.
                </p>
                <a href="#" className="text-primary font-medium">Read More →</a>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-xl font-semibold mb-2">The Ultimate Guide to Ethnic Wear for Festive Season</h3>
                <p className="text-sm text-gray-500 mb-2">April 22, 2023 | Fashion</p>
                <p className="mb-3">
                  With the festive season approaching, it's time to prepare your wardrobe for celebrations.
                  From traditional sarees to contemporary fusion wear, explore our curated guide to
                  festive fashion for every occasion.
                </p>
                <a href="#" className="text-primary font-medium">Read More →</a>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Meesho Reaches 100 Million Users: Our Journey</h3>
                <p className="text-sm text-gray-500 mb-2">April 5, 2023 | Company News</p>
                <p className="mb-3">
                  We're thrilled to announce that Meesho has reached a milestone of 100 million users!
                  Learn about our journey, the challenges we've overcome, and our vision for the future
                  of e-commerce in India.
                </p>
                <a href="#" className="text-primary font-medium">Read More →</a>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <a href="#" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Fashion</a>
                <a href="#" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Entrepreneurship</a>
                <a href="#" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Home & Living</a>
                <a href="#" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Beauty</a>
                <a href="#" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">E-commerce</a>
                <a href="#" className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200">Company News</a>
              </div>
            </div>
          </div>
        ),
      },
      'help-support': {
        title: 'Help & Support',
        content: (
          <div>
            <p className="mb-4">
              We're here to help you with any questions or issues you might have. Get in touch with our
              customer support team or find answers to common questions below.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Contact Us:</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Customer Support</h4>
                <p className="text-sm text-gray-600 mb-1">Email: support@meesho.com</p>
                <p className="text-sm text-gray-600">Phone: 1800-123-4567 (Toll-free)</p>
                <p className="text-sm text-gray-600">Hours: 9 AM - 6 PM, Monday to Saturday</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Seller Support</h4>
                <p className="text-sm text-gray-600 mb-1">Email: sellers@meesho.com</p>
                <p className="text-sm text-gray-600">Phone: 1800-123-7890</p>
                <p className="text-sm text-gray-600">Hours: 10 AM - 7 PM, Monday to Friday</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Reseller Support</h4>
                <p className="text-sm text-gray-600 mb-1">Email: resellers@meesho.com</p>
                <p className="text-sm text-gray-600">Phone: 1800-123-8901</p>
                <p className="text-sm text-gray-600">Hours: 10 AM - 7 PM, Monday to Friday</p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">Frequently Asked Questions:</h3>
            <div className="space-y-4 mb-6">
              <div className="border-b pb-3">
                <h4 className="font-medium mb-1">How can I track my order?</h4>
                <p className="text-sm text-gray-600">
                  You can track your order by logging into your account and going to "My Orders"
                  section. Alternatively, you can use the tracking link sent in your shipping
                  confirmation email.
                </p>
              </div>
              
              <div className="border-b pb-3">
                <h4 className="font-medium mb-1">How do I return a product?</h4>
                <p className="text-sm text-gray-600">
                  To return a product, go to "My Orders" in your account, select the order containing
                  the item you want to return, and click on "Return." Follow the prompts to complete
                  the return process. Please note that returns must be initiated within 30 days of delivery.
                </p>
              </div>
              
              <div className="border-b pb-3">
                <h4 className="font-medium mb-1">When will I receive my refund?</h4>
                <p className="text-sm text-gray-600">
                  Once your returned item is received and inspected, we'll process your refund within
                  5-7 business days. The time it takes for the refund to appear in your account depends
                  on your payment method and bank processing times.
                </p>
              </div>
              
              <div className="border-b pb-3">
                <h4 className="font-medium mb-1">How do I become a seller on Meesho?</h4>
                <p className="text-sm text-gray-600">
                  To become a seller, visit our "Sell on Meesho" page and fill out the registration form.
                  Our team will review your application and guide you through the onboarding process.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">I received a damaged/incorrect product. What should I do?</h4>
                <p className="text-sm text-gray-600">
                  If you received a damaged or incorrect product, please contact our customer support
                  team within 48 hours of delivery. Please keep the product in its original packaging
                  and take photos of the issue for faster resolution.
                </p>
              </div>
            </div>
            
            <div className="bg-primary-50 p-4 rounded-md border border-primary-100">
              <p className="font-medium text-primary mb-2">Need more help?</p>
              <p className="text-sm">
                If you couldn't find the answer to your question, please get in touch with our
                customer support team. We're here to help!
              </p>
            </div>
          </div>
        ),
      },
      'become-seller': {
        title: 'Become a Seller',
        content: (
          <div>
            <p className="mb-4">
              Join thousands of successful sellers on Meesho and reach millions of customers across India.
              Our seller-friendly platform makes it easy to list, sell, and grow your business online.
            </p>
            
            <h3 className="text-xl font-semibold mb-2">Why Sell on Meesho?</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Wide Reach</h4>
                <p className="text-sm text-gray-600">
                  Access to over 100 million customers across 27,000+ pin codes in India.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Low Commissions</h4>
                <p className="text-sm text-gray-600">
                  Enjoy competitive commission rates and transparent fee structure.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Easy Onboarding</h4>
                <p className="text-sm text-gray-600">
                  Simple registration process and intuitive seller dashboard.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Efficient Logistics</h4>
                <p className="text-sm text-gray-600">
                  Hassle-free shipping with our nationwide logistics network.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Timely Payments</h4>
                <p className="text-sm text-gray-600">
                  Regular payment cycles with direct bank transfers.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Seller Support</h4>
                <p className="text-sm text-gray-600">
                  Dedicated assistance for all your selling needs.
                </p>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-2">How to Get Started:</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3">1</div>
                <div>
                  <h4 className="font-medium mb-1">Register as a Seller</h4>
                  <p className="text-sm text-gray-600">
                    Complete our simple registration form with your business and bank account details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3">2</div>
                <div>
                  <h4 className="font-medium mb-1">List Your Products</h4>
                  <p className="text-sm text-gray-600">
                    Upload product details, images, and set competitive prices through our seller portal.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3">3</div>
                <div>
                  <h4 className="font-medium mb-1">Receive Orders</h4>
                  <p className="text-sm text-gray-600">
                    Get notified instantly when customers place orders for your products.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3">4</div>
                <div>
                  <h4 className="font-medium mb-1">Pack & Ship</h4>
                  <p className="text-sm text-gray-600">
                    Pack ordered items and hand them over to our logistics partner for delivery.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3">5</div>
                <div>
                  <h4 className="font-medium mb-1">Get Paid</h4>
                  <p className="text-sm text-gray-600">
                    Receive payments directly in your bank account as per our payment cycle.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md">
                Register as a Seller
              </button>
            </div>
          </div>
        ),
      },
    }
  };
  
  // Get the page data based on the page type and slug
  const page = pageData[pageType][slug];
  
  if (!page) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-6 text-center">Page Not Found</h1>
          <p className="text-center mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          {page.content}
        </div>
      </div>
    </MainLayout>
  );
};

export default StaticPage;