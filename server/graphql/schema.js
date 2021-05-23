const graphql = require("graphql");
const { GraphQLSchema } = graphql;
// const RootQuery = require("./queries/queries");
const AdminQuery = require("./queries/adminQuery");
const AdminMutation = require("./mutations/adminMutation");

module.exports = new GraphQLSchema({
  query: AdminQuery,
  mutation: AdminMutation,
});
