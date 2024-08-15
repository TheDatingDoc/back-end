const { gql } = require("apollo-server");

const typeDefs = gql`
  #user
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    city: String!
    state: String!
    jobTitle: String
    bio: String
    gender: String!
    interestedIn: String!
    profileImage: String!
    additionalImages: [String]
    interests: [String]
    personalityTraits: String
    metatags: [String]
    loveLanguage: String
    bestFeature: String
    socialCircle: String
    lookingFor: String
    basicInfo: String
    proMember: Boolean
  }

  type Auth {
    token: ID!
    user: User
  }
  # event
  type Event {
    id: ID!
    eventName: String!
    description: String!
    date: String!
    time: String!
    location: String!
    image: String
    maxParticipants: Int!
    attendees: [User]
  }
  # message
  type Message {
    id: ID!
    sender: User!
    message: String!
    timestamp: String
    isRead: Boolean
    attachment: String
    media: String
    voiceMessage: String
    emoji: String
  }

  # query
  type Query {
    users: [User]
    user(id: ID!): User
    events: [Event]
    event(id: ID!): Event
    messages: [Message]
  }
`;

module.exports = typeDefs;
