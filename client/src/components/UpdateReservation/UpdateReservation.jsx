import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const UpdateReservation = ({ orderId }) => {
  const [CustomerId, setCustomerId] = useState("");
  const [ServiceProviderId, setServiceProviderId] = useState("");
  const [Requests, setRequests] = useState("");
  const [ReservationDate, setReservationDate] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false); // Add showModal state

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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/reservation/getOne/${orderId}`)
      .then((res) => {
        console.log(res.data);
        // const jobData = res.data;
        setCustomerId(res.data.CustomerId._id);
        setServiceProviderId(res.data.ServiceProviderId._id);
        setRequests(res.data.Requests);
        setReservationDate(res.data.ReservationDate);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const reservationData = {
      CustomerId,
      ServiceProviderId,
      Requests,
      ReservationDate,
    };
    if (validateForm()) {
      axios
        .put(
          `http://localhost:5000/api/reservation/updateReservation/${orderId}`,
          reservationData
        )
        .then(function (response) {
          console.log(response.data);
          swal({
            text: "Successfully Updated",
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
          alert("Not updated");
        });
        handleCloseModal();
    } 
  };
  return (
    <div>
      <button className="mr-2 bg-customGray3 hover:bg-blue-300 text-customGray4 font-bold py-2 px-4 rounded" onClick={handleShowModal}>
      <FaEdit className="inline-block mr-1" />   Update
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
            {/* Form */}
            <div className="form-container">
              <h2>
                <center>Update Reservation</center>
              </h2>
              <form onSubmit={handleSubmit} className="form-table">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="OrderId">Order Id:</label>
                      </th>
                      <td>
                        <span>{orderId}</span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="CustomerId">Customer Id:</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          name="customerId"
                          value={CustomerId}
                          onChange={(e) => setCustomerId(e.target.value)}
                        />
                        {errors.customerId && (
                          <span className="text-red-600">{errors.customerId}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="ServiceProviderId">
                          Service Provider Id:
                        </label>
                      </th>
                      <td>
                        <input
                          type="text"
                          name="serviceProviderId"
                          value={ServiceProviderId}
                          onChange={(e) => setServiceProviderId(e.target.value)}
                        />
                        {errors.serviceProviderId && (
                          <span className="text-red-600">
                            {errors.serviceProviderId}
                          </span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Requests">Requests:</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          name="requests"
                          value={Requests}
                          onChange={(e) => setRequests(e.target.value)}
                        />
                        {errors.requests && (
                          <span className="text-red-600">{errors.requests}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="ReservationDate">
                          Reservation Date:
                        </label>
                      </th>
                      <td>
                        <input
                          type="date"
                          name="reservationDate"
                          value={ReservationDate}
                          onChange={(e) => setReservationDate(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button className="btn" type="submit">
                          Update
                        </button>
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

export default UpdateReservation;

// const UpdateJob = ({ jobId, onClose }) => {
//   const [position, setPosition] = useState("");
//   const [category, setCategory] = useState("");
//   const [company, setCompany] = useState("");
//   const [keyResponsibility, setKeyResponsibility] = useState("");
//   const [skills, setSkills] = useState("");
//   const [email, setEmail] = useState("");
//   const [showModal, setShowModal] = useState(false); // Add showModal state

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/job/getOne/${jobId}`)
//       .then((res) => {
//         console.log(res.data);
//         // const jobData = res.data;
//         setPosition(res.data.position);
//         setCategory(res.data.category);
//         setCompany(res.data.company);
//         setKeyResponsibility(res.data.keyResponsibility);
//         setSkills(res.data.skills.join(","));
//         setEmail(res.data.email);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const jobData = {
//       position,
//       category,
//       company,
//       keyResponsibility,
//       skills,
//       email,
//     };

//     axios
//       .put(`http://localhost:5000/api/job/${jobId}`, jobData)
//       .then(function (response) {
//         console.log(response.data);
//         swal({
//           text: "Successfully Updated",
//           icon: "success",
//           buttons: {
//             cancel: { text: "Cancel" },
//             confirm: { text: "OK" },
//           },
//         }).then((value) => {
//           handleCloseModal();
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//         alert("Not updated");
//       });
//       handleCloseModal();
//   };

//   return (
//     <div>

//       <button
//         className="mr-2 bg-customGray3 hover:bg-blue-300 text-customGray4 font-bold py-2 px-4 rounded"
//         onClick={handleShowModal}
//       >
//         <FaEdit className="inline-block mr-1" /> Update
//       </button>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
//           <div
//             className="fixed inset-0 transition-opacity"
//             onClick={handleCloseModal}
//           >
//             <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
//           </div>
//           <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-xl w-full">
//             <button
//               className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
//               onClick={handleCloseModal}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//             <h2 className="text-lg font-semibold mb-4">Update Job</h2>
//             {/* Form */}

//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UpdateJob;
