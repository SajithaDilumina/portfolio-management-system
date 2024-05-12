const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const ReservationSchema = new mongoose.Schema(
  {
    OrderId: {
      type: String,
      // default: `OD${uuidv4().split('-')[0]}`,
      unique: true,
      required: true,
    },
    CustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ServiceProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    Requests: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },
    ReservationAddedDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    ReservationDate: {
      type: Date,
      required: true,
    },
    Payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
