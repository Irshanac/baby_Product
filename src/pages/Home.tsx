import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero'
import ProductList from '../components/ProductList';
function Home() {
    const navigate = useNavigate();
    
    return (
        <div>
            <Navbar/>
            <Hero />
            <ProductList/>
            <h1 className=''>Home Page</h1>
            <button onClick={() => navigate("/login")}>Login</button>
        </div>
    );
}

export default Home;
