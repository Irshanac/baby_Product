// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { format } from 'date-fns'; // Import for enhanced date formatting

// const OrderHistory = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/orders");
//                 setOrders(response.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     if (loading) {
//         return (
//             <div className="text-center py-4">
//                 <div className="spinner-border animate-spin" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="text-red-500 text-center py-4">
//                 {error.includes("Network Error") ? (
//                     "There was a network issue. Please try again later."
//                 ) : (
//                     `Error: ${error}`
//                 )}
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">Order History</h2>
//             {orders.length === 0 ? (
//                 <h1 className="text-center">You have no orders.</h1>
//             ) : (
//                 <div className="space-y-4">
//                     {orders.map(order => (
//                         <div key={order.id} className="border p-4 rounded-lg shadow">
//                             <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
//                             <p className="text-gray-600">Date: {format(new Date(order.date), 'MMMM dd, yyyy hh:mm a')}</p>
//                             <p className="text-gray-600">Name: {order.name}</p>
//                             <p className="text-gray-600">Email: {order.email}</p>
//                             <p className="text-gray-600">Address: {order.address}</p>
//                             <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
//                             <h4 className="mt-2 font-semibold">Items:</h4>
//                             <ul className="list-disc list-inside">
//                                 {order.items.map(item => (
//                                     <li key={item.id}>
//                                         {item.name} x {item.quantity} = ${item.price * item.quantity}
//                                     </li>
//                                 ))}
//                             </ul>
//                             <p className="mt-2 font-bold">Total: ${order.total}</p>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default OrderHistory;
