const Job = require("../models/Job");

async function generateJobId() {
  let jobNumber = await Job.countDocuments({});
//   console.log("Jobs List", jobNumber);
  return jobNumber < 9
    ? "j00" + (jobNumber + 1)
    : "j0" + (jobNumber + 1);
}

const addJob = async (req, res) => {
    const newJob = new Job(req.body);
    try {
      newJob.jobId = await generateJobId();
      try {
        const job = await newJob.save();
        res.status(200).json(job);
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      console.log(err);
    }
}

const getAllJobs = async (req, res) => {
   const jobId = req.params.jobId;
   try {
     let jobs;
     if (jobId) {
       jobs = await Job.findOne({ jobId: req.params.jobId });
     } else {
       jobs = await Job.find();
     }
     res.status(200).json(jobs);
   } catch (err) {
     res.status(500).json(err);
   }
};

const getJobsAccordingToCategory = async (req, res) => {
  try {
    let jobs;
    jobs = await Job.find({ category: req.params.category });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
};

const searchJobs = async (req, res) => {
  try {
    let jobs;
    const search = req.query.search;
    console.log("hi",req.query);
    if (search) {
      // Search by position or category
      jobs = await Job.find({
        $or: [
          { position: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      });
    } else {
      jobs = await Job.find();
    }

    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
};


const getOneJob = async (req, res) => {
  try {
    const job = await Job.findOne({ jobId: req.params.jobId });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findOneAndUpdate(
      { jobId: req.params.jobId },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteJob = async (req, res) => {
  try {
    console.log(req.params.jobId);
    const deletedJob = await Job.findOneAndDelete({ jobId: req.params.jobId });
    console.log(deletedJob);
    res.status(200).json("Job has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

const countApplications = async (req, res) => {
  try {
    // Retrieve all jobs along with their applications
    const jobs = await Job.find({}).populate("applications");

    // Initialize an empty array to store company name, job, and number of applications
    const applicationsArray = [];

    // Loop through each job
    jobs.forEach((job) => {
      // Extract relevant information
      const companyName = job.company;
      const jobPosition = job.position;
      const numApplications = job.applications.length;

      // Create an object containing the extracted information
      const applicationInfo = {
        company: companyName,
        job: jobPosition,
        numApplications: numApplications,
      };

      // Push the object into the applications array
      applicationsArray.push(applicationInfo);
    });

    // Send the applications array as a response
    res.json(applicationsArray);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addJob,
  getAllJobs,
  getJobsAccordingToCategory,
  searchJobs,
  getOneJob,
  updateJob,
  deleteJob,
  countApplications,
};