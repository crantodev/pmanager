import { manager as types } from "../types";

export default (state, action) => {
  switch (action.type) {
    case types.PROCESSING:
      return {
        ...state,
        processing: action.processing,
      };
    case types.MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    case types.VALIDATION:
      return {
        ...state,
        validationErrors: action.errors,
      };
    default:
      return state;
  }
};
