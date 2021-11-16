const { Schema, model, Types } = require('mongoose');
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
            type: Number
        },
        itemQuantity: {
            type: Number,
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
        items: [itemSchema]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

listSchema.virtual('itemsCount').get(function() {
    return this.items.length;
});

const List = model('List', listSchema);

module.exports = List;