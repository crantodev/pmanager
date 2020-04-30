const { Schema, model } = require("../utils/db");

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tasks: [{
      type: Schema.Types.ObjectId,
      ref: "Task",
    }],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Project = model("Project", ProjectSchema);

module.exports = Project;
