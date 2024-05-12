import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons
import UpdateJob from "../UpdateJob/UpdateJob";
import DeleteJob from "../DeleteJob/DeleteJob";
import { SCREEN_MODES } from "../../utilities/app.constants";
const AdminJobs = ({ jobs, paginate, pageNumbers,handleRequest}) => {

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Added container with padding */}
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2">No</th>
            <th className="py-2">Job Category</th>
            <th className="py-2">Job Position</th>
            <th className="py-2">Company Name</th>
            <th className="py-2">Key Responsibilities</th>
            <th className="py-2">Skills</th>
            <th className="py-2">Email</th>
            <th className="py-2">Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="bg-gradient-to-r from-blue-200 to-white shadow-md mb-2"
            >
              <td className="py-2">{job.jobId}</td>
              <td className="py-2">{job.category}</td>
              <td className="py-2">{job.position}</td>
              <td className="py-2">{job.company}</td>
              <td className="py-2">{job.keyResponsibility}</td>
              <td className="py-2">{job.skills}</td>
              <td className="py-2">{job.email}</td>
              <td className="py-2 flex justify-center">
              <button
                  className="mr-2 bg-customGray3 hover:bg-blue-300 text-customGray4 font-bold py-2 px-4 rounded"
                  onClick={() => {handleRequest(SCREEN_MODES.EDIT, job.jobId)}}
                >
                  <FaEdit className="inline-block mr-1" /> Update
                </button>
                <button
                  className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-2 px-4 rounded"
                  onClick={() => {handleRequest(SCREEN_MODES.DELETE, job.jobId)}}
                >
                  <FaTrash className="inline-block mr-1" /> Delete
                </button>
          
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobs;
