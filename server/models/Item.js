const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const itemSchema = new Schema(
    {
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
            min: 0,
            defualt: 0,
            required: true
        },
        itemPrice: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Item = model('Item', itemSchema)

module.exports = Item;