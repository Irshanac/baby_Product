import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";

// Create the Context
export const CartContext = createContext();

// Create and export the Provider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);  // Cart items state
    const [loading, setLoading] = useState(true);  // Loading state
    const [error, setError] = useState(null);  // Error state

    useEffect(() => {
        let isMounted = true; // Flag to track if component is mounted
        const id = localStorage.getItem("id");
        
        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                if (isMounted) {
                    setCart(response.data.cart); // Set cart state
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || 'Failed to fetch cart data.');
                    toast.error('Failed to fetch cart data.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchCart();
        return () => { isMounted = false }; // Cleanup function
    }, []);

   const addToCart = async (product) => {
      const userId = localStorage.getItem("id");
    try {
        const productResponse = await axios.get(`http://localhost:5000/product/${product.id}`);
        const currentProduct = productResponse.data;
        if (!currentProduct) {
            toast.error('Product not found.');
            return;
        }
        const existingCartItem = cart.find(item => item.id === product.id);

        if (existingCartItem) {
            // Check if we can increase the quantity
            if (existingCartItem.quantity + 1 > currentProduct.quantity) {
                toast.error(`Cannot add more of ${currentProduct.name}. Only ${currentProduct.quantity - existingCartItem.quantity} left in stock.`);
                return;
            }

            // Update existing item in the cart
            const updatedCartItem = { 
                ...existingCartItem, 
                quantity: existingCartItem.quantity + 1 
            };
            setCart(prevCart => prevCart.map(item => item.id === product.id ? updatedCartItem : item));
            await axios.patch(`http://localhost:5000/users/${userId}/cart/${existingCartItem.id}`, updatedCartItem);
            toast.success(`Increased quantity of ${currentProduct.name} in the cart.`);
        } else {
            // Create new cart item with additional product details
            const newCartItem = { 
                id: product.id, 
                quantity: 1, 
                name: currentProduct.name,  // Store product name
                price: currentProduct.price, // Store product price
            };

            await axios.patch(`http://localhost:5000/users/${userId}`, { cart: [...cart, newCartItem] });
            setCart(prevCart => [...prevCart, newCartItem]); // Use newCartItem here
            toast.success("Item added to cart 🛒");
        }
    } catch (err) {
        console.error('Error adding to cart:', err);
        toast.error(err.response ? err.response.data.message : 'Failed to add product to the cart. Please try again.');
    }
};

    
    // Remove from Cart function
    const removeFromCart = async (productId) => {
        const userId = localStorage.getItem("id"); // Get user ID
        try {
            await axios.delete(`http://localhost:5000/users/${userId}/cart/${productId}`);
            setCart(prevCart => prevCart.filter(item => item.id !== productId)); // Update cart state
            toast.success('Product removed from the cart.');
        } catch (err) {
            console.error('Error removing from cart:', err);
            toast.error('Failed to remove product from the cart. Please try again.');
        }
    };

    // Clear Cart function
    const clearCart = async () => {
        const userId = localStorage.getItem("id"); // Get user ID
        if (!userId) {
            toast.error('User is not logged in.');
            return;
        }

        try {
            await Promise.all(cart.map(item => axios.delete(`http://localhost:5000/users/${userId}/cart/${item.id}`)));
            setCart([]); // Clear cart state
            toast.success('Cart has been cleared.');
        } catch (err) {
            console.error('Error clearing cart:', err);
            toast.error('Failed to clear the cart. Please try again.');
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, loading, error }}>
            {loading ? <div>Loading...</div> : children}
        </CartContext.Provider>
    );
};
