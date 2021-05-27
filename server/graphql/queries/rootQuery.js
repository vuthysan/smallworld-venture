const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

// ====== Model ======
const Message = require("../../models/messageModel");

// ====== Type ======
const MessageType = require("../type/messageType");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    get_messages: {
      type: new GraphQLList(MessageType),
      description: "List of messages",
      resolve: async (parent, args) => {
        const mes = await Message.find();
        return mes;
      },
    },
    get_message: {
      type: MessageType,
      args: {
        id: { type: graphql.GraphQLNonNull(GraphQLID) },
      },
      resolve: async (parent, args) => {
        let msg = await Message.findById(args.id);
        return msg;
      },
    },
  },
});
module.exports = RootQuery;
