import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoginLayout from './components/LoginLayout';
import Home from './pages/Home';
import Login from './pages/Login';
// import About from './components/About';
// import Contact from './components/Contact';
import Favourite from './components/Favorite';
import AddToCart from './components/Cart';
import Order from './components/Order';
import OrderConform from './components/OrederConform'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Default layout with Navbar and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-confirmation" element={<OrderConform/>}/>
        </Route>

        {/* Layout for Login (no Navbar or Footer) */}
        <Route element={<LoginLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
