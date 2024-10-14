import axios from "axios";
import React, { useEffect, useState } from "react";
import { Toaster,toast } from "react-hot-toast";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const id = localStorage.getItem("id");
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                setOrders(response.data.order);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-4">
                <div className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">Error: {error}</div>;
    }
    const clearHistory=async()=>{
        const id=localStorage.getItem("id")
        try{
            await axios.patch(`http://localhost:5000/users/${id}`,{order:[]})
            setOrders([])
            toast.success("order history cleared")
        }
        catch(error)
        {
            toast.error("failed to history cleared")
        }
    }
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            <Toaster/>
            {orders.length === 0 ? (
                <h1 className="text-center">You have no orders.</h1>
            ) : (
                <div className="space-y-4 grid grid-cols-1  lg:grid-cols-2">
                    {orders.map(order => (
                        <div key={order.id} className="border p-4 rounded-lg shadow">
                            <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
                            <p className="text-gray-600">Date: {new Date(order.date).toLocaleString()}</p>
                            <p className="text-gray-600">Name: {order.name}</p>
                            <p className="text-gray-600">Email: {order.email}</p>
                            <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
                            <p className="text-gray-600">Address: {order.address}</p>
                            <h4 className="mt-2 font-semibold">Items:</h4>
                            <ul className="list-disc list-inside">
                                {order.items.map(item => (
                                    <li key={item.id}>
                                        {item.name} <span>  </span> {item.price}x {item.quantity} = {item.price * item.quantity}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-2 font-bold">Total: {order.total}</p>
                        </div>
                    ))}
                     {/* <div className="flex justify-center items-center m-4">
                        <button className="bg-primary/90 text-white p-3 rounded hover:bg-primary/60 hover:scale-105" onClick={()=>clearHistory()}>Clear History</button>
                    </div> */}

                </div>
                
            )}
          
        </div>
    );
};

export default OrderHistory;
