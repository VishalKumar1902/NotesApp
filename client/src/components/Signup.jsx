import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get signup function from context
  const { signup } = useAuth();

  const handleSignup = (e) => {
    e.preventDefault();
    signup(name, email, password);
  };

  return (
    <div
      className="flex flex-col w-full md:w-1/2 bg-gray-100 p-6 rounded-lg shadow-lg scroll-m-[100px] mb-5 md:mb-0"
      id="signup"
    >
      <h1 className="text-3xl font-bold mb-6 text-center ">Signup</h1>
      <input
        type="text"
        placeholder="Name"
        className="mb-4 p-3 border rounded-lg w-full"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="email"
        className="mb-4 p-3 border rounded-lg w-full"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="password"
        className="mb-4 p-3 border rounded-lg w-full"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button
        className="bg-red-600 text-white text-lg py-2 rounded-lg mt-4 hover:bg-yellow-300 
        hover:text-black "
        onClick={handleSignup}
      >
        Signup
      </button>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/Login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
