
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from 'react'
import { MdLibraryAdd ,MdClose} from "react-icons/md";
import * as yup from 'yup';
import {ContextForAdmin} from '../../contexts/AdminContext'
function ProductDisply() {
    const product = useContext(ContextForAdmin);
    const initialValues={
        name:"",price:"",quantity:"",description:"",category:"",image:""
    }
    const validationSchema=yup.object({
        name:yup.string().required("ir is must be required"),
        price:yup.number().required("must be required"),
        quantity:yup.number().required("must be required"),
        description:yup.string().required("ir is must be required"),
        category:yup.string().required("ir is must be required"),
        image:yup.string().required("enter image path")
    })
    const handleSubmit=(values,{resetForm})=>{
        console.log((values));
        resetForm()
        
    }
    const [addproduct,setAddProduct]=useState(null)

    return (
        <div className="relative overflow-x-auto">
            <div className='flex justify-end m-1'>
                 <button onClick={()=>setAddProduct(true)}><MdLibraryAdd className='text-3xl' /></button>
            </div>
            
            <table className="w-full text-sm text-left rtl:text-right text-gray-900">
                <thead className="text-xs text-white uppercase bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-tl-xl">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-tr-xl">
                            Image
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {product.map((item) => (
                        <tr key={item.id} className="bg-white border-b hover:bg-blue-700 hover:text-white">
                            <td className="px-6 py-4  text-gray-900 ">
                                {item.name}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                {item.quantity}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                {item.price}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                {item.category}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                {item.description}
                            </td>
                            <td className="px-6 py-4 text-gray-700">
                                <img src={item.url} alt={item.name} width={100} height={100}></img>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {addproduct && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
                    <div className="bg-white rounded-lg p-6 relative max-w-lg w-full">
                        <MdClose 
                            className="absolute top-2 right-2 text-gray-600 cursor-pointer"
                            onClick={()=>setAddProduct(false)} 
                        />
                       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form>
                            <div className='p-2'>
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="name" className="text-gray-700">Name:</label>
                                    <Field
                                        name="name"
                                        type="text"
                                        placeholder="enter the name"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className='p-2'>
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="price" className="text-gray-700">Price:</label>
                                    <Field
                                        name="price"
                                        type="number"
                                        placeholder="enter the price"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                    <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className='p-2'>
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
                                    <Field
                                        name="quantity"
                                        type="number"
                                        placeholder="enter the quantity"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                    <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className='p-2'>
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="description" className="text-gray-700">Description:</label>
                                    <Field
                                        name="description"
                                        type="text"
                                        placeholder="enter the description"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className='p-2'>
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="category" className="text-gray-700">Category:</label>
                                    <Field
                                        name="category"
                                        type="text"
                                        placeholder="enter the category"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                    <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>
                            <div className='p-2'>
                                <div className="flex flex-col space-y-2">
                                    <label htmlFor="image" className="text-gray-700">Image:</label>
                                    <input type="radio" name="url"></input>
                                    
                                    <Field
                                        name="image"
                                        type="text"
                                        placeholder="enter the image path"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                                    />
                                    <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className='p-2'>
                                <button
                                    type='submit'
                                    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    </Formik>

                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDisply




