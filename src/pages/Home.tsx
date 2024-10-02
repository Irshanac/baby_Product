import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero'
import ProductList from '../components/ProductList';
import NavbarNew from '../components/NavbarNew';
function Home() {
    const navigate = useNavigate();
    
    return (
        <div>
            {/* <Navbar/> */}
            <NavbarNew/>
            <Hero />
            <ProductList/>
            <h1 className=''>Home Page</h1>
            <button onClick={() => navigate("/login")}>Login</button>
        </div>
    );
}

export default Home;
