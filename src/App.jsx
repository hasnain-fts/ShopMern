import "./App.css";
import {ProductCard} from "./components/ProductCard";

const products = [
  { _id: "1", name: "Classic White Shirt", price: 29.99, category: "Shirts", stock: 10, imageURL: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400" },
  { _id: "2", name: "Slim Fit Jeans", price: 49.99, category: "Pants", stock: 5, imageURL: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400" },
  { _id: "3", name: "Running Sneakers", price: 79.99, category: "Shoes", stock: 8, imageURL: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { _id: "4", name: "Leather Jacket", price: 129.99, category: "Jackets", stock: 3, imageURL: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400" },
  { _id: "5", name: "Floral Summer Dress", price: 39.99, category: "Dresses", stock: 0, imageURL: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400" },
  { _id: "6", name: "Polo Shirt", price: 24.99, category: "Shirts", stock: 15, imageURL: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400" },
  { _id: "7", name: "Ankle Boots", price: 89.99, category: "Shoes", stock: 0, imageURL: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
  { _id: "8", name: "Wool Sweater", price: 59.99, category: "Sweaters", stock: 7, imageURL: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400" },
  { _id: "9", name: "Cargo Shorts", price: 34.99, category: "Shorts", stock: 12, imageURL: "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400" },
  { _id: "10", name: "Baseball Cap", price: 19.99, category: "Accessories", stock: 20, imageURL: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400" },
];
function App() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
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
    </>
  );
}

export default App;
