import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";

function SideNav() {
  const navigate = useNavigate();
  const [active, setActive] = useState('/admin');

  const handleClick = (route) => {
    setActive(route);
    navigate(route);
  };

  return (
    <div className="w-40 h-auto bg-primary/90 md:w-64 lg:w-72"> 
      <div className="flex flex-col my-2">
        <div className='flex flex-col items-center'>
        <img src="/image/babys_logo.webp" alt="shop logo"  className=' w-50 h-50 items-center rounded-full'/>
        <h1 className="text-white text-lg md:text-xl lg:text-2xl">Baby's</h1>
          </div> 
        
        <button
          className={`bg-secondary m-2 py-2 px-1 rounded hover:scale-105 hover:text-white ${active === '/admin/product' ? 'text-white' : ''}`}
          onClick={() => handleClick('/admin/product')}
        >
          Product
        </button>
        
        <button
          className={`bg-secondary m-2 py-2 px-1 rounded hover:scale-105 hover:text-white ${active === '/admin' ? 'text-white' : ''}`}
          onClick={() => handleClick('/admin')}
        >
          Dashboard
        </button>

        <button
          className={`bg-secondary m-2 py-2 px-1 rounded hover:scale-105 hover:text-white ${active === '/admin/user' ? 'text-white' : ''}`}
          onClick={() => handleClick('/admin/user')}
        >
          User
        </button>

        <div className="mt-auto flex justify-center items-center cursor-pointer hover:scale-105">
          <IoIosLogOut size={24} className="text-white" onClick={()=>navigate('/login')} />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
