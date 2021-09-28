const express = require("express");
const path = require("path");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// ==== File ====
const apiRoute = require("./routes/api");
// const adminSchema = require("./graphql/schema/adminSchema");
const schema = require("./graphql/schema/schema");

// === invoke express ===
const app = express();

// === middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3200", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/public/", express.static(path.join(__dirname, "public")));

// === for admin dashboard ===
// app.use(
//   "/admin",
//   graphqlHTTP({
//     schema: adminSchema,
//     graphiql: true,
//   })
// );

// ==== api route ===
app.use(apiRoute);
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//   })
// );

// ==== verify and decode token ===
app.use("/user", require("./routes/userRoute"));

// === upload file route ===
app.use(require("./routes/uploadImage"));
app.use(require("./routes/uploadPdf"));

// === delete file route ===
app.use(require("./routes/deleteFile"));

const PORT = process.env.PORT || 5000;
// === connect database ===
connectDB();

// Hide server-side technology information from the browser
app.disable("x-powered-by");

app.listen(PORT, console.log(`Server is running on PORT: ${PORT}`));
