const bcrypt = require("bcryptjs");

const { Schema, model } = require("../utils/db");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    projects: [{
      type: Schema.Types.ObjectId,
      ref: "Project",
    }],
    active: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt
      .genSalt(8)
      .then((salt) => {
        bcrypt
          .hash(this.password, salt)
          .then((hash) => {
            this.password = hash;
            return next();
          })
          .catch((error) => next(error));
      })
      .catch((error) => next(error));
  }
});

UserSchema.methods.comparePassword = function(password, cb) {
  return cb(bcrypt.compareSync(password, this.password));
}

const User = model("User", UserSchema);

module.exports = User;
