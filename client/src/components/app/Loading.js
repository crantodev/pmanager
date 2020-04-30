import React, { Fragment, useContext } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

import { ManagerContext } from "../../context";

const Loading = () => {
  const { processing } = useContext(ManagerContext);

  return (
    <Fragment>
      {processing ? (
        <Dimmer active page>
          <Loader content="Loading" />
        </Dimmer>
      ) : null}
    </Fragment>
  );
};

export default Loading;
