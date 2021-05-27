const express = require("express");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const cors = require("cors");
const adminSchema = require("./graphql/schema/adminSchema");
const schema = require("./graphql/schema/schema");
// === invoke express ===
const app = express();

// === middleware
app.use(express.json());
app.use(cors());
app.use("/public/", express.static(path.join(__dirname, "public")));
// === for admin dashboard ===
app.use(
  "/admin",
  graphqlHTTP({
    schema: adminSchema,
    graphiql: true,
  })
);

app.use(
  "/graphql",
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
