import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Load user from local storage, or set to null
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null; // Parse user if exists
  });

  // Check if the token is present and valid
  const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode the token
    return exp > Date.now() / 1000; // Check if the token is still valid
  };

  // Compute isAuthenticated based on user or token presence
  const isAuthenticated = Boolean(isTokenValid() && user);

  // Handle signup logic
  const signup = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Login logic
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/mynotes");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  // Logout functionality
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Clear user from local storage
    setUser(null);
    navigate("/");
  };

  // Effect to check token validity and update local storage when user changes
  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode the token
        if (exp <= Date.now() / 1000) {
          logout(); // Automatically log out if token is expired
        }
      }
    };

    checkTokenValidity(); // Run the validity check on mount

    // Update local storage for user
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Clear user from local storage if not logged in
    }

    // Set an interval to periodically check token validity
    const interval = setInterval(checkTokenValidity, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
