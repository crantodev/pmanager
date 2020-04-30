import React, { useContext, useEffect } from "react";
import { Card } from "semantic-ui-react";

import { ProjectContext, ManagerContext } from "../../context";
import Detail from "./Detail";

const Listing = () => {
  const { projects, loaded, loadProjects, deleteProject } = useContext(
    ProjectContext
  );
  const { processing } = useContext(ManagerContext);


  useEffect(() => {
    (() => {
      if (!loaded && !processing) loadProjects();
    })();
  }, [loaded, processing, loadProjects]);

  if (projects.length === 0) return null;

  return (
    <Card.Group stackable itemsPerRow={3}>
      {projects.map((project) => (
        <Detail
          key={project._id}
          project={project}
          deleteProject={deleteProject}
        />
      ))}
    </Card.Group>
  );
};

export default Listing;
