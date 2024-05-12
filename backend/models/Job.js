const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      unique:false
    },
    keyResponsibility: {
      type: String,
      required: true,
    },
    skills: [
      {
        type: String,
      },
    ],
    email: {
      type: String,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ApplyJob",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
