import React, { useState, useContext } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../../context";

import Loading from "./Loading";

const styles = {
  segment: {
    borderRadius: 0,
  },
};

const Header = () => {
  const { authenticated, logout } = useContext(AuthContext);

  const { pathname } = useLocation();
  const [selected, setSelected] = useState(pathname);

  const items = () => {
    return (
      <Menu.Menu as="ul" position="right">
        <Menu.Item
          as="li"
          name="/"
          active={selected === "/"}
          onClick={(e, { name }) => setSelected(name)}
        >
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item
          as="li"
          name="/projects"
          active={selected === "/projects"}
          onClick={(e, { name }) => setSelected(name)}
        >
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item
          as="li"
          name="logout"
          onClick={(e, { name }) => logout()}
        />
      </Menu.Menu>
    );
  };

  return (
    <Segment as="header" size="mini" inverted style={styles.segment}>
      <Menu as="nav" inverted>
        <Menu.Item header>Project Manager</Menu.Item>
        {!authenticated ? null : items()}
      </Menu>
      <Loading />
    </Segment>
  );
};

export default Header;
