const graphql = require("graphql");
const { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    gender: { type: GraphQLString },
    interest: { type: GraphQLList(GraphQLString) },
    cv: { type: GraphQLString },
    message: { type: GraphQLString },
    // === old ===
    access_token: { type: GraphQLString },
    refresh_token: { type: GraphQLString },
  }),
});

module.exports = UserType;
