import axios from 'axios'
import React, { useEffect, useState } from 'react'
const Favorite=()=>{
    const [favorite,setFavorite]=useState([])
    useEffect(()=>{
        const favData=async ()=>{
          try{
            const response=  await axios.get("http://localhost:5000/favorite")
          setFavorite(response.data)
          }
          catch(error)
          {
            console.log(error.messege)
          }
        }
        favData()
    },[favorite])
    const removerFromfav=()=>{

    }
    return(
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {favorite.length === 0 ? (
                <h1 className="text-center">Your cart is empty</h1>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {favorite.map((product) => (
                            <div
                                key={product.id}
                                className="border border-primary-100 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                            >
                                <img
                                    src={product.url}
                                    alt={product.name}
                                    className="w-full h-60 rounded-t object-cover"
                                />
                                <p className="text-gray-600 px-3 py-1">Name: {product.name}</p>
                                <p className="text-gray-600 px-3 py-1">Price: {product.price}</p>
                                <button
                                    onClick={() => removerFromfav(product.id)}
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    {/* <div className="mt-6 text-right">
                        <h3 className="text-xl font-semibold">Total: ${totalPrice}</h3>
                    </div> */}
                </>
            )}
        </div>
    )
}
export default Favorite