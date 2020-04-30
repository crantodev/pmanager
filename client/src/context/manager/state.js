import React, { useReducer } from "react";

import { manager as types } from "../types";

import context from "./context";
import reducer from "./reducer";

const ManagerState = (props) => {
  const initialState = {
    processing: false,
    message: {
      active: false,
      type: "",
      content: "",
    },
    validationErrors: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const startProcessing = () => {
    dispatch({
      type: types.PROCESSING,
      processing: true,
    });
  };

  const stopProcessing = () => {
    dispatch({
      type: types.PROCESSING,
      processing: false,
    });
  };

  const showError = (error) => {
    let message =
      typeof error === "string"
        ? error
        : error.message || "An error has occurred.";

    if (error.response) {
      const response = error.response.data;

      message = response.message || message;

      const errors = {};
      (response.errors || []).forEach((item) => {
        errors[item.param] = item.msg;
      });

      dispatch({
        type: types.VALIDATION,
        errors,
      });
    }

    dispatch({
      type: types.MESSAGE,
      message: {
        active: true,
        type: "error",
        content: message,
      },
    });
  };

  const hideError = () => {
    dispatch({
      type: types.VALIDATION,
      errors: {},
    });

    hideMessage();
  };

  const showMessage = (message, type = "info") => {
    dispatch({
      type: types.MESSAGE,
      message: {
        active: true,
        type: type,
        content: message,
      },
    });
  };

  const hideMessage = () => {
    dispatch({
      type: types.MESSAGE,
      message: {
        active: false,
        type: "",
        message: "",
      },
    });
  };

  const handleValidationError = (name) => {
    if (name in state.validationErrors) {
      return {
        content: state.validationErrors[name],
      };
    }

    return null;
  }

  return (
    <context.Provider
      value={{
        processing: state.processing,
        message: state.message,
        handleValidationError,
        startProcessing,
        stopProcessing,
        showError,
        hideError,
        showMessage,
        hideMessage,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default ManagerState;
