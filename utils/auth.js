const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh"; // change to a secure secret for production
const expiration = "2h"; // token expiration time

module.exports = {
  // AuthenticationError: new GraphQLError("Incorrect email or password", {
  //   extensions: {
  //     code: "UNAUTHENTICATED",
  //   },
  // }),
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    // console.log("authmiddleware");

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      throw new GraphQLError("Invalid token", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }

    return req;
  },
  signToken: function ({ email, _id }) {
    const payload = { email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
