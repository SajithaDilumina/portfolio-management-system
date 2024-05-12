const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  postID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',  // Assuming 'Post' is your portfolio model
    required: true
  },
  feedbackDetails: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    responsibility: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    friendliness: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    creativity: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    reliability: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    overallSatisfaction: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comments: {
      type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    FeedBackedUserID:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  }]
});

module.exports = mongoose.model('Feedback', feedbackSchema);
