const { Schema, model } = require('mongoose');
const itemSchema = require('./Items')
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