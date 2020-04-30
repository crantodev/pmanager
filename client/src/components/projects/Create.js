import React, { useState, useContext } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import { ProjectContext } from "../../context";

const Create = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
  });

  const { title, description } = project;

  const context = useContext(ProjectContext);
  const { addProject, toggleForm } = context;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    addProject({ title, description })
      .then(() => {
        toggleForm();
      })
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
              setProject({ ...project, [e.target.name]: e.target.value })
            }
          />
        </Form.Field>

        <Form.Field>
          <label>Description</label>
          <input
            required
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) =>
              setProject({ ...project, [e.target.name]: e.target.value })
            }
          />
        </Form.Field>

        <div style={{ textAlign: "right" }}>
          <Button type="reset" onClick={() => toggleForm()}>
            Cancel
          </Button>
          <Button primary type="submit">
            Save
          </Button>
        </div>
      </Segment>
    </Form>
  );
};

export default Create;
