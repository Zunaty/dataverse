const { Schema, model } = require('mongoose');

const listSchema = new Schema(
    {
        listname: {
            type: String,
            required: true,
            trim: true
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