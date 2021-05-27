const graphql = require("graphql");
const { GraphQLString, GraphQLID, GraphQLNonNull, GraphQLObjectType } = graphql;

// ===== Modal =====
const Message = require("../../models/messageModel");

// ===== Type =====
const MessageType = require("../type/messageType");

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    post_message: {
      type: MessageType,
      args: {
        fullname: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        message: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        let newMessage = new Message({
          fullname: args.fullname,
          email: args.email,
          message: args.message,
        });
        await newMessage.save();
        return { respond: "Message sent!" };
      },
    },
  },
});

module.exports = RootMutation;
