import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
// Removed react-toastify CSS import

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); // Hook from React Router
 
    // Initial values and validation for the login form
    const loginInitialValues = { username: "", password: "" };
    const loginValidationSchema = yup.object({
        username: yup.string().required("Please provide a username"),
        password: yup.string()
            .required("Please provide a password")
            .min(8, "Password should be at least 8 characters long")
            .matches(/[a-z]/, "Password should contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password should contain at least one uppercase letter")
            .matches(/[0-9]/, "Password should contain at least one number")
            .matches(/[@$!%*?&#_]/, "Password should contain at least one special character")
    });

    // Initial values and validation for the registration form
    const registrationInitialValues = { name: "", username: "", email: "", password: "", confirmPassword: "" };
    const registrationValidationSchema = yup.object({
        name: yup.string().required("Please provide a name"),
        username: yup.string().required("Please provide a username").min(2,"minimun 2 latters requires"),
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

    // Login submit handler
    const loginSubmit = async (values, { resetForm }) => {
        try {
            // Make a GET request to fetch users matching the username and password
            const response = await axios.get('http://localhost:5000/users', {
                params: {
                    username: values.username,
                    password: values.password
                }
            });

            console.log("Login response data:", response.data); // Log the response data for debugging

            if (response.data.length > 0) { // Check if any user matches
                toast.success("Login successful!");
                resetForm(); // Reset the form fields
                navigate("/"); // Redirect to home or dashboard
            }
            else {
                toast.error("Invalid username or password");
            }
        }
        catch (error) {
            console.error("Error during login", error);
            toast.error("An error occurred during login. Please try again.");
        }
    };

    // Registration submit handler
    const registrationSubmit = async (values, { resetForm }) => {
        try {
            // Check if the username already exists
            const existingUsername = await axios.get("http://localhost:5000/users", {
                params: { username: values.username }
            });
            if (existingUsername.data.length > 0) {
                toast.error("Username already exists. Please choose another one.");
                return;
            }

            // Check if the email already exists
            const existingEmail = await axios.get("http://localhost:5000/users", {
                params: { email: values.email }
            });
            if (existingEmail.data.length > 0) {
                toast.error("Email already exists. You can login.");
                return;
            }

            // Exclude confirmPassword from the data to be sent to the server
            const { confirmPassword, ...userData } = values;

            // Post the new user data to JSON Server
            const response = await axios.post("http://localhost:5000/users", userData);
            console.log("Registration success", response.data);
            toast.success("Registration successful");
            resetForm(); // Reset the form fields after successful registration
            navigate("/login");
        }
        catch (error) {
            console.log("Registration failed", error);
            toast.error("Registration failed. Please try again.");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-4 p-4 border rounded shadow">
                {/* Toggle Buttons */}
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
                {/* Conditional Rendering of Forms */}
                {isLogin ? (
                    <Formik
                        initialValues={loginInitialValues}
                        validationSchema={loginValidationSchema}
                        onSubmit={loginSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
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
                                {/* Removed Toaster from here */}
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
                                {/* Removed Toaster from here */}
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default Login;
