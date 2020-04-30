import React, { useState, Fragment } from "react";
import { Card, Button, Confirm } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Detail = ({ project, deleteProject }) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Card key={project._id}>
        <Card.Content>
          <Card.Header>{project.title}</Card.Header>
          <Card.Description>{project.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button
              as={Link}
              to={`/projects/${project._id}`}
              basic
              color="green"
            >
              Open
            </Button>
            <Button basic color="red" onClick={() => setOpen(true)}>
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
      <Confirm
        size="mini"
        header="Deleting"
        open={open}
        confirmButton="Delete"
        onCancel={() => setOpen(false)}
        onConfirm={() => deleteProject(project._id)}
      />
    </Fragment>
  );
};

export default Detail;
