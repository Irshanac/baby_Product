import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
    const navigate = useNavigate();
    
    return (
        <div>
            <Navbar/>
            <h1>Home Page</h1>
            <button onClick={() => navigate("/login")}>Login</button>
        </div>
    );
}

export default Home;
