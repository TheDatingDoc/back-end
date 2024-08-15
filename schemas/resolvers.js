const { User, Chat, MessageModel, Event } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  //---------------------------------------------------- QUERY --------------------------------------------------------//
  Query: {
    //---------------------- get one user ----------------------//
    user: async (_, { id }) => {
      return User.findById(id);
    },
    //---------------------- get all events ----------------------//
    events: async () => {
      return Event.find();
    },
    //---------------------- get one event ----------------------//
    event: async (_, { id }) => {
      return Event.findById(id);
    },
    //---------------------- my matches ----------------------//
    myMatches: async (_, { eventId }, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          "You need to be logged in to view matches!"
        );
      }
      const event = await Event.findById(eventId).populate("attendees");
      return event.attendees.filter(
        (attendee) => attendee._id.toString() !== user._id.toString()
      );
    },
    //---------------------- get all chats ----------------------//
    chat: async (_, { id }) => {
      return Chat.findById(id)
        .populate("users")
        .populate({
          path: "messages",
          populate: { path: "sender" },
        });
    },
    //---------------------- get one chat ----------------------//
    messages: async (_, { chatId }) => {
      return Message.find({ chat: chatId }).populate("sender");
    },
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
