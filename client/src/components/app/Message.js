import React, { useContext, Fragment } from "react";
import { Segment, Button } from "semantic-ui-react";

import { ManagerContext } from "../../context";

const Message = () => {
  const { message, hideError } = useContext(ManagerContext);

  const colors = {
    error: "red",
    info: "blue",
    success: "green",
  };

  if (!message.active) return null;

  return (
    <Fragment>
      <Segment color={colors[message.type]} inverted clearing>
        {message.content}
        <Button
          basic
          size="mini"
          compact
          floated="right"
          circular
          content="close"
          onClick={() => hideError()}
        />
      </Segment>
    </Fragment>
  );
};

export default Message;
