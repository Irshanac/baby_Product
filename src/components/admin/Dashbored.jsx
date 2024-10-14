import React, { useContext } from 'react';
import { ContextForAdmin } from "../../contexts/AdminContext";
import { UserDataContext } from '../../contexts/UserContext';
function Dashboard() {
  const { product } = useContext(ContextForAdmin); 
  const { user } = useContext(UserDataContext);
  const block=user.filter((user)=>user.status===false)
  const blockCount=block.length
  const emptyProduct=product.filter((product)=>product.quantity===0)
  const lessProduct=product.filter((product)=>product.quantity<50)
  return (
    <div>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
        <p className="text-xl font-semibold">products: {product.length}</p>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
        <p className="text-xl font-semibold">Empty products: {emptyProduct.length}</p>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
        <p className="text-xl font-semibold">user: {user.length}</p>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow flex justify-center">
        <p className="text-xl font-semibold">Blocked user: {blockCount}</p>
      </div>
    </div>
    <table className="w-full text-sm text-left rtl:text-right text-gray-900 my-2">
    <thead className="text-xs text-white uppercase bg-gray-800">
        <tr>
          <th className='px-3 py-2'>Name</th>
          <th className='px-3 py-2'>Category</th>
          <th className='px-3 py-2'>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {lessProduct.map((product)=>
        <tr key={product.id} className='hover:bg-gray'>
          <td className='px-3 py-2'>{product.name}</td>
          <td className='px-3 py-2'>{product.category}</td>
          <td className='px-3 py-2'>{product.quantity}</td>
        </tr>
        )}
      </tbody>
    </table>
    
    </div>
  );
}

export default Dashboard;
