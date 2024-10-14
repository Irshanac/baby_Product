import React, { useContext } from 'react';
import { ContextForAdmin } from "../../contexts/AdminContext";

function Dashboard() {
  const { products } = useContext(ContextForAdmin); 

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <p className="text-xl font-semibold">Number of products: {products.length}</p>
      </div>
    </div>
  );
}

export default Dashboard;
