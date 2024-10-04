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
        const userId = localStorage.getItem("id"); // Get user ID from localStorage

        if (!userId) {
            setLoadingFavorites(false);
            return; // Stop if user ID is not present
        }

        const fetchFavorites = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users/${userId}`);
                setFavorites(response.data.favorite); // Set favorites from user data
            } catch (err) {
                setErrorFavorites(err.message || 'Failed to fetch favorite items.');
            } finally {
                setLoadingFavorites(false);
            }
        };

        fetchFavorites();
    }, []);

    const addToFavorite = async (product) => {
        const userId = localStorage.getItem("id"); // Get user ID from localStorage
        if (!userId) {
            alert('User is not logged in.');
            return;
        }

        try {
            // Add the product to the user's favorites on the backend
            const response = await axios.post(`http://localhost:5000/users/${userId}/favorite`, product);
            setFavorites([...favorites, response.data]); // Update local state
            alert(`${product.name} added to favorites.`);
        } catch (err) {
            console.error('Error adding to favorites:', err);
            alert('Failed to add product to favorites. Please try again.');
        }
    };

    const removeFromFavorite = async (productId) => {
        const userId = localStorage.getItem("id"); // Get user ID from localStorage
        if (!userId) {
            alert('User is not logged in.');
            return;
        }

        try {
            // Remove the product from the user's favorites on the backend
            await axios.delete(`http://localhost:5000/users/${userId}/favorite/${productId}`);
            setFavorites(favorites.filter(item => item.id !== productId)); // Update local state
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
