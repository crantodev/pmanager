import React, { useReducer, useContext } from "react";
import axios from "axios";

import { task as types } from "../types";

import TaskContext from "./context";
import TaskReducer from "./reducer";

import { ManagerContext, AuthContext } from "../index";

const TaskState = (props) => {
  const { startProcessing, stopProcessing, showError } = useContext(
    ManagerContext
  );

  const { token } = useContext(AuthContext);

  const initialState = {
    loaded: false,
    tasks: [],
  };

  const [state, dispatch] = useReducer(TaskReducer, initialState);

  const addTask = async (projectId, task) => {
    try {
      startProcessing();
      const response = await axios.post(
        `/api/projects/${projectId}/tasks`,
        { ...task },
        { headers: { authorization: `Bearer ${token}` } }
      );

      dispatch({
        type: types.ADD,
        task: response.data,
      });

      stopProcessing();
    } catch (error) {
      showError(error);
      stopProcessing();
      throw new Error();
    }
  };

  const loadTasks = async (projectId) => {
    try {
      startProcessing();
      const response = await axios.get(
        `/api/projects/${projectId}/tasks`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      dispatch({
        type: types.SET,
        tasks: response.data,
      });

      stopProcessing();
    } catch (error) {
      showError(error);
      stopProcessing();
      throw new Error();
    }
  };

  const unloadTasks = () => {
    console.log("unloaded");
    dispatch({
      type: types.UNLOAD
    })
  }

  const deleteTask = async (projectId, id) => {
    try {
      startProcessing();
      await axios.delete(`/api/projects/${projectId}/tasks/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      dispatch({
        type: types.DELETE,
        id,
      });

      stopProcessing();
    } catch (error) {
      showError(error);
      stopProcessing();
      throw new Error();
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        loaded: state.loaded,
        addTask,
        loadTasks,
        unloadTasks,
        deleteTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
