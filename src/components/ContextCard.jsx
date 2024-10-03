import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Context
export const CartContext = createContext();

// Create and export the Provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:5000/cart');
                setCart(response.data);
            } catch (err) {
                setError(err.message || 'Failed to fetch cart data.');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);
    const addToCart = async (product) => {
        try {
            const productResponse = await axios.get(`http://localhost:5000/product/${product.id}`);
            const currentProduct = productResponse.data;

            if (!currentProduct) {
                alert('Product not found.');
                return;
            }

            if (currentProduct.quantity === 0) {
                alert(`${product.name} is currently out of stock.`);
                return;
            }
            const existingCartItem = cart.find(item => item.id === product.id);

            if (existingCartItem) {
                if (existingCartItem.quantity + 1 > currentProduct.quantity) {
                    alert(`Cannot add more of ${product.name}. Only ${currentProduct.quantity - existingCartItem.quantity} left in stock.`);
                    return;
                }
                const updatedCartItem = { ...existingCartItem, quantity: existingCartItem.quantity + 1 };
                await axios.put(`http://localhost:5000/cart/${existingCartItem.id}`, updatedCartItem);

                setCart(cart.map(item => item.id === product.id ? updatedCartItem : item));

                alert(`Increased quantity of ${product.name} in the cart.`);
            } else {
                
                const newCartItem = { ...product, quantity: 1 };
                const response = await axios.post('http://localhost:5000/cart', newCartItem);

                setCart([...cart, response.data]);

                alert(`${product.name} added to the cart.`);
            }
        } catch (err) {
            console.error('Error adding to cart:', err);
            alert('Failed to add product to the cart. Please try again.');
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/cart/${productId}`);

            setCart(cart.filter(item => item.id !== productId));

            alert('Product removed from the cart.');
        } catch (err) {
            console.error('Error removing from cart:', err);
            alert('Failed to remove product from the cart. Please try again.');
        }
    };

    const clearCart = async () => {
        try {
            await Promise.all(cart.map(item => axios.delete(`http://localhost:5000/cart/${item.id}`)));

            setCart([]);

            alert('Cart has been cleared.');
        } catch (err) {
            console.error('Error clearing cart:', err);
            alert('Failed to clear the cart. Please try again.');
        }
    };
        return (
            <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loading, error, setCart }}>
                {children}
            </CartContext.Provider>
        );
};
