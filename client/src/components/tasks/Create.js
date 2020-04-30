import React, { useState, useContext } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import {TaskContext} from "../../context";

const Create = ({projectId }) => {
  const [task, setTask] = useState({
    title: ""
  });

  const { title } = task;

  const {addTask} = useContext(TaskContext);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    addTask(projectId, { title })
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Form size="large" onSubmit={handleOnSubmit}>
      <Segment basic>
        <Form.Field>
          <label>Title</label>
          <input
          required
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) =>
              setTask({ ...task, [e.target.name]: e.target.value })
            }
          />
        </Form.Field>

        <div style={{ textAlign: "right" }}>
          <Button primary type="submit">
            Add task
          </Button>
        </div>
      </Segment>
    </Form>
  );
};

export default Create;
