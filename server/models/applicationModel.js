const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
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
    additional: {
      type: String,
    },
    cv: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("applications", applicationSchema);
module.exports = Application;
