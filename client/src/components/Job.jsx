import React from "react";
import { useNavigate } from "react-router-dom";
import ApplyJob from "./ApplyJob/ApplyJob";

const Job = ({ job }) => {
  const navigate = useNavigate();
  console.log("first", job)

  // Breadcrumb category
  const category = "Category > Job";
  const [firstWord, ...rest] = category.split(" "); // Splitting category string into words

  return (
    <div
      className="services-box bg-gray-100 rounded-lg overflow-hidden shadow-md p-4 mb-5 mr-5"
      style={{ width: "calc(25% - 20px)" }}
    >
      {/* Added mb-4 for bottom margin */}
      {/* Breadcrumb */}
      <div className="text-customGray text-sm mb-2">
        <span className="font-semibold">{firstWord}</span> {rest.join(" ")}
      </div>
     
      {/* Job Title */}
      <h2 className="text-xl font-semibold mb-2">{job.position}</h2>
      <h3> { job?.company}</h3>
      {/* Job Description */}
      <p className="text-customGray mb-4">{job.keyResponsibility}</p>
      {/* Experience */}
      {/* <p className="text-gray-700">Experience: {job.exp} years</p> */}
      {/* Technologies */}

      <div className="techs">
        {job.skills.map((tech, idx) => (
          <span key={job.id + idx} className="text-customGray">
            {tech}
          </span>
        ))}
      </div>
      {/* Apply Button */}
      {/* <button
        onClick={() => navigate("/apply")}
        className="btn mt-4 bg-customGray hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Apply now
      </button> */}
      <ApplyJob jobId={job.jobId}/>
    </div>
  );
};

export default Job;
