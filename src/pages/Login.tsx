import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); // Hook from React Router
 
    const loginInitialValues = { emai: "", password: "" };
    const loginValidationSchema = yup.object({
        email: yup.string().required("Please provide a username").email("please provide a valid email"),
        password: yup.string()
            .required("Please provide a password")
    });

   
    const registrationInitialValues = { 
        name: "", 
        username: "", 
        email: "", 
        password: "", 
        confirmPassword: "", 
        // cart: [], 
        // favorites: [], // Corrected spelling
        // order: []
    };
    const registrationValidationSchema = yup.object({
        name: yup.string().required("Please provide a name"),
        username: yup.string().required("Please provide a username").min(2,"Minimum 2 letters required"),
        email: yup.string().email("Please provide a valid email").required("Email is required"),
        password: yup.string()
            .required("Please provide a password")
            .min(8, "Password should be at least 8 characters long")
            .matches(/[a-z]/, "Password should contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password should contain at least one uppercase letter")
            .matches(/[0-9]/, "Password should contain at least one number")
            .matches(/[@$!%*?&#_]/, "Password should contain at least one special character"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required("Please confirm your password")
        
    });

    const loginSubmit = async (values, { resetForm }) => {
        try {
          if(values.email==="shanasafeeer159@gmail.com" && values.password==="Admin123")
          {
            toast.success("Admin login successfully complited")
            localStorage.setItem("name","Shana")
            navigate("/admin")
          }
          else{
            const response = await axios.get('http://localhost:5000/users', {
                params: {
                    email: values.email,
                    password: values.password
                }
            });

            console.log("Login response data:", response.data); 

            if (response.data.length > 0) {
                toast.success("Login successful!");
                resetForm(); 
                localStorage.setItem("id", response.data[0].id) // Corrected
                navigate("/"); 
            }
            else {
                toast.error("Invalid username or password");
            }
        }}
        catch (error) {
            console.error("Error during login", error);
            toast.error("An error occurred during login. Please try again.");
        }
    
    };

    const registrationSubmit = async (values, { resetForm }) => {
        try {
            const cart=[],favorites=[],order=[]
            console.log('====================================');
            console.log(values);
            console.log('====================================');
            const existingUsername = await axios.get("http://localhost:5000/users", {
                params: { username: values.username }
            });
            if (existingUsername.data.length > 0) {
                toast.error("Username already exists. Please choose another one.");
                return;
            }
            
            const existingEmail = await axios.get("http://localhost:5000/users", {
                params: { email: values.email }
            });
            if (existingEmail.data.length > 0) {
                toast.error("Email already exists. You can login.");
                return;
            }
            console.log("value...",values)
            const { confirmPassword, ...userData } = values;

            console.log("User Data to be registered:", userData); 
             const {... addingData}={...userData,cart,favorites,order}
             console.log("adding data",addingData)
            const response = await axios.post("http://localhost:5000/users", addingData);
            console.log("Registration success", response.data);
            toast.success("Registration successful");
            resetForm(); 
            
            setIsLogin(true)
        }
        catch (error) {
            console.log("Registration failed", error);
            toast.error("Registration failed. Please try again.");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-4 p-4 border rounded shadow">
              
                <div className="d-flex mb-4 gap-2">
                    <button 
                        type="button" 
                        onClick={() => setIsLogin(true)} 
                        className={`flex-fill btn ${isLogin ? 'btn-primary' : 'btn-light'}`}
                    >
                        Login
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setIsLogin(false)} 
                        className={`flex-fill btn ${!isLogin ? 'btn-primary' : 'btn-light'}`}
                    >
                        Registration
                    </button>
                </div>
                <Toaster/>
               
                {isLogin ? (
                    <Formik
                        initialValues={loginInitialValues}
                        validationSchema={loginValidationSchema}
                        onSubmit={loginSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Field 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        className="form-control"
                                    />
                                    
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="btn btn-success w-50 mx-auto d-flex justify-content-center align-items-center"
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                               
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <Formik
                        initialValues={registrationInitialValues}
                        validationSchema={registrationValidationSchema}
                        onSubmit={registrationSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <Field 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <Field 
                                        type="text" 
                                        name="username" 
                                        id="username" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Field 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <Field 
                                        type="password" 
                                        name="confirmPassword" 
                                        id="confirmPassword" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                   className="btn btn-success w-50 mx-auto d-flex justify-content-center align-items-center"
                                >
                                    {isSubmitting ? 'Registering...' : 'Register'}
                                </button>
                              
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default Login;
