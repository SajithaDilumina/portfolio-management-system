import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Styles from './FeedbackManagementTable.module.scss';
import Rating from '@mui/material/Rating';
import { SCREEN_MODES } from '../../utilities/app.constants';

const FeedbackManagementTable2 = ({ feedbacks, handleRequest, generateReport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [UserRole, setUserRole] = useState('');

  useEffect(() => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    setUserRole(user?.role || 'USER');
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredFeedbacks = feedbacks.filter(feedback =>
    feedback.postDetails.some(detail =>
      (detail.portfolio_name.toLowerCase() ?? "").includes(searchTerm) ||
        (detail.category.toLowerCase() ?? "").includes(searchTerm) 
    )
  );

  return (
    <div className={Styles.tableContainer}>
      <div className="container mx-auto px-4 py-4 overflow-x-auto">
        <input
          type="text"
          className="border border-gray-400 px-3 py-2 rounded-md w-full mb-4"
          placeholder="Search by Portfolio Name or Category"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="flex justify-end mb-4">
          {UserRole === "ADMIN" && (
            <button
              className="bg-[#418ca3] hover:bg-[#5399ac] text-white font-bold py-2 px-4 rounded"
              onClick={generateReport}
            >
              Generate Report
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2">NO</th>
              <th className="py-2">Portfolio Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Feedback By</th>
              <th className="py-2">Responsibility</th>
              <th className="py-2">Friendliness</th>
              <th className="py-2">Creativity</th>
              <th className="py-2">Reliability</th>
              <th className="py-2">Overall Satisfaction</th>
              <th className="py-2">Comments</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback, index) => (
              feedback.feedbackDetails.map((detail, detailIndex) => (
                <tr key={`${detail._id}-${index}`} className="bg-gradient-to-r from-blue-200 to-white shadow-md mb-2">
                  <td className="py-2">{index + 1}.{detailIndex + 1}</td>
                  <td className="py-2">{feedback.postDetails[0].portfolio_name}</td>
                  <td className="py-2">{feedback.postDetails[0].category}</td>
                  <td className="py-2">{detail.email}</td>
                  <td className="py-2"><Rating value={detail.responsibility} readOnly /></td>
                  <td className="py-2"><Rating value={detail.friendliness} readOnly /></td>
                  <td className="py-2"><Rating value={detail.creativity} readOnly /></td>
                  <td className="py-2"><Rating value={detail.reliability} readOnly /></td>
                  <td className="py-2"><Rating value={detail.overallSatisfaction} readOnly /></td>
                  <td className="py-2">{detail.comments}</td>
                  <td className="py-2 flex justify-center">
                    {UserRole === "USER" && (
                      <button
                        className="mr-2 bg-customGray3 hover:bg-blue-300 text-customGray4 font-bold py-3 px-4 rounded"
                        onClick={() => handleRequest(SCREEN_MODES.EDIT, feedback._id, detail._id)}
                      >
                        <FaEdit className="inline-block mr-1" />Update
                      </button>
                    )}
                    <button
                      className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-3 px-4 rounded"
                      onClick={() => handleRequest(SCREEN_MODES.DELETE, feedback._id, detail._id)}
                    >
                      <FaTrash className="inline-block mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackManagementTable2;
