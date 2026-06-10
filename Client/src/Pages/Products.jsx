import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { ProductCard } from "../components/ProductCard";
import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

const filterSections = [
  { label: "Gender", options: ["Woman", "Man", "Kids"] },
  { label: "Discount", options: ["10% Off", "20% Off", "30% Off", "40% Off"] },
  { label: "Product Availability", options: ["In Stock", "Out of Stock"] },
  { label: "Product Type", options: ["Shirts", "Pants", "Shoes", "Jackets", "Accessories"] },
  { label: "Price", options: ["Under $30", "$30 - $60", "$60 - $100", "Above $100"] },
  { label: "Size", options: ["XS", "S", "M", "L", "XL", "XXL"] },
  { label: "Color", options: ["Black", "White", "Brown", "Blue", "Red"] },
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log("Error occurred:", error);
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, []);

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
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400 uppercase tracking-widest">Loading products...</p>
          </div>
        ) : (
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
        )}
      </div>

      <Footer />
    </>
  );
}

export default Products;