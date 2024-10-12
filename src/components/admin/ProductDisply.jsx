import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { MdLibraryAdd, MdClose } from "react-icons/md";
import * as yup from "yup";
import { ContextForAdmin } from "../../contexts/AdminContext";
import { ToastContainer } from "react-toastify";
function ProductDisply() {
  const {product,addingData,deleteProduct,editFormData} = useContext(ContextForAdmin);
//new product adding form
  const initialValues = {
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    url: "",
  };
  const validationSchema = yup.object({
    name: yup.string().required("ir is must be required"),
    price: yup.number().required("must be required"),
    quantity: yup.number().required("must be required"),
    description: yup.string().required("ir is must be required"),
    category: yup.string().required("ir is must be required"),
    url: yup.string().required("enter image path"),
  });
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    addingData(values)
    resetForm();
  };
//edit forms
const editHandleSubmit=(values)=>{
  console.log(values)
  editFormData(values)
  setEditProduct(null)
}

const selectEditFormData=(editData)=>{
  setOpenProduct(null)
  setEditProduct(editData)
  
}

  const [addproduct, setAddProduct] = useState(null);
  const [imagepath, setImagepath] = useState("url");
  const [openproduct,setOpenProduct]=useState(null);
  const [edditProduct,setEditProduct]=useState(null)
  return (
    <div className="relative overflow-x-auto">
      <ToastContainer/>
      <div className="flex justify-end m-1">
        <button onClick={() => setAddProduct(true)}>
          <MdLibraryAdd className="text-3xl" />
        </button>
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
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3 rounded-tr-xl">
              Edit/Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {product.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b hover:bg-blue-700 hover:text-white"
              onDoubleClick={()=>setOpenProduct(item)}
            >
              <td className="px-6 py-1  text-gray-900 ">{item.name}</td>
              <td className="px-6 py-1 text-gray-700">{item.quantity}</td>
              <td className="px-6 py-1 text-gray-700">{item.price}</td>
              <td className="px-6 py-1 text-gray-700">{item.category}</td>
              <td className="px-6 py-1 text-gray-700">{item.description}</td>
              <td className="px-6 py-1 text-gray-700">
                <img
                  src={item.url}
                  alt={item.name}
                  width={100}
                  height={100}
                ></img>
              </td>
              <td className="px-6 py-1 text-gray-700">
                <div className="flex flex-col justify-center">
                    <button className="px-3 py-1 rounded bg-primary/70 text-white m-1 hover:scale-105 hover:bg-primary/90"onClick={()=>setEditProduct(item)}>Edit</button>
                    <button className="px-3 py-1 rounded bg-primary/70 text-white m-1 hover:scale-105 hover:bg-red-900" onClick={()=>deleteProduct(item.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {addproduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-lg w-full h-3/4 overflow-y-auto">
            <MdClose
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setAddProduct(false)}
            />
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form>
                <div className="p-2">
                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="name" className="text-gray-700 w-1/4">
                      Name:
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="enter the name"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-2">
                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="price" className="text-gray-700 w-1/4">
                      Price:
                    </label>
                    <Field
                      name="price"
                      type="number"
                      placeholder="enter the price"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-2">
                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="quantity" className="text-gray-700 w-1/4">
                      Quantity:
                    </label>
                    <Field
                      name="quantity"
                      type="number"
                      placeholder="enter the quantity"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-2 flex flex-col">
                  <div className="flex flex-row space-x-4 items-center">
                    <label
                      htmlFor="description"
                      className="text-gray-700 w-1/4"
                    >
                      Description:
                    </label>
                    <Field
                      name="description"
                      type="text"
                      placeholder="enter the description"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-2">
                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="category" className="text-gray-700 w-1/4">
                      Category:
                    </label>
                    <Field
                      name="category"
                      type="text"
                      placeholder="enter the category"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-2">
                  <div className="flex flex-row items-center">
                    <label htmlFor="image" className="text-gray-700 w-1/4">
                      Image:
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-1">
                        <Field
                          type="radio"
                          name="imagetype"
                          value="url"
                          onChange={() => setImagepath("url")}
                        />
                        <span>Url</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <Field
                          type="radio"
                          name="imagetype"
                          value="path"
                          onChange={() => setImagepath("path")}
                        />
                        <span>Path</span>
                      </label>
                    </div>
                  </div>
                  {imagepath === "url" ? (
                    <Field
                      name="url"
                      type="text"
                      placeholder="enter the image URL"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                  ) : (
                    <Field
                      name="url"
                      type="file"
                      placeholder="select image from your computer"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                  )}
                  <ErrorMessage
                    name="url"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="p-2">
                  <button
                    type="submit"
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
      {/**double clicking part..................... */}
      {openproduct && (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 relative max-w-lg w-full">
          <MdClose
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setOpenProduct(false)}
            />
             <h2 className="text-xl font-bold mb-2">{openproduct.name}</h2>
                        <img 
                            src={openproduct.url} 
                            alt={openproduct.name} 
                            className="w-full h-60 rounded object-cover mb-2"
                        />
                        <p className="text-gray-600">Description: {openproduct.description}</p>
                        <p className="text-gray-600">Price: {openproduct.price}</p>
                        <p className="text-gray-600">Quantity:{openproduct.quantity}</p>
                        <p className="text-gray-600">Category: {openproduct.category}</p>
                        <div className="flex pt-1 pb-3 px-3 justify-between mt-4">
                        <button className="px-3 py-1 rounded bg-primary/70 text-white m-1 hover:scale-105 hover:bg-primary/90"onClick={()=>selectEditFormData(openproduct)}>Edit</button>
                        <button className="px-3 py-1 rounded bg-primary/70 text-white m-1 hover:scale-105 hover:bg-red-900" onClick={()=>deleteProduct(openproduct.id)}>Delete</button>
                        </div>
          </div>
        </div>
      )}
      {edditProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-lg w-full h-3/4 overflow-y-auto">
            <MdClose
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setEditProduct(false)}
            />
            <Formik
              initialValues={{
                name:edditProduct.name,
                price:edditProduct.price,
                quantity: edditProduct.quantity,
                description:edditProduct.quantity,
                category:edditProduct.category,
                url:edditProduct.url,
                id:edditProduct.id

              }}
              validationSchema={validationSchema}
              onSubmit={editHandleSubmit}
            >
              <Form>
                <div className="p-2">
                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="name" className="text-gray-700 w-1/4">
                      Name:
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="enter the name"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-2">
                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="price" className="text-gray-700 w-1/4">
                      Price:
                    </label>
                    <Field
                      name="price"
                      type="number"
                      placeholder="enter the price"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-2">
                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="quantity" className="text-gray-700 w-1/4">
                      Quantity:
                    </label>
                    <Field
                      name="quantity"
                      type="number"
                      placeholder="enter the quantity"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-2 flex flex-col">
                  <div className="flex flex-row space-x-4 items-center">
                    <label
                      htmlFor="description"
                      className="text-gray-700 w-1/4"
                    >
                      Description:
                    </label>
                    <Field
                      name="description"
                      type="text"
                      placeholder="enter the description"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-2">
                  <div className="flex flex-row space-x-4 items-center">
                    <label htmlFor="category" className="text-gray-700 w-1/4">
                      Category:
                    </label>
                    <Field
                      name="category"
                      type="text"
                      placeholder="enter the category"
                      className="block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="p-2">
                  <div className="flex flex-row items-center">
                    <label htmlFor="image" className="text-gray-700 w-1/4">
                      Image:
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-1">
                        <Field
                          type="radio"
                          name="imagetype"
                          value="url"
                          onChange={() => setImagepath("url")}
                        />
                        <span>Url</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <Field
                          type="radio"
                          name="imagetype"
                          value="path"
                          onChange={() => setImagepath("path")}
                        />
                        <span>Path</span>
                      </label>
                    </div>
                  </div>
                  {imagepath === "url" ? (
                    <Field
                      name="url"
                      type="text"
                      placeholder="enter the image URL"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                  ) : (
                    <Field
                      name="url"
                      type="file"
                      placeholder="select image from your computer"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
                    />
                  )}
                  <ErrorMessage
                    name="url"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="p-2">
                  <button
                    type="submit"
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
  );
}

export default ProductDisply;
