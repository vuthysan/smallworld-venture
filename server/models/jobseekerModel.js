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
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    birth_date: {
      type: String,
    },
    birth_place: {
      type: String,
    },
    interest: {
      type: Array,
    },
    cv: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const JobSeeker = mongoose.model("jobseekers", JobSeekerSchema);
module.exports = JobSeeker;
