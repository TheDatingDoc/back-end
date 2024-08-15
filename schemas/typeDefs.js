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
    loveLanguage: [String]
    bestFeature: String
    socialCircle: String
    lookingFor: String
    basicInfo: [String]
    proMember: Boolean
    attendedEvents: [Event]
    upcomingEvents: [Event]
  }
  # user authentication
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
    city: String!
    profileImage: String
    additionalImages: [String]
    eventType: String
    tags: [String]
    price: Float!
    status: String
    maxParticipants: Int!
    maxMaleParticipants: Int!
    maxFemaleParticipants: Int!
    soldMaleTickets: Int
    soldFemaleTickets: Int
    attendees: [User]
    isVIP: Boolean
    tickets: [Ticket]
  }

  # ticket

  type Ticket {
    buyer: User!
    ticketType: String!
    purchaseDate: String!
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
    chat(id: ID!): Chat
    messages: [Message]
  }

  # mutation type for updating data (create, update, delete)
   type Mutation: {
 # user
addUser(name: String!, email: String!, password: String!, city: String, state: String!, gender: String!, interestedIn: String!, profileImage: String! ): Auth
login(email: String!, password: String!): Auth
updateUser(name: String, email: String, password: String, city: String, state: String, jobTitle: String, bio: String, gender: String, interestedIn: String, profileImage: String, additionalImages: [String], interests: [String], personalityTraits: String, metatags: [String], loveLanguage: [String], bestFeature: String, socialCircle: String, lookingFor: String, basicInfo: [String], proMember: Boolean, attendedEvents: [Event]
upcomingEvents: [Event]  ): User
deleteUser(id: ID!): User

 # message

addMessage(sender: ID!, message: String!, timestamp: String, isRead: Boolean, attachment: String, media: String, voiceMessage: String, emoji: String): Message
updateMessage(message: String, emoji: String): Message
deleteMessage(id: ID!): Message

 # event



# events (attendance status)
   }
`;

module.exports = typeDefs;
