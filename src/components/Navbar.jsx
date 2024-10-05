import React from "react";
import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdFavoriteBorder, MdClose } from "react-icons/md";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-md bg-white dark:bg-red-500 dark:text-white duration-200 relative z-40">
      {/* upper */}
      <div className="bg-primary/90 py-3 sm:py-0">
        <div className="container flex justify-between items-center">
          <div>
            <a className="font-bold text-2xl sm:text-3xl text-white" href="/">
              BABy'S
            </a>
          </div>
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray px-2 py-1 focus:outline-none focus:border-1 focus:border-primary active:border-1 active:border-primary"
            />
            <IoMdSearch className="text-xl text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3" />
          </div>
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={() => navigate("/cart")}
              className="bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-1 px-2 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Cart
              </span>
              <FaCartShopping className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            <button
              onClick={() => navigate("/order-History")}
              className="bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-1 px-2 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Order History
              </span>
              <IoMdSearch className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-1 px-2 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Login
              </span>
              <FaCircleUser className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            <button
              onClick={() => navigate("/favourite")}
              className="bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-1 px-2 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Favorite
              </span>
              <MdFavoriteBorder className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("id");
                navigate("/");
              }}
              className="bg-gradient-to-r from-primary to-secondary/50 transition-all duration-200 text-white py-1 px-2 rounded-full flex items-center gap-3 group"
            >
              <span className="group-hover:block hidden transition-all duration-200">
                Log out
              </span>
              <MdFavoriteBorder className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      {/* lower */}
      <div></div>
    </div>
  );
};
export default Navbar;
