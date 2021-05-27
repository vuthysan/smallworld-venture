const graphql = require("graphql");
const { GraphQLSchema } = graphql;
const RootQuery = require("../queries/rootQuery");
const RootMutation = require("../mutations/rootMutation");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
