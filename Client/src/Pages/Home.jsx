import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { ProductCard } from "../components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const products = [
  { _id: "1", name: "Classic White Shirt", price: 29.99, category: "Shirts", stock: 10, imageURL: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400" },
  { _id: "2", name: "Slim Fit Jeans", price: 49.99, category: "Pants", stock: 5, imageURL: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
  { _id: "3", name: "Running Sneakers", price: 79.99, category: "Shoes", stock: 8, imageURL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { _id: "4", name: "Leather Jacket", price: 129.99, category: "Jackets", stock: 3, imageURL: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
  { _id: "5", name: "Floral Summer Dress", price: 39.99, category: "Dresses", stock: 0, imageURL: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400" },
  { _id: "6", name: "Polo Shirt", price: 24.99, category: "Shirts", stock: 15, imageURL: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400" },
  { _id: "7", name: "Ankle Boots", price: 89.99, category: "Shoes", stock: 0, imageURL: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
  { _id: "8", name: "Wool Sweater", price: 59.99, category: "Sweaters", stock: 7, imageURL: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400" },
];

const stats = [
  { value: "18K+", label: "Happy Customers" },
  { value: "700+", label: "Products Available" },
  { value: "95%", label: "Satisfaction Rate" },
];

const categories = [
  { name: "All", active: true },
  { name: "Shirts" },
  { name: "Pants" },
  { name: "Shoes" },
  { name: "Jackets" },
  { name: "Accessories" },
];

function Home() {
    const navigate = useNavigate();

function viewAllproducts () {
    navigate("/allproducts")
}
  return (
    <>
      <NavBar />

      
      {/* ── Hero Section ── */}
<section className="relative w-full h-screen overflow-hidden">
  
  {/* Background Image */}
  <img
    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600"
    alt="Hero"
    className="w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-black/20" />

  {/* Text Content — centered bottom */}
  <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-white text-center px-4">
    
    <p className="text-xs uppercase tracking-[0.4em] mb-3 font-light">
      Select Pieces Up To 40 Percent
    </p>

    <h1 className="text-6xl md:text-8xl font-bold uppercase tracking-widest mb-8">
      Summer Sale
    </h1>

    {/* Two CTA Links */}
    <div className="flex items-center gap-10">
      <a
        href="/woman"
        className="text-xs uppercase tracking-[0.3em] font-medium border-b border-white pb-0.5 hover:text-gray-300 hover:border-gray-300 transition-colors"
      >
        Shop Woman
      </a>
      <a
        href="/man"
        className="text-xs uppercase tracking-[0.3em] font-medium border-b border-white pb-0.5 hover:text-gray-300 hover:border-gray-300 transition-colors"
      >
        Shop Man
      </a>
    </div>

  </div>
</section>

      {/* ── Categories Filter ── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Explore</p>
            <h2 className="text-2xl font-bold">Our Best Quality Products</h2>
          </div>
          <Button variant="outline" className="gap-2 text-sm" onClick={viewAllproducts}>
            View All <ArrowRight size={14} />
          </Button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          {categories.map((cat, i) => (
            <button
              key={i}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                cat.active
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              price={product.price}
              category={product.category}
              stock={product.stock}
              imageURL={product.imageURL}
            />
          ))}
        </div>
      </section>

      {/* ── Banner Section ── */}
      <section className="mx-6 my-10 rounded-3xl overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400"
          alt="Banner"
          className="w-full h-72 object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-sm uppercase tracking-widest mb-2 text-gray-300">Limited Time Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            End of Season Sale
          </h2>
          <p className="text-gray-300 mb-6 max-w-md">
            Up to 50% off on selected items. Don't miss out on the biggest sale of the year.
          </p>
          <Button className="bg-white text-black hover:bg-gray-200 px-8 py-5 font-semibold">
            Shop the Sale
          </Button>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="bg-black text-white py-16 px-6">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-4">
          <Badge className="bg-gray-800 text-gray-300 text-xs">Newsletter</Badge>
          <h2 className="text-3xl font-bold">
            Subscribe & Get <span className="text-gray-400">30% OFF</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Join our newsletter and be the first to know about new arrivals and exclusive deals.
          </p>
          <div className="flex items-center gap-2 w-full mt-2">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-gray-500"
            />
            <Button className="bg-white text-black hover:bg-gray-200 px-6 py-3 font-semibold whitespace-nowrap">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;