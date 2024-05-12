import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../Styles/display.css";
import UpdateReservation from '../UpdateReservation/UpdateReservation';
import DeleteReservation from '../DeleteReservation/DeleteReservation';

function DisplayReservations() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        axios
          .get("http://localhost:5000/api/reservation/displayReservations")
          .then((res) => {
            setReservations(res.data);
          })
          .catch((error) => {
            console.error("Error fetching reservations:", error);
          });
    },[]);

    const [search, setSearch] = useState("");

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
        <div className="container mx-auto px-4 py-8">
          <table className='"w-full table-auto'>
            <thead>
              <tr >
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Reservation Date</th>
                <th>Service Provider ID</th>
                <th>Requests</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, i) => (
                <tr key={i} className='bg-gradient-to-r from-blue-200 to-white shadow-md mb-2'>
                  <td>{reservation.OrderId}</td>
                  <td>{reservation.CustomerId.fullName}</td>
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
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default DisplayReservations;
