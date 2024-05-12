import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const DeleteReservation = ({ orderId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    axios
      .delete(
        `http://localhost:5000/api/reservation/deleteReservation/${orderId}`
      )
      .then((response) => {
        console.log(response.data);
        swal({
          text: "Reservation deleted successfully",
          icon: "success",
          buttons: {
            confirm: { text: "OK" },
          },
        }).then(() => {
          handleCloseModal();
        });
      })
      .catch((error) => {
        console.error("Error deleting reservation:", error);
      });
  };

  return (
    <div>
      {/* Delete button */}
      <button
        className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-2 px-4 rounded"
        onClick={handleShowModal}
      >
           <FaTrash className="inline-block mr-1" /> Delete
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
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete the reservation?
            </h2>
            <div className="flex justify-end">
              <button
                className="bg-customGray text-white py-2 px-4 rounded-lg hover:bg-customGray2 focus:outline-none focus:ring focus:ring-blue-200 mr-4"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteReservation;

