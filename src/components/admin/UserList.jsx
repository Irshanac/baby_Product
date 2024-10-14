import React, { useContext, useState } from 'react';
import { UserDataContext } from '../../contexts/UserContext';
import { MdClose } from "react-icons/md"; 
import { Toaster } from 'react-hot-toast';
function UserList() {
  const { user, block } = useContext(UserDataContext);
  const [userShow, setUserShow] = useState(null);
  
  return (
    <div>
      <Toaster/>
      <table className='bg-gray-100 w-full'>
        <thead>
          <tr className='bg-primary/90 text-white'>
            <th className='px-4 py-3 rounded-tl-xl'>Name</th>
            <th className='px-4 py-3'>Username</th>
            <th className='px-4 py-3'>Email</th>
            <th className='px-4 py-3 rounded-tr-xl'>Status</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr
              key={user.id}
              className='hover:bg-gray-500 hover:text-white'
              onDoubleClick={() => setUserShow(user)}
            >
              <td className='px-2 py-2'>{user.name}</td>
              <td className='px-2 py-2'>{user.username}</td>
              <td className='px-2 py-2'>{user.email}</td>
              <td className='px-2 py-2 hover:scale-105'>
                <button
                  className={`${
                    user.status ? 'hover:bg-red-700' : 'hover:bg-yellow-500'
                  } py-1 px-3 rounded`}
                  onClick={() => block(user.id, user.status)}
                >
                  {user.status ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {userShow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-lg w-full overflow-auto max-h-full">
            <MdClose 
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setUserShow(null)} 
              size={24}
            />
            <p><strong>Name:</strong> {userShow.name}</p>
            <p><strong>Email:</strong> {userShow.email}</p>
            {userShow.order.length === 0 ? (
              <h3 className='text-center'>No orders</h3>
            ) : (
              <>
                {userShow.order.map((order, index) => (
                  <div key={order.id} className="mb-4 border-b pb-2">
                    <p><strong>Order {index + 1}</strong></p>
                    <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
                    <ul className="list-disc list-inside">
                      {order.items.map((item) => (
                        <li key={item.id} className='flex justify-between'>
                          <span>{item.name}</span>
                          <span>{item.quantity}x{item.price}</span>
                          <span>{item.price * item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                    <p><strong>Total:</strong> {order.total}</p>
                  </div>
                ))}
                <div className='flex justify-center items-center mt-4'>
                  <p><strong>Total Amount:</strong> {userShow.order.reduce((acc, order) => acc + order.total, 0)}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
