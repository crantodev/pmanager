import { auth } from "../types";

export default (state, action) => {
  switch (action.type) {
    case auth.LOGIN:
      return {
        ...state,
        authenticated: true,
        token: action.token,
        user: action.user,
      };
    case auth.LOGOUT:
      return {
        ...state,
        authenticated: false,
        token: "",
        user: {},
      };
    case auth.REGISTER:
    default:
      return state;
  }
};
