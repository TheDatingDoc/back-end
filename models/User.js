const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
    },
    bio: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    interestedIn: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    addtionalImages: {
      type: [
        {
          type: String,
        },
      ],
      validate: [
        ({ length }) => length <= 4,
        "You can only have up to 4 images",
      ],
    },
    interests: {
      type: [
        {
          type: String,
        },
      ],
      validate: [
        ({ length }) => length <= 5,
        "You can only have up to 5 interests",
      ],
    },
    personalityTraits: {
      type: String,
    },
    metatags: {
      type: [
        {
          type: String,
        },
      ],
      validate: [
        ({ length }) => length <= 5,
        "You can only have up to 5 metatags",
      ],
    },
    loveLanguage: {
      type: [
        {
          type: String,
        },
      ],
      validate: [
        ({ length }) => length <= 2,
        "You can only have up to 2 items",
      ],
    },
    bestFeature: {
      type: String,
    },
    socialCircle: {
      type: String,
    },
    lookingFor: {
      type: String,
    },
    basicInfo: {
      type: [
        {
          type: String,
        },
      ],
    },
    proMember: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model("User", userSchema);

module.exports = User;
