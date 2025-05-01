const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    channelName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        required: true,
    },
    subscriber: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ]

}, { timestamps: true });

module.exports = mongoose.model('user', UserSchema);