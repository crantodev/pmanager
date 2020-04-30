import React, { useReducer, useContext, useEffect } from "react";
import axios from "axios";

import { auth as types } from "../types";

import AuthContext from "./context";
import AuthReducer from "./reducer";

import ManagerContext from "../manager/context";

const AuthState = (props) => {
  const {
    showError,
    hideError,
    startProcessing,
    stopProcessing,
    showMessage,
  } = useContext(ManagerContext);

  const initialState = {
    authenticated: false,
    token: "",
    key: "",
    user: {},
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    (() => {
      const auth = JSON.parse(sessionStorage.getItem("auth"));
      if (auth) {
        dispatch({
          type: types.LOGIN,
          ...auth,
        });
      }
    })();
  }, []);

  const login = async (credentials) => {
    try {
      hideError();
      startProcessing();
      const response = await axios.post("/api/auth/login", credentials);
      const { user, token } = response.data;

      sessionStorage.setItem("auth", JSON.stringify({ user, token }));

      dispatch({
        type: types.LOGIN,
        user,
        token,
      });

      stopProcessing();
    } catch (error) {
      stopProcessing();
      showError(error);
      throw new Error();
    }
  };

  const register = async (data) => {
    try {
      hideError();
      startProcessing();

      await axios.post("/api/auth/register", data);

      dispatch({
        type: types.REGISTER,
      });

      stopProcessing();
      showMessage("Your account has been created succesfully.", "success");
    } catch (error) {
      stopProcessing();
      showError(error);
      throw new Error();
    }
  };

  const logout = () => {
    sessionStorage.removeItem("auth");
    dispatch({
      type: types.LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: state.authenticated,
        user: state.user,
        token: state.token,
        login,
        register,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
