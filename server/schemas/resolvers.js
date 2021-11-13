const { AuthenticationError } = require('apollo-server-express');
const { User, List } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // query for me query

        // {
        //     me {
        //       _id
        //       username
        //       email
        //       lists {
        //         _id
        //         listName
        //         createdAt
        //         itemImg
        //         itemName
        //         itemPrice
        //         itemQuantity
        //       }
        //     }
        //   }

        // header 
        // Authorization token 

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

        // query user($username: String) {
        //     user(username: $username) {
        //       _id
        //       username
        //       email
        //       lists {
        //         _id
        //         listName
        //         createdAt
        //         itemImg
        //         itemName
        //         itemPrice
        //         itemQuantity
        //       }
        //     }
        //   }

        // variable for user query with varaible returns single user without all users

        // {
        //     "username": "sean2test"
        //   }

        user: async (parent, { username }) => {
            const params = username ? { username } : {};
            const user = await User.find(params)
                .select('-__v -password')
                .populate('lists');

            return user;

        },

        // query for lists

        // query($username: String) {
        //     lists (username: $username) {
        //       username
        //       _id
        //       listName
        //       createdAt
        //       itemName
        //       itemDescription
        //       itemImg
        //       itemQuantity
        //       itemPrice
        //     }
        //     }
        //   }

        // variable for lists no variable all lists with variable all lists by this user
        // {
        //     "username": "username"
        // }

        lists: async (parent, { username }) => {
            const params = username ? { username } : {};
            return List.find(params).sort({ createdAt: -1 });
        }
    },

    Mutation: {
        // mutation for addUser

        // mutation addUser($username: String!, $password: String!, $email: String!) {
        //     addUser(username: $username, password: $password, email: $email) {
        //       token
        //       user {
        //         _id
        //       }
        //     }
        //   }

        // variables accepted by addUser mutation

        // {
        // "username": "sean3test",
        // "password": "password",
        //  "email": "sean3test@email.com"
        // }

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = await signToken(user);

            return { token, user };
        },

        // mutation for login
        // mutation login($email: String!, $password: String!) {
        //     login(email: $email, password: $password) {
        //       token
        //       user {
        //         _id
        //       }
        //     }
        //   }

        // variables for login
        // {
        //     "password": "password",
        //     "email": "sean3test@email.com"
        //   }
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

        // mutation($listName: String!, $itemName: String!, $itemDescription: String, $itemImg: String, $itemQuantity: Int!, $itemPrice: String) {
        //     addList(listName: $listName, itemName: $itemName, itemDescription: $itemDescription, itemImg: $itemImg, itemQuantity: $itemQuantity, itemPrice: $itemPrice) {
        //       username
        //       _id
        //       listName
        //       createdAt
        //       itemName
        //       itemDescription
        //       itemImg
        //       itemQuantity
        //       itemPrice

        //     }
        //   }

        // variables and header
        // Authorization token

        // {
        //     "listName": "testList2",
        //     "itemName": "testName2",
        //     "itemDescription": "test2 description",
        //     "itemImg": "imgage/link/photo.png",
        //     "itemQuantity": 234,
        //     "itemPrice": "270.34"
        // }
        addList: async (parent, args, context) => {
            if (context.user) {
                const list = await List.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { lists: list._id } },
                    { new: true }
                );

                return list;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        // removeList: async (parent, args, context) => {
        //     if (context.user) {
        //         const userUpdate = await User.findByIdAndUpdate(
        //             { _id: context.user._id },
        //             { $pull: { lists: { Id: args._id } } },
        //             { new: true }
        //         );

        //         return userUpdate;
        //     }

        //     throw new AuthenticationError("Log in to remove list");
        // }
    }
};

module.exports = resolvers;