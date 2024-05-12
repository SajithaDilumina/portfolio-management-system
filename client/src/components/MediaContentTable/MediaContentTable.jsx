import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Styles from "./MediaContentTable.module.scss";

const MediaContentTable = ({ media, handleRequest, generateReport }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMedia = media.filter((item) =>
    Object.values(item).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderMediaContent = (item) => {
    switch (item.type) {
      case 'Image':
        return <img src={item.content} alt={item.title} style={{ maxWidth: '200px', maxHeight: '200px' }} />;
      case 'Video':
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        return <iframe src={item.content} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: '200px', height: '200px' }}></iframe>;
      default:
        return null;
    }
  };

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
            onClick={() => handleRequest("CREATE", null)}
          >
            Add New Media
          </button>
          <button
            className="bg-[#418ca3] hover:bg-5399ac text-white font-bold py-2 px-4 rounded"
            onClick={generateReport}
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
              <th className="py-2">Title</th>
              <th className="py-2">Type</th>
              <th className="py-2">Category</th>
              <th className="py-2">Content</th>
              <th className="py-2">Likes</th>
              <th className="py-2">Dislikes</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedia.map((item, index) => (
              <tr
                key={item._id}
                className="bg-gradient-to-r from-blue-200 to-white shadow-md mb-2"
              >
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{item.title}</td>
                <td className="py-2">{item.type}</td>
                <td className="py-2">{item.category}</td>
                <td className="py-2">{renderMediaContent(item)}</td>
                <td className="py-2">{item.likes?.length}</td>
                <td className="py-2">{item.dislikes?.length}</td>
                <td className="py-2 flex justify-center">
                  <button
                    className="mr-2 bg-customGray3 hover:bg-blue-300 text-customGray4 font-bold py-2 px-4 rounded"
                    onClick={() => handleRequest("EDIT", item._id)}
                  >
                    <FaEdit className="inline-block mr-1" /> Update
                  </button>
                  <button
                    className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-2 px-4 rounded"
                    onClick={() => handleRequest("DELETE", item._id)}
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

export default MediaContentTable;
