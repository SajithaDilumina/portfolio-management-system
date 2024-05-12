const express = require("express");
const router = express.Router();
const {
  addJob,
  getAllJobs,
  getJobsAccordingToCategory,
  searchJobs,
  getOneJob,
  updateJob,
  deleteJob,
  countApplications,
} = require("../controllers/jobController");

router.route("/").post(addJob).get(getAllJobs);
router.route("/search").get(searchJobs);
router.route("/count").get(countApplications);
router.route("/:category").get(getJobsAccordingToCategory);
router.route("/:jobId").put(updateJob).delete(deleteJob);
router.route("/getOne/:jobId").get(getOneJob);


module.exports = router;
