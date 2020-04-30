const { checkSchema } = require("express-validator");
const mongoose = require("mongoose");

const Project = require("../models/project");

exports.user = {
  create: checkSchema({
    email: {
      in: ["body"],
      isEmail: {
        errorMessage: "Email should be valid.",
      },
      normalizeEmail: true,
    },
    password: {
      in: ["body"],
      isLength: {
        errorMessage: "Password should be at least 6 chars long.",
        options: { min: 6 },
      },
    },
  }),
};

exports.auth = {
  login: checkSchema({
    email: {
      in: ["body"],
      exists: {
        errorMessage: "Email must be present",
      },
      isEmail: {
        errorMessage: "Email should be valid.",
      },
      normalizeEmail: true,
    },
    password: {
      in: ["body"],
      exists: {
        errorMessage: "Email must be present",
      },
      isLength: {
        errorMessage: "Password should be at least 6 chars long.",
        options: { min: 6 },
      },
    },
  }),

  register: checkSchema({
    first_name: {
      exists: {
        errorMessage: "The first name should not be empty",
      },
      isUppercase: {
        negated: true,
        errorMessage: "Must be a valid name",
      },
    },
    last_name: {
      exists: {
        errorMessage: "The last name should not be empty",
      },
      isUppercase: {
        negated: true,
        errorMessage: "Must be a valid name",
      },
    },
    email: {
      in: ["body"],
      exists: {
        errorMessage: "Email should not be empty",
      },
      isEmail: {
        errorMessage: "Email should be valid.",
      },
      normalizeEmail: true,
    },
    password: {
      in: ["body"],
      exists: {
        errorMessage: "Password should not be empty",
      },
      isLength: {
        errorMessage: "Password should be at least 6 chars long.",
        options: { min: 6 },
      },
    },
  }),
};

exports.project = {
  create: checkSchema({
    title: {
      exists: {
        errorMessage: "Title should not be empty.",
      },
      isUppercase: {
        negated: true,
        errorMessage: "The title is not valid.",
      },
    },
    description: {
      exists: {
        errorMessage: "Description should not be empty.",
      },
      isUppercase: {
        negated: true,
        errorMessage: "The description is not valid.",
      },
    },
  }),
};

exports.task = {
  create: checkSchema({
    title: {
      exists: {
        errorMessage: "Title should not be empty.",
      },
      isUppercase: {
        negated: true,
        errorMessage: "The title is not valid.",
      },
    },
  }),
};
