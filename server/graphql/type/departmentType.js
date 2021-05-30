const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

// === Model ====
const Opportunity = require("../../models/opportunityModel");

const DepartmentType = new GraphQLObjectType({
  name: "department",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    icon: { type: GraphQLString },
    message: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    opportunities: {
      type: GraphQLList(require("./opportunityType")),
      resolve: async (parent) => {
        let opp = await Opportunity.find({ departmentId: parent.id }).sort({
          createdAt: -1,
        });
        return opp;
      },
    },
  }),
});

module.exports = DepartmentType;
