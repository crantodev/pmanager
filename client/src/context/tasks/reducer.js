import { task as types } from "../types";

export default (state, action) => {
  switch (action.type) {
    case types.SET:
      return {
        ...state,
        loaded: true,
        tasks: action.tasks,
      };
    case types.UNLOAD:
      return {
        ...state,
        loaded: false,
        tasks: [],
      };
    case types.ADD:
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
      };
    case types.DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.id),
      };
    case types.PROJECT:
      return {
        ...state,
        projectId: action.projectId,
      };
    default:
      return state;
  }
};
