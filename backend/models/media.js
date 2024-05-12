const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mediaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    likes: [{ // Array of user IDs who liked the media
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    dislikes: [{ // Array of user IDs who disliked the media
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    userId:{// Owner of the media
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
});

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
