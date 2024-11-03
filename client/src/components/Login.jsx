import React, { useState } from "react";
import { Link } from "react-router-dom";
Link;
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook

const Login = () => {
  const [email, setEmail] = useState("demo@abc.com");
  const [password, setPassword] = useState("abc123");

  // Get login function from context
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="flex justify-center items-center h-[100vh] w-full">
      <div className="flex flex-col w-full md:w-1/2  bg-gray-100 m-5 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

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
          className="bg-red-600
          hover:bg-yellow-300  
          hover:text-black text-white text-lg py-2 rounded-lg mt-4"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-center">
          New user ?{" "}
          <Link to="/" className="text-blue-500">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
