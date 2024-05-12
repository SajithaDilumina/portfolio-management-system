const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  portfolio_name: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  contact_no: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  discountPercentage: {
    type: Number,
    require: true,
  },
  disStartDate: {
    type: Date,
    require: true,
  },
  disEndDate: {
    type: Date,
    require: true,
  },
  promoCode:{
    type: String,
    require: false,
    default: null,
  },
  userID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  gallery: [
    {
      title: String,
      description: String,
      image: String,
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);