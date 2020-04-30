import React, { useState, useContext } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";

import { AuthContext, ManagerContext } from "../../context";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const Login = () => {
  const { login, authenticated } = useContext(AuthContext);
  const { handleValidationError } = useContext(ManagerContext);

  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    login(data)
      .then(() => {})
      .catch(() => {});
  };

  if (authenticated) {
    return <Redirect to={from} />;
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Log-in to your account
        </Header>

        <Form size="large" onSubmit={handleOnSubmit}>
          <Segment textAlign="left">
            <Form.Field
              // required
              label="Email"
              type="email"
              name="email"
              control="input"
              error={handleValidationError("email")}
              value={data.email}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />

            <Form.Field
              // required
              label="Password"
              control="input"
              type="password"
              name="password"
              error={handleValidationError("password")}
              value={data.password}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />

            <Button primary fluid size="large" type="submit">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to="/register">Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
