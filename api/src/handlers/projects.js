const { validationResult } = require("express-validator");

const Project = require("../models/project");

exports.listing = (req, res) => {
  Project.find()
    .sort({ created_at: -1 })
    .populate("owner")
    .then((projects) => {
      return res.json(projects);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ errors: error.message || "An error has occured" });
    });
};

exports.detail = (req, res) => {
  const { id } = req.params;

  Project.findById(id)
    .then((project) => {
      if (!project)
        return res.status(404).json({ message: "Project has not found" });

      return res.json(project);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: error.message || "An error has occured" });
    });
};

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "The validation of the data has failed.",
      errors: errors.array(),
    });
  }

  const { title, description } = req.body;

  Project.create({
    title,
    description,
    owner: req.user.id,
  })
    .then((project) => res.status(201).json(project))
    .catch((error) =>
      res.status(500).json({ message: error.message || "An error has occured" })
    );
};

exports.remove = (req, res) => {
  const { id } = req.params;

  Project.deleteOne({ _id: id })
    .then(() => {
      return res.status(204).json({});
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: error.message || "An error has occured" });
    });
};
