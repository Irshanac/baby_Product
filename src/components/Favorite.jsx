// Favorites.js
import React, { useContext } from 'react';
import { FavoriteContext } from './ContextFavorite';
import { MdClose } from "react-icons/md"; // For remove icon

const Favorites = () => {
    const { favorites, removeFromFavorite, loading, error, clearFavorites } = useContext(FavoriteContext);

    if (loading) {
        return <div className="text-center py-4">Loading favorites...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">Error: {error}</div>;
    }

    const totalFavorites = favorites.length;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Favorites</h2>
            {totalFavorites === 0 ? (
                <h3 className="text-center">You have no favorite products.</h3>
            ) : (
                <>
                    <button 
                        onClick={clearFavorites}
                        className="mb-4 bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded"
                    >
                        Clear All Favorites
                    </button>
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
                                <p className="text-gray-600 px-3 py-1">Name: {product.name}</p>
                                <p className="text-gray-600 px-3 py-1">Price: {Number(product.price).toFixed(2)}</p>
                                <p className="text-gray-600 px-3 py-1">Quantity: {product.quantity}</p>
                                <button
                                    onClick={() => removeFromFavorite(product.id)}
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded flex items-center justify-center"
                                >
                                    <MdClose className='text-lg' /> Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Favorites;
