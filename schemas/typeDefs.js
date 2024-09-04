const { gql } = require("graphql-tag");

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
    address: String!
    images: [String]
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
    soldTickets: Int
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
  # chat
  type Chat {
    id: ID!
    users: [User]!
    messages: [Message]!
  }
  # query
  type Query {
    users: [User]
    user(id: ID!): User
    events: [Event]
    event(id: ID!): Event
    myEvents: User
    myMatches(eventId: ID!): [User]
    chat(id: ID!): Chat
    messages(chatId: ID!): [Message]
  }

  # mutation type for updating data (create, update, delete)
  type Mutation {
    # user
    addUser(
      name: String!
      email: String!
      password: String!
      city: String
      state: String!
      gender: String!
      interestedIn: String!
      profileImage: String!
    ): Auth
    login(email: String!, password: String!): Auth
    updateUser(
      name: String
      email: String
      password: String
      city: String
      state: String
      jobTitle: String
      bio: String
      gender: String
      interestedIn: String
      profileImage: String
      additionalImages: [String]
      interests: [String]
      personalityTraits: String
      metatags: [String]
      loveLanguage: [String]
      bestFeature: String
      socialCircle: String
      lookingFor: String
      basicInfo: [String]
      proMember: Boolean #attendedEvents: [ID] #upcomingEvents: [ID]
    ): User

    deleteUser(id: ID!): User

    # event

    purchaseTicket(eventID: ID!, ticketType: String!): Event

    meetYourMatches(eventID: ID!): [User]

    # message

    createChat(userIds: [ID]!): Chat
    addMessage(
      chatId: ID!
      senderId: ID!
      message: String!
      attachment: String
      media: String
      voiceMessage: String
      emoji: String
    ): Message
    updateMessage(id: ID!, message: String, emoji: String): Message
    deleteMessage(id: ID!): Message
    # blockUser(chatId: ID!, userId: ID!): Chat
    # linkUp(chatId: ID!, userId: ID!): String
  }
`;

module.exports = typeDefs;
