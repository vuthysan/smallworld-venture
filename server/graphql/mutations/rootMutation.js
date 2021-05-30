const graphql = require("graphql");
const { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLObjectType } = graphql;

// ===== Modal =====
const Message = require("../../models/messageModel");
const Application = require("../../models/applicationModel");

// ===== Type =====
const MessageType = require("../type/messageType");
const ApplicationType = require("../type/applicationType");

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    // === message ===
    post_message: {
      type: MessageType,
      args: {
        fullname: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        message: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        let newMessage = new Message({ ...args });
        await newMessage.save();
        return { respond: "Message sent!" };
      },
    },
    // === applicant's form ===
    post_application: {
      type: ApplicationType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        additional: { type: GraphQLString },
        cv: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const newApplication = new Application({ ...args });
        await newApplication.save();
        return { message: "Application sent!" };
      },
    },
  },
});

module.exports = RootMutation;
