import React, { useState, useEffect ,useContext} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CartContext } from '../contexts/ContextCard.jsx'; 
import { FavoriteContext } from '../contexts/ContextFavorite.jsx';
import { Toaster } from 'react-hot-toast';
import { MdFavoriteBorder } from "react-icons/md"; 
import { useNavigate } from 'react-router-dom';
const SearchResults = () => {
  const navigate=useNavigate()
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { addToCart } = useContext(CartContext);
  const { addToFavorite } = useContext(FavoriteContext); 
  // Extract query parameter
  const query = new URLSearchParams(location.search).get('query') || '';

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:5000/product");
        const allProducts = response.data;
        const filtered = allProducts.filter((product) =>
          //product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          //product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
        if (filtered.length === 0) {
          toast('No products found for your search.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        toast.error('Failed to fetch products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for "{query}"
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
      )}
    </div>
  );
};

export default SearchResults;
