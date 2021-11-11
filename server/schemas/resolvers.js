const { AuthenticationError } = require('apollo-server-express');
//const { signToken } = require('../utils/auth');
const {User} = require("../models")
const resolvers = {
    Query: {
      helloWorld: () => {
        return 'Hello world!';
      }
    }
  };

module.exports = resolvers;