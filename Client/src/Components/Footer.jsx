import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold tracking-tight">ShopMern</h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop destination for the latest fashion trends. Quality clothing delivered to your door.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300">
              Quick Links
            </h3>
            <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">Home</a>
            <a href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">Products</a>
            <a href="/categories" className="text-gray-400 hover:text-white text-sm transition-colors">Categories</a>
            <a href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</a>
            <a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300">
              Categories
            </h3>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Shirts</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Pants</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Shoes</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Jackets</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Accessories</a>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-300">
              Newsletter
            </h3>
            <p className="text-gray-400 text-sm">
              Subscribe to get the latest deals and offers.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-gray-500 transition-colors"
              />
              <Button className="w-full bg-white text-black hover:bg-gray-200 transition-colors">
                <Mail size={16} className="mr-2" />
                Subscribe
              </Button>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 ShopMern. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}