import React, { useState, useContext } from "react";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";

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
  const { register, authenticated } = useContext(AuthContext);
  const { handleValidationError } = useContext(ManagerContext);

  const location = useLocation();
  const history = useHistory();

  const { from } = location.state || { from: { pathname: "/" } };

  const [data, setData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    register(data)
      .then(() => {
        return history.push("/login");
      })
      .catch(() => {});
  };

  if (authenticated) {
    return <Redirect to={from} />;
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" textAlign="center">
          Create an account
        </Header>

        <Form size="large" onSubmit={handleOnSubmit}>
          <Segment textAlign="left">
            <Form.Field
              required
              error={handleValidationError("first_name")}
              label="First Name"
              control="input"
              name="first_name"
              value={data.first_name}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />

            <Form.Field
              required
              label="Last Name"
              control="input"
              name="last_name"
              error={handleValidationError("last_name")}
              value={data.last_name}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />

            <Form.Field
              required
              label="E-mail address"
              name="email"
              type="email"
              control="input"
              error={handleValidationError("email")}
              value={data.email}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />

            <Form.Field
              required
              label="Password"
              type="password"
              name="password"
              error={handleValidationError("password")}
              control="input"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
            />

            <Button primary fluid size="large" type="submit">
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already has an accout? <Link to="/login">Sign In</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
