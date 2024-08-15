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
    addUser: async (
      _,
      { name, email, password, city, state, gender, interestedIn, profileImage }
    ) => {
      const user = await User.create({
        name,
        email,
        password,
        city,
        state,
        gender,
        interestedIn,
        profileImage,
      });
      const token = signToken(user);
      return { token, user };
    },
    //---------------------- login ----------------------//
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      // await correct password from user
      const correctPw = await user.isCorrectPassword(password);
      // check if password matches user
      if (!correctPw) {
        throw AuthenticationError;
      }
      // assign token to user
      const token = signToken(user);
      return { token, user };
    },

    //---------------------- update user ----------------------//

    updateUser: async (_, args, { user }) => {
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }
      const updateUser = await User.findByIdAndUpdate(user._id, args, {
        new: true,
      });
      return updateUser;
    },
    //---------------------- delete user profile ----------------------//
    deleteUser: async (_, { id }, { user }) => {
      if (!user || user._id.toString() !== id) {
        throw new AuthenticationError("You can only delete your own profile!");
      }
      const deleteUser = await User.findByIdAndDelete(id);
      return deleteUser;
    },
    //---------------------- purchase ticket ----------------------//
    purchaseTicket: async (_, { eventId, ticketType }, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          "You need to be logged in to purchase a ticket!"
        );
      }
      const event = await Event.findById(eventId);
      if (!event) {
        throw new Error("This event is no longer available!");
      }
      // login to handle gender specific availability
      if (
        ticketType === "Male" &&
        event.soldMaleTickets < event.maxMaleParticipants
      ) {
        event.soldFemaleTickets += 1;
      } else {
        throw new Error("Tickets are sold out!");
      }
      event.attendees.push(user._id);
      await event.save();
      return event;
    },
    //---------------------- create chat ----------------------//

    createChat: async (_, { userIds }, { user }) => {
      if (!user) {
        throw new AuthenticationError(
          "You need to be logged in to create a chat!"
        );
      }
      userIds.push(user._id); // add current user to chat
      const chat = await Chat.create({ users: userIds });
      return chat.populate("users");
    },
    //---------------------- message to chat ----------------------//
    addMessage: async (
      _,
      { chatId, senderId, message, attachment, media, voiceMessage, emoji },
      { user }
    ) => {
      if (!user || user._id.toString() !== senderId) {
        throw new AuthenticationError(
          "You need to be logged in to send a message!"
        );
      }
      const chat = await Chat.findById(chatId);
      if (!chat) {
        throw new Error("Chat not found!");
      }
      const newMessage = await Message.create({
        sender: senderId,
        message,
        attachment,
        media,
        voiceMessage,
        emoji,
        chat: chatId,
      });
      chat.messages.push(newMessage._id);
      await chat.save();
      return newMessage.populate("sender");
    },
    //---------------------- update message ----------------------//
    updateMessage: async (_, { id, message, emoji }, { user }) => {
      const existingMessage = await Message.findById(id);
      if (
        !existingMessage ||
        existingMessage.sender.toString() !== user._id.toString()
      ) {
        throw new AuthenticationError("You can only update your own messages!");
      }
      existingMessage.message = message || existingMessage.message;
      existingMessage.emoji = emoji || existingMessage.emoji;
      await existingMessage.save();
      return existingMessage;
    },
    //---------------------- delete message ----------------------//
    deleteMessage: async (_, { id }, { user }) => {
      const message = await Message.findById(id);
      if (!message || message.sender.toString() !== user._id.toString()) {
        throw new AuthenticationError("You can only delete your own messages!");
      }
      await Message.findByIdAndDelete(id);
      return message;
    },
    // block user from chat
    // linkUp
  },
};

module.exports = resolvers;
