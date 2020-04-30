import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, Divider } from "semantic-ui-react";

// Context
import {
  ManagerState,
  ProjectState,
  TaskState,
  AuthState,
} from "../../context";

import Header from "./Header";
import Router from "./Router";
import Footer from "./Footer";
import Message from "./Message";

const Main = () => {
  return (
    <ManagerState>
      <AuthState>
        <BrowserRouter>
          <ProjectState>
            <TaskState>
              <Header />

              <Container>
                <Message />
                <Router />
              </Container>

              <Divider hidden />
              <Footer />
            </TaskState>
          </ProjectState>
        </BrowserRouter>
      </AuthState>
    </ManagerState>
  );
};

export default Main;
