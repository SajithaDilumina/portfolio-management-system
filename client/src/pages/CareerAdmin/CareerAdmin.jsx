import React, { useEffect, useState } from "react";
import AdminJobs from "../../components/AdminJobs/AdminJobs";
import AddJob from "../../components/AddJob/AddJob";
import axios from 'axios'
import JobReport from "../../components/JobReport/JobReport";
import UpdateJob from "../../components/UpdateJob/UpdateJob";
import DeleteJob from "../../components/DeleteJob/DeleteJob";
import { SCREEN_MODES } from "../../utilities/app.constants";

const CareerAdmin = () => {
  const [jobs, setJobs] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to manage modal visibility
  const [mode, setMode] = useState(null);

  // Define getData function here
  const getData = () => {
    axios
      .get("http://localhost:5000/api/job")
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [mode]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setMode(SCREEN_MODES.CREATE); // Call getData function here
  };

  const handleRequest = (mode, id) => {
    console.log("Handling request:", mode, id);
    setMode(mode);
    switch (mode) {
      case SCREEN_MODES.EDIT:
        setModalContent(<UpdateJob jobId={id} isOpen={true} onClose={handleCloseModal} />);
        setIsOpen(true); 
        break;
      case SCREEN_MODES.DELETE:
        setModalContent(<DeleteJob jobId={id} isOpen={true} onClose={handleCloseModal} />);
        setIsOpen(true); 
        break;
        case SCREEN_MODES.CREATE:
          setModalContent(<AddJob  isOpen={true} onClose={handleCloseModal} />);
          setIsOpen(true); 
          break;
      default:
        return null; 
    }
  };

  return (
    <>
      <div className="ml-64 mt-8 px-4">
        <JobReport />
        <button
        className="bg-customGray hover:bg-customGray2 text-white hover:text-customGray4 font-bold py-2 px-4 rounded mb-4 mr-4 float-right"
        onClickCapture={()=>{handleRequest(SCREEN_MODES.CREATE,null)}}
      >
        <span className="mr-2">+</span> Add
      </button>
        <AdminJobs
          jobs={jobs}
          handleRequest={handleRequest}
        />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" onClick={() => setIsOpen(false)}>
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-xl w-full">
            {modalContent}
          </div>
        </div>
      )}
    </>
  );
};

export default CareerAdmin;
