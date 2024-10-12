import React, { useContext , useState} from 'react';
import { UserDataContext } from '../../contexts/UserContext';

function UserList() {
  const {user,block} = useContext(UserDataContext);
  const [userShow,setUserShow]=useState(null)

  return (
    <div>
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
              <tr key={user.id} className='hover:bg-gray-500 hover:text-white' onDoubleClick={()=>setUserShow(user)}>
                <td className='px-2 py-2'>{user.name}</td>
                <td className='px-2 py-2'>{user.username}</td>
                <td className='px-2 py-2'>{user.email}</td>
                <td className='px-2 py-2 hover:scale-105 ' ><button className={`${user.status?'hover:bg-red-700':'hover:bg-yellow-500'} py-1 px-3 rounded`} onClick={()=>block(user.id,user.status)}>{user.status?"Block":"Unblock"}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      {userShow && (
        <div className='bg-gray'>
          show details
        </div>
      )}
    </div>
  );
}

export default UserList;
