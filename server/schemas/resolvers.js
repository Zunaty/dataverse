const { AuthenticationError } = require('apollo-server-express');
const { User, List } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        users: async () => {
            const users = await User.find()
                .select('-__v -password')
                .populate('lists');

            return users;
        },
        user: async (parent, { username }) => {
            const user = await User.findOne({ username })
                .select('-__v -password');

            return user;

        },
        lists: async (parent, { username }) => {
            const params = username ? { username } : {};
            return List.find(params).sort({ createdAt: -1});
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = await signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        }
        // addList: async
    }
};

module.exports = resolvers;