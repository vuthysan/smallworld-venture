const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    jobId: {
      type: String,
      required: true,
    },

    jobseekerId: {
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
