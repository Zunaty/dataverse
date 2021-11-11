const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            const users = await User.find()
                .select('-__v -password');

                return users;
        },
        user: async (parent, { username }) => {
            const user = await User.findOne({ username })
                .select('-__v -password');

                return user;
                
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const token = await signToken(user);

            return { token, user };
        }
    }
};

module.exports = resolvers;