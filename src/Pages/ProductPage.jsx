import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { ProductCard } from "../components/ProductCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Plus, Heart, X } from "lucide-react";
import { useCart } from "../Context/CartContext";

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const userId = "TEMP_USER_ID";
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);  
    async function getProduct() {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setSelectedImage(0);
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

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    addToCart(userId, product._id, quantity);
  };

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

  const sizeGuideData = {
    XS: { bust: "30-32", waist: "24-26", hips: "32-34" },
    S:  { bust: "32-34", waist: "26-28", hips: "34-36" },
    M:  { bust: "34-36", waist: "28-30", hips: "36-38" },
    L:  { bust: "36-38", waist: "30-32", hips: "38-40" },
    XL: { bust: "38-40", waist: "32-34", hips: "40-42" },
    XXL:{ bust: "40-42", waist: "34-36", hips: "42-44" },
  };

  return (
    <>
      <NavBar />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          Home &nbsp;/&nbsp; {product.category} &nbsp;/&nbsp;
          <span className="text-black">{product.name}</span>
        </p>
      </div>

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Left: Images */}
        <div className="flex flex-row-reverse gap-4">

          {/* Main Image */}
          <div className="flex-1 aspect-[3/4] overflow-hidden bg-gray-50 relative">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            {/* Left Arrow */}
            {images.length > 1 && (
              <button
                onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center shadow transition-all cursor-pointer"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            {/* Right Arrow */}
            {images.length > 1 && (
              <button
                onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white flex items-center justify-center shadow transition-all cursor-pointer"
              >
                <ChevronRight size={18} />
              </button>
            )}

            {/* Image counter dots */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      selectedImage === i ? "bg-black w-3" : "bg-black/30"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnail Strip — vertical on left */}
          {images.length > 1 && (
            <div className="flex flex-col gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-24 overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                    selectedImage === i ? "border-black" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right: Details */}
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
              Rs {product.price.toLocaleString()}
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
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-xs uppercase tracking-widest text-gray-400 underline hover:text-black transition-colors cursor-pointer"
              >
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
            {!selectedSize && (
              <p className="text-xs text-red-500 mt-2">Please select a size</p>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3">
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

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || !selectedSize}
              className={`flex-1 h-12 text-xs uppercase tracking-widest font-medium transition-colors cursor-pointer ${
                product.stock === 0 || !selectedSize
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {product.stock === 0
                ? "Out of Stock"
                : !selectedSize
                ? "Select Size"
                : `Add to Cart — Rs ${(product.price * quantity).toLocaleString()}`}
            </button>

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

          <div className="border-t border-gray-200" />

          {/* Product Details Accordion */}
          <div className="border-b border-gray-200">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between py-4 text-xs uppercase tracking-widest font-medium cursor-pointer"
            >
              Product Details
              <ChevronDown size={16} className={`transition-transform duration-200 ${detailsOpen ? "rotate-180" : ""}`} />
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
              <ChevronDown size={16} className={`transition-transform duration-200 ${shippingOpen ? "rotate-180" : ""}`} />
            </button>
            {shippingOpen && (
              <div className="pb-4 text-sm text-gray-600 leading-relaxed space-y-2">
                <p>• Free shipping on orders above Rs. 2500</p>
                <p>• Standard delivery: 3–5 business days</p>
                <p>• Express delivery: 1–2 business days</p>
                <p>• Easy returns within 7 days of delivery</p>
                <p>• Items must be unused and in original packaging</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSizeGuideOpen(false)} />
          <div className="relative w-full max-w-lg bg-white mx-4 rounded-lg shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm uppercase tracking-widest font-medium">Size Guide</h3>
              <button onClick={() => setSizeGuideOpen(false)} className="text-black hover:text-gray-400 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 py-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 text-xs uppercase tracking-widest font-medium">Size</th>
                    <th className="text-left py-2 text-xs uppercase tracking-widest font-medium">Bust (inches)</th>
                    <th className="text-left py-2 text-xs uppercase tracking-widest font-medium">Waist (inches)</th>
                    <th className="text-left py-2 text-xs uppercase tracking-widest font-medium">Hips (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((size) => (
                    <tr key={size} className="border-b border-gray-100">
                      <td className="py-2 font-medium">{size}</td>
                      <td className="py-2 text-gray-600">{sizeGuideData[size]?.bust || "-"}</td>
                      <td className="py-2 text-gray-600">{sizeGuideData[size]?.waist || "-"}</td>
                      <td className="py-2 text-gray-600">{sizeGuideData[size]?.hips || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500 text-center">Measurements are body measurements, not garment measurements.</p>
            </div>
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-10 border-t border-gray-200">
          <h2 className="text-xs uppercase tracking-widest text-center font-medium mb-10">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p._id}
                _id={p._id}
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