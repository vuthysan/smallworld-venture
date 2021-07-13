const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

const EmployerType = new GraphQLObjectType({
  name: "jobseeker",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    // token: { type: GraphQLString },
    gender: { type: GraphQLString },
    interest: { type: GraphQLList(GraphQLString) },
    birth_date: { type: GraphQLString },
    birth_place: { type: GraphQLString },
    cv: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

module.exports = EmployerType;
