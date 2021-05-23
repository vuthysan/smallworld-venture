const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();
const { ATLAS_URI } = process.env;

const connectDB = async () => {
  const connection = await mongoose.connect(ATLAS_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected".rainbow);
};

module.exports = connectDB;
