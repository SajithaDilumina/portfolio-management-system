import React, { useState, useEffect } from "react";
import axios from "axios";

const JobApplication = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch data from the API route
    axios
      .get("http://localhost:5000/api/job/count")
      .then((response) => {
        // Set the retrieved data to the state
        setApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div className="container mx-auto px-4 py-8">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2">Company Name</th>
            <th className="py-2">Job</th>
            <th className="py-2">No of Applications</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr
              key={index}
              className="bg-gradient-to-r from-blue-200 to-white shadow-md mb-2"
            >
              <td className="py-2">{application.company}</td>
              <td className="py-2">{application.job}</td>
              <td className="py-2">{application.numApplications}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApplication;
