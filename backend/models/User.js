const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
},
{timestamps:true}
);

module.exports = mongoose.model("User", UserSchema);
