import React, { useReducer, useContext } from "react";
import axios from "axios";

import { project as types } from "../types";

import ProjectContext from "./context";
import ProjectReducer from "./reducer";

import { ManagerContext, AuthContext } from "../index";

const ProjectState = (props) => {
  const { startProcessing, stopProcessing, showError } = useContext(
    ManagerContext
  );

  const { token } = useContext(AuthContext);

  const initialState = {
    showForm: false,
    loaded: false,
    projects: [],
  };

  const [state, dispatch] = useReducer(ProjectReducer, initialState);

  const toggleForm = () => {
    dispatch({
      type: types.SHOW_FORM,
    });
  };

  const addProject = async (project) => {
    try {
      startProcessing();
      const response = await axios.post(
        "/api/projects",
        { ...project },
        { headers: { authorization: `Bearer ${token}` } }
      );

      dispatch({
        type: types.ADD,
        project: response.data,
      });

      stopProcessing();
    } catch (error) {
      let message = error.message || "An error has occurred";

      if (error.response) {
        const response = error.response;

        message = response.data ? response.data.message || message : message;
      }

      showError(message);
      stopProcessing();
      throw new Error();
    }
  };

  const loadProjects = async () => {
    try {
      startProcessing();
      const response = await axios.get("/api/projects", {
        headers: { authorization: `Bearer ${token}` },
      });

      dispatch({
        type: types.SET,
        projects: response.data,
      });

      stopProcessing();
    } catch (error) {
      let message = error.message || "An error has occurred";

      if (error.response) {
        const response = error.response;

        message = response.data ? response.data.message || message : message;
      }

      showError(message);
      stopProcessing();
    }
  };

  const deleteProject = async (id) => {
    try {
      startProcessing();
      await axios.delete(`/api/projects/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });

      dispatch({
        type: types.DELETE,
        id,
      });

      stopProcessing();
    } catch (error) {
      let message = error.message || "An error has occurred";

      if (error.response) {
        const response = error.response;

        message = response.data ? response.data.message || message : message;
      }

      showError(message);
      stopProcessing();
      throw new Error();
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        showForm: state.showForm,
        projects: state.projects,
        loaded: state.loaded,
        toggleForm,
        addProject,
        loadProjects,
        deleteProject,
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;
