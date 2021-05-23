const graphql = require("graphql");
const { GraphQLSchema } = graphql;
// const RootQuery = require("./queries/queries");
const RootQuery = require("./queries/rootQuery");
const Mutation = require("./mutations/adminMutation");

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
