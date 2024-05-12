import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import JobApplication from "../JobApplication/JobApplication";
import { FaTrash } from "react-icons/fa";

const JobReport = () => {
  const [show, setShow] = useState(false);
  const componentRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <button
        className="bg-customGray hover:bg-customGray2 text-white hover:text-customGray4 font-bold py-2 px-4 rounded mb-4 mr-4 float-right"
        onClick={handleShow}
      >
        Generate Report
      </button>

      {show && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Job Application Report</h2>
              <button
                className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
                onClick={handleClose}
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
            </div>
            <div ref={componentRef}>
              <JobApplication />
            </div>
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 mr-2"
                onClick={handlePrint}
              >
                Print Report
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobReport;
