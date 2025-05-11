import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    getUserLoading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  // Fetch user details using Supabase API
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setState((prevState) => ({
        ...prevState,
        user: null,
        getUserLoading: false,
      }));
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, getUserLoading: true }));
      const response = await axios.get(
        "https://blog-post-api-lac.vercel.app/auth/get-user"
      );
      setState((prevState) => ({
        ...prevState,
        user: response.data,
        getUserLoading: false,
      }));
      console.log(response)
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
        user: null,
        getUserLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchUser(); // Load user on initial app load
  }, []);

  // Login user
  const login = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, getUserLoading: true, error: null }));
      const response = await axios.post(
        "https://blog-post-api-lac.vercel.app/auth/login",
        data
      );
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      // Fetch and set user details
      //setState((prevState) => ({ ...prevState, getUserLoading: false, error: null }));
      await fetchUser();
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        getUserLoading: false,
        error: error.response?.data?.error || "Login failed",
      }));
      return { error: error.response?.data?.error || "Login failed" };
    }
  };

  // Register user
  const register = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, getUserLoading: true, error: null }));
      const response = await axios.post(
        "https://blog-post-api-lac.vercel.app/auth/register",
        data
      );
      const message = response.data?.message;
      setState((prevState) => ({ ...prevState, getUserLoading: false, error: null }));
      navigate("/signup/success", { state: { email: data.email, password: data.password } });
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        getUserLoading: false,
        error: error.response?.data?.error || "Registration failed",
      }));
      return { error: state.error };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null, error: null, getUserLoading: false });
    navigate("/");
  };

  const isAuthenticated = Boolean(state.user);
  console.log(state.user)

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        isAuthenticated,
        fetchUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Hook for consuming AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };