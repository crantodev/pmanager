const {validationResult} = require("express-validator");

const User = require("../models/user");

exports.listing = (req, res) => {
  User.find({})
    .exec()
    .then((docs) => {
      return res.json(docs);
    })
    .catch((error) => {
      return res.status(500).json({ errors: error.message || "An error has occured" });
    });
};

exports.detail = (req, res) => {
  const { id } = req.params;

  User.findOne({ _id: id })
    .exec()
    .then((user) => {
      if (!user) return res.status(404).json({ error: "User not found" });

      return res.json(user);
    })
    .catch((error) => {
      return res.status(500).json({ errors: error.message || "An error has occured" });
    });
};

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const { email, password } = req.body;

  User.create({ email, password })
    .then((user) => {
      return res.status(201).json({ user });
    })
    .catch((error) => {
      return res.status(500).json({ errors: error.message || "An error has occured" });
    });
};
