import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { ProductCard } from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown, Minus, Plus, Heart } from "lucide-react";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setSelectedImage(0);

        // fetch related products (same category)
        const allRes = await fetch("http://localhost:5000/api/products");
        const allData = await allRes.json();
        const related = allData.filter(
          (p) => p.category === data.category && p._id !== data._id
        );
        setRelatedProducts(related.slice(0, 4));
      } catch (error) {
        console.log("Failed to load product");
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xs uppercase tracking-widest text-gray-400">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <NavBar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xs uppercase tracking-widest text-gray-400">Product not found</p>
        </div>
        <Footer />
      </>
    );
  }

  const images = Array.isArray(product.imageURL) ? product.imageURL : [product.imageURL];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <>
      <NavBar />

      {/* ── Breadcrumb ── */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          Home &nbsp;/&nbsp; {product.category} &nbsp;/&nbsp;
          <span className="text-black">{product.name}</span>
        </p>
      </div>

      {/* ── Main Product Section ── */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* ── Left: Images ── */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="w-full aspect-[3/4] overflow-hidden bg-gray-50">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-24 overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === i ? "border-black" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right: Details ── */}
        <div className="flex flex-col gap-6 pt-2">

          {/* Name & Price */}
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 mb-2 capitalize">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold uppercase tracking-wide mb-3">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Stock Badge */}
          <div>
            {product.stock > 0 ? (
              <span className="text-xs uppercase tracking-widest text-green-600 font-medium">
                ● In Stock ({product.stock} left)
              </span>
            ) : (
              <span className="text-xs uppercase tracking-widest text-red-500 font-medium">
                ● Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {product.description}
            </p>
          )}

          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-widest font-medium">Size</p>
              <button className="text-xs uppercase tracking-widest text-gray-400 underline hover:text-black transition-colors cursor-pointer">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 text-xs font-medium border transition-all cursor-pointer ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3">
            {/* Quantity */}
            <div className="flex items-center border border-gray-300">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Minus size={14} />
              </button>
              <span className="w-10 h-12 flex items-center justify-center text-sm font-medium border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-12 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              disabled={product.stock === 0}
              className={`flex-1 h-12 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer ${
                product.stock === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {product.stock === 0 ? "Out of Stock" : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className="w-12 h-12 border border-gray-300 flex items-center justify-center hover:border-black transition-colors cursor-pointer"
            >
              <Heart
                size={16}
                className={wishlisted ? "fill-black text-black" : "text-gray-500"}
              />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Product Details Accordion */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between py-4 text-xs uppercase tracking-widest font-medium cursor-pointer"
            >
              Product Details
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${detailsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {detailsOpen && (
              <div className="pb-4 text-sm text-gray-600 leading-relaxed space-y-2">
                <p>• Category: <span className="capitalize">{product.category}</span></p>
                <p>• Gender: <span className="capitalize">{product.gender}</span></p>
                <p>• Stock: {product.stock} units available</p>
                {product.description && <p>• {product.description}</p>}
              </div>
            )}
          </div>

          {/* Shipping & Return Accordion */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => setShippingOpen(!shippingOpen)}
              className="w-full flex items-center justify-between py-4 text-xs uppercase tracking-widest font-medium cursor-pointer"
            >
              Shipping & Return
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${shippingOpen ? "rotate-180" : ""}`}
              />
            </button>
            {shippingOpen && (
              <div className="pb-4 text-sm text-gray-600 leading-relaxed space-y-2">
                <p>• Free shipping on orders above Rs. 150</p>
                <p>• Standard delivery: 3–5 business days</p>
                <p>• Express delivery: 1–2 business days</p>
                <p>• Easy returns within 7 days of delivery</p>
                <p>• Items must be unused and in original packaging</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── Related Products ── */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-10 border-t border-gray-200">
          <h2 className="text-xs uppercase tracking-widest text-center font-medium mb-10">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p._id}
                name={p.name}
                price={p.price}
                category={p.category}
                stock={p.stock}
                imageURL={p.imageURL}
              />
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}

export default ProductPage;