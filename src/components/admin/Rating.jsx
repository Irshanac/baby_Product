import React, { useState, useContext } from 'react'
import { ContextForAdmin } from "../../contexts/AdminContext";

function Rating() {
    const { product } = useContext(ContextForAdmin);
    const [activeRating, setActiveRating] = useState(0);

    const productRating = (index) => {
        setActiveRating(index);
    };

    return (
        <div>
            {product.map((item) => (
                <div key={item.id} className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                    <img src={item.url} className='w-40 h-40' alt={item.name} />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <div className='flex gap-2 m-4'>
                    <div onClick={() => productRating(1)} className={`${activeRating >= 1 ? 'bg-yellow-700' : ''} py-1 px-3 rounded cursor-pointer`}>1</div>
                    <div onClick={() => productRating(2)} className={`${activeRating >= 2 ? 'bg-yellow-700' : ''} py-1 px-3 rounded cursor-pointer`}>2</div>
                    <div onClick={() => productRating(3)} className={`${activeRating >= 3 ? 'bg-yellow-700' : ''} py-1 px-3 rounded cursor-pointer`}>3</div>
                    <div onClick={() => productRating(4)} className={`${activeRating >= 4 ? 'bg-yellow-700' : ''} py-1 px-3 rounded cursor-pointer`}>4</div>
                    <div onClick={() => productRating(5)} className={`${activeRating >= 5 ? 'bg-yellow-700' : ''} py-1 px-3 rounded cursor-pointer`}>5</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Rating;
