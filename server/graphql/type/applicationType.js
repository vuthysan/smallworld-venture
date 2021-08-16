const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

// === Type ===
const JobType = require("./jobType");

// === Model ===
const Job = require("../../models/jobModel");

const ApplicationType = new GraphQLObjectType({
  name: "applications",
  fields: () => ({
    id: { type: GraphQLID },
    jobId: { type: GraphQLID },
    createdAt: { type: GraphQLID },
    additional: { type: GraphQLString },
    message: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    phone: { type: GraphQLString },
    cv: { type: GraphQLString },
  }),
});

module.exports = ApplicationType;
