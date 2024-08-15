const { User, Message, Event } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  // query type for getting data
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("messages")
          .populate("events");
        return userData;
      }
      throw AuthenticationError;
    },
  },
};
// mutation type for updating data (create, update, delete)
// type Mutation: {
// create a new user

// update user profile

// delete user account

// create message

// update message

// delete message

//  events (attendance status)
// }

module.exports = resolvers;
