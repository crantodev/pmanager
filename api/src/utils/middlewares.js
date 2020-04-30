const jwt = require("jsonwebtoken");
const Project = require("../models/project");

exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({ errors: "Forbidden" });
  }

  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res.status(403).json({ errors: "Forbidden" });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET);
    req.user = user;
  } catch (error) {
    return res
      .status(500)
      .json({ errors: error.message || "An error has occured" });
  }

  next();
};

exports.loadProject = (req, res, next) => {
  const { projectId } = req.params;

  Project.findById(projectId)
    .then((project) => {
      if (!project)
        return res.status(404).json({
          message: `Project ${projectId} does not exist.`,
        });

      req.project = project;
      return next();
    })
    .catch((error) =>
      res.status(500).json({ errors: error.message || "An error has occured" })
    );
};
