const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpportunitySchema = new Schema(
  {
    position: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    responsibilities: {
      type: Array,
      required: true,
    },
    requirements: {
      type: Array,
      required: true,
    },
    conditions: {
      type: Array,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    departmentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const OPPORTUNITY = mongoose.model("opportunities", OpportunitySchema);
module.exports = OPPORTUNITY;
