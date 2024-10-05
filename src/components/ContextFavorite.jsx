import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
export const FavoriteContext = createContext();
export const FavoriteProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const [loadingFavorites, setLoadingFavorites] = useState(true);
    const [errorFavorites, setErrorFavorites] = useState(null);

    useEffect(() => {
        const userId = localStorage.getItem("id"); 
        const fetchFavorites = async () => {
            if (!userId) {
                setErrorFavorites('User ID is null. Please log in.');
                setLoadingFavorites(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:5000/users/${userId}`);
                setFavorites(response.data.favorites);
            } catch (err) {
                setErrorFavorites(err.message || 'Failed to fetch favorite items.');
            } finally {
                setLoadingFavorites(false);
            }
        };

        fetchFavorites();
    }, []);

    const addToFavorite = async (product) => {
        const userId = localStorage.getItem("id");
        //checking allready exisit
        console.log(product.id);
        
        const existingFavorite=favorites.find((item)=>item.id===product.id)
        if(existingFavorite)
        {
            toast.error("allready exist")
            return
        }
        try {
            await axios.patch(`http://localhost:5000/users/${userId}`,{favorites:[...favorites,product]});
            setFavorites([...favorites, product]); 
            toast.success(`${product.name} added to favorites.`);
        } catch (err) {
            toast.error('Failed to add product to favorites. Please try again.');
        }
    };

    const removeFromFavorite = async (productId) => {
        const userId = localStorage.getItem("id");
        try {
            const updateFavorite=favorites.filter((item)=>item.id!==productId)
            await axios.patch(`http://localhost:5000/users/${userId}`,{favorites:[...updateFavorite]});
            setFavorites(updateFavorite); 
            toast.success('Product removed from favorites.');
        } catch (err) {
            toast.error('Failed to remove product from favorites. Please try again.');
        }
    };
    const clearFavorites=async ()=>{
        try{
            const userid=localStorage.getItem("id")
        await axios.patch(`http://localhost:5000/users/${userid}`,{favorites:[]})
        setFavorites([])
        toast.success("remove all item from the favorite")
        }
        catch(error)
        {
            toast.error("Fails to remove all items from favorite.")
        }
    }

    return (
        <FavoriteContext.Provider value={{ favorites, addToFavorite, removeFromFavorite,clearFavorites, loadingFavorites, errorFavorites }}>
            {children}
        </FavoriteContext.Provider>
    );
};
