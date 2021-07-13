const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

// === Type Section
const CompanyType = require("./companyType");
const EmployerType = require("./employerType");

// === Model Section ===
const Company = require("../../models/companyModel");
const Employer = require("../../models/employerModel");

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
    company: {
      type: CompanyType,
      resolve: async (parent) => {
        const com = await Company.findOne({ name: parent.company_name });
        return com;
      },
    },
    employerId: { type: GraphQLID },
    employer: {
      type: EmployerType,
      resolve: async (parent) => {
        const emp = await Employer.findById(parent.employerId);
        return emp;
      },
    },
    message: { type: GraphQLString },
  }),
});

module.exports = JobType;
