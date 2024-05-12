import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SCREEN_MODES } from "../../utilities/app.constants";
import Styles from "./UserManagementTable.module.scss";

const UserTable = ({ users, handleRequest,generateReport }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to filter users based on search term
  const filteredUsers = users.filter((user) =>
    Object.values(user).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className={Styles.tableContainer}>
    
      <div className="container mx-auto px-4 py-4 overflow-x-auto">
        <input
          type="text"
          className="border border-gray-400 px-3 py-2 rounded-md w-full mb-4 mr-2"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="flex justify-end mb-4">
          <button
            className="bg-[#418ca3] hover:bg-5399ac text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => { handleRequest(SCREEN_MODES.CREATE, null); }}
          >
            Add New User
          </button>
          <button
            className="bg-[#418ca3] hover:bg-5399ac text-white font-bold py-2 px-4 rounded"
            onClick={() => {generateReport() }}
          >
            Generate Report
          </button>
        </div>
      </div>

      <div className="container mx-auto overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
             <th className="py-2">NO</th>
              <th className="py-2">Full Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Address</th>
              <th className="py-2">Country</th>
              <th className="py-2">Role</th>
              <th className="py-2">Job Category</th>
              <th className="py-2">Date of Birth</th>
              <th className="py-2">Mobile</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user,index) => (
              <tr
                key={user._id}
                className="bg-gradient-to-r from-blue-200 to-white shadow-md mb-2"
              > <td className="py-2">{index+1}</td>
                <td className="py-2">{user.fullName}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.address}</td>
                <td className="py-2">{user.country}</td>
                <td className="py-2">{user.role}</td>
                <td className="py-2">{user.jobCategory}</td>
                <td className="py-2">{new Date(user.dob).toLocaleDateString()}</td>
                <td className="py-2">{user.mobile}</td>
                <td className="py-2 flex justify-center">
                  <button
                    className="mr-2 bg-customGray3 hover:bg-blue-300 text-customGray4 font-bold py-2 px-4 rounded"
                    onClick={() => { handleRequest(SCREEN_MODES.EDIT, user._id); }}
                  >
                    <FaEdit className="inline-block mr-1" /> Update
                  </button>
                  <button
                    className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-2 px-4 rounded"
                    onClick={() => { handleRequest(SCREEN_MODES.DELETE, user._id); }}
                  >
                    <FaTrash className="inline-block mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
