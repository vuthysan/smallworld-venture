const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const DepartmentType = new GraphQLObjectType({
  name: "department",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    icon: { type: GraphQLString },
    message: { type: GraphQLString },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = DepartmentType;
