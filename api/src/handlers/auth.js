const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.login = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "The validation of the data has failed.",
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Email is not valid" });
      }

      user.comparePassword(password, (status) => {
        if (!status) {
          return res.status(401).json({ message: "Password is not valid" });
        }
      });

      const loggedUser = {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name
      };

      const token = jwt.sign(loggedUser, process.env.SECRET, {
        expiresIn: "8h"
      });

      return res.status(200).json({ token, user: loggedUser });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: error.message || "An error has occured" });
    });
};

exports.register = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "The validation of the data has failed.",
      errors: errors.array(),
    });
  }

  const { email, password, first_name, last_name } = req.body;

  User.create({ email, password, first_name, last_name })
    .then((user) => {
      return res.status(201).json({ user });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: error.message || "An error has occured" });
    });
};
