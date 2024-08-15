const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    eventType: {
      type: String,
      enum: ["VIP", "Fitness", "Online", "Signature", "Workshop"],
    },
    tags: {
      type: [String],
    },
    price: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Past", "Canceled"],
      default: "Upcoming",
    },
    maxParticipants: {
      type: Number,
      required: true,
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

eventSchema.virtual("attendees").get(function () {
  return this.attendees.length;
});

const Event = model("Event", eventSchema);

module.exports = Event;
