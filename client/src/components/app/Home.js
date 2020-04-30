import React, { useContext } from "react";

import { AuthContext } from "../../context";

const Home = () => {
  const { user } = useContext(AuthContext);

  const { first_name, last_name } = user;

  return (
    <h1>
      Welcome {first_name} {last_name}
    </h1>
  );
};

export default Home;
