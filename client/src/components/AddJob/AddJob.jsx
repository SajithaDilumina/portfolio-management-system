import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios"

const AddJob = ({isOpen ,onClose}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const [position, setPosition] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [keyResponsibility, setKeyResponsibility] = useState("");
  const [skills, setSkills] = useState([]);
  const [email, setEmail] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
    onClose()
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.preventDefault();
    const jobData = {
      position,
      category,
      company,
      keyResponsibility,
      skills,
      email
    };
    if (position.length === 0 || category.length === 0 || company.length === 0 || keyResponsibility.length === 0 || skills.length === 0 || email.length === 0 ) {
      swal(" Fields Cannot empty !", "Please enter all data !", "error");
    }
    else {
      console.log(jobData);
      axios.post("http://localhost:5000/api/job", jobData).then(function (response) {
        console.log(response.data);
        setPosition('')
        setCategory('')
        setCompany('')
        setKeyResponsibility('')
        setSkills('')
        setEmail('')

        swal({
          text: "Successfully Added", icon: "success", buttons: {
            cancel: { text: 'Cancel' },
            confirm: { text: 'OK' },
          }
        }).then((value) => {
          handleCloseModal();
        });
      }).catch(function (error) {
        console.log(error);
        setPosition("");
        setCategory("");
        setCompany("");
        setKeyResponsibility("");
        setSkills("");
        setEmail("");
        alert("Not added");
      });
    handleCloseModal();
  }}

  return (
    <div>
     

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={handleCloseModal}
          >
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-xl w-full">
            <button
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-lg font-semibold mb-4">Add Job</h2>
            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="position" className="font-medium">
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="category" className="font-medium">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="company" className="font-medium">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="keyResponsibility" className="font-medium">
                  Key Responsibility
                </label>
                <input
                  type="text"
                  id="keyResponsibility"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={keyResponsibility}
                  onChange={(e) => setKeyResponsibility(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="skills" className="font-medium">
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value.split(","))}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-customGray text-white py-2 px-4 rounded-lg hover:bg-customGray2 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddJob;
