import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdFavoriteBorder } from "react-icons/md";
import { MdClose } from "react-icons/md"; // Import close icon

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product');
                if (response.data) {
                    setProducts(response.data);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null); 
    };

    if (loading) {
        return <div className="text-center py-4">Lazy Loading...</div>; // Loading message
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">Error: {error}</div>; // Error message
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
            {products.map((product) => (
                <div 
                    key={product.id} 
                    className="border border-primary rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => openModal(product)} // Open modal on click
                >
                    <img
                        src={product.url}
                        alt={product.name}
                        className="w-full h-60 rounded-t object-cover" // Image scaling adjustment
                    />
                    <p className="text-gray-600 px-3 py-1">Name: {product.name}</p>
                    <p className="text-gray-600 px-3 py-1">Price: ${product.price}</p>
                    <div className="flex pt-1 pb-3 px-3 justify-between">
                        <button className='bg-primary/80 hover:bg-primary hover:scale-105 transition transform duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2'>
                            <span className="transition-transform duration-200">Cart</span>
                        </button>
                        <button onClick={() => alert("Added to favorites")}> 
                            <MdFavoriteBorder className='text-3xl text-primary hover:text-primary/80 transition-colors duration-200' />
                        </button>
                    </div>
                </div>
            ))}

            {/* Modal for product details */}
            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 relative">
                        <MdClose 
                            className="absolute top-2 right-2 text-gray-600 cursor-pointer"
                            onClick={closeModal} 
                        />
                        <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
                        <img 
                            src={selectedProduct.url} 
                            alt={selectedProduct.name} 
                            className="w-full h-60 rounded object-cover mb-2"
                        />
                        <p className="text-gray-600">Description: {selectedProduct.description}</p>
                        <p className="text-gray-600">Price: ${selectedProduct.price}</p>
                        <p className="text-gray-600">Quantity: {selectedProduct.quantity}</p>
                        <p className="text-gray-600">Category: {selectedProduct.category}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
