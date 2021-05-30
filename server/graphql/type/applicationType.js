const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const ApplicantionType = new GraphQLObjectType({
  name: "Accplicantion",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    additional: { type: GraphQLString },
    cv: { type: GraphQLString },
    // === for response to frontend ===
    message: { type: GraphQLString },
  }),
});

module.exports = ApplicantionType;
