const graphql = require("graphql");
const { GraphQLString, GraphQLID, GraphQLObjectType } = graphql;

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    access_token: { type: GraphQLString },
    refresh_token: { type: GraphQLString },
    id: { type: GraphQLID },
    message: { type: GraphQLString },
  }),
});

module.exports = UserType;
