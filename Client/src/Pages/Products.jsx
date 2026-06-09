import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { ProductCard } from "../components/ProductCard";
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";

const products = [
  { _id: "1", name: "Classic White Shirt", price: 29.99, category: "Woman", stock: 10, imageURL: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400" },
  { _id: "2", name: "Slim Fit Jeans", price: 49.99, category: "Man", stock: 5, imageURL: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
  { _id: "3", name: "Running Sneakers", price: 79.99, category: "Kids", stock: 8, imageURL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { _id: "4", name: "Leather Jacket", price: 129.99, category: "Man", stock: 3, imageURL: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
  { _id: "5", name: "Floral Summer Dress", price: 39.99, category: "Woman", stock: 0, imageURL: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400" },
  { _id: "6", name: "Polo Shirt", price: 24.99, category: "Man", stock: 15, imageURL: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400" },
  { _id: "7", name: "Ankle Boots", price: 89.99, category: "Woman", stock: 0, imageURL: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
  { _id: "8", name: "Wool Sweater", price: 59.99, category: "Kids", stock: 7, imageURL: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400" },
  { _id: "9", name: "Cargo Shorts", price: 34.99, category: "Man", stock: 12, imageURL: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400" },
  { _id: "10", name: "Baseball Cap", price: 19.99, category: "Kids", stock: 20, imageURL: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400" },
  { _id: "11", name: "Maxi Dress", price: 44.99, category: "Woman", stock: 6, imageURL: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400" },
  { _id: "12", name: "Kids Hoodie", price: 19.99, category: "Kids", stock: 14, imageURL: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400" },
];

const filterSections = [
  { label: "Gender",               options: ["Woman", "Man", "Kids"] },
  { label: "Discount",             options: ["10% Off", "20% Off", "30% Off", "40% Off"] },
  { label: "Product Availability", options: ["In Stock", "Out of Stock"] },
  { label: "Product Type",         options: ["Shirts", "Pants", "Shoes", "Jackets", "Accessories"] },
  { label: "Price",                options: ["Under $30", "$30 - $60", "$60 - $100", "Above $100"] },
  { label: "Size",                 options: ["XS", "S", "M", "L", "XL", "XXL"] },
  { label: "Color",                options: ["Black", "White", "Brown", "Blue", "Red"] },
];

// Collapsible filter section
function FilterSection({ label, options }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-xs uppercase tracking-widest font-medium text-black"
      >
        {label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {options.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 accent-black cursor-pointer"
              />
              <span className="text-xs text-gray-600 group-hover:text-black transition-colors">
                {opt}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

function Products() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <NavBar />

      {/* ── Page Header ── */}
      <div className="border-b border-gray-200 py-10 text-center">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
          Browse our collection
        </p>
        <h1 className="text-4xl font-bold uppercase tracking-widest">
          All Products
        </h1>
      </div>

      {/* ── Toolbar ── */}
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-gray-200">
        
        {/* Filter Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-xs uppercase tracking-widest font-medium flex items-center gap-2 hover:text-gray-400 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="8" y1="12" x2="20" y2="12" />
            <line x1="12" y1="18" x2="20" y2="18" />
          </svg>
          Filter
        </button>

        {/* Product Count + Sort */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400 uppercase tracking-widest">
            {products.length} Products
          </span>
          <select className="text-xs uppercase tracking-widest border border-gray-200 px-3 py-2 outline-none bg-white">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest</option>
          </select>
        </div>

      </div>

      {/* ── Filter Sidebar Overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          
          {/* Sidebar */}
          {/* <div className="w-80 bg-white h-full overflow-y-auto px-6 py-6 shadow-xl"> */}
            <div className="w-80 bg-white h-full overflow-y-auto px-6 py-6 shadow-xl animate-in slide-in-from-left duration-300">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold uppercase tracking-widest">Filter</span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-black hover:text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Filter Sections */}
            {filterSections.map((section) => (
              <FilterSection
                key={section.label}
                label={section.label}
                options={section.options}
              />
            ))}

            {/* Apply Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="w-full mt-6 bg-black text-white text-xs uppercase tracking-widest py-3 hover:bg-gray-800 transition-colors"
            >
              Apply Filters
            </button>

          </div>

          {/* Dark Backdrop */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

        </div>
      )}

      {/* ── Products Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
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
      </div>

      <Footer />
    </>
  );
}

export default Products;