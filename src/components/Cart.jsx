// Cart.js
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from '../contexts/ContextCard'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
const Cart = () => {
    const { cart, removeFromCart, loading, error, setCart,decresingQuantity,increasingQuantity } = useContext(CartContext);
    const [stockErrors, setStockErrors] = useState([]);
    const navigate = useNavigate(); 
    useEffect(() => {
        const checkStock = async () => {
            try {
                const updatedCart = await Promise.all(cart.map(async (item) => {
                    let id=item.id
                    const response = await axios.get(`http://localhost:5000/product/${id}`);
                    return { ...item, available: response.data.quantity };
                }));
                setCart(updatedCart);

                // Identify items with insufficient stock
                const errors = updatedCart.filter(item => item.available < item.quantity).map(item => ({
                    id: item.id,
                    name: item.name,
                    available: item.available
                }));
                setStockErrors(errors);
            } catch (err) {
                console.error("Error checking stock:", err);
            }
        };

        if (cart.length > 0) {
            checkStock();
        } else {
            setStockErrors([]);
        }
    }, []);

    const placeOrder = () => {
        navigate("/order"); 
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">Error: {error}</div>;
    }

    const totalPrice = cart.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0).toFixed(2);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            <Toaster/>
            {cart.length === 0 ? (
                <h1 className="text-center">Your cart is empty</h1>
            ) : (
                <>
                    {stockErrors.length > 0 && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                            <h3 className="font-bold">Some items in your cart are out of stock or have limited availability:</h3>
                            <ul>
                                {stockErrors.map(item => (
                                    <li key={item.id}>
                                        {item.name}: Only {item.available} left in stock.
                                    </li>
                                ))}
                            </ul>
                            <p>Please adjust the quantities or remove the out-of-stock items from your cart.</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {cart.map((product) => (
                            <div
                                key={product.id}
                                className={`border border-primary-100 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ${product.available < product.quantity ? 'opacity-50' : ''}`}
                            >
                                <img
                                    src={product.url}
                                    alt={product.name}
                                    className="w-full h-60 rounded-t object-cover"
                                />
                                <p className="text-gray-600 px-3 py-1">Name: {product.name}</p>
                                <p className="text-gray-600 px-3 py-1">Price: {Number(product.price).toFixed(2)}</p>
                                <p className="text-gray-600 px-3 py-1"><button className="px-3 py-1 m-1 bg-gray-300 rounded hover:text-white hover:bg-primary/80" onClick={()=>decresingQuantity(product.id)}>-</button>Quantity: {product.quantity}<button className="px-3 py-1 m-1 bg-gray-300 rounded hover:text-white hover:bg-primary/80"onClick={()=>increasingQuantity(product.id)}>+</button></p>
                                <p className="text-gray-600 px-3 py-1">Total:{product.price*product.quantity}</p>
                                {product.available === 0 ? (
                                    <span className='text-red-500 py-1 px-3'>Out of stock</span>
                                ) : product.available < product.quantity ? (
                                    <span className='text-yellow-500 py-1 px-3'>Limited stock</span>
                                ) : null}
                                <button
                                    onClick={() => removeFromCart(product.id)}
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded justify-center items-center"
                                >
                                    Remove
                                </button>          
                            </div>
                        ))}
                        <div className="col-span-full flex justify-end">
                            <button
                                onClick={placeOrder}
                                className={`bg-primary/80 hover:bg-primary text-white py-2 px-6 rounded ${stockErrors.length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={stockErrors.length > 0}
                            >
                                Place Order
                            </button>
                        </div>
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
