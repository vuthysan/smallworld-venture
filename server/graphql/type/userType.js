const graphql = require("graphql");
const { GraphQLString, GraphQLID, GraphQLObjectType, GraphQLList } = graphql;

// === Model ===
const Job = require("../../models/jobModel");
const Company = require("../../models/companyModel");

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString },
    interest: { type: GraphQLList(GraphQLString) },
    cv: { type: GraphQLString },
    password: { type: GraphQLString },
    message: { type: GraphQLString },
    // ==== user's jobs ===
    jobs: {
      type: GraphQLList(require("./jobType")),
      resolve: async (parent) => {
        let jobs = await Job.find({ userId: parent.id });
        return jobs;
      },
    },
    // === user's company ===
    companies: {
      type: GraphQLList(require("./companyType")),
      resolve: async (parent) => {
        let coms = await Company.find({ userId: parent.id });
        return coms;
      },
    },
  }),
});

module.exports = UserType;
