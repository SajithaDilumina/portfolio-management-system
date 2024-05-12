const Job = require("../models/Job");
const ApplyJob = require("../models/ApplyJob");

async function generateApplyId() {
  let applyNumber = await ApplyJob.countDocuments({});
  return applyNumber < 9 ? "a00" + (applyNumber + 1) : "a0" + (applyNumber + 1);
}

const applyJob = async (req, res) => {
  const { jobId, name, cv } = req.body; 
  try {
    const applyId = await generateApplyId();

    const newApplyJob = new ApplyJob({
      applyId,
      name,
      cv,
    });

    const savedApplyJob = await newApplyJob.save();

    const updatedJob = await Job.findOneAndUpdate(
      { jobId },
      { $push: { applications: savedApplyJob._id } },
      { new: true }
    ).populate("applications");

    res.status(200).json(updatedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = { applyJob };
