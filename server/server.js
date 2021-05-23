const express = require("express");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const cors = require("cors");
const schema = require("./graphql/schema");
// === invoke express ===
const app = express();

// === middleware
app.use(express.json());
app.use(cors());
app.use("/public/", express.static(path.join(__dirname, "public")));
app.use(
  "/admin",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// === upload file route ===
app.use(require("./routes/uploadFile"));

// === delete file route ===
app.use(require("./routes/deleteFile"));

const PORT = process.env.PORT || 5000;
// === connect database ===
connectDB();

app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`));
