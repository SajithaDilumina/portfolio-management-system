const mongoose = require("mongoose");
const { post } = require("../routes/userRoutes");
const Schema = mongoose.Schema;
const paymentSchema = new Schema({
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  remark: {
    type: String,
    required: true,
  },  
  reservationId:{
    type: Schema.Types.ObjectId,
    ref: "Reservation",
    required: true,
  },
  ServiceProviderId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  bankSlipUrl: {
    type: String,
    required: true,
  },
  UserId:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postAmount:{
    type: String,
    required: true,
  },
  
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
