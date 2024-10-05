import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);  
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const id = localStorage.getItem("id");
        const fetchCart = async () => {
            if (!id) {
                setError('User ID is null. Please log in.');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setCart(response.data.cart);
            } catch (err) {
                    setError(err.message || 'Failed to fetch cart data.');
                    toast.error('Failed to fetch cart data.');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

 const addToCart = async (product) => {
    const userId = localStorage.getItem("id"); 
    console.log('Product ID:', product.id);
    
    try {
        const productResponse = await axios.get(`http://localhost:5000/product/${product.id}`);
        const currentProduct = productResponse.data;

        
        const userResponse = await axios.get(`http://localhost:5000/users/${userId}`);
        const userCart = userResponse.data.cart;

        // already in the cart
        const existingCartItem = userCart.find(item => item.id === product.id);
        if (existingCartItem) {
            if (existingCartItem.quantity + 1 > currentProduct.quantity) {
                toast.error(`Cannot add more of ${currentProduct.name}. Only ${currentProduct.quantity - existingCartItem.quantity} left in stock.`);
                return;
            }

            const updatedCartItem = { 
                ...existingCartItem, 
                quantity: existingCartItem.quantity + 1 
            };
            const remainingCart=userCart.filter((item)=>item.id!==updatedCartItem.id)
            await axios.patch(`http://localhost:5000/users/${userId}`,{cart:[...remainingCart, updatedCartItem]});
            setCart(prevCart => prevCart.map(item => item.id === product.id ? updatedCartItem : item));
            toast.success(`Increased quantity of ${currentProduct.name} in the cart.`);
        } else {
            const newCartItem = { ...product, quantity: 1 };
            await axios.patch(`http://localhost:5000/users/${userId}`, { cart: [...userCart, newCartItem] });
            setCart(prevCart => [...prevCart, newCartItem]);
            toast.success("Item added to cart 🛒");
        }
    } catch (err) {
        toast.error('Failed to add product to the cart. Please try again.');
    }
};


    
    // Remove from Cart function
    const removeFromCart = async (productId) => {
        const userId = localStorage.getItem("id"); // Get user ID
        try {
            const newCart=cart.filter((item)=>item.id!==productId)
            setCart(newCart)
            await axios.patch(`http://localhost:5000/users/${userId}`,{cart:[...newCart]});
            toast.success('Product removed from the cart.');
            
        } catch (err) {
            toast.error('Failed to remove product from the cart. Please try again.');
        }
    };

    // Clear Cart function
    const clearCart = async () => {
        const userId = localStorage.getItem("id");

        try {
            await Promise.all(cart.map(item => axios.patch(`http://localhost:5000/users/${userId}`,{cart:[]})));
            setCart([]); // Clear cart state
            toast.success('Cart has been cleared.');
        } catch (err) {
            console.error('Error clearing cart:', err);
            toast.error('Failed to clear the cart. Please try again.');
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart,setCart, loading, error }}>
            {loading ? <div>Loading...</div> : children}
        </CartContext.Provider>
    );
};
