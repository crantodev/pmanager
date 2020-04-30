const { validationResult } = require("express-validator");

const Task = require("../models/task");

exports.listing = (req, res) => {
  const { _id } = req.project;

  Task.find({ project: _id })
    .then((tasks) => {
      return res.json(
        tasks.map((task) => {
          task.project = req.project;
          return task;
        })
      );
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ errors: error.message || "An error has occured" });
    });
};

exports.detail = (req, res) => {
  const { id } = req.params;

  Task.findOne({
    _id: id,
    project: req.project._id,
  })
    .populate("project")
    .then((task) => {
      if (!task) return res.status(404).json({ errors: "Task has not found" });

      task.project = req.project;

      return res.json(task);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ errors: error.message || "An error has occured" });
    });
};

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { title } = req.body;

  Task.create({
    title,
    project: req.project._id,
  })
    .then((task) => {
      task.project = req.project;

      return res.status(201).json(task);
    })
    .catch((error) =>
      res.status(500).json({ errors: error.message || "An error has occured" })
    );
};
