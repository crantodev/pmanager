import React, { Suspense, lazy, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

import { AuthContext } from "../../context";

import Home from "./Home";
const Login = lazy(() => import("../auth/Login"));
const Register = lazy(() => import("../auth/Register"));
const Projects = lazy(() => import("../projects/Projects"));

const Router = () => {
  const { authenticated } = useContext(AuthContext);

  const PrivateRoute = ({ children, authenticated, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          authenticated ? (
            children
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )
        }
      />
    );
  };

  return (
    <Suspense
      fallback={
        <Dimmer active inverted>
          <Loader content="Loading" size="massive" />
        </Dimmer>
      }
    >
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>

        <PrivateRoute exact path="/" authenticated={authenticated}>
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/projects" authenticated={authenticated}>
          <Projects />
        </PrivateRoute>
      </Switch>
    </Suspense>
  );
};

export default Router;
