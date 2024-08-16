// const express = require("express");
// const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { authMiddleware } = require("./utils/auth");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

// socket.io - chat
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

const PORT = process.env.PORT || 3000;
// const app = express();

// Instantiate Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Function to start Apollo Server standalone
const startApolloServer = async () => {
  db.once("open", async () => {
    // Start Apollo Server with standalone mode
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => authMiddleware({ req }),
      listen: { port: PORT },
    });

    console.log(`🚀 Server ready at ${url}`);
  });
};

startApolloServer();
