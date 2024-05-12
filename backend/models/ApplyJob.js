const mongoose = require("mongoose");

const ApplyJobSchema = new mongoose.Schema(
  {
    applyId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ApplyJob", ApplyJobSchema);
