import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";

function SideNav() {
  const navigate=useNavigate()
  const [active,setactive]=useState('/admin')
  const handleClick=(route)=>{
    setactive(route)
    navigate(route)
  }
  return (
    <div className='ml-0 w-40 h-auto bg-primary/90'>
      <div className='flex flex-col my-2'>
      <h1 className='text-white'>Admin </h1>
      <button className={`bg-secondary m-2 py-2 px-1 rounded hover:scale-105 hover:text-white ${active === '/admin/product' ? 'text-white' : ''}`}onClick={()=>handleClick('/admin/product')}> Product</button>
      <button className={`bg-secondary m-2 py-2 px-1 rounded hover:scale-105 hover:text-white ${active==='/admin'?'text-white':''}`} onClick={()=>handleClick('/admin')}>Dashbored</button>
      <button className={`bg-secondary m-2 py-2 px-1 rounded hover:scale-105 hover:text-white ${active==='/admin/user'?'text-white':''}`}onClick={()=>handleClick('/admin/user')}>User</button>
      <IoIosLogOut />
      </div>   
    </div>
  );
}

export default SideNav;
