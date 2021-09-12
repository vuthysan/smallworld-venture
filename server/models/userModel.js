const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    interest: {
      type: Array,
      required: true,
    },
    cv: {
      type: String,
      //   required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("users", UserSchema);
module.exports = User;
