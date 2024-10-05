import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const SearchResults = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();

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
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
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
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.url || '/path/to/fallback-image.jpg'}
                alt={product.title}
                className="w-full h-48 object-cover mb-4"
                loading="lazy"
                onError={(e) => { e.target.src = '/path/to/fallback-image.jpg'; }}
              />
              <h2 className="text-xl font-semibold">{product.title}</h2>
              <p className="text-gray-600 mt-2">{product.description}</p>
              <div className="mt-4 text-lg font-bold">₹{product.price}</div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
