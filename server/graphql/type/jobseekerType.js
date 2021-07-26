const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLString } = graphql;

const JobSeekerType = new GraphQLObjectType({
  name: "jobseeker",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    phone: { type: GraphQLString },
    gender: { type: GraphQLString },
    interest: { type: GraphQLList(GraphQLString) },
    birth_date: { type: GraphQLString },
    birth_place: { type: GraphQLString },
    cv: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});

module.exports = JobSeekerType;
