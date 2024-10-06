// Favorites.js
import React, { useContext } from 'react';
import { FavoriteContext } from '../contexts/ContextFavorite';
import { CartContext } from '../contexts/ContextCard.jsx'; 
const Favorites = () => {
    const { favorites, removeFromFavorite, loading, error, clearFavorites } = useContext(FavoriteContext);

    if (loading) {
        return <div className="text-center py-4">Loading favorites...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">Error: {error}</div>;
    }

    const totalFavorites = favorites.length;
    const { addToCart } = useContext(CartContext);
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
            {totalFavorites === 0 ? (
                <h3 className="text-center">You have no favorite products.</h3>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {favorites.map((product) => (
                            <div 
                                key={product.id} 
                                className="border border-primary rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={product.url}
                                    alt={product.name}
                                    className="w-full h-60 rounded-t object-cover"
                                />
                                <p className="text-gray-600 px-3">Name: {product.name}</p>
                                <p className="text-gray-600 px-3">Price: {Number(product.price).toFixed(2)}</p>
                                <div className="flex gap-4 mx-3 py-2">
                                  <button
                                    onClick={() => removeFromFavorite(product.id)}
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded flex items-center justify-center"
                                  >
                                    Remove
                                  </button>
                                    <button 
                                    className={`bg-primary/80 hover:bg-primary hover:scale-105 transition transform duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() =>  localStorage.getItem("id") ? addToCart(product)  : navigate("/login")} 
                                    disabled={product.quantity === 0} 
                                >
                                    <span className="transition-transform duration-200">Cart</span>
                                </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center items-center mt-3'>
                    <button 
                        onClick={clearFavorites}
                        className="mb-4 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                    >
                        Clear All Favorites
                    </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Favorites;
