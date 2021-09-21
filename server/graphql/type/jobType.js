const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

// === Type Section
const CompanyType = require("./companyType");
const UserType = require("./userType");
// const ApplicationType = require("./applicationType");

// === Model Section ===
const Company = require("../../models/companyModel");
const User = require("../../models/userModel");
const Application = require("../../models/applicationModel");

const JobType = new GraphQLObjectType({
  name: "jobs",
  fields: () => ({
    id: { type: GraphQLID },
    position: { type: GraphQLString },
    salary: { type: GraphQLString },
    type: {
      type: GraphQLList(GraphQLString),
    },
    requirements: {
      type: new GraphQLList(GraphQLString),
    },
    descriptions: { type: new GraphQLList(GraphQLString) },
    company_name: { type: GraphQLString },
    // === companies of this job ===
    company: {
      type: CompanyType,
      resolve: async (parent) => {
        const com = await Company.findOne({ name: parent.company_name });
        return com;
      },
    },
    userId: { type: GraphQLID },
    // === user of this job ===
    user: {
      type: UserType,
      resolve: async (parent) => {
        const emp = await User.findById(parent.userId);
        return emp;
      },
    },
    // === applicanttion for this job ===
    applicants: {
      type: new GraphQLList(require("./applicationType")),
      resolve: async (parent) => {
        const app = await Application.find({ jobId: parent.id });
        return app;
      },
    },
    // === applicants of this job ===
    createdAt: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

module.exports = JobType;
