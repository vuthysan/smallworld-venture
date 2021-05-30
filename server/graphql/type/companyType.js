const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

// === Type ====

// === Model ===
const Opportunity = require("../../models/opportunityModel");

const CompanyType = new GraphQLObjectType({
  name: "company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    logo: { type: GraphQLString },
    description: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    existed: { type: graphql.GraphQLBoolean },
    message: { type: GraphQLString },
    opportunities: {
      // === opporunity type ===
      type: new GraphQLList(require("./opportunityType")),
      resolve: async (parent) => {
        let opp = await Opportunity.find({ companyName: parent.name }).sort({
          createdAt: -1,
        });
        return opp;
      },
    },
  }),
});

module.exports = CompanyType;
