import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";

const ApplyJob = ({jobId}) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [cv, setCv] = useState("");
  const [file, setFile] = useState(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    const applyData = {
      name,
      cv,
      jobId
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      applyData.cv = filename;
      console.log("data",data)
      console.log("file",file)
      console.log("name", filename);
      try {
        axios.post("http://localhost:5000/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    // console.log('name', name , jobId, cv)

    // if (name.length) {
    //   swal(" Fields Cannot empty !", "Please enter all data !", "error");
    // } else {
      console.log("apply",applyData);
      axios
        .post("http://localhost:5000/api/apply", applyData)
        .then(function (response) {
          console.log(response.data);
          setName("");
          setCv("");

          swal({
            text: "Successfully Added",
            icon: "success",
            buttons: {
              cancel: { text: "Cancel" },
              confirm: { text: "OK" },
            },
          }).then((value) => {
            handleCloseModal();
          });
        })
        .catch(function (error) {
          console.log(error);
          setName("");
          setCv("");
          alert("Not added");
        });
      handleCloseModal();
    // }
  };

  return (
    <div>
      <button
        className="btn mt-4 bg-customGray hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleShowModal}
      >
        Apply now
      </button>

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
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cv" className="font-medium">
                  CV (PDF only)
                </label>
                <input
                  type="file"
                  id="cv"
                  accept=".pdf"
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-customGray text-white py-2 px-4 rounded-lg hover:bg-customGray2 focus:outline-none focus:ring focus:ring-blue-200"
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyJob;
