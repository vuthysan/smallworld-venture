const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;

// === Type ===
const JobType = require("./jobType");

// === Model ===
const Job = require("../../models/jobModel");
const User = require("../../models/userModel");

const ApplicationType = new GraphQLObjectType({
  name: "applications",
  fields: () => ({
    id: { type: GraphQLID },
    jobId: { type: GraphQLID },
    userId: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    phone: { type: GraphQLString },
    cv: {
      type: GraphQLString,
      resolve: async (parent) => {
        const user = await User.findOne({ userId: parent.userId });
        return user.cv;
      },
    },
    additional: { type: GraphQLString },
    createdAt: { type: GraphQLID },
    message: { type: GraphQLString },
    job: {
      type: JobType,
      resolve: async (parent) => {
        const job = await Job.findById(parent.jobId);
        return job;
      },
    },
  }),
});

module.exports = ApplicationType;
