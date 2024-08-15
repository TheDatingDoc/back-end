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
    city: {
      type: String,
      required: true,
    },
    address: {
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
      default: 0,
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
    maxMaleParticipants: {
      type: Number,
      required: true,
    },
    maxFemaleParticipants: {
      type: Number,
      required: true,
    },
    soldMaleTickets: {
      type: Number,
      default: 0,
    },
    soldFemaleTickets: {
      type: Number,
      default: 0,
    },

    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isVIP: {
      type: Boolean,
      default: false,
    },
    soldTickets: {
      type: Number,
      default: 0,
    },
    tickets: [
      {
        buyer: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        ticketType: {
          type: String,
          enum: ["Male", "Female"],
        },
        purchaseDate: {
          type: Date,
          default: Date.now,
        },
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

eventSchema.virtual("availableMaleTickets").get(function () {
  return this.maxMaleParticipants - this.soldMaleTickets;
});

eventSchema.virtual("availableFemaleTickets").get(function () {
  return this.maxFemaleParticipants - this.soldMaleTickets;
});

eventSchema.virtual("attendeeCount").get(function () {
  return this.attendees.length;
});

const Event = model("Event", eventSchema);

module.exports = Event;
