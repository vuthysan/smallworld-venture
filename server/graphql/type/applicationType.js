const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

const ApplicantionType = new GraphQLObjectType({
  name: "Accplication",
  fields: () => ({
    id: { type: GraphQLID },
    jobId: { type: GraphQLID },
    jobseekerId: { type: GraphQLID },
    message: { type: GraphQLString },
  }),
});

module.exports = ApplicantionType;
