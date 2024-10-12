import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const UserDataContext=createContext()
function UserContext({children}) {
    const [user,setUser]=useState([])
    const [status,setStatus]=useState('')
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const response=await axios.get('http://localhost:5000/users')
                setUser(response.data)
            }
            catch(error)
            {
                console.log(error.messege)
            }
        }
        fetchUser()
    },[user])
    const block=async(id,status)=>{
        try{
            await axios.patch(`http://localhost:5000/users/${id}`,{status:!status})
            setUser(user.map((userlist)=>(userlist.id===id?{...userlist,status:!status}:{...userlist})))
        }
        catch(error)
        {
            console.log(error.messege)
        }
    }
  return (
    <UserDataContext.Provider value={{user,block}}>
        {children}
    </UserDataContext.Provider>
  )
}

export default UserContext
