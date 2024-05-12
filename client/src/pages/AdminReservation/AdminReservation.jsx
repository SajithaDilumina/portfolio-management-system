import React from 'react'

import DisplayReservations from '../../components/DisplayReservation/DisplayReservations'
import SideNavBar from '../../components/SideNav/SideNavBar'
import ReservationReport from '../../components/ReservationReport/ReservationReport';
import AddReservation from '../../components/AddReservation/AddReservation';

const AdminReservation = () => {
  return (
    <>
      {/* <SideNavBar /> */}

      <div className="ml-64 mt-8 px-4">
        <ReservationReport />
        <AddReservation />

        <br />
        <br />
        <DisplayReservations />
      </div>
    </>
  );
}

export default AdminReservation

