const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', required: true
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'videos', required: true
    },
    message: { 
        type: String, required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);