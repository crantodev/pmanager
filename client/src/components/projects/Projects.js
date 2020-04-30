import React, { lazy, useContext } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Button, Divider } from "semantic-ui-react";

import { ProjectContext } from "../../context";

const Listing = lazy(() => import("./Listing"));
const Create = lazy(() => import("./Create"));
const Tasks = lazy(() => import("../tasks/Tasks"));

const Projects = () => {
  const { showForm, toggleForm } = useContext(ProjectContext);
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        {showForm ? (
          <Create />
        ) : (
          <Button color="green" onClick={() => toggleForm()}>
            Add project
          </Button>
        )}
        <Divider hidden />
        <Listing />
      </Route>
      <Route exact path={`${path}/:id`}>
        <Tasks />
      </Route>
    </Switch>
  );
};

export default Projects;
