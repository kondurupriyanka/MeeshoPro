import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Linkedin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Shop Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/women-ethnic" className="text-gray-300 hover:text-white transition duration-200">
                  Women Ethnic
                </Link>
              </li>
              <li>
                <Link href="/women-western" className="text-gray-300 hover:text-white transition duration-200">
                  Women Western
                </Link>
              </li>
              <li>
                <Link href="/men" className="text-gray-300 hover:text-white transition duration-200">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/kids" className="text-gray-300 hover:text-white transition duration-200">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="/home-kitchen" className="text-gray-300 hover:text-white transition duration-200">
                  Home & Kitchen
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Customer Policies</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/return-policy">
                  <a className="text-gray-300 hover:text-white transition duration-200">
                    Return Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use">
                  <a className="text-gray-300 hover:text-white transition duration-200">
                    Terms of Use
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <a className="text-gray-300 hover:text-white transition duration-200">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy">
                  <a className="text-gray-300 hover:text-white transition duration-200">
                    Cancellation Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/shipping-info">
                  <a className="text-gray-300 hover:text-white transition duration-200">
                    Shipping Info
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about-us">
                  <a className="text-gray-300 hover:text-white transition duration-200">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-gray-300 hover:text-white transition duration-200">
                    Careers
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-300 hover:text-white transition duration-200">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/help-support">
                  <a className="text-gray-300 hover:text-white transition duration-200">
                    Help & Support
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/become-seller">
                  <a className="text-gray-300 hover:text-white transition duration-200">
                    Become a Seller
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Get In Touch</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white transition duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-200">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <div className="mb-4">
              <h4 className="font-medium mb-2">Download App</h4>
              <div className="flex space-x-2">
                <a href="#" className="bg-black rounded-md p-2 inline-flex">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Google Play Store" 
                    className="h-8" 
                  />
                </a>
                <a href="#" className="bg-black rounded-md p-2 inline-flex">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="App Store" 
                    className="h-8" 
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} ModernMeesho - All Rights Reserved
            </p>
            <div className="flex space-x-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                alt="Visa" 
                className="h-6" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" 
                alt="Mastercard" 
                className="h-6" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" 
                alt="PayPal" 
                className="h-6" 
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/d/db/Rupay-Logo.png" 
                alt="RuPay" 
                className="h-6" 
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
