const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

// === Model ===
const Job = require("../../models/jobModel");
const Employer = require("../../models/employerModel");

// === Type ===
const EmployerType = require("./employerType");

const CompanyType = new GraphQLObjectType({
  name: "company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    logo: { type: GraphQLString },
    about: { type: GraphQLString },
    website: { type: GraphQLString },
    city: { type: GraphQLString },
    employer_position: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    employerId: { type: GraphQLID },
    // === employer of company ===
    employer: {
      // === employer type ===
      type: EmployerType,
      resolve: async (parent) => {
        let em = await Employer.findById(parent.employerId);
        return em;
      },
    },
    // === jobs under this company ===
    jobs: {
      // === opporunity type ===
      type: new GraphQLList(require("./jobType")),
      resolve: async (parent) => {
        let job = await Job.find({ company_name: parent.name }).sort({
          createdAt: -1,
        });
        return job;
      },
    },
    message: { type: GraphQLString },
  }),
});

module.exports = CompanyType;
