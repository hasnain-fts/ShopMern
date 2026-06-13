import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);

    const addToCart = async (userId, productId, quantity) => {
        const response = await fetch('http://localhost:5000/api/cart/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, productId, quantity })
        });
        const data = await response.json();
        setCart(data);
    };

    const removeFromCart = async (userId, productId) => {
        const response = await fetch('http://localhost:5000/api/cart/remove', {  
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, productId })
        });
        const data = await response.json();
        setCart(data);
    };

    const updateQuantity = async (userId, productId, quantity) => {
        const response = await fetch('http://localhost:5000/api/cart/update', {  
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, productId, quantity })
        });
        const data = await response.json();
        setCart(data);
    };

    const fetchCart = async (userId) => {
        const response = await fetch(`http://localhost:5000/api/cart/${userId}`);  
        const data = await response.json();
        setCart(data);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);