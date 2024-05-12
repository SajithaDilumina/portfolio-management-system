import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/display.css";
import UpdateReservation from "../UpdateReservation/UpdateReservation";
import DeleteReservation from "../DeleteReservation/DeleteReservation";
import PaymentModal from "../PaymentModal/PaymentModal";
import { PaymentService } from "../../Services/Payment.Service";
import moment from "moment";
import { validateFormData } from "../../helper/FormValidators";
import { toast } from "react-toastify";
function CustomDisplayReservation() {

  const INITIAL_PAYMENT_FORM = {
    amount: { value: "", isRequired: true, disable: false, readonly: false, validator: "number", error: "", },
    date: { value: "", isRequired: true, disable: false, readonly: false, validator: "date", error: "", },
    bank: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    branch: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
    remark: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
    reservationId: { value: "", isRequired: true, disable: false, readonly: false, validator: "null", error: "", },
    ServiceProviderId: { value: "", isRequired: true, disable: false, readonly: false, validator: "null", error: "", },
    bankSlipUrl: { value: "", isRequired: true, disable: false, readonly: false, validator: "null", error: "", },
    UserId: { value: "", isRequired: true, disable: false, readonly: false, validator: "null", error: "", },
    promoCode:{ value: "", isRequired: false, disable: true, readonly: true, validator: "null", error: "", },
    postAmount:{ value: "", isRequired: false, disable: true, readonly: true, validator: "null", error: "", },
    discountPercentage:{ value: "", isRequired: false, disable: true, readonly: true, validator: "null", error: "", },
    disStartDate:{ value: "", isRequired: false, disable: true, readonly: true, validator: "null", error: "", },
    disEndDate:{ value: "", isRequired: false, disable: true, readonly: true, validator: "null", error: "", },
};

const [PaymentForm, setPaymentForm] = useState(INITIAL_PAYMENT_FORM);
const [openModal, setOpenModal] = useState(false);
const [helperText, setHelperText] = useState(true);
const [mode, setMode] = useState(null);
const [search, setSearch] = useState("");
  const [reservations, setReservations] = useState([]);



  useEffect(() => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    const userId = user._id;
    axios
      .get(
        `http://localhost:5000/api/reservation/CustomerReservations/${userId}`
      )
      .then((res) => {
        setReservations(res.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  },[]);


  const HandleAddPayment=(orderId)=>{
    console.log("orderId",orderId);

PaymentService.getReservationByOrderID(orderId).then((res)=>{
  console.log("respose",res.data);
if(res.data){
  const userString = localStorage.getItem('user');
  const user = JSON.parse(userString);
  const userId = user._id;

  setPaymentForm({
    ...PaymentForm,
    postAmount: {
      ...PaymentForm.postAmount,
      value: res.data.ServiceProviderId.amount,
    },
    discountPercentage: {
      ...PaymentForm.discountPercentage,
      value: res.data.ServiceProviderId.discountPercentage,
    },
    disStartDate: {
      ...PaymentForm.disStartDate,
      value: moment(res.data.ServiceProviderId.disStartDate).format('MMMM Do YYYY'),
    },
    disEndDate: {
      ...PaymentForm.disEndDate,
      value:  moment(res.data.ServiceProviderId.disEndDate).format('MMMM Do YYYY'),
    },
    reservationId: {
      ...PaymentForm.reservationId,
      value: res.data._id,
    },
    ServiceProviderId: {
      ...PaymentForm.ServiceProviderId,
      value: res.data.ServiceProviderId._id,
    },
    promoCode: {
      ...PaymentForm.promoCode,
      value: res.data.ServiceProviderId.promoCode,
    },
    UserId: {
      ...PaymentForm.UserId,
      value: userId,
    },
  });
  console.log("PaymentForm",PaymentForm);
}

}).catch((error)=>{
  console.error("Error fetching reservation:",error);
});
    setOpenModal(true);
  }
  const handleClose=()=>{
    setPaymentForm(INITIAL_PAYMENT_FORM);
    setOpenModal(false);
  }

  const handleInputFocus = (field) => {
    setPaymentForm({
      ...PaymentForm,
      [field]: {
        ...PaymentForm[field],
        error: "",
      },
    });
  }

  const onInputHandleChange = (field, value) => {
    setPaymentForm({
      ...PaymentForm,
      [field]: {
        ...PaymentForm[field],
        value: value,
      },
    });
  }
  function searchHandler(e) {
    e.preventDefault();
    if (search.trim().length === 0) {
      // If the search query is empty, do not fetch data
      return;
    }
    console.log(search);
    axios
      .get(`http://localhost:5000/api/reservation/search?search=${search}`)
      .then((res) => {
        console.log(res.data);
        setReservations(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handlePaymentSubmit=async ()=>{
    setHelperText(true);
    const [validateData, isValid] = await validateFormData(PaymentForm);
    setPaymentForm(validateData);
    console.log("first",isValid)
    console.log("first",PaymentForm);
    if(isValid){

      const paymentData = {
        amount: PaymentForm.amount.value,
        date: PaymentForm.date.value,
        bank: PaymentForm.bank.value,
        branch: PaymentForm.branch.value,
        remark: PaymentForm.remark.value,
        reservationId: PaymentForm.reservationId.value,
        ServiceProviderId: PaymentForm.ServiceProviderId.value,
        bankSlipUrl: PaymentForm.bankSlipUrl.value,
        UserId: PaymentForm.UserId.value,
        postAmount: PaymentForm.postAmount.value,

      }
      PaymentService.AddPayment(paymentData).then((res)=>{
        console.log("Payment added successfully",res.data);
        toast.success("Payment added successfully");
        handleClose();
      }).catch((error)=>{
        console.error("Error adding payment:",error);
        toast.error("Error adding payment");
      });
      
    }

  }
  
  return (
    <div>
      <h2>
        <center>All Reservations</center>
      </h2>
      <div className="flex justify-center">
          <form
            className="search"
            onSubmit={searchHandler}
            style={{ flexDirection: "row", marginTop: "25px" }}
          >
            <input
              type="search"
              name="q"
              id="search"
              value={search}
              placeholder="Enter text to search"
              onChange={(e) => {
                setSearch(e.target.value);
                //   console.log(search);
              }}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 mr-5"
              style={{ width: "500px" }}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      <div className="container mx-auto px-4 py-8 mt-2">
        <table className='"w-full table-auto'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Reservation Date</th>
              <th>Service Provider ID</th>
              <th>Requests</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Add Payment</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, i) => (
              <tr key={i}>
                <td>{reservation.OrderId}</td>
                <td>{reservation.ReservationDate}</td>
                <td>{reservation.ServiceProviderId}</td>
                <td>{reservation.Requests}</td>
                <td>
                  {/* <Link to={`/updateReservation/${reservation.OrderId}`}>
                      <button>Update</button>
                    </Link> */}
                  <UpdateReservation orderId={reservation.OrderId} />
                </td>
                <td>
                  <DeleteReservation orderId={reservation.OrderId} />
                </td>
                <td>
                <button
                 className="mr-2 bg-customGray3 hover:bg-blue-300 text-customGray4 font-bold py-2 px-4 rounded"
                onClick={()=>HandleAddPayment(reservation.OrderId)}
              >
                Add Payment
              </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        <PaymentModal open={openModal} paymentForm={PaymentForm} handleClose={handleClose}  handleInputFocus={handleInputFocus} onInputHandleChange={onInputHandleChange} helperText={helperText} handlePaymentSubmit={handlePaymentSubmit} />
      
    </div>
  );
}

export default CustomDisplayReservation;
