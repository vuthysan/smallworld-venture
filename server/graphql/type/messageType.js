const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const MessageType = new GraphQLObjectType({
  name: "message",
  fields: () => ({
    id: { type: GraphQLID },
    fullname: { type: GraphQLString },
    email: { type: GraphQLString },
    message: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    // === repsond message when user post new message ===
    respond: { type: GraphQLString },
  }),
});
module.exports = MessageType;
