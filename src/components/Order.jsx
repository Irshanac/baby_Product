// Order.js
import axios from "axios";
import React, { useContext, useState } from "react";
import { CartContext } from '../contexts/ContextCard';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import toast from 'react-hot-toast'
const Order = () => {
    const { cart, clearCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .max(50, 'Name cannot exceed 50 characters'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        address: Yup.string()
            .required('Address is required')
            .max(200, 'Address cannot exceed 200 characters'),
        paymentMethod: Yup.string()
            .oneOf(['Credit Card', 'PayPal', 'Bank Transfer'], 'Invalid Payment Method')
            .required('Payment method is required'),
    });

    const initialValues = {
        name: "",
        email: "",
        address: "",
        paymentMethod: "Credit Card",
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            setSubmitting(false);
            return;
        }

        setLoading(true);
        setError(null);

        const totalPrice = cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);

        const orderData = {
            id: Date.now(), 
            items: cart,
            total: totalPrice,
            ...values,
            date: new Date().toISOString(),
        };

        try {
            const userid=localStorage.getItem("id")
            for (let item of cart) {
                const productResponse = await axios.get(`http://localhost:5000/product/${item.id}`);
                const product = productResponse.data;

                if (!product) {
                    throw new Error(`Product "${item.name}" not found.`);
                }

                if (product.quantity < item.quantity) {
                    throw new Error(`Insufficient quantity for "${product.name}". Available: ${product.quantity}, Requested: ${item.quantity}`);
                }

                const updatedProduct = { ...product, quantity: product.quantity - item.quantity };
                await axios.put(`http://localhost:5000/product/${product.id}`, updatedProduct);
            }
            const response=await axios.get(`http://localhost:5000/users/${userid}`)
            const oldOrder=response.data.order
            await axios.patch(`http://localhost:5000/users/${userid}`, {order:[...oldOrder,orderData]});

        
            await clearCart();

            setLoading(false);
            setSubmitting(false);
            toast.success("Order placed successfully!");

            navigate("/order-confirmation", { state: { orderId: orderData.id } });
        } catch (err) {
            console.error("Error placing order:", err);
            setError(err.response?.data?.message || err.message || "Failed to place order. Please try again.");
            setLoading(false);
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-center py-4">Placing your order...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="max-w-lg mx-auto">
                        {/* Name Field */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Name:</label>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Your Full Name"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700">Email:</label>
                            <Field
                                type="email"
                                name="email"
                                id="email"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="your.email@example.com"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Address Field */}
                        <div className="mb-4">
                            <label htmlFor="address" className="block text-gray-700">Address:</label>
                            <Field
                                as="textarea"
                                name="address"
                                id="address"
                                className="w-full px-3 py-2 border rounded"
                                placeholder="Your Shipping Address"
                                rows="3"
                            />
                            <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Payment Method Field */}
                        <div className="mb-4">
                            <label htmlFor="paymentMethod" className="block text-gray-700">Payment Method:</label>
                            <Field
                                as="select"
                                name="paymentMethod"
                                id="paymentMethod"
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                                <option value="Bank Transfer">Bank Transfer</option>
                            </Field>
                            <ErrorMessage name="paymentMethod" component="div" className="text-red-500 text-sm mt-1" />
                        </div>

                        {/* Order Summary */}
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold mb-2">Order Summary:</h3>
                            <ul className="list-disc list-inside">
                                {cart.map(item => (
                                    <li key={item.id} className="flex justify-between">
                                        <span>{item.name}:  {item.price} x {item.quantity}</span>
                                        <span>{(item.price * item.quantity).toFixed(2)}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex justify-between mt-2 font-bold">
                                <span>Total:</span>
                                <span>{cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0).toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary/80 hover:bg-primary text-white py-2 px-4 rounded"
                        >
                            {isSubmitting ? "Placing Order..." : "Place Order"}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Order;
