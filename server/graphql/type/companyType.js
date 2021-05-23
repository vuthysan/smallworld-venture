const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } = graphql;

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
  }),
});

module.exports = CompanyType;
