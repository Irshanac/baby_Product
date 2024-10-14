import React, { useState, useEffect, useRef,useContext } from 'react';
import toast from 'react-hot-toast';
import { 
  FaShoppingCart, 
  FaUser, 
  FaHeart,  
  FaBars 
} from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { CiLogin ,CiLogout} from "react-icons/ci";
import { CartContext } from '../contexts/ContextCard';

const Navbar = () => {
  const name=localStorage.getItem("name")
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { cart } = useContext(CartContext);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleUserMenu = () => setUserMenuOpen(prev => !prev);

  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setUserMenuOpen(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-button')) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCart = () => {
    if (!localStorage.getItem("id")) {
      toast.error("You must be logged in");
    } else {
      navigate('/cart');
    }
  };

  const handleFavorite = () => {
    if (!localStorage.getItem("id")) {
      toast.error("You must be logged in");
    } else {
      navigate('/favourite');
    }
  };

  const handleSettings = () => {
    if (!localStorage.getItem("id")) {
        toast.error("You must be logged in");
      } else {
        navigate('/order-History');
      }
    setUserMenuOpen(false);
  };
  const handleLogin=()=>{
    if (localStorage.getItem("id")) {
        toast.error("You must be logout");
      } else {
        navigate('/login');
      }
    setUserMenuOpen(false);
  }

  const handleLogout = () => {
    if (!localStorage.getItem("id")) {
        toast.error("You must be logged in");
      } else {
        localStorage.removeItem("id");
        localStorage.removeItem("name")
    toast.success("Logged out successfully");
    navigate('/login');
      }
    
    setUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      if (query.trim()){
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
      }
    });  // 300ms delay
  };
  

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
      
        <div className="flex items-center space-x-4">
          <a className="font-bold text-2xl sm:text-3xl text-white" href="/">BABy'S</a>
        </div>

       
        <div>
          <input
            type="text"
            name="search"
            placeholder="Search"
            onChange={handleSearch}
            className="w-48 sm:w-48 group-hover:w-72 transition-all duration-300 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-primary"
          />
          {/* <IoMdSearch className="text-xl text-gray-500 group-hover:text-primary absolute top-1/2 transform -translate-y-1/2 right-4 pointer-events-none" /> */}
          </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-4">
          <button
              onClick={handleCart}
              className="relative bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 hover:from-secondary hover:to-primary"
              aria-label="Cart"
            >
              <FaShoppingCart className="text-xl relative" />

              
            {cart.length>0? ( <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length} 
              </span>):("")}

              <span className="hidden group-hover:inline">Cart</span>
            </button>
            <button
              onClick={handleFavorite}
              className="bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 hover:from-secondary hover:to-primary"
              aria-label="Favorites"
            >
              <FaHeart className="text-xl" />
              <span className="hidden group-hover:inline">Favorite</span>
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-2 px-4 rounded-full flex items-center gap-2 hover:from-secondary hover:to-primary"
                aria-haspopup="true"
                aria-expanded={userMenuOpen}
                aria-label="User menu"
              >
                <FaUser className="text-xl" />
                <span>{name}</span>
                <span className="hidden group-hover:inline">User</span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                  <ul>
                 {localStorage.getItem("id")?("") :(<li
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={handleLogin}
                    >
                      <CiLogin className="mr-2" /> Login
                    </li>)}
                    <li
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={handleSettings}
                    >
                      <FiSettings className="mr-2" /> Order
                    </li>
                   {localStorage.getItem("id")?(<li
                      className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={handleLogout}
                    >
                      <CiLogout className="mr-2" /> Logout
                    </li>):("")}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={toggleMenu} 
              className="mobile-menu-button text-white focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <FaBars className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-gray-700 p-4 mt-2 space-y-4" ref={mobileMenuRef}>
          <button
            onClick={handleCart}
            className="w-full text-left text-white flex items-center p-2 hover:bg-gray-600 rounded"
          >
            <FaShoppingCart className="mr-2" /> Cart
          </button>
          <button
            onClick={handleFavorite}
            className="w-full text-left text-white flex items-center p-2 hover:bg-gray-600 rounded"
          >
            <FaHeart className="mr-2" /> Favorite
          </button>
          {localStorage.getItem("id")?("") :(<button
            onClick={handleLogin}
            className="w-full text-left text-white flex items-center p-2 hover:bg-gray-600 rounded"
          >
            <CiLogin className="mr-2" /> login
          </button>)}
          <button
            onClick={handleSettings}
            className="w-full text-left text-white flex items-center p-2 hover:bg-gray-600 rounded"
          >
            <FiSettings className="mr-2" /> order
          </button>
          {localStorage.getItem("id")?(<button
            onClick={handleLogout}
            className="w-full text-left text-white flex items-center p-2 hover:bg-gray-600 rounded"
          >
            <CiLogout className="mr-2" /> Logout
          </button>):("")}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
