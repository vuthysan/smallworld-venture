const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSeekerSchema = new Schema(
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
    // birth_date: {
    //   type: String,
    // },
    // birth_place: {
    //   type: String,
    // },
    interest: {
      type: Array,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const JobSeeker = mongoose.model("jobseekers", JobSeekerSchema);
module.exports = JobSeeker;
