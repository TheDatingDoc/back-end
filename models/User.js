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
    birthday: {
      type: String,
      required: true,
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
      default: false,
    },
    attendedEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    upcomingEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event",
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

// hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// compare the provided password with the stored hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
