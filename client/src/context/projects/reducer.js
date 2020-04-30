import { project as types } from "../types";

export default (state, action) => {
  switch (action.type) {
    case types.SHOW_FORM:
      return {
        ...state,
        showForm: !state.showForm,
      };
    case types.SET:
      return {
        ...state,
        loaded: true,
        projects: action.projects,
      };
    case types.ADD:
      return {
        ...state,
        projects: [action.project, ...state.projects],
      };
    case types.DELETE:
      return {
        ...state,
        projects: state.projects.filter((project) => project._id !== action.id),
      };
    default:
      return state;
  }
};
