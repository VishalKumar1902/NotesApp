import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth(); // Access logout from your AuthContext

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-red-600 p-4 shadow-lg fixed top-0 left-0 w-full ">
      <div className="container mx-auto flex justify-between items-center md:w-6xl ">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Notely</Link>
        </div>

        {/* Menu (Hidden by default on small screens) */}

        <div className=" md:flex space-x-6 hidden  ">
          {isAuthenticated ? (
            <>
              {" "}
              <Link
                to="/createnotes"
                className=" text-white hover:text-gray-300 "
              >
                Create Note
              </Link>
              <Link to="/mynotes" className=" text-white hover:text-gray-300 ">
                My Notes
              </Link>
              <p
                href="#"
                className=" text-white hover:text-gray-300 "
                onClick={handleLogout}
              >
                Logout
              </p>
            </>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden ">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              // Close icon when the menu is open

              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg> // Menu icon when the menu is closed
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      {isOpen && (
        <div className=" md:hidden mt-4 ">
          {isAuthenticated ? (
            <>
              <Link
                to="/createnotes"
                className=" block px-6 py-4 text-white hover:text-gray-300 "
              >
                Create Note
              </Link>

              <Link
                to="/mynotes"
                className="
          block px-6 py-4  text-white hover:text-gray-300 "
              >
                My Notes
              </Link>

              <p
                href="#"
                className=" block px-6 py-4 text-white hover:text-gray-300 "
                onClick={handleLogout}
              >
                Logout
              </p>
            </>
          ) : (
            <Link
              to="/login"
              className="block px-6 py-4 text-white hover:text-gray-300
          "
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
