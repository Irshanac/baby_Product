// ProductList.js
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { MdFavoriteBorder, MdClose } from "react-icons/md"; 
import { CartContext } from '../contexts/ContextCard.jsx'; 
import { FavoriteContext } from '../contexts/ContextFavorite.jsx'; 
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [errorProducts, setErrorProducts] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const { addToCart } = useContext(CartContext);
    const { addToFavorite } = useContext(FavoriteContext); 

    const navigate=useNavigate()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/product');
                setProducts(response.data);
            } catch (error) {
                setErrorProducts(error.message || 'Failed to fetch products.');
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    if (loadingProducts) {
        return <div className="text-center py-4">Loading products...</div>;
    }

    if (errorProducts) {
        return <div className="text-red-500 text-center py-4">Error: {errorProducts}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center bg-gray-100 p-4">
            <Toaster/>
            {products.map((product) => (
                <div 
                    key={product.id} 
                    className="border border-primary rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    <div onClick={() => openModal(product)} className="cursor-pointer">
                        <img
                            src={product.url}
                            alt={product.name}
                            className="w-full h-60 rounded-t object-cover"
                        />
                        <p className="text-gray-600 px-3 py-1">Name: {product.name}</p>
                        <p className="text-gray-600 px-3 py-1">Price: {Number(product.price).toFixed(2)}</p>
                        {product.quantity === 0 ? (
                            <span className='text-red-500 py-1 px-3'>Out of stock</span>
                        ) : ""}
                    </div>
                    <div className="flex pt-1 pb-3 px-3 justify-between">
                        <button 
                            className={`bg-primary/80 hover:bg-primary hover:scale-105 transition transform duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() =>  localStorage.getItem("id") ? addToCart(product)  : navigate("/login")} 
                            disabled={product.quantity === 0} 
                        >
                            <span className="transition-transform duration-200">Cart</span>
                        </button>
                        <button onClick={() =>localStorage.getItem("id") ? addToFavorite(product)  : navigate("/login")}> 
                            <MdFavoriteBorder className='text-3xl text-primary hover:text-primary/80 transition-colors duration-200' />
                        </button>
                    </div>
                </div>
            ))}

            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 relative max-w-lg w-full">
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
                        <p className="text-gray-600">Price: ${Number(selectedProduct.price).toFixed(2)}</p>
                        {selectedProduct.quantity === 0 ? (
                            <span className='text-red-500'>Out of stock</span>
                        ) : ""}
                        <p className="text-gray-600">Category: {selectedProduct.category}</p>
                        <div className="flex pt-1 pb-3 px-3 justify-between mt-4">
                            <button 
                                className={`bg-primary/80 hover:bg-primary hover:scale-105 transition transform duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 ${selectedProduct.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() =>  localStorage.getItem("id") 
                                    ? addToCart(selectedProduct) 
                                    : navigate("/login")} 
                                disabled={selectedProduct.quantity === 0}
                            >
                                <span className="transition-transform duration-200">Cart</span>
                            </button>
                            <button onClick={() =>localStorage.getItem("id") ? addToFavorite(selectedProduct)  : navigate("/login")}> 
                                <MdFavoriteBorder className='text-3xl text-primary hover:text-primary/80 transition-colors duration-200' />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
