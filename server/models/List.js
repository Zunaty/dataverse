const { Schema, model } = require('mongoose');
// const itemSchema = require('./Items')
const dateFormat = require('../utils/dateFormat');

const listSchema = new Schema(
    {
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
        items: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Item'
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

listSchema.virtual('itemsCount').get(function() {
    return this.items.length;
});

const List = model('List', listSchema);

module.exports = List;