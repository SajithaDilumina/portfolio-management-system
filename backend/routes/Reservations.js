let Reservation = require("../models/Reservation");
let Users = require("../models/User");
let Payment = require("../models/Payment");
const express = require("express");
const router = express.Router();

async function generateReservationId() {
  let reservationNumber = await Reservation.countDocuments({});
  return reservationNumber < 9
    ? "OD00" + (reservationNumber + 1)
    : "OD0" + (reservationNumber + 1);
}

//create
router.route("/addReservation").post(async (req, res) => {
  //creating the variables for the atributes
  const OrderId = await generateReservationId();
  const CustomerId = req.body.CustomerId;
  const ServiceProviderId = req.body.ServiceProviderId;
  const Requests = req.body.Requests;
  const ReservationDate = Date(req.body.ReservationDate);

  //assinging the atributes to a variable of the type of the reservation model
  const newReservation = new Reservation({
    //Initializing
    OrderId,
    CustomerId,
    ServiceProviderId,
    Requests,
    ReservationDate,
  });

  //sending the newResevation object to the database through the model
  newReservation
    .save()
    .then(() => {
      //if successfully send snd saved
      res.status(200).json(newReservation);
      //   res.json("Reservation Added"); //giving the response to the front end in the json fomat
    })
    .catch((err) => {
      console.log(err); //displaying the error in the console
    });
});

//displaying the Reservation of a customer accordinly
router.route("/CustomerReservations/:customerId").get(async (req, res) => {
  try {
    let reservations;
    reservations = await Reservation.find({
      CustomerId: req.params.customerId,
    });
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json(err);
  }
});

//displaying the emails of orders a service provider accordinly
router
  .route("/ServiceProviderReservations/:serviceProviderId")
  .get(async (req, res) => {
    try {
      let reservations;
      reservations = await Reservation.find({
        ServiceProviderId: req.params.serviceProviderId,
      }).populate("CustomerId");
      res.status(200).json(reservations);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//calculate monthly income through orders
router.route("/calculateMonthlyIncome").get(async (req, res) => {
  try {
    const reservations = await Reservation.find().populate({
      path: "Payment",
      select: "amount", // Only select the amount field from Payment
    });

    // Initialize an object to store monthly income
    const monthlyIncome = {};

    // Loop through each reservation
    reservations.forEach((reservation) => {
      // Extract the month from the ReservationDate
      const month = new Date(reservation.ReservationDate).getMonth();

      // Parse the amount as a number, defaulting to 0 if Payment is not present
      const amount = reservation.Payment
        ? parseFloat(reservation.Payment.amount)
        : 0;

      // Add the amount to the corresponding month's income
      monthlyIncome[month] = (monthlyIncome[month] || 0) + amount;
    });

    // Convert monthlyIncome object into an array of objects
    const monthlyIncomeArray = Object.entries(monthlyIncome).map(
      ([month, income]) => ({
        Month: parseInt(month), // Convert month to integer
        Income: income,
      })
    );

    res.status(200).json(monthlyIncomeArray);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


//get all
router.route("/displayReservations").get(async(req, res) => {
  try {
    const reservations = await Reservation.find().populate("CustomerId");
    res.status(200).json(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  } 
});

router.route("/search").get(async (req, res) => {
  try {
    let reservations;
    const search = req.query.search;
    if (search) {
      // Search by service provider id
      reservations = await Reservation.find({
        $or: [{ OrderId: { $regex: search, $options: "i" } }],
      }).populate("CustomerId");
    } else {
      reservations = await Reservation.find().populate("CustomerId");
    }

    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get one
router.route("/getOne/:OrderId").get(async (req, res) => {
  try {
    const reservation = await Reservation.findOne({
      OrderId: req.params.OrderId,
    }).populate("CustomerId ServiceProviderId");
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update
router.route("/updateReservation/:OrderId").put(async (req, res) => {
  //async function,responsivness is high
  //because it is back end route user cannot see the id in the url
  //post is also can use but because it is update we put the updated values to the same record

  try {
    const updatedReservation = await Reservation.findOneAndUpdate(
      { OrderId: req.params.OrderId },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.route("/deleteReservation/:orderId").delete(async (req, res) => {
  const orderId = req.params.orderId;

  await Reservation.findOneAndDelete({ OrderId: orderId })
    .then(() => {
      res.status(200).send({ status: "Reservation Deleted" });
    })
    .catch((err) => {
      console.Console(err);
      res.status(500).send({
        status: "Error with Deleting the Reservation",
        error: err.message,
      });
    });
});

module.exports = router;
