import React from "react";
import { useParams, useRouteMatch, Switch, Route } from "react-router-dom";

import Listing from "./Listing";
import Create from "./Create";

const Tasks = () => {
  const { id } = useParams();

  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path}>
        <Create projectId={id} />
        <Listing projectId={id} />
      </Route>
    </Switch>
  );
};

export default Tasks;
