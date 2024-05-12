import React, { useState,useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SCREEN_MODES } from "../../utilities/app.constants";
import Styles from "./PaymentTable.module.scss";
import { Grid } from "@mui/material";

const PaymentTable = ({ payments, handleRequest, generateReport }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [Role, setRole] = useState(null);

    useEffect(() => {
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      const Role = user.role;
      setRole(Role);
    }, [])


  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  
  // Function to filter payments based on search term
  const filteredPayments = payments.filter((payment) => {
    const paymentDate = new Date(payment.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      Object.values(payment).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      ) &&
      (!startDate || paymentDate >= start) &&
      (!endDate || paymentDate <= end)
    );
  });

   // Function to handle start date change
   const handleStartDateChange = (e) => {
    
    setStartDate(e.target.value);
  };

  // Function to handle end date change
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  if (!payments.length) {

      
    return (
      <table className="w-full table-auto">
      <thead>
      <tr className="bg-gray-200">
        <th className="py-2">NO</th>
        <th className="py-2"> Paid Amount</th>
        <th className="py-2">Discount</th>
        <th className="py-2">Date</th>
        <th className="py-2">Bank</th>
        <th className="py-2">Branch</th>
        <th className="py-2">Remark</th>
        <th className="py-2">Reservation ID</th>
        <th className="py-2">Service Provider ID</th>
        <th className="py-2">Bank Slip</th>
        <th className="py-2">Post Amount</th>
        <th className="py-2">Actions</th>
      </tr>
    </thead>
    <div className={Styles.tableContainer}>No Payments Found</div>
    </table>)
  }
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
        <Grid container spacing={2}>
          <Grid item sx={12}>
         <input
         aria-label="Start Date"
          type="date"
          className="border border-gray-400 px-3 py-2 rounded-md mb-4 mr-2"
          placeholder="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
        />
           </Grid>
           <Grid item sx={12}>
        <input
          type="date"
          className="border border-gray-400 px-3 py-2 rounded-md mb-4"
          placeholder="End Date"
          value={endDate}
          onChange={handleEndDateChange}
        />
           </Grid>
        </Grid>
        <div className="flex justify-end mb-4">
        {Role&& Role==="USER"&&  <button
            className="bg-[#418ca3] hover:bg-5399ac text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => { handleRequest(SCREEN_MODES.CREATE, null); }}
          >
            Add New Payment
          </button> }
          <button
            className="bg-[#418ca3] hover:bg-5399ac text-white font-bold py-2 px-4 rounded"
            onClick={() => { generateReport(); }}
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
              <th className="py-2"> Paid Amount</th>
              <th className="py-2">Discount</th>
              <th className="py-2">Date</th>
              <th className="py-2">Bank</th>
              <th className="py-2">Branch</th>
              <th className="py-2">Remark</th>
              <th className="py-2">Reservation ID</th>
              <th className="py-2">Service Provider ID</th>
              <th className="py-2">Bank Slip</th>
              <th className="py-2">Post Amount</th>
              {Role&& Role==="USER"&&  <th className="py-2">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment, index) => (
              <tr
                key={payment._id}
                className="bg-gradient-to-r from-blue-200 to-white shadow-md mb-2"
              >
                <td className="py-2">{index + 1}</td>
                <td className="py-2">Rs{payment.amount}</td>
                <td className="py-2">Rs{payment.postAmount-payment.amount}</td>
                <td className="py-2">{new Date(payment.date).toLocaleDateString()}</td>
                <td className="py-2">{payment.bank}</td>
                <td className="py-2">{payment.branch}</td>
                <td className="py-2">{payment.remark}</td>
                <td className="py-2">{payment.reservationId?.OrderId}</td> 
               <td className="py-2">{payment.ServiceProviderId.portfolio_name}</td>
                <td className="py-2">
                <img src={payment.bankSlipUrl} style={{ width:"12rem" ,height:"12rem"}} alt="payment slip" />
                </td>
                <td className="py-2">{payment.postAmount}</td>
               {Role&& Role==="USER"&& <td className="py-2 flex justify-center">
                  <button
                    className="mr-2 bg-customGray3 hover:bg-blue-300 text-customGray4 font-bold py-2 px-4 rounded"
                    onClick={() => { handleRequest(SCREEN_MODES.EDIT, payment._id); }}
                  >
                    <FaEdit className="inline-block mr-1" /> Update
                  </button>
                  <button
                    className="bg-red-200 hover:bg-red-300 text-red-800 font-bold py-2 px-4 rounded"
                    onClick={() => { handleRequest(SCREEN_MODES.DELETE, payment._id); }}
                  >
                    <FaTrash className="inline-block mr-1" /> Delete
                  </button>
                </td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
