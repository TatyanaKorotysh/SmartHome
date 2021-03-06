const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    login: {
        type: String,
        required: true
    },
    userLogin: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    condition: {
        type: String
    }
})

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Device', schema)