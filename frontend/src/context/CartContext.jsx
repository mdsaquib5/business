import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Load cart from localStorage on initial render
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, quantityToAdd = 1) => {
        setCart((prev) => {
            const exists = prev.find(p => p._id === product._id);
            if (exists) {
                return prev.map(p =>
                    p._id === product._id
                        ? { ...p, quantity: quantityToAdd }
                        : p
                );
            }
            return [...prev, { ...product, quantity: quantityToAdd }];
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        setCart((prev) =>
            prev.map(item =>
                item._id === productId
                    ? { ...item, quantity: Math.max(1, newQuantity) }
                    : item
            )
        );
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item._id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const getCartCount = () => {
        return cart.reduce((total, item) => total + (item.quantity || 1), 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, getCartCount }}>
            {children}
        </CartContext.Provider>
    );
};