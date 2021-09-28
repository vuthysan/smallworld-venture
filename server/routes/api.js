require("dotenv");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { graphqlHTTP } = require("express-graphql");
const schema = require("../graphql/schema/schema");

router.use(
  "/graphql",
  graphqlHTTP(async (req) => {
    let user;
    if (req.headers["x-access-token"]) {
      const authorization = req.headers["x-access-token"].split(" ");
      const access_token = authorization[1];
      user = jwt.decode(access_token, process.env.PRIVATE_KEY);
    }

    return {
      graphiql: true,
      context: user,
      schema: schema,
      credentials: "include",
      customFormatErrorFn: (err) => ({
        message: err.message,
        status: err.status,
      }),
    };
  })
);

module.exports = router;
