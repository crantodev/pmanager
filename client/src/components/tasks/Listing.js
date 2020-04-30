import React, { useContext, useEffect } from "react";
import { Card } from "semantic-ui-react";

import { TaskContext, ManagerContext } from "../../context";
import Detail from "./Detail";

const Listing = ({ projectId }) => {
  const { tasks, loaded, loadTasks, deleteTask, unloadTasks } = useContext(
    TaskContext
  );
  const { processing } = useContext(ManagerContext);

  useEffect(() => {
    (() => {
      if (!loaded && !processing) loadTasks(projectId);
    })();

    return () => {
      if (loaded && !processing) unloadTasks();
    };
  }, [loaded, processing, loadTasks, unloadTasks, projectId]);

  if (tasks.length === 0) return null;

  return (
    <Card.Group stackable itemsPerRow={3}>
      {tasks.map((task) => (
        <Detail key={task._id} task={task} deleteTask={deleteTask} />
      ))}
    </Card.Group>
  );
};

export default Listing;
