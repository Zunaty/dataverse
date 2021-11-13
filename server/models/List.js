const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const listSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true
        },
        listName: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        itemName: {
            type: String,
            required: true,
            trim: true
        },
        itemDescription: {
            type: String,
            trim: true
        },
        itemImg: {
            type: String
        },
        itemQuantity: {
            type: Number,
            required: true
        },
        itemPrice: {
            type: Number
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const List = model('List', listSchema);

module.exports = List;