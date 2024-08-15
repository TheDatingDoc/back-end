const { User, Chat, MessageModel, Event } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  //---------------------------------------------------- QUERY --------------------------------------------------------//
  Query: {
    //---------------------- get all users ----------------------//

    //---------------------- get one user ----------------------//
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("messages")
          .populate("attendedEvents")
          .populate("upcomingEvents");
        return userData;
      }
      throw AuthenticationError;
    },
    //---------------------- get all events ----------------------//
    events: async(parent, args, context),
    //---------------------- get one event ----------------------//
    //---------------------- get all chats ----------------------//
    //---------------------- get one chat ----------------------//
  },

  //------------------------------------------------- MUTATIONS -----------------------------------------------------//
  Mutation: {
    //---------------------- add user ----------------------//
    //---------------------- login ----------------------//
    //---------------------- update user ----------------------//
    //---------------------- delete user ----------------------//
    //---------------------- create message ----------------------//
    //---------------------- update message ----------------------//
    //---------------------- delete message ----------------------//
  },
};

module.exports = resolvers;
