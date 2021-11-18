const { AuthenticationError } = require('apollo-server-express');
const { User, List, Item } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // me query
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('lists');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        // query for user
        user: async (parent, { username }) => {
            const params = username ? { username } : {};
            const user = await User.find(params)
                .select('-__v -password')
                .populate('lists');

            return user;

        },

        // query for lists
        lists: async (parent, args, context) => {
            if(context.user) {
                const username = context.user.username;
                const params = username ? { username } : {};
                const list = await List.find(params).sort({ createdAt: -1 })
                .populate('items');
                
                return list;
            }
        }
    },

    Mutation: {
        // mutation for addUser
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        // mutation for login
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
        },

        // addList mutation
        addList: async (parent, args, context) => {
            if (context.user) {
                const list = await List.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { lists: list._id } },
                    { new: true, runValidators: true }
                );

                return list;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeList: async (parent, args, context) => {
            if (context.user) {
                const userUpdate = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { lists: args._id } },
                    { new: true }
                );
                const deletedList = await List.findByIdAndDelete({ _id: args._id });

                return userUpdate;
            }

            throw new AuthenticationError("Log in to remove list");
        },
        // addItem mutation
        addItem: async (parent, args, context) => {
            if (context.user) {
                const item = await Item.create({ ...args });

                const updatedList = await List.findByIdAndUpdate(
                    { _id: args.listId },
                    { $addToSet: { items: item._id } },
                    { new: true, runValidators: true }
                );

                return item;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeItem: async (parent, args, context) => {
            if (context.user) {
                await List.findByIdAndUpdate(
                    { _id: args.listId },
                    { $pull: { items: args._id } },
                    { new: true, runValidators: true }
                );
                await Item.findByIdAndDelete({ _id: args._id });
                const updatedList = List.findOne({ _id: args.listId })
                    .populate('items');

                return updatedList;
            }

            throw new AuthenticationError("Log in to remove list");
        }
    }
};

module.exports = resolvers;