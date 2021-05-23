const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

// === Type Section
const CompanyType = require("../type/companyType");
const DepartmentType = require("../type/departmentType");

// === Model Section ===
const Company = require("../../models/companyModel");
const Department = require("../../models/departmentModel");

const OpportunityType = new GraphQLObjectType({
  name: "opporunities",
  fields: () => ({
    id: { type: GraphQLID },
    position: { type: GraphQLString },
    status: { type: GraphQLBoolean },
    requirements: { type: new GraphQLList(GraphQLString) },
    responsibilities: { type: new GraphQLList(GraphQLString) },
    conditions: { type: new GraphQLList(GraphQLString) },
    departmentId: { type: GraphQLID },
    department: {
      type: DepartmentType,
      resolve: async (parent) => {
        const dep = await Department.findById(parent.departmentId);
        return dep;
      },
    },
    companyName: { type: GraphQLString },
    company: {
      type: CompanyType,
      resolve: async (parent) => {
        const com = await Company.findOne({ name: parent.companyName });
        return com;
      },
    },
    message: { type: GraphQLString },
  }),
});

module.exports = OpportunityType;
