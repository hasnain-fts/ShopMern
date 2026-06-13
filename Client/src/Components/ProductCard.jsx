import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ProductCard({ _id, name, price, category, stock, imageURL, sizes = ["S", "M", "L", "XL", "XXL"] }) {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState(null);

  const formattedPrice = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  const goToProduct = () => navigate(`/product/${_id}`);

  return (
    <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col">

      {/* Tall Portrait Image */}
      <div
        className="w-full overflow-hidden cursor-pointer"
        style={{ aspectRatio: "3 / 4" }}
        onClick={goToProduct}
      >
        <img
          src={imageURL || "https://avatar.vercel.sh/shadcn1"}
          alt={name}
          className="w-full h-full object-cover hover:opacity-90 transition-opacity duration-200"
        />
      </div>

      {/* Info Section */}
      <div className="pt-4 pb-4 px-4 flex flex-col gap-3 border-t border-gray-200">

        {/* Product Name */}
        <p
          className="text-base font-normal text-gray-900 cursor-pointer hover:text-gray-600 transition-colors leading-snug"
          onClick={goToProduct}
        >
          {name}
        </p>

        {/* Price */}
        <p className="text-base font-bold text-gray-900">
          {formattedPrice}
        </p>

        {/* Size Selector - Smaller buttons in one line */}
        {sizes && sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => {
                  setSelectedSize(size);
                  goToProduct();
                }}
                className={`
                  w-8 h-7 text-xs font-medium rounded transition-all duration-150
                  ${selectedSize === size
                    ? "border border-gray-900 bg-gray-900 text-white"
                    : "border border-gray-300 bg-white text-gray-700 hover:border-gray-500"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Out of stock */}
        {stock === 0 && (
          <p className="text-sm text-red-500">Out of stock</p>
        )}
      </div>
    </div>
  );
}