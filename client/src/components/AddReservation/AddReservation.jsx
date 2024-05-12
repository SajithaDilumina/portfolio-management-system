import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios"
import "../../Styles/display.css";

const AddReservation = () => {
  const [CustomerId, setCustomerId] = useState("");
  const [ServiceProviderId, setServiceProviderId] = useState("");
  const [Requests, setRequests] = useState("");
  const [ReservationDate, setReservationDate] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);


  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!CustomerId) {
      errors.customerId = "Customer ID is required";
      isValid = false;
    }

    if (!ServiceProviderId) {
      errors.serviceProviderId = "Service Provider ID is required";
      isValid = false;
    }

    if (!Requests) {
      errors.requests = "Requests is required";
      isValid = false;
    }

    if (!ReservationDate) {
      errors.reservationDate = "Reservation Date is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const sendData = (e) => {
    e.preventDefault();
    const reservationData = {
      CustomerId,
      ServiceProviderId,
      Requests,
      ReservationDate,
    };
    if (validateForm()) {
      axios
        .post(
          `http://localhost:5000/api/reservation/addReservation`,
          reservationData
        )
        .then(function (response) {
          console.log(response.data);
          setCustomerId("");
          setServiceProviderId("");
          setReservationDate("");
          setRequests("");
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
          alert("Not added");
        });
      handleCloseModal();
    }
  };

  return (
    <div>
      <button
        className="bg-customGray hover:bg-customGray2 text-white hover:text-customGray4 font-bold py-2 px-4 rounded mb-4 mr-4 float-right"
        onClick={handleShowModal}
      >
        <span className="mr-2">+</span> Add
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
            <h2 className="text-lg font-semibold mb-4">Add Reservation</h2>
            {/* Form */}
            <div className="form-container">
              <form onSubmit={sendData} className="form-table">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="CustomerId">Customer Id</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="CustomerId"
                          placeholder="Enter Customers ID"
                          required
                          value={CustomerId}
                          onChange={(e) => setCustomerId(e.target.value)}
                        />
                        {errors.customerId && (
                          <div className="text-red-600">
                            {errors.customerId}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="ServiceProviderId">
                          ServiceProviderId
                        </label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="ServiceProviderId"
                          placeholder="Enter Service Provider Id"
                          required
                          value={ServiceProviderId}
                          onChange={(e) => setServiceProviderId(e.target.value)}
                        />
                        {errors.serviceProviderId && (
                          <div className="text-red-600">
                            {errors.serviceProviderId}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Requests">Requests</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="Requests"
                          placeholder="Enter Requests"
                          value={Requests}
                          onChange={(e) => setRequests(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="ReservationDate">ReservationDate</label>
                      </th>
                      <td>
                        <input
                          type="date"
                          id="ReservationDate"
                          placeholder="Enter ReservationDate"
                          required
                          value={ReservationDate}
                          onChange={(e) => setReservationDate(e.target.value)}
                        />
                        {errors.reservationDate && (
                          <div className="text-red-600">
                            {errors.reservationDate}
                          </div>
                        )}
                      </td>
                    </tr>
                    <tr></tr>
                    <tr>
                      <td colSpan="2">
                        <button className="btn" type="submit">Submit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReservation;

