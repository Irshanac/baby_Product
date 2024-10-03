import React from "react";
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderId } = location.state || {};

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Thank You for Your Order!</h2>
            {orderId ? (
                <p>Your order has been placed successfully. Your Order ID is <strong>{orderId}</strong>.</p>
            ) : (
                <p>Your order has been placed successfully.</p>
            )}
            <Link to="/">
                <button className="mt-4 bg-primary/80 hover:bg-primary text-white py-2 px-4 rounded">
                    Continue Shopping
                </button>
            </Link>
        </div>
    );
};

export default OrderConfirmation;
