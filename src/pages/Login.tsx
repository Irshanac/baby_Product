import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            .matches(/[@$!%*?&#]/, "Password should contain at least one special character")
    });

    // Initial values and validation for the registration form
    const registrationInitialValues = { name: "", username: "", email: "", password: "", confirmPassword: "" };
    const registrationValidationSchema = yup.object({
        name: yup.string().required("Please provide a name"),
        username: yup.string().required("Please provide a username"),
        email: yup.string().email("Please provide a valid email").required("Email is required"),
        password: yup.string()
            .required("Please provide a password")
            .min(8, "Password should be at least 8 characters long")
            .matches(/[a-z]/, "Password should contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password should contain at least one uppercase letter")
            .matches(/[0-9]/, "Password should contain at least one number")
            .matches(/[@$!%*?&#]/, "Password should contain at least one special character"),
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

            console.log(response.data); // Log the response data for debugging

            if (response.data.length > 0) { // Check if any user matches
                alert("Login successful");
                resetForm(); // Reset the form fields
                navigate("/"); // Redirect to home or dashboard
            }
            else {
                alert("Invalid username or password");
            }
        }
        catch (error) {
            console.error("Error during login", error);
            alert("An error occurred during login. Please try again.");
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
                alert("Username already exists. Please choose another one.");
                return;
            }

            // Check if the email already exists
            const existingEmail = await axios.get("http://localhost:5000/users", {
                params: { email: values.email }
            });
            if (existingEmail.data.length > 0) {
                alert("Email already exists. You can login.");
                return;
            }

            // Exclude confirmPassword from the data to be sent to the server
            const { confirmPassword, ...userData } = values;

            // Post the new user data to JSON Server
            const response = await axios.post("http://localhost:5000/users", userData);
            console.log("Registration success", response.data);
            alert("Registration successful");
            resetForm(); // Reset the form fields after successful registration
        }
        catch (error) {
            console.log("Registration failed", error);
            alert("Registration failed. Please try again.");
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
            {/* Toggle Buttons */}
            <div className="flex mb-6">
                <button 
                    type="button" 
                    onClick={() => setIsLogin(true)} 
                    className={`flex-1 px-4 py-2 mr-1 rounded ${isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Login
                </button>
                <button 
                    type="button" 
                    onClick={() => setIsLogin(false)} 
                    className={`flex-1 px-4 py-2 ml-1 rounded ${!isLogin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    Registration
                </button>
            </div>

            {/* Conditional Rendering of Forms */}
            {isLogin ? (
                <Formik
                    key="login" // Added key prop
                    initialValues={loginInitialValues}
                    validationSchema={loginValidationSchema}
                    onSubmit={loginSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <Field 
                                    type="text" 
                                    name="username" 
                                    id="username" 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <Field 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>
            ) : (
                <Formik
                    key="registration" // Added key prop
                    initialValues={registrationInitialValues}
                    validationSchema={registrationValidationSchema}
                    onSubmit={registrationSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <Field 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                <Field 
                                    type="text" 
                                    name="username" 
                                    id="username" 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <Field 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <Field 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <Field 
                                    type="password" 
                                    name="confirmPassword" 
                                    id="confirmPassword" 
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                            >
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    );
};

export default Login;
