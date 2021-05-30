const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

// ====== Model ======
const Company = require("../../models/companyModel");
const Department = require("../../models/departmentModel");
const Opportunity = require("../../models/opportunityModel");

// ====== Type ======
const CompanyType = require("../type/companyType");
const DepartmentType = require("../type/departmentType");
const OpportunityType = require("../type/opportunityType");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // === get all companies ===
    get_companies: {
      type: new GraphQLList(CompanyType),
      description: "List of companies",
      resolve: async () => {
        const com = await Company.find().sort({ createdAt: -1 });
        return com;
      },
    },
    // === get company by company's name ===
    get_company: {
      type: CompanyType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        //  == regex use to prevent case sensitive ===
        let com = await Company.findOne({
          name: {
            $regex: new RegExp(args.name, "i"),
          },
        });
        return com;
      },
    },
    // ====== get all departments ======
    get_departments: {
      type: new GraphQLList(DepartmentType),
      description: "List of departments",
      resolve: async () => {
        const dep = await Department.find().sort({ createdAt: -1 });
        return dep;
      },
    },
    // ====== get opportunitiy by id ======
    get_department: {
      type: DepartmentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        return Department.findById(args.id);
      },
    },
    // ====== get opportunity by id ======
    get_opportunity: {
      type: OpportunityType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        return Opportunity.findById(args.id);
      },
    },
  },
});

module.exports = RootQuery;
