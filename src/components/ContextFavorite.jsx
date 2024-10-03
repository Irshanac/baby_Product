import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the Context
export const FavoriteContext = createContext();

// Create and export the Provider component
export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [errorFavorites, setErrorFavorites] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/favorite');
                setFavorites(response.data);
            } catch (err) {
                setErrorFavorites(err.message || 'Failed to fetch favorite items.');
            } finally {
                setLoadingFavorites(false);
            }
        };

        fetchFavorites();
    }, []);

    const addToFavorite = async (product) => {
        try {
            const response = await axios.post('http://localhost:5000/favorite', product);
            setFavorites([...favorites, response.data]);
            alert(`${product.name} added to favorites.`);
        } catch (err) {
            console.error('Error adding to favorites:', err);
            alert('Failed to add product to favorites. Please try again.');
        }
    };

    const removeFromFavorite = async (productId) => {
        try {
            await axios.delete(`http://localhost:5000/favorite/${productId}`);
            setFavorites(favorites.filter(item => item.id !== productId));
            alert('Product removed from favorites.');
        } catch (err) {
            console.error('Error removing from favorites:', err);
            alert('Failed to remove product from favorites. Please try again.');
        }
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addToFavorite, removeFromFavorite, loadingFavorites, errorFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};
