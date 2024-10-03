import axios from "axios";
import React, { useEffect, useState } from "react";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/cart');
                if (response.data) {
                    setCart(response.data);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCartData();
    }, [cart]);

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/cart/${productId}`);
            setCart(cart.filter(item => item.id !== productId));
            alert('Product removed from cart!');
        } catch (error) {
            console.error("Error removing product from cart:", error);
            alert('Failed to remove product from cart.');
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">Error: {error}</div>;
    }

    const totalPrice = cart.reduce((acc, item) => acc +(Number(item.price) * Number(item.quantity)), 0);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
                <h1 className="text-center">Your cart is empty</h1>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cart.map((product) => (
                            <div
                                key={product.id}
                                className="border border-primary-100 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                            >
                                <img
                                    src={product.url}
                                    alt={product.name}
                                    className="w-full h-60 rounded-t object-cover"
                                />
                                <p className="text-gray-600 px-3 py-1">Name: {product.name}</p>
                                <p className="text-gray-600 px-3 py-1">Price: {product.price}</p>
                                <p className="text-gray-600 px-3 py-1">Countity:{product.quantity}</p>
                                {product.quantity === 0 ? (
                                    <span className='text-red-500 py-1 px-3'>Out of stock</span>
                                ) : ""}
                                <button
                                    onClick={() => removeFromCart(product.id)}
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Remove
                                </button>          
                            </div>
                        ))}
                         <button onClick={()=>placeOrder()}>place order</button>
                    </div>
                    <div className="mt-6 text-right">
                        <h3 className="text-xl font-semibold">Total: {totalPrice}</h3>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
