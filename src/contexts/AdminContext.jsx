import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
export const ContextForAdmin=createContext()
function AdminContext({children}) {
    const [product,setProduct]=useState([])
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/product")
                setProduct(response.data)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    },[])
  return (
    <ContextForAdmin.Provider value={product}>
        {children}
    </ContextForAdmin.Provider>
  )
}

export default AdminContext
