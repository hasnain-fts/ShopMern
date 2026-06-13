import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Checkout from "./Pages/CheckOut";
import Login from "./Pages/Login";
import Register from "./Pages/Registration";
import Women from "./Pages/Women";
import Men from "./Pages/Men";
import Kids from "./Pages/Kids";
import ProductPage from "./Pages/ProductPage";
import { CartProvider } from './Context/CartContext';

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allproducts" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/men" element={<Men/>}/>
        <Route path="/women" element={<Women/>}/>
        <Route path="/kids" element={<Kids/>}/>
        <Route path="/product/:id" element={<ProductPage/>}/>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App;