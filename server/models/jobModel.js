const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    position: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    type: {
      type: Array,
      required: true,
    },
    requirements: {
      type: Array,
      required: true,
    },
    descriptions: {
      type: Array,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    employerId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("jobs", jobSchema);
module.exports = Job;
