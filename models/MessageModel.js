const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },

  attachment: {
    type: String,
  },

  // potential future features (media attachments, voice message, emoji, etc.)

  media: {
    type: String,
  },
  voiceMessage: {
    type: String,
  },
  emoji: {
    type: String,
  },
});

messageSchema.index({ sender: 1, receiver: 1 });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
