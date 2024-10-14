import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
export const ContextForAdmin=createContext()
function AdminContext({children}) {
    const [product,setProduct]=useState([])
    const [category,setCategory]=useState([])
   
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/product")
                setProduct(response.data)
                setCategory([...new Set(response.data.map(p=>p.category))])
                
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData()
    },[])
    const addingData=async(newProduct)=>{
        try{
            await axios.post("http://localhost:5000/product",newProduct)
            toast.success("new product added")
        }
        catch(error)
        {
            console.log(error.message)
        }
    }
    const deleteProduct=async(id)=>{
        try{
            await axios.delete(`http://localhost:5000/product/${id}`)
        //setProduct(response.data)
        const update=product.filter((p)=>p.id!==id)
        setProduct(update)
        toast.success("delete successfully.........")
        }
       catch(error)
       {
        console.log(error.message); 
       }
    }
    const editFormData=async(product)=>{
        try{
            const id =product.id
             const response=await axios.put(`http://localhost:5000/product/${id}`,product)
             setProduct((prevProducts) =>
                prevProducts.map((item) => (item.id === id ? response.data : item))
              );
             console.log(response.data)
             toast.success("product updated successfully")
        }
        catch(error){
            console.log(error.message);
        }
    }
  return (
    <ContextForAdmin.Provider value={{product,addingData,deleteProduct,editFormData,category}}>
        {children}
    </ContextForAdmin.Provider>
  )
}

export default AdminContext
