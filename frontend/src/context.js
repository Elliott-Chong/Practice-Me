import { initialState, reducer } from "./reducer";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const AppContext = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    // console.log(state);
  }, [state]);

  const logOut = () => {
    dispatch({ type: "CLEAR_USER" });
    setAlert("success", "Logged out!");
  };

  const loadUser = React.useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
      } else {
        delete axios.defaults.headers.common["x-auth-token"];
        dispatch({ type: "CLEAR_USER" });
      }
      const response = await axios.get("/api/auth/user");
      dispatch({ type: "SET_USER", payload: response.data });
    } catch (error) {
      dispatch({ type: "CLEAR_USER" });
    }
    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  const setAlert = (type, text) => {
    switch (type) {
      case "success":
        toast.success(text);
        break;
      case "error":
        toast.error(text);
        break;
      default:
        toast.info(text);
    }
  };

  const registerUser = async (email, password, password1, course, cls) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ email, password, password1, course, cls });
    try {
      const response = await axios.post("/api/auth/register", body, config);
      setAlert("success", "Account Created!");
      dispatch({ type: "SET_TOKEN", payload: response.data.token });
      window.location.href = "/play";
    } catch (error) {
      error.response.data.errors.forEach((error) => {
        setAlert("error", error.msg);
      });
      console.error(error);
    }
  };

  const loginUser = async (email, password) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = JSON.stringify({ email, password });
    try {
      const response = await axios.post("/api/auth/login", body, config);
      dispatch({ type: "SET_TOKEN", payload: response.data.token });
      window.location.href = "/play";
    } catch (error) {
      if (error.response.status === 401) {
        return setAlert("danger", "Invalid Credentials");
      }
      // console.log(error.response);
      error.response.data.errors.forEach((error) => {
        setAlert("error", error.msg);
      });
      // console.error(error);
    }
  };

  const getAllUsers = React.useCallback(async () => {
    try {
      const response = await axios.get("/api/auth/all");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        setAlert,
        loginUser,
        loadUser,
        registerUser,
        logOut,
        getAllUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export default Context;
export { useGlobalContext };
