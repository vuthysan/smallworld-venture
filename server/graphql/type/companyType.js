const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

// === Model ===
const Job = require("../../models/jobModel");
const User = require("../../models/userModel");

// === Type ===
const UserType = require("./userType");

const CompanyType = new GraphQLObjectType({
  name: "company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    logo: { type: GraphQLString },
    about: { type: GraphQLString },
    website: { type: GraphQLString },
    city: { type: GraphQLString },
    user_position: { type: GraphQLString },
    userId: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    message: { type: GraphQLString },
    // === user of company ===
    user: {
      type: UserType,
      resolve: async (parent) => {
        let em = await User.findOne({ userId: parent.userId });
        return em;
      },
    },
    // === jobs under this company ===
    jobs: {
      type: new GraphQLList(require("./jobType")),
      resolve: async (parent) => {
        let job = await Job.find({ company_name: parent.name }).sort({
          createdAt: -1,
        });
        return job;
      },
    },
  }),
});

module.exports = CompanyType;
